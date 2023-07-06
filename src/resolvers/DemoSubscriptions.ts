import { Resolvers } from './../types/types';
import { MongodbPubSub } from 'graphql-mongodb-subscriptions'; // in production use this 
import { PubSub } from 'graphql-subscriptions';

export type CommonMessageHandler = (message: any) => any;

const pubsub = new PubSub();

interface numberIncremented {
    numberIncremented?: number
}
const SOMETHING_CHANGED_TOPIC = 'NUMBER_INCREMENTED';


const DemoSubscriptions: Resolvers = {
    Subscription: {
        // numberIncremented: {
        //     subscribe: () => pubsub.asyncIterator<numberIncremented>('NUMBER_INCREMENTED'),
        // },
        // commentAdded: {
        //     subscribe: withFilter(
        //         () => pubsub.asyncIterator('COMMENT_ADDED'),
        //         (payload, variables) => {
        //             // Only push an update if the comment is on
        //             // the correct repository for this operation
        //             return (
        //                 payload.commentAdded.repository_name === variables.repoFullName
        //             );
        //         },
        //     ),
        // },
    },
};

export { DemoSubscriptions }; 