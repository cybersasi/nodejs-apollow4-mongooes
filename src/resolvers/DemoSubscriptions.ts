import { Resolvers } from './../types/types';
import { MongodbPubSub } from 'graphql-mongodb-subscriptions';

export type CommonMessageHandler = (message: any) => any;


const pubsub = new MongodbPubSub();

const SOMETHING_CHANGED_TOPIC = 'NUMBER_INCREMENTED';

const DemoSubscriptions: Resolvers = {
    Subscription: {
        numberIncremented: {
            subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
        },
    },
};

export { DemoSubscriptions }; ``