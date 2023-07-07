// npm install @apollo/server express graphql cors body-parser

import { expressMiddleware } from '@apollo/server/express4';
import { server } from './lib/apollo';
import { init } from "./lib/database";
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

init()
.then(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const Apollo = server(httpServer)
  await Apollo.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(Apollo, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
});

