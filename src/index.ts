import "reflect-metadata";

import { buildSchema } from "type-graphql";
import express = require("express");
import graphqlHTTP = require('express-graphql');
import http = require("http");
import { createConnection } from "typeorm";
import Post from "./entity/Post";
import PostResolver from "./resolvers/PostResolver";
import cors = require("cors");

async function main() {
  const dbUrl = process.env.DATABASE_URL ?? `postgresql://postgres@localhost:5432/friday`;
  await createConnection({
    type: "postgres",
    url: dbUrl,
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

  app.use(cors());

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

  const httpServer = http.createServer(app);
  const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  httpServer.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
