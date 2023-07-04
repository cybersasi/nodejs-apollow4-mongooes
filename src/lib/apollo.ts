import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import resolvers from './../resolvers'

import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';


interface MyContext {
    token?: string;
}


const typeDefs = loadSchemaSync("./src/schema/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({ typeDefs, resolvers });


// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
export const server = (httpServer: any) => new ApolloServer<MyContext>({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ],
});
