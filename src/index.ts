import { ApolloServer } from '@apollo/server';
import { httpContext, wsContext } from './lib/apolloContext';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import resolvers from './resolvers'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

(async () => {

  interface MyContext {
    token?: string;
  }

  const typeDefs = loadSchemaSync("./src/schema/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });
  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({
    schema,
    context: async (ctx, msg, args) => wsContext(ctx, msg, args),
    // As before, ctx is the graphql-ws Context where connectionParams live.
    onConnect: async (ctx) => {
      // Check authentication every time a client connects.
      console.log("msg onConnect", ctx.connectionParams)
      // if (tokenIsNotValid(ctx.connectionParams)) {
      //     // You can return false to close the connection  or throw an explicit error
      //     throw new Error('Auth token missing!');
      // }
    },
    onDisconnect(ctx, code, reason) {
      console.log('Disconnected!');
    },
  }, wsServer);

  // Set up ApolloServer.
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server, {
    context: async ({ req }) => httpContext(req)
  }

  ));

  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
  });
})();