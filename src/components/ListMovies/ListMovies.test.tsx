import React from 'react';
import {render, userEvent} from '@testing-library/react-native';
import List from './ListMovies';

import {CardType} from '../../types/moviesTypes';
import {mockListMovies} from '../../mock/MockData';

type mockProps = {
  data: CardType;
};

jest.mock('../MovieCard/MovieCard', () => {
  const {Text} = require('react-native');
  return {
    MovieCard: ({data}: mockProps) => <Text>{data.Title}</Text>,
  };
});

describe('renders ListMovies', () => {
  it('should render ListMovies with an empty list', async () => {
    const mockOnEndReached = jest.fn();
    const {getByText} = render(
      <List data={[]} onEndReached={mockOnEndReached} />,
    );
    getByText('Movies not found!');
  });

  it('should render ListMovies with movie titles', async () => {
    const mockOnEndReached = jest.fn();
    const {queryByText} = render(
      <List data={mockListMovies} onEndReached={mockOnEndReached} />,
    );
    expect(
      mockListMovies.map(movie => !!queryByText(movie.Title)),
    ).toStrictEqual(mockListMovies.map(() => true));
  });

  it('should render ListMovies with additional movie downloads when scrolling', async () => {
    const mockOnEndReached = jest.fn();
    const {getByTestId} = render(
      <List data={mockListMovies} onEndReached={mockOnEndReached} />,
    );
    const flatlist = getByTestId('ListOfMovies');
    await userEvent.scrollTo(flatlist, {
      y: 480,
      contentSize: {height: 480, width: 240},
      layoutMeasurement: {height: 480, width: 240},
    });

    expect(mockOnEndReached).toHaveBeenCalledTimes(1);
  });
});
