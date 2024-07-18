import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {mockListMovies} from '../../mock/MockData';
import {useNavigation} from '@react-navigation/native';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getMovie} from '../../utils/api/apiMovies';
import MainScreen from './MainScreen';
import {MovieDeckProps} from '../../components/MovieDeck/MovieDeck';
import * as MovieDeck from '../../components/MovieDeck/MovieDeck.tsx';

jest.mock('@tanstack/react-query');
const mockedUseQuery = jest.mocked(useQuery);

let mockedMovieDeck = jest.spyOn(MovieDeck, 'default');

jest.mock('../../utils/api/apiMovies');
const mockApi = jest.mocked(getMovie);

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('MainScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should renders loading', () => {
    const mockUseQuery = {
      data: undefined,
      isLoading: true,
      error: null,
    };
    mockedUseQuery.mockReturnValueOnce(
      mockUseQuery as UseQueryResult<unknown, unknown>,
    );
    const {getByTestId} = render(<MainScreen />);
    getByTestId('loading');
  });

  test('should renders error', () => {
    const error = new Error('Test error message');
    const mockUseQuery = {
      data: undefined,
      isLoading: true,
      error: error,
    };
    mockedUseQuery.mockReturnValueOnce(
      mockUseQuery as UseQueryResult<unknown, unknown>,
    );
    const {getByText} = render(<MainScreen />);
    getByText('Test error message');
  });

  test('should renders movies', () => {
    const mockUseQuery = {
      data: mockListMovies,
      isLoading: true,
      error: null,
    };
    mockedUseQuery.mockReturnValue(
      mockUseQuery as UseQueryResult<unknown, unknown>,
    );
    const {getByTestId} = render(<MainScreen />);
    getByTestId(`Main-AnimatedCard-${mockListMovies[0].imdbID}`);
  });

  test('should renders new movies by changing page', async () => {
    mockedMovieDeck.mockImplementation(({handlePage}: MovieDeckProps) => {
      const {Button} = require('react-native');
      return <Button title="button" testID="changePage" onPress={handlePage} />;
    });

    const mockUseQuery = {
      data: [],
      isLoading: true,
      error: null,
    };
    mockedUseQuery.mockReturnValue(
      mockUseQuery as UseQueryResult<unknown, unknown>,
    );
    const {getByRole} = render(<MainScreen />);
    fireEvent.press(getByRole('button'));
    await waitFor(() => {
      expect(mockedUseQuery).toHaveBeenCalledTimes(2);
    });
  });

  test('should call api', () => {
    const mockUseQuery = {
      data: mockListMovies,
      isLoading: true,
      error: null,
    };
    mockedUseQuery.mockImplementation(() => {
      mockApi(mockListMovies[0].imdbID);
      return mockUseQuery as UseQueryResult<unknown, unknown>;
    });
    render(<MainScreen />);
    expect(mockApi).toHaveBeenCalledTimes(1);
  });
});
