import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    books: [Book!]!
  }

  type Book {
    title: String!
    author: String!
  }
`;

export const resolvers = {
  Query: {
    hello: () => "Hello World",
    books: () => [
      {
        title: "test title1",
        author: "test author1",
      },
      {
        title: "test title2",
        author: "test author2",
      },
    ],
  },
};
