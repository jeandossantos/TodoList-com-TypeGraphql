import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';

import { buildSchema } from 'type-graphql';
import { Recipe } from './models/Recipe';

async function main() {
  const schema = await buildSchema({
    resolvers: [Recipe],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log('Server is running on ' + url);
}

main();
