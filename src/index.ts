import { expressMiddleware } from '@apollo/server/express4';
import { server } from './lib/apollo';
import { init } from './lib/database';
import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { decryptBearerToken } from './util/authentication';
import { api } from './api';

init().then((async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = server(httpServer)

  await apolloServer.start();
  
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }: { req: Request, res: Response }) => ({
        authScope: decryptBearerToken(req.headers.token as string)
      }),
    }),
  );
  
  await new Promise<void>((resolve) => {
    const { SERVER_PORT } = process.env;

    api(app);
    httpServer.listen({ port: Number(SERVER_PORT) }, resolve);
    console.log(`Server ready at http://localhost:${SERVER_PORT}/graphql`);
  });
}));