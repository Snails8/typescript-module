import { doErrorHandler } from "./handler/doErrorHandler";

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

// async function errorInterceptor(resolver: any) {
//   return async function (parent, args, context, info) {
//     try {
//       return await resolver(parent, args, context, info);
//     } catch (error) {
//       console.error(JSON.stringify(error));
//       return error;
//     }
//   };
// }
