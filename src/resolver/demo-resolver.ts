import { AuthenticationError, ApolloError } from 'apollo-server-express';
import { Resolvers } from '../schema';
import mongoose from 'mongoose';
import _ from 'lodash';

const ObjectId = mongoose.Types.ObjectId;

export const DemoResolver: Resolvers = {
  Query: {
    getDemoList: async (parent: any, args: any, context: any, info: any) => {
      return { result: [], totalResult: 0 };
    }
  },
  Mutation: {
    createDemo: async (parent: any, args: any, context: any, info: any) => {
      return null;
    },
  },
};