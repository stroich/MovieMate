import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CardMovieDescription from './CardMovieDescription';
import {mockCardDetails} from '../../../mock/MockData';
import '../../../utils/asyncStorage/asyncStorage';
import * as favoritesState from '../../../store/GlobalStores/favoritesState';

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
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('render CardMovieDescription', () => {
    const {getByTestId, debug} = render(
      <CardMovieDescription data={mockCardDetails} />,
    );
    getByTestId('DetailsPage-Title-tt2199571');
    const view = getByTestId('DetailsPage-AnimatedView-tt2199571');
    debug();
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
});
