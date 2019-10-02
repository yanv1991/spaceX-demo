import gql from "graphql-tag";

export const bookTripsMutation = gql`
    mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
        success
        message
        launches {
        id
        isBooked
        }
    }
    }
`;

export const cancelTripMutation = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export const toggleCartMutation = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;