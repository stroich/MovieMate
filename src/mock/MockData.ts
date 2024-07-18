import {MovieType} from '../types/moviesTypes';

export const mockListMovies = [
  {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    Title: 'Harry Potter and the Deathly Hallows: Part 2',
    imdbID: 'tt1201607',
  },
  {
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
    Title: "Harry Potter and the Sorcerer's Stone",
    imdbID: 'tt0241527',
  },
  {
    Poster: 'N/A',
    Title: 'Harry Potter and the Prisoner of Azkaban',
    imdbID: 'tt0304141',
  },
];

export const mockListMoviesWithPages = {
  pages: [mockListMovies],
  pageParams: [1],
};

export const mockCardDetails: MovieType = {
  Actors: 'Liam Neeson, Ed Harris, Joel Kinnaman',
  Country: 'United States',
  Genre: 'Action, Crime, Thriller',
  Plot: 'Mobster and hit man Jimmy Conlon has one night to figure out where his loyalties lie: with his estranged son, Mike, whose life is in danger, or his longtime best friend, mob boss Shawn Maguire, who wants Mike to pay for the death ...',
  Poster: 'https://m.media-amazon.com/300.jpg',
  Runtime: '114 min',
  Title: 'Run All Night',
  Year: '2015',
  imdbID: 'tt2199571',
  imdbRating: '6.6',
};
