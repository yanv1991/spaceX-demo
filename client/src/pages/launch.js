import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Loading, Header, LaunchDetail } from "../components";
import { ActionButton } from "../containers";
import { getLaunchDetailsQuery } from "../queries/launch"

export default function Launch({ launchId }) {
  const { data, loading, error } = useQuery(getLaunchDetailsQuery, {
    variables: { launchId }
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <Fragment>
      <Header image={data.launch.mission.missionPatch}>
        {data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </Fragment>
  );
}
