import "reflect-metadata";

import { ObjectType, ID, Field, Query, Resolver, Args, Arg, buildSchema } from "type-graphql";
import express = require("express");
import graphqlHTTP = require('express-graphql');
import http = require("http");

@ObjectType()
class Recipe {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];

  constructor(id: string, title: string, creationDate: Date, ingredients: string[]) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.ingredients = ingredients;
  }
}

@Resolver(Recipe)
class RecipeResolver {
  @Query(returns => Recipe)
  async recipe(@Arg("id") id: string) {
    return new Recipe('hi', 'world', new Date(), ['hi']);
  }
}

async function main() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver]
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
