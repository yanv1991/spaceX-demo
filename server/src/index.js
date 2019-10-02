const { ApolloServer } = require("apollo-server");

import { createStore, getUserContext } from './utils'
const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");
const schema = require("./schema")

const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    return getUserContext(req, store);
  },
  schema,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
