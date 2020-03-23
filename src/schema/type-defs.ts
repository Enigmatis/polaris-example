import {gql} from '@enigmatis/polaris-core';

export const typeDefs = gql`
    type Query {
        allBooks: [Book]!
        booksByPartialTitle(title: String!): [Book]!
        allAuthors: [Author]!
        allArticlesConnection: [ArticleConnection]!
    }

    type Mutation {
        createBook(title: String!, authorId: String!): Book
        updateBook(id: String!, newTitle: String!): Book
        deleteBook(id: String!): Book
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

    type Author implements RepositoryEntity {
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

    # Relay

    interface Node {
        id: String!
    }

    type Article implements Node {
        id: String!
        headline: String
        text: String
    }

    type ArticleConnection {
      edges: [ArticleEdge]
      pageInfo: PageInfo!
    }

    type ArticleEdge {
      cursor: String!
      node: Article
    }

    type PageInfo {
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }
`;
