import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Loading, Header, LaunchTile } from '../components';
import { getMyTrips } from '../queries/user';

export default function Profile() {
  const { data, loading, error } = useQuery(
    getMyTrips,
    { fetchPolicy: "network-only" }
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </Fragment>
  );
}