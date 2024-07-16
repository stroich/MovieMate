import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {mockListMovies} from '../../mock/MockData';
import MovieDeck from './MovieDeck';
import {useNavigation} from '@react-navigation/native';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

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

    jest.advanceTimersByTime(2000);

    const stateForSwipe = [
      {state: State.BEGAN, translationX: 0},
      {
        state: State.ACTIVE,
        translationX: 0,
      },
      {
        state: State.ACTIVE,
        translationX: 50,
      },
      {state: State.END, translationX: 50},
    ];

    await waitFor(async () => {
      await fireGestureHandler<PanGestureHandler>(
        getByGestureTestId(`panSwipe-${mockListMovies[0].imdbID}`),
        stateForSwipe,
      );

      await fireGestureHandler<PanGestureHandler>(
        getByGestureTestId(`panSwipe-${mockListMovies[1].imdbID}`),
        stateForSwipe,
      );
    });

    await waitFor(() => {
      expect(mockHandlePage).toHaveBeenCalledTimes(1);
    });

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
