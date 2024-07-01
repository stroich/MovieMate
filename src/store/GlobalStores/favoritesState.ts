import {proxy, subscribe} from 'valtio';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  getFavoriteMoviesToStorage,
  isInMovieList,
  setFavoriteMoviesToStorage,
} from '../../utils/asyncStorage/asyncStorage';

export interface FavoritesStateType {
  favorites: ListMoviesType;
  loading: boolean;
}

const favoritesState = proxy<FavoritesStateType>({
  favorites: [],
  loading: true,
});

export const addFavorites = (movie: CardType) => {
  const hasMovie = isInMovieList(favoritesState.favorites, movie.imdbID);
  if (!hasMovie) {
    favoritesState.favorites = [...favoritesState.favorites, movie];
  }
};
export const removeFavorites = (id: string) => {
  favoritesState.favorites = favoritesState.favorites.filter(
    item => id !== item.imdbID,
  );
};

export const toggleFavorites = (movie: CardType) => {
  if (isInMovieList(favoritesState.favorites, movie.imdbID)) {
    favoritesState.favorites = favoritesState.favorites.filter(
      item => movie.imdbID !== item.imdbID,
    );
  } else {
    favoritesState.favorites = [...favoritesState.favorites, movie];
  }
};

export const getFavorites = async () => {
  favoritesState.loading = false;
  const fav = (await getFavoriteMoviesToStorage()) ?? [];
  favoritesState.favorites = fav;
};

subscribe(favoritesState, () => {
  let unsubscribe;

  unsubscribe = subscribe(favoritesState, () => {
    const isEmpty = favoritesState.favorites.length === 0;
    if (!isEmpty) {
      setFavoriteMoviesToStorage(favoritesState.favorites);
    }
  });

  if (favoritesState.loading) {
    unsubscribe();
  }
});

export default favoritesState;