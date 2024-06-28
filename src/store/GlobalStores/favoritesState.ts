import {proxy} from 'valtio';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  getFavoriteMoviesToStorage,
  isInMovieList,
} from '../../utils/asyncStorage/asyncStorage';

export interface FavoritesStateType {
  favorites: ListMoviesType;
  loading: boolean;
  addFavorites: (movie: CardType) => void;
  removeFavorites: (id: string) => void;
  toggleFavorites: (movie: CardType) => void;
}

const favoritesState = proxy<FavoritesStateType>({
  favorites: [],
  loading: true,
  addFavorites: movie => {
    const hasMovie = isInMovieList(favoritesState.favorites, movie.imdbID);
    if (!hasMovie) {
      favoritesState.favorites = [...favoritesState.favorites, movie];
    }
  },
  removeFavorites: id => {
    favoritesState.favorites = favoritesState.favorites.filter(
      item => id !== item.imdbID,
    );
  },
  toggleFavorites: (movie: CardType) => {
    if (isInMovieList(favoritesState.favorites, movie.imdbID)) {
      favoritesState.favorites = favoritesState.favorites.filter(
        item => movie.imdbID !== item.imdbID,
      );
    } else {
      favoritesState.favorites = [...favoritesState.favorites, movie];
    }
  },
});

export const getFavorites = async () => {
  const fav = (await getFavoriteMoviesToStorage()) ?? [];
  favoritesState.favorites = fav;
};

export default favoritesState;
