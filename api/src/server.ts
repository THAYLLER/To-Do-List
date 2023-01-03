import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from 'type-graphql';
import path from 'node:path';

import { ToDoResolver } from "./resouvers/todo-resolvers";

async function bootstrap(){
  const schema = await buildSchema({
      resolvers:[
        ToDoResolver,
      ],
      emitSchemaFile:path.resolve(__dirname, 'schema.gql')
  })

  const server = new ApolloServer({
      formatError: (error) => error, 
      schema
  });

  const { url } = await server.listen();

  console.log(`🚀 HTTP server running on ${url} `);

};

bootstrap();
