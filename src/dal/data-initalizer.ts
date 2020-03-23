import {Article} from './entities/article';
import {Book} from './entities/book';
import {Author} from './entities/author';
import {getPolarisConnectionManager, PolarisConnection} from '@enigmatis/polaris-core';

const dropTables = async (): Promise<void> => {
    const connection: PolarisConnection = getPolarisConnectionManager().get();
    if (connection) {
        const tables: string[] = connection.entityMetadatas.map(entity => entity.tableName);
        for (const table of tables) {
            await connection.getRepository(table).query(`DROP TABLE if exists "${table}" cascade;`);
        }
    }
};

const getAuthors = (): Author[] => [
    new Author('J.K.', 'Rowling', []),
    new Author('Michael', 'Crichton', []),
];

const getBooks = (authors: Author[]): Book[] => [
    new Book('Harry Potter and the Chamber of Secrets', authors[0]),
    new Book('Jurassic Park', authors[1]),
    new Book('Harry Potter and the Philosophers Stone', authors[0]),
    new Book('Harry Potter and the Goblet of Fire', authors[0]),
];

const getArticles = (authors: Author[]): Article[] => [
    new Article('Article1', 'A lot of text', authors[0]),
    new Article('Article2', 'Lorem Ipsum', authors[1]),
    new Article('Article3', 'Hello World!', authors[0]),
    new Article('Article4', 'Foo Bar Baz', authors[1]),
    new Article('Article5', 'Do you want to build a snowman?', authors[0]),
    new Article('Article6', 'I want to go to Disneyland', authors[1]),
    new Article('Article7', 'This is getting out of control', authors[0]),
    new Article('Article8', 'I do not know what is happening', authors[1]),
    new Article('Article9', 'Better safe than sorry', authors[0]),
    new Article('Article10', 'I believe in you', authors[1]),
    new Article('Article11', 'Looking for guidance', authors[0]),
    new Article('Article12', 'Boots and cats', authors[1]),
    new Article('Article13', 'Alexa play despacito', authors[0]),
    new Article('Article14', 'Almost done with this', authors[1]),
    new Article('Article15', 'Goodbye.', authors[0]),
];

const createExampleData = async (authors: Author[], books: Book[], articles: Article[]): Promise<void> => {
    const connection = getPolarisConnectionManager().get();
    let authorRepo = connection.getRepository(Author);
    let bookRepo = connection.getRepository(Book);
    let articleRepo = connection.getRepository(Article);
    await authorRepo.save({requestHeaders: {realityId: 0}} as any, authors);
    await bookRepo.save({requestHeaders: {realityId: 0}} as any, [books[0], books[1], books[3]]);
    await bookRepo.save({requestHeaders: {realityId: 3}} as any, books[2]);
    await articleRepo.save({requestHeaders: {realityId: 0}} as any, articles);
};

export const initializeDatabase = async (): Promise<void> => {
    const connection = getPolarisConnectionManager().get();
    await dropTables();
    await connection.synchronize();
    const authors: Author[] = getAuthors();
    const books: Book[] = getBooks(authors);
    const articles: Article[] = getArticles(authors);
    await createExampleData(authors, books, articles);
};
