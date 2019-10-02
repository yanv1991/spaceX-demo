import gql from "graphql-tag";

import { LAUNCH_TILE_DATA } from './launch'

const isLoggedIn = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const getMyTrips = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export const loginQuery = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export const getCartItems = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default isLoggedIn;