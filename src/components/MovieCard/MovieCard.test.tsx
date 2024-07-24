import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';

import {MovieCard} from '@components/MovieCard/MovieCard';
import {mockListMovies} from '@mock/MockData';
import {removeFavorites} from '@store/GlobalStores/favoritesState';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({navigate: mockNavigate});

jest.mock('../../store/GlobalStores/favoritesState', () => ({
  removeFavorites: jest.fn(),
}));

describe('renders MovieCard', () => {
  it('should render MovieCard without remove button', async () => {
    const {getByTestId, getByText, queryByTestId} = render(
      <MovieCard
        data={mockListMovies[0]}
        width={200}
        height={300}
        hasDeleteButton={false}
      />,
    );
    getByText('Harry Potter and the Deathly Hallows: Part 2');
    const image = getByTestId(`Poster-${mockListMovies[0].imdbID}`);
    expect(image.props.source).toEqual({
      uri: mockListMovies[0].Poster,
    });
    const removeButton = queryByTestId(
      `RemoveButton-${mockListMovies[0].imdbID}`,
    );
    expect(removeButton).toBeNull();
  });

  it('the movie card should not be drawn in the absence of a poster', async () => {
    const {queryByText} = render(
      <MovieCard
        data={mockListMovies[2]}
        width={200}
        height={300}
        hasDeleteButton={false}
      />,
    );
    const titleButton = queryByText(mockListMovies[2].Title);
    expect(titleButton).toBeNull();
  });

  it('should go to details page', async () => {
    const {getByTestId} = render(
      <MovieCard
        data={mockListMovies[0]}
        width={200}
        height={300}
        hasDeleteButton={false}
      />,
    );
    const cardButton = getByTestId(`Button-${mockListMovies[0].imdbID}`);
    fireEvent.press(cardButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Details', {
      itemId: mockListMovies[0].imdbID,
    });
  });

  it('should render MovieCard with remove button', async () => {
    const {getByTestId, getByText} = render(
      <MovieCard
        data={mockListMovies[0]}
        width={200}
        height={300}
        hasDeleteButton={true}
      />,
    );
    getByText(mockListMovies[0].Title);
    const image = getByTestId(`Poster-${mockListMovies[0].imdbID}`);
    expect(image.props.source).toEqual({
      uri: mockListMovies[0].Poster,
    });
    getByTestId(`RemoveButton-${mockListMovies[0].imdbID}`);
  });

  it('should delete the movie when you click on the delete button', async () => {
    const {getByTestId} = render(
      <MovieCard
        data={mockListMovies[0]}
        width={200}
        height={300}
        hasDeleteButton={true}
      />,
    );
    const removeButton = getByTestId(
      `RemoveButton-${mockListMovies[0].imdbID}`,
    );
    fireEvent.press(removeButton);
    expect(removeFavorites).toHaveBeenCalledWith(mockListMovies[0].imdbID);
  });
});
