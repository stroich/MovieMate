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

  return (
    <FavoritesContext.Provider
      value={{favorites: favorites, addFavorites: addFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default Layout;
