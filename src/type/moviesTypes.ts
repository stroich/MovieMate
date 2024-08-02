export type CardType = {
  readonly Poster: string;
  readonly Title: string;
  readonly imdbID: string;
};

export type ListMoviesType = readonly CardType[];

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
