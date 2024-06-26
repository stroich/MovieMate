// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {API_KEY, API_URL} from '../../constants';
// import {ListMoviesType, MovieType} from '../../types/moviesTypes';

// export const movieApi = createApi({
//   reducerPath: 'movieApi',
//   baseQuery: fetchBaseQuery({baseUrl: API_URL}),
//   endpoints: builder => ({
//     getMovies: builder.query<ListMoviesType, {search: string; page: number}>({
//       query: ({search, page}) => `?apikey=${API_KEY}&s=${search}&page=${page}`,
//       transformResponse: (response: any) => {
//         if (response.Response === 'True') {
//           return response.Search.map((movie: any) => ({
//             Poster: movie.Poster,
//             Title: movie.Title,
//             imdbID: movie.imdbID,
//           }));
//         }
//         return [];
//       },
//     }),
//     getMovie: builder.query<MovieType, string>({
//       query: (id: string) => `?apikey=${API_KEY}&i=${id}`,
//     }),
//   }),
// });

// export const {useGetMoviesQuery, useGetMovieQuery} = movieApi;
