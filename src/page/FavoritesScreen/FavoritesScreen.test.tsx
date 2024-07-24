import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {act, render} from '@testing-library/react-native';

import {mockListMovies} from '@mock/MockData';
import FavoritesScreen from '@page/FavoritesScreen/FavoritesScreen';
import favoritesState from '@store/GlobalStores/favoritesState';

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('FavoritesScreen', () => {
  it('should renders screen without movies', () => {
    const {getByText} = render(<FavoritesScreen />);
    getByText('In favorites');
    getByText(' Movies not found!');
  });

  it('should renders screen with movies', async () => {
    const movie = mockListMovies[0];
    favoritesState.favorites = [movie];
    await act(() => Promise.resolve());
    const {getByText} = render(<FavoritesScreen />);
    getByText('In favorites');
    getByText(movie.Title);
  });
});
