import {API_URL} from '../constants';

export async function getMovies(query: string, page = 1) {
  try {
    if (!query) {
      query = 'all';
    }
    const url = `${API_URL}&s=${query}&page=${page}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
