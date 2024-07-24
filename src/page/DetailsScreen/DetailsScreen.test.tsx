import React from 'react';

import {RouteProp, useNavigation} from '@react-navigation/native';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {render} from '@testing-library/react-native';

import {mockCardDetails} from '@mock/MockData';
import DetailsScreen from '@page/DetailsScreen/DetailsScreen';
import {RootStackParamList} from '@type/navigationTypes';
import {getMovie} from '@utils/api/apiMovies';

jest.mock('@tanstack/react-query');
const mockedUseQuery = jest.mocked(useQuery);

jest.mock('../../utils/api/apiMovies');
const mockApi = jest.mocked(getMovie);

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const route: RouteProp<RootStackParamList, 'Details'> = {
  key: 'Details',
  name: 'Details',
  params: {itemId: mockCardDetails.imdbID},
  path: undefined,
};

describe('DetailsScreen', () => {
  test('should renders loading', () => {
    const mockUseQuery = {
      data: undefined,
      isLoading: true,
      error: null,
    };
    mockedUseQuery.mockReturnValueOnce(
      mockUseQuery as UseQueryResult<unknown, unknown>,
    );
    const {getByTestId} = render(
      <DetailsScreen route={route} navigation={mockNavigation} />,
    );
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
    const {getByText} = render(
      <DetailsScreen route={route} navigation={mockNavigation} />,
    );
    getByText('Test error message');
  });

  test('should renders movies', () => {
    const mockUseQuery = {
      data: mockCardDetails,
      isLoading: true,
      error: null,
    };
    mockedUseQuery.mockReturnValue(
      mockUseQuery as UseQueryResult<unknown, unknown>,
    );
    const {getByTestId} = render(
      <DetailsScreen route={route} navigation={mockNavigation} />,
    );
    getByTestId(`DetailsPage-AnimatedView-${mockCardDetails.imdbID}`);
  });

  test('should call api', () => {
    const mockUseQuery = {
      data: mockCardDetails,
      isLoading: true,
      error: null,
    };
    mockedUseQuery.mockImplementation(() => {
      mockApi(mockCardDetails.imdbID);
      return mockUseQuery as UseQueryResult<unknown, unknown>;
    });
    render(<DetailsScreen route={route} navigation={mockNavigation} />);
    expect(mockApi).toHaveBeenCalledTimes(1);
  });
});
