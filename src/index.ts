import "reflect-metadata";

import { buildSchema } from "type-graphql";
import express = require("express");
import graphqlHTTP = require('express-graphql');
import http = require("http");
import { createConnection } from "typeorm";
import Post from "./entity/Post";
import PostResolver from "./resolvers/PostResolver";

async function main() {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "friday",
    entities: [
      Post
    ],
    synchronize: true,
    logging: true
  });

  const schema = await buildSchema({
    resolvers: [PostResolver]
  });

  const app = express();

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

  const httpServer = http.createServer(app);
  httpServer.listen(8000, () => {
    console.log(`HTTP server listening`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
