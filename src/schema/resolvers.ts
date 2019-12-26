import {
    Like,
    PolarisFindManyOptions,
    PolarisGraphQLContext,
    PolarisFindOneOptions,
    PolarisSaveOptions
} from "@enigmatis/polaris-core"
import {Book} from "../dal/book";
import {Author} from "../dal/author";
import {polarisGraphQLLogger} from "../logger";
import {getConnectionManager} from "@enigmatis/polaris-typeorm";


export const resolvers = {
        Query: {
            allBooks: async (parent: any,
                             args: any,
                             context: PolarisGraphQLContext): Promise<Book[]> => {
                polarisGraphQLLogger.debug("I'm the resolver of all books");
                return getConnectionManager().get().getRepository(Book).find(new PolarisFindManyOptions({relations: ['author']}, context) as any);
            },
            bookByTitle: (parent: any,
                          args: any,
                          context: PolarisGraphQLContext): Promise<Book[]> =>
                getConnectionManager().get().getRepository(Book).find(new PolarisFindManyOptions({
                    where: {title: Like(`%${args.title}%`)},
                    relations: ['author']
                }, context) as any)
        },
        Mutation: {
            createBook: async (parent: any,
                               args: any,
                               context: PolarisGraphQLContext): Promise<Book> => {
                const authorRepo = getConnectionManager().get().getRepository(Author);
                const author = await authorRepo.findOne(new PolarisFindOneOptions({where: {id: args.authorId}}, context) as any);
                const newBook = new Book(args.title, author);
                await getConnectionManager().get().getRepository(Book).save(new PolarisSaveOptions(newBook, context) as any);
                return newBook;
            },
            updateBook: async (parent: any, args: any, context: PolarisGraphQLContext): Promise<boolean> => {
                const bookRepo = getConnectionManager().get().getRepository(Book);
                const result = await bookRepo.find(new PolarisFindManyOptions({where: {title: Like(`%${args.title}%`)}}, context) as any);
                let bookToUpdate = result.length > 0 ? result[0] : undefined;
                let updated = false;
                if (bookToUpdate) {
                    const result = await bookRepo.update(new PolarisFindOneOptions(bookToUpdate.getId(), context) as any,
                        {title: args.newTitle});
                    updated = result.affected > 0;
                }

                return updated;
            }
        }
    }
;
