import AsyncStorage from '@react-native-async-storage/async-storage';

import {ListMoviesType} from '@type/moviesTypes';

export async function getFavoriteMoviesToStorage(): Promise<ListMoviesType | null> {
  const value = await AsyncStorage.getItem('favorites');
  return value ? JSON.parse(value) : null;
}

export async function setFavoriteMoviesToStorage(
  ListOfMovies: ListMoviesType,
): Promise<void> {
  const newListOfMovies = ListOfMovies.map(({Poster, Title, imdbID}) => ({
    Poster,
    Title,
    imdbID,
  }));
  await AsyncStorage.setItem('favorites', JSON.stringify(newListOfMovies));
}
