import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '../resolver';

interface ApolloServerContext {
  token?: string;
}

const typeDefs = loadSchemaSync("graphql/**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.

export const server = (httpServer: any) => new ApolloServer<ApolloServerContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer })
  ],
});
