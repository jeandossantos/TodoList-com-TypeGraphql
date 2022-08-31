import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';

import { buildSchema } from 'type-graphql';
import { TaskResolver } from './resolvers/TaskResolver';
import { UserResolver } from './resolvers/UserResolver';

import { context } from './prisma';
import Container from 'typedi';

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver],
    container: Container,
  });

  const server = new ApolloServer({
    schema,
    context,
  });

  const { url } = await server.listen();

  console.log('Server is running on ' + url);
}

main();
