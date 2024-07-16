import { ApolloServer } from "apollo-server-express";
import express, { Request, Response } from "express";
import { resolvers, typeDefs } from "./schema";

const app = express();
const PORT = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  formatError: (error) => {
    console.error(JSON.stringify(error));
    return error;
  }
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(
        `GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      throw new Error('Error: server', e);    
    }
    throw new Error(`Server failed with non-standard error: ${String(e)}`);
  }
})();
