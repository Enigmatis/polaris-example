import {getPolarisConnectionManager, Like, PolarisError, PolarisGraphQLContext} from '@enigmatis/polaris-core'
import {Book} from '../dal/entities/book';
import {Author} from '../dal/entities/author';
import {polarisGraphQLLogger} from '../utils/logger';

export const resolvers = {
    Query: {
        allBooks: async (
            parent: any,
            args: any,
            context: PolarisGraphQLContext
        ): Promise<Book[]> => {
            const connection = getPolarisConnectionManager().get();
            polarisGraphQLLogger.debug('I am the resolver of all books', context);
            return connection.getRepository(Book).find(context, {relations: ['author']});
        },
        booksByPartialTitle: (
            parent: any,
            args: { title: string },
            context: PolarisGraphQLContext
        ): Promise<Book[]> => {
            const connection = getPolarisConnectionManager().get();
            return connection.getRepository(Book).find(context, {
                where: {title: Like(`%${args.title}%`)},
                relations: ['author'],
            });
        },
        allAuthors: async (
            parent: any,
            args: any,
            context: PolarisGraphQLContext
        ): Promise<Author[]> => {
            const connection = getPolarisConnectionManager().get();
            const authorRepo = connection.getRepository(Author);
            return authorRepo.find(context, {relations: ['books']});
        },
    },
    Mutation: {
        createBook: async (
            parent: any,
            args: { authorId: string, title: string },
            context: PolarisGraphQLContext
        ): Promise<Book> => {
            const connection = getPolarisConnectionManager().get();
            const authorRepo = connection.getRepository(Author);
            const bookRepo = connection.getRepository(Book);
            const author: Author | undefined = await authorRepo.findOne(context, {where: {id: args.authorId}});
            if (author) {
                const newBook = new Book(args.title, author);
                await bookRepo.save(context, newBook);
                return newBook;
            } else {
                throw new PolarisError('Could not find author with the requested id!', 400);
            }
        },
        updateBook: async (
            parent: any,
            args: { id: string, newTitle: string },
            context: PolarisGraphQLContext
        ): Promise<Book> => {
            const connection = getPolarisConnectionManager().get();
            const bookRepo = connection.getRepository(Book);
            const bookToUpdate: Book | undefined = await bookRepo.findOne(context, {
                where: {id: args.id},
                relations: ['author']
            });
            if (bookToUpdate) {
                bookToUpdate.title = args.newTitle;
                await bookRepo.update(context, bookToUpdate.getId(), {title: args.newTitle});
                return bookToUpdate;
            } else {
                throw new PolarisError('Could not find book with the requested id!', 400);
            }
        },
        deleteBook: async (
            parent: any,
            args: { id: string },
            context: PolarisGraphQLContext
        ): Promise<Book> => {
            const connection = getPolarisConnectionManager().get();
            const bookRepo = connection.getRepository(Book);
            const bookToDelete: Book | undefined = await bookRepo.findOne(context, {
                where: {id: args.id},
                relations: ['author']
            });
            if (bookToDelete) {
                await bookRepo.delete(context, bookToDelete.getId());
                return bookToDelete;
            } else {
                throw new PolarisError('Could not find book with the requested id!', 400);
            }
        },
    },
    Author: {
        fullName(author: Author) {
            return `${author.firstName} ${author.lastName}`;
        },
    }
};
