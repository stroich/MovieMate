import {mockListMovies} from '../mock/MockData';
import {isInMovieList} from './helpers';

describe('isInMovieList', () => {
  it('should return true if the movie is in the favorites list', () => {
    expect(isInMovieList(mockListMovies, 'tt1201607')).toBe(true);
  });

  it('should return false if the movie is not in the favorites list', () => {
    expect(isInMovieList(mockListMovies, 'tt0137523')).toBe(false);
  });

  it('should return false if the favorites list is empty', () => {
    expect(isInMovieList([], 'tt0111161')).toBe(false);
  });

  it('should return false if the imdbID is an empty string', () => {
    expect(isInMovieList(mockListMovies, '')).toBe(false);
  });
});
