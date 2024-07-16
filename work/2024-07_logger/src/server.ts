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
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(
      `GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
