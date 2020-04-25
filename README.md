# Getting started

- Get yarn (https://yarnpkg.com/)
- `yarn install` dependencies
- Run postgres (TODO: Add docker command for this.)
- Create the `friday` database: `PGHOST=localhost PGUSER=postgres createdb friday`
- Start the server in watch mode with `yarn watch`

# Stack

- Egg stack
- [TypeORM](https://typeorm.io/#/)
- [GraphQL](https://graphql.org/) - API layer
- [TypeGraphQL](https://typegraphql.com/) - Creates the GraphQL schema using [TypeScript decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
