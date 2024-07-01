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

const favoritesState = proxy<FavoritesStateType>({
  favorites: [],
});

let loading = true;

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

export const loadFavorites = async () => {
  const fav = (await getFavoriteMoviesToStorage()) ?? [];
  favoritesState.favorites = fav;
  loading = false;
};

loadFavorites();

subscribe(favoritesState, () => {
  if (!loading) {
    setFavoriteMoviesToStorage(favoritesState.favorites);
  }
});

export default favoritesState;
