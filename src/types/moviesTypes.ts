export type CardType = {
  Poster: string;
  Title: string;
  imdbID: string;
};

export type ListMoviesType = Array<CardType>;

export enum actionType {
  getAllMovies,
  getMovie,
}

export type MovieType = {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Actors: string;
  Plot: string;
  Country: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
};
