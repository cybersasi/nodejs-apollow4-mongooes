import { CreateUserInput, MutationResolvers, QueryResolvers, Resolvers } from './../types/types';

const findTest: QueryResolvers['test'] = () => {
    return [
        {
            id: '1',
            testName: 'Lannister',
        },
        {
            id: '12',
            testName: 'no name',
        },
    ];
};

const DemoResolversTwo: Resolvers = {

    Query: {
        test: findTest
    }
};

export { DemoResolversTwo };