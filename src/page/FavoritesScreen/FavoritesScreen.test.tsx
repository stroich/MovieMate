import React from 'react';
import {act, render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import FavoritesScreen from './FavoritesScreen';
import favoritesState from '../../store/GlobalStores/favoritesState';
import {mockListMovies} from '../../mock/MockData';

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
