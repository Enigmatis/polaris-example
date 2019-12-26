import {Book} from "./dal/book";
import {Author} from "./dal/author";
import {polarisGraphQLLogger} from "./logger";
import {getConnectionManager, PolarisSaveOptions} from "@enigmatis/polaris-core";

async function deleteTables() {
    const tables = ['book', 'author', 'dataVersion'];
    for (const table of tables) {
        if (getConnectionManager().get()) {
            try {
                await getConnectionManager().get().getRepository(table).query('DELETE FROM "' + table + '";');
            } catch (e) {
                polarisGraphQLLogger.debug("Couldn't delete table (might never existed)");
            }
        }
    }
}

function getAuthors(): Author[] {
    return [
        new Author("J.K.", "Rowling"),
        new Author("Michael", "Crichton"),
    ];
}

function getBooks(authors: Author[]): Book[] {
    return [
        new Book('Harry Potter and the Chamber of Secrets', authors[0]),
        new Book('Jurassic Park', authors[1]),
        new Book('Harry Potter and the Philosophers Stone', authors[0]),
        new Book('Harry Potter and the Goblet of Fire', authors[0]),
    ]
}

async function createExampleData(authors: Author[], books: Book[]) {
    let authorRepo = getConnectionManager().get().getRepository(Author);
    let bookRepo = getConnectionManager().get().getRepository(Book);
    const context = {
        requestHeaders: { realityId: 0 },
        returnedExtensions: {},
    } as any;
    await authorRepo.save(new PolarisSaveOptions(authors, context) as any);
    await bookRepo.save(new PolarisSaveOptions([books[0], books[1]], context) as any);
    context.requestHeaders.realityId = 3;
    await bookRepo.save(new PolarisSaveOptions(books[2], context) as any);
    delete context.returnedExtensions.globalDataVersion;
    await bookRepo.save(new PolarisSaveOptions(books[3], context) as any);
}

export async function initializeDatabase(){
    await deleteTables();
    await getConnectionManager().get().synchronize();
    const authors: Author[] = getAuthors();
    const books: Book[] = getBooks(authors);
    await createExampleData(authors, books);
}
