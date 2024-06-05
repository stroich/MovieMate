import {actionType} from './moviesTypes';

export type GetAllMoviesParams = {
  query: string;
  page: number;
};

export type GetMovieParams = {
  id: string;
};

export type Params<T extends actionType> = T extends actionType.getAllMovies
  ? GetAllMoviesParams
  : T extends actionType.getMovie
  ? GetMovieParams
  : never;
