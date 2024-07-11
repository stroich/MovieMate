import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {mockListMovies} from '../../mock/MockData';
import MovieDeck from './MovieDeck';

export type mockAnimatedCardProps = {
  onChangeNumberOfCard: () => void;
};

jest.mock('./components/AnimatedMovieCard', () => {
  const {Button} = require('react-native');
  return {
    AnimatedMovieCard: ({onChangeNumberOfCard}: mockAnimatedCardProps) => (
      <Button title="Card" onPress={onChangeNumberOfCard} />
    ),
  };
});

describe('renders MovieDeck', () => {
  it('should render MovieDeck', async () => {
    const {getAllByRole} = render(
      <MovieDeck data={mockListMovies} handlePage={() => {}} />,
    );
    const textElements = getAllByRole('button');
    expect(textElements).toHaveLength(2);
  });

  it('should updates numberOfCards correctly on button press', async () => {
    const mockHandlePage = jest.fn();
    const {getAllByRole} = render(
      <MovieDeck data={mockListMovies} handlePage={mockHandlePage} />,
    );
    const cards = getAllByRole('button');
    fireEvent.press(cards[0]);
    fireEvent.press(cards[1]);

    expect(mockHandlePage).toHaveBeenCalledTimes(1);
  });
});
