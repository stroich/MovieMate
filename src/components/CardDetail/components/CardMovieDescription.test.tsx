import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CardMovieDescription from './CardMovieDescription';
import {mockCardDetails} from '../../../mock/MockData';
import '../../../utils/asyncStorage/asyncStorage';
import {PanGesture, State} from 'react-native-gesture-handler';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';
import favoritesState from '../../../store/GlobalStores/favoritesState';

jest.mock('../../../utils/asyncStorage/asyncStorage', () => ({
  getFavoriteMoviesToStorage: jest.fn(),
  setFavoriteMoviesToStorage: jest.fn(),
}));

const style = {
  height: 280,
  backgroundColor: '#282c34cc',
};

describe('renders CardMovieDescription', () => {
  it('render CardMovieDescription', () => {
    const {getByTestId} = render(
      <CardMovieDescription data={mockCardDetails} />,
    );
    getByTestId(`DetailsPage-Title-${mockCardDetails.imdbID}`);
    const view = getByTestId(
      `DetailsPage-AnimatedView-${mockCardDetails.imdbID}`,
    );
    expect(view).toHaveAnimatedStyle(style);
  });

  it('should run toggleFavorites when heart button is pressed', () => {
    const {getByTestId} = render(
      <CardMovieDescription data={mockCardDetails} />,
    );
    const button = getByTestId(
      `DetailsPage-FavoritesButton-${mockCardDetails.imdbID}`,
    );
    waitFor(() => {
      expect(favoritesState.favorites).toEqual([]);
    });

    fireEvent.press(button);
    waitFor(() => {
      expect(favoritesState.favorites).toEqual([mockCardDetails]);
    });
  });

  describe('check animation for CardMovieDescription', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should change the height by 280 when onFinalize is called', async () => {
      const {getByTestId} = render(
        <CardMovieDescription data={mockCardDetails} />,
      );

      fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
        {state: State.BEGAN, x: 0, y: 10},
        {state: State.ACTIVE, x: 1, y: 11},
        {x: 2, y: 12},
        {x: 3, y: 13},
        {state: State.END, x: 4, y: 14},
      ]);

      jest.advanceTimersByTime(300);

      expect(
        getByTestId(`DetailsPage-AnimatedView-${mockCardDetails.imdbID}`),
      ).toHaveAnimatedStyle({
        height: 280,
      });
    });

    it('should change the height when onChange is called', async () => {
      const {getByTestId} = render(
        <CardMovieDescription data={mockCardDetails} />,
      );

      fireGestureHandler<PanGesture>(getByGestureTestId('pan'), [
        {state: State.BEGAN, x: 0, translationY: 0},
        {state: State.ACTIVE, x: 0, translationY: -10},
        {state: State.ACTIVE, x: 0, y: 50, translationY: -40},
      ]);

      jest.advanceTimersByTime(300);

      expect(
        getByTestId(`DetailsPage-AnimatedView-${mockCardDetails.imdbID}`),
      ).not.toHaveAnimatedStyle({
        height: 250,
      });
    });
  });
});
