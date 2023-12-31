// npm install @apollo/server express graphql cors body-parser
// import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { server } from './lib/apollo';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import resolvers from './resolvers'

import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'



interface MyContext {
  token?: string;
}

(async () => {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // const typeDefs = loadSchemaSync("./src/schema/**/*.graphql", {
  //   loaders: [new GraphQLFileLoader()],
  // });


  // // Same ApolloServer initialization as before, plus the drain plugin
  // // for our httpServer.
  // const server = new ApolloServer<MyContext>({
  //   typeDefs,
  //   resolvers,
  //   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // });
  const Apollo = server(httpServer)

  await Apollo.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(Apollo, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
})();