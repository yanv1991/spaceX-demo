import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { getLaunchDetailsQuery } from '../queries/launch';
import Button from '../components/button';
import { cancelTripMutation, toggleCartMutation } from '../mutations/user';

export default function ActionButton({ isBooked, id, isInCart }) {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? cancelTripMutation : toggleCartMutation,
    {
      variables: { launchId: id },
      refetchQueries: [
        {
          query: getLaunchDetailsQuery,
          variables: { launchId: id },
        },
      ]
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error ocÍcurred</p>;

  return (
    <div>
      <Button
        onClick={mutate}
        isBooked={isBooked}
        data-testid={'action-button'}
      >
        {isBooked
          ? 'Cancel This Trip'
          : isInCart
          ? 'Remove from Cart'
          : 'Add to Cart'}
      </Button>
    </div>
  );
}