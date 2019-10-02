import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash.merge';

import userResolver from './user/user.resolver';
import launchResolver from './launch/launch.resolver';

import userTypeDef from './user/user.typeDef';
import launchTypeDef from './launch/launch.typeDef';

const baseTypeDef = /* GraphQL */`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const typeDefs = [
  baseTypeDef,
  userTypeDef,
  launchTypeDef,
];

const resolvers = merge(
  userResolver,
  launchResolver,
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;