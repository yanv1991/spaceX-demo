import { gql } from "apollo-server";

const typeDef = gql`
  extend type Query {
    # Queries for the current user
    me: User
  }

  extend type Mutation {
    # if false, booking trips failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

export default typeDef;