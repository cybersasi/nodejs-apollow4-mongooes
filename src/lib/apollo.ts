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

export default (httpServer: any) => {
    const typeDefs = loadSchemaSync("./src/schema/**/*.graphql", {
        loaders: [new GraphQLFileLoader()],
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });


    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const server = new ApolloServer<MyContext>({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
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

    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        path: '/graphql',
    });

    const getDynamicContext = async (ctx: any, msg: any, args: any) => {
        // ctx is the graphql-ws Context where connectionParams live
        if (ctx.connectionParams.authentication) {
            const currentUser = await findUser(ctx.connectionParams.authentication);
            return { currentUser };
        }
        // Otherwise let our resolvers know we don't have a current user
        return { currentUser: null };
    };

    const serverCleanup = useServer({
        schema,
        context: async (ctx, msg, args) => {
            // You can define your own function for setting a dynamic context
            // or provide a static value
            return getDynamicContext(ctx, msg, args);
        },
        // As before, ctx is the graphql-ws Context where connectionParams live.
        onConnect: async (ctx) => {
            // Check authentication every time a client connects.
            if (tokenIsNotValid(ctx.connectionParams)) {
                // You can return false to close the connection  or throw an explicit error
                throw new Error('Auth token missing!');
            }
        },
        onDisconnect(ctx, code, reason) {
            console.log('Disconnected!');
        },
    }, wsServer);

}
