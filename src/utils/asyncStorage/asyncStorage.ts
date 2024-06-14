import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardType, ListMoviesType} from '../../types/moviesTypes';

export async function setItem<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

export const isInMovieList = (favorites: ListMoviesType, imdbID: string) =>
  favorites.some(item => imdbID === item.imdbID);

export async function getFavoriteMoviesToStorage(): Promise<ListMoviesType | null> {
  try {
    const value = await AsyncStorage.getItem('favorites');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addFavoriteMovieToStorage(movie: CardType) {
  try {
    const favorites = (await getFavoriteMoviesToStorage()) ?? [];
    const hasMovie = isInMovieList(favorites, movie.imdbID);
    if (!hasMovie) {
      const updateMovie = [...favorites, movie];
      await setItem('favorites', updateMovie);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function removeFavoriteMovie(imdbID: string) {
  try {
    const favorites = (await getFavoriteMoviesToStorage()) ?? [];
    const updateMovie = favorites.filter(item => imdbID !== item.imdbID);
    await setItem('favorites', updateMovie);
  } catch (error) {
    console.error(error);
  }
}