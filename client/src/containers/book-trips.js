import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../components/button';
import { GET_LAUNCH } from './cart-item';
import { bookTripsMutation } from '../mutations/user';

export default function BookTrips({ cartItems }) {
  const [bookTrips, { data, loading, error }] = useMutation(
    bookTripsMutation,
    {
      variables: { launchIds: cartItems },
      refetchQueries: cartItems.map(launchId => ({
        query: GET_LAUNCH,
        variables: { launchId },
      })),

      update(cache) {
        cache.writeData({ data: { cartItems: [] } });
      }
    }
  )
  return data && data.bookTrips && !data.bookTrips.success
    ? <p data-testid="message">{data.bookTrips.message}</p>
    : (
      <Button onClick={bookTrips} data-testid="book-button">
        Book All
      </Button>
    );
}