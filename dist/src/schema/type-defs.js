"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = `
    type Query {
        allBooks: [Book]!
        bookByTitle(title: String!): [Book]!
    }

    type Mutation{
        createBook(title: String!, authorId: String!): Book
        updateBook(title: String!, newTitle: String!): Book
    }
    
    type Book implements RepositoryEntity {
        id: String!
        deleted: Boolean!
        createdBy: String!
        creationTime: DateTime!
        lastUpdatedBy: String
        lastUpdateTime: DateTime
        realityId: Int!
        title: String
        author: Author
    }
    
    type Author implements RepositoryEntity{
        id: String!
        deleted: Boolean!
        createdBy: String!
        creationTime: DateTime!
        lastUpdatedBy: String
        lastUpdateTime: DateTime
        realityId: Int!
        firstName: String
        lastName: String
        fullName: String
        books: [Book]
    }
`;
//# sourceMappingURL=type-defs.js.map