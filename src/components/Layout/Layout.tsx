import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  addFavoriteMovie,
  getFavoriteMovies,
} from '../../utils/asyncStorage/asyncStorage';

type FavoritesContextType = {
  favorites: ListMoviesType;
  addFavorites: (fav: CardType) => void;
};

type LayoutProps = {
  children: ReactNode;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorites: () => {},
});

function Layout({children}: LayoutProps) {
  const [favorites, setFavorites] = useState<ListMoviesType>([]);

  const getFavorites = useCallback(async () => {
    const fav = (await getFavoriteMovies()) ?? [];
    setFavorites(fav);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const addFavorites = (value: CardType) => {
    addFavoriteMovie(value);
    setFavorites(prevFav => {
      const hasMovie = prevFav.some(item => value.imdbID === item.imdbID);
      if (!hasMovie) {
        return [...prevFav, value];
      } else {
        return prevFav;
      }
    });
  };

  return (
    <FavoritesContext.Provider
      value={{favorites: favorites, addFavorites: addFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default Layout;
