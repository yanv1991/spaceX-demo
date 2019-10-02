import gql from "graphql-tag";

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const getLaunchesQuery = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore

      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export const getLaunchDetailsQuery = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }

      ...LaunchTile
    }
  }

  ${LAUNCH_TILE_DATA}
`;