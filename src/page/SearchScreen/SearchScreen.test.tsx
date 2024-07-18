import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import SearchScreen from './SearchScreen';
import {useFetchMovies} from './hooks/useFetchMovies.ts';
import {
  mockUseQueryWithEmpty,
  mockUseQueryWithError,
  mockUseQueryWithLoading,
  mockUseQueryWithMovies,
} from './hooks/mockResultQuery.ts';
import {mockListMovies} from '../../mock/MockData.ts';

jest.mock('./hooks/useFetchMovies.ts');
const mockedUseFetchMovies = jest.mocked(useFetchMovies);
mockedUseFetchMovies.mockReturnValueOnce(mockUseQueryWithEmpty);

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('FavoritesScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders screen with loading', () => {
    mockedUseFetchMovies.mockReturnValue(mockUseQueryWithLoading);
    const {getByPlaceholderText, getByTestId} = render(<SearchScreen />);
    const input = getByPlaceholderText('Search');
    fireEvent(input, 'submitEditing', {nativeEvent: {text: 'text'}});
    getByTestId('loading');
  });

  it('should renders screen with error', () => {
    mockedUseFetchMovies.mockReturnValue(mockUseQueryWithError);
    const {getByPlaceholderText, getByText} = render(<SearchScreen />);
    const input = getByPlaceholderText('Search');
    fireEvent(input, 'submitEditing', {nativeEvent: {text: 'text'}});
    getByText('Test error message');
  });

  it('should renders screen with movies', () => {
    mockedUseFetchMovies.mockReturnValue(mockUseQueryWithMovies);
    const {getByPlaceholderText, queryByText} = render(<SearchScreen />);
    const input = getByPlaceholderText('Search');
    fireEvent(input, 'submitEditing', {nativeEvent: {text: 'text'}});
    expect(queryByText(mockListMovies[0].Title)).toBeTruthy();
    expect(queryByText(mockListMovies[1].Title)).toBeTruthy();
    expect(queryByText(mockListMovies[2].Title)).toBeFalsy();
  });
});
