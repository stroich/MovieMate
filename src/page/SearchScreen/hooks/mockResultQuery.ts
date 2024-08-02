import {mockListMoviesWithPages} from '@mock/MockData';

export const mockUseQueryWithEmpty = {
  data: undefined,
  isLoading: false,
  error: null,
  fetchNextPage: jest.fn(),
};

export const mockUseQueryWithMovies = {
  data: mockListMoviesWithPages,
  isLoading: false,
  error: null,
  fetchNextPage: jest.fn(),
};

export const mockUseQueryWithLoading = {
  data: undefined,
  isLoading: true,
  error: null,
  fetchNextPage: jest.fn(),
};

const error = new Error('Test error message');

export const mockUseQueryWithError = {
  data: undefined,
  isLoading: false,
  error: error,
  fetchNextPage: jest.fn(),
};
