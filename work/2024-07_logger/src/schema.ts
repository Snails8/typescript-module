import { gql } from "apollo-server-express";
import { doErrorHandler } from "./handler/doErrorHandler";

export const typeDefs = gql`
  type Query {
    hello: String!
    books: [Book!]!
    doError(input: DoErrorInput!): String!
    check: String!
  }

  type Book {
    title: String!
    author: String!
  }

  input DoErrorInput {
    params: String
    sub: String
  }
`;

export const resolvers = {
  Query: {
    check: () => process.env.NODE_ENV,
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
    doError: doErrorHandler,
  },
};

async function errorInterceptor(resolver: any) {
  return async function(parent, args, context, info) {
    try {
      return await resolver(parent, args, context, info);
    } catch (error) {
      console.error(JSON.stringify(error));
      return error;
    }
    
  }
}