import {API_KEY, API_URL} from '../../constants';

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
    const url = `${API_URL}?apikey=${API_KEY}&s=${query}&page=${page}`;
    const response = await fetchQuery(url);
    console.log(response);
    let data = response.Search;
    if (response.Response === 'False') {
      data = [];
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMovie(id: string) {
  try {
    const url = `${API_URL}?apikey=${API_KEY}&i=${id}`;
    const response = await fetchQuery(url);
    let data = response;
    return data;
  } catch (error) {
    throw error;
  }
}
