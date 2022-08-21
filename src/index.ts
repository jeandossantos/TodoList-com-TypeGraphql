import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';

import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  console.log('Server is running on ' + url);
}

main();
