export type MoviesType = {
  Poster: string;
  Title: string;
  imdbID: string;
};

export type ListMoviesType = Array<MoviesType>;

export enum actionType {
  getAllMovies,
  getMovie,
}
