import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {render, waitFor} from '@testing-library/react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';

import MovieDeck from '@components/MovieDeck/MovieDeck';
import {mockListMovies} from '@mock/MockData';
import {stateForSwipe} from '@mock/stateForSwipe';

jest.mock('../../utils/asyncStorage/asyncStorage', () => ({
  getFavoriteMoviesToStorage: jest.fn(),
  setFavoriteMoviesToStorage: jest.fn(),
}));

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('renders MovieDeck', () => {
  it('should render MovieDeck', async () => {
    const {getAllByRole} = render(
      <MovieDeck data={mockListMovies} handlePage={() => {}} />,
    );
    const textElements = getAllByRole('text');
    expect(textElements).toHaveLength(2);
  });

  it('should updates numberOfCards correctly on button press', async () => {
    jest.useFakeTimers();
    const mockHandlePage = jest.fn();
    render(<MovieDeck data={mockListMovies} handlePage={mockHandlePage} />);

    jest.advanceTimersByTime(1000);

    fireGestureHandler<PanGestureHandler>(
      getByGestureTestId(`panSwipe-${mockListMovies[0].imdbID}`),
      stateForSwipe,
    );

    fireGestureHandler<PanGestureHandler>(
      getByGestureTestId(`panSwipe-${mockListMovies[1].imdbID}`),
      stateForSwipe,
    );

    await waitFor(() => {
      expect(mockHandlePage).toHaveBeenCalledTimes(1);
    });

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
