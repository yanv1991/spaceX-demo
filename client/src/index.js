import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import { resolvers, typeDefs } from "./local-schema";
import Pages from "./pages";
import Login from "./pages/login";
import injectStyles from "./styles";
import isLoggedInQuery from "./queries/user";

const cache = new InMemoryCache();
const link = new HttpLink({
  headers: {
    authorization: localStorage.getItem("token")
  },
  uri: "http://localhost:4000/"
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: []
  }
});

function IsLoggedIn() {
  const { data } = useQuery(isLoggedInQuery);
  return data.isLoggedIn ? <Pages /> : <Login />;
}

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);

/*
client
  .query({
    query: gql`
      query GetLaunch {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result));
  */
