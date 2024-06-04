import {API_URL} from '../constants';

async function fetchQuery(query: string, page: number) {
  try {
    const url = `${API_URL}&s=${query}&page=${page}`;
    // https://www.omdbapi.com/?apikey=b0dde227&i=tt6710474
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getMovies(query: string, page = 1) {
  try {
    if (!query) {
      query = 'all';
    }
    const response = await fetchQuery(query, page);
    let data = response.Search;
    if (response.Error === 'Movie not found!') {
      data = [];
    }
    return data;
  } catch (error) {
    throw error;
  }
}
