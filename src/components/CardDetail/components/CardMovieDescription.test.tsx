import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CardMovieDescription from './CardMovieDescription';
import {mockCardDetails} from '../../../mock/MockData';
import '../../../utils/asyncStorage/asyncStorage';
import * as favoritesState from '../../../store/GlobalStores/favoritesState';
import {PanGesture, State} from 'react-native-gesture-handler';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';

jest.mock('../../../utils/asyncStorage/asyncStorage', () => ({
  getFavoriteMoviesToStorage: jest.fn(),
  setFavoriteMoviesToStorage: jest.fn(),
}));

const mockedToggleFavorites = jest.spyOn(favoritesState, 'toggleFavorites');

const style = {
  height: 280,
  backgroundColor: '#282c34cc',
};

describe('renders CardMovieDescription', () => {
  it('render CardMovieDescription', () => {
    const {getByTestId} = render(
      <CardMovieDescription data={mockCardDetails} />,
    );
    getByTestId('DetailsPage-Title-tt2199571');
    const view = getByTestId('DetailsPage-AnimatedView-tt2199571');
    expect(view).toHaveAnimatedStyle(style);
  });

  it('should run toggleFavorites when heart button is pressed', () => {
    const {getByTestId} = render(
      <CardMovieDescription data={mockCardDetails} />,
    );
    const button = getByTestId('DetailsPage-FavoritesButton-tt2199571');
    fireEvent.press(button);
    expect(mockedToggleFavorites).toHaveBeenCalled();
  });

  describe('check animation for CardMovieDescription', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should change the height by 300 when onFinalize is called', async () => {
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

      jest.advanceTimersByTime(2000);

      expect(
        getByTestId('DetailsPage-AnimatedView-tt2199571'),
      ).toHaveAnimatedStyle({
        height: 300,
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

      jest.advanceTimersByTime(500);

      expect(
        getByTestId('DetailsPage-AnimatedView-tt2199571'),
      ).not.toHaveAnimatedStyle({
        height: 250,
      });
    });
  });
});
