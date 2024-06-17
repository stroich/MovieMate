import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  getFavoriteMoviesToStorage,
  isInMovieList,
  setFavoriteMoviesToStorage,
} from '../../utils/asyncStorage/asyncStorage';

type FavoritesContextType = {
  favorites: ListMoviesType;
  addFavorites: (fav: CardType) => void;
  removeFavorites: (id: string) => void;
  isFavorites: (movie: CardType) => boolean;
  toggleFavorites: (movie: CardType) => void;
};

type LayoutProps = {
  children: ReactNode;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorites: () => {},
  removeFavorites: () => {},
  isFavorites: () => false,
  toggleFavorites: () => {},
});

function FavoritesProvider({children}: LayoutProps) {
  const [favorites, setFavorites] = useState<ListMoviesType>([]);
  const [loading, setLoading] = useState(true);

  const getFavorites = useCallback(async () => {
    const fav = (await getFavoriteMoviesToStorage()) ?? [];
    setFavorites(fav);
    setLoading(false);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    if (!loading) {
      setFavoriteMoviesToStorage(favorites);
    }
  }, [favorites, loading]);

  const addFavorites = useCallback((value: CardType) => {
    setFavorites(prevFav => {
      const hasMovie = isInMovieList(prevFav, value.imdbID);
      if (!hasMovie) {
        return [...prevFav, value];
      }
      return prevFav;
    });
  }, []);

  const removeFavorites = useCallback((imdbID: string) => {
    setFavorites(currentFav => {
      return currentFav.filter(item => imdbID !== item.imdbID);
    });
  }, []);

  const isFavorites = useCallback(
    (movie: CardType) => {
      return isInMovieList(favorites, movie.imdbID);
    },
    [favorites],
  );

  const toggleFavorites = useCallback((movie: CardType) => {
    setFavorites(currentFav => {
      if (isInMovieList(currentFav, movie.imdbID)) {
        return currentFav.filter(item => movie.imdbID !== item.imdbID);
      } else {
        return [...currentFav, movie];
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      addFavorites,
      removeFavorites,
      isFavorites,
      toggleFavorites,
    }),
    [favorites, addFavorites, removeFavorites, isFavorites, toggleFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;
