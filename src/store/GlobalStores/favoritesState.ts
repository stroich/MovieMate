import {proxy, subscribe} from 'valtio';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  getFavoriteMoviesToStorage,
  setFavoriteMoviesToStorage,
} from '../../utils/asyncStorage/asyncStorage';
import {isInMovieList} from '../../utils/helpers';

interface FavoritesStateType {
  favorites: ListMoviesType;
}

const favoritesState = proxy<FavoritesStateType>({
  favorites: [],
});

let loading = true;

export const addFavorites = (movie: CardType) => {
  loading = false;
  const hasMovie = isInMovieList(favoritesState.favorites, movie.imdbID);
  if (!hasMovie) {
    favoritesState.favorites = [...favoritesState.favorites, movie];
  }
};
export const removeFavorites = (id: string) => {
  loading = false;
  favoritesState.favorites = favoritesState.favorites.filter(
    item => id !== item.imdbID,
  );
};

export const toggleFavorites = (movie: CardType) => {
  loading = false;
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
};

loadFavorites();

subscribe(favoritesState, () => {
  if (!loading) {
    console.log(loading);
    setFavoriteMoviesToStorage(favoritesState.favorites);
  }
});

export default favoritesState;
