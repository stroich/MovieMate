import {ListMoviesType} from '@type/moviesTypes';

export const isInMovieList = (favorites: ListMoviesType, imdbID: string) =>
  favorites.some(item => imdbID === item.imdbID);
