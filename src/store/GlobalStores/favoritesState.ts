import {proxy, subscribe} from 'valtio';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  getFavoriteMoviesToStorage,
  isInMovieList,
  setFavoriteMoviesToStorage,
} from '../../utils/asyncStorage/asyncStorage';

interface FavoritesStateType {
  favorites: ListMoviesType;
}

interface LoadingStateType {
  loading: boolean;
}

const favoritesState = proxy<FavoritesStateType>({
  favorites: [],
});

const loadingState = proxy<LoadingStateType>({
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
  const fav = (await getFavoriteMoviesToStorage()) ?? [];
  favoritesState.favorites = fav;
};

subscribe(favoritesState, () => {
  if (!loadingState.loading) {
    setFavoriteMoviesToStorage(favoritesState.favorites);
  } else {
    loadingState.loading = false;
  }
});

export default favoritesState;
