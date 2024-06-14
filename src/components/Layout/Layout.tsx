import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  addFavoriteMovieToStorage,
  getFavoriteMoviesToStorage,
  removeFavoriteMovie,
} from '../../utils/asyncStorage/asyncStorage';

type FavoritesContextType = {
  favorites: ListMoviesType;
  addFavorites: (fav: CardType) => void;
  removeFavorites: (id: string) => void;
};

type LayoutProps = {
  children: ReactNode;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorites: () => {},
  removeFavorites: () => {},
});

function Layout({children}: LayoutProps) {
  const [favorites, setFavorites] = useState<ListMoviesType>([]);

  const getFavorites = useCallback(async () => {
    const fav = (await getFavoriteMoviesToStorage()) ?? [];
    setFavorites(fav);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const addFavorites = (value: CardType) => {
    const hasMovie = favorites.some(item => value.imdbID === item.imdbID);
    if (!hasMovie) {
      addFavoriteMovieToStorage(value);
      setFavorites(prevFav => [...prevFav, value]);
    }
  };

  const removeFavorites = (imdbID: string) => {
    const updateFavorites = favorites.filter(item => imdbID !== item.imdbID);
    removeFavoriteMovie(imdbID);
    setFavorites(updateFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{favorites, addFavorites, removeFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default Layout;
