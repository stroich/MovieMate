import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardType, ListMoviesType} from '../../types/moviesTypes';

export async function setItem<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}

export async function getFavoriteMovies(): Promise<ListMoviesType | null> {
  try {
    const value = await AsyncStorage.getItem('favorites');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addFavoriteMovie(movie: CardType) {
  try {
    const favorites = (await getFavoriteMovies()) ?? [];
    const hasMovie = favorites.some(item => movie.imdbID === item.imdbID);
    if (!hasMovie) {
      const updateMovie = [...favorites, movie];
      await setItem('favorites', updateMovie);
    }
  } catch (error) {
    console.error(error);
  }
}
