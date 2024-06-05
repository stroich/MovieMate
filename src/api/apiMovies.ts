import {API_URL} from '../constants';
import {GetAllMoviesParams, GetMovieParams, Params} from '../types/apitypes';
import {actionType} from '../types/moviesTypes';

async function fetchQuery(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getMovies(query = 'All', page = 1) {
  try {
    if (!query) {
      return null;
    }
    const url = `${API_URL}&s=${query}&page=${page}`;
    const response = await fetchQuery(url);
    let data = response.Search;
    if (response.Error === 'Movie not found!') {
      data = [];
    }
    return data;
  } catch (error) {
    throw error;
  }
}

async function getMovie(id: string) {
  try {
    const url = `${API_URL}&i=${id}`;
    const response = await fetchQuery(url);
    let data = response;
    if (response.Response === 'False') {
      data = null;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchRequect<T extends actionType>(
  actions: T,
  params?: Params<T>,
) {
  if (actions === actionType.getAllMovies) {
    const {query, page} = params as GetAllMoviesParams;
    return await getMovies(query, page);
  }
  if (actions === actionType.getMovie) {
    const {id} = params as GetMovieParams;
    return await getMovie(id);
  }
}
