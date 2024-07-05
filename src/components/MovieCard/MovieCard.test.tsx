import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {MovieCard} from './MovieCard';
import {mockListMovies} from '../../mock/MockData';
import {removeFavorites} from '../../store/GlobalStores/favoritesState';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    const navigation = {
      navigate: mockNavigate,
    };
    return navigation;
  },
}));

jest.mock('../../store/GlobalStores/favoritesState', () => ({
  removeFavorites: jest.fn(),
}));

jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');

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
    const image = getByTestId('Poster-tt1201607');
    expect(image.props.source).toEqual({
      uri: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    });
    const removeButton = queryByTestId('RemoveButton-tt1201607');
    expect(removeButton).toBeNull();
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
    const cardButton = getByTestId('Button-tt1201607');
    fireEvent.press(cardButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('Details', {itemId: 'tt1201607'});
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
    getByText('Harry Potter and the Deathly Hallows: Part 2');
    const image = getByTestId('Poster-tt1201607');
    expect(image.props.source).toEqual({
      uri: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    });
    getByTestId('RemoveButton-tt1201607');
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
    const removeButton = getByTestId('RemoveButton-tt1201607');
    fireEvent.press(removeButton);
    expect(removeFavorites).toHaveBeenCalledWith('tt1201607');
  });
});
