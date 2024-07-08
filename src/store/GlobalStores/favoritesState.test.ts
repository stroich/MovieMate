import favoritesState, {
  addFavorites,
  removeFavorites,
  toggleFavorites,
} from './favoritesState';
import {
  getFavoriteMoviesToStorage,
  setFavoriteMoviesToStorage,
} from '../../utils/asyncStorage/asyncStorage';
import {mockListMovies} from '../../mock/MockData';
import {waitFor} from '@testing-library/react-native';

jest.mock('../../utils/asyncStorage/asyncStorage', () => ({
  getFavoriteMoviesToStorage: jest.fn(),
  setFavoriteMoviesToStorage: jest.fn(),
}));

describe('favoritesState', () => {
  describe('favoritesState without data from async storage', () => {
    beforeEach(() => {
      (getFavoriteMoviesToStorage as jest.Mock).mockResolvedValueOnce(null);
      favoritesState.favorites = [];
    });

    it('setFavoriteMoviesToStorage should not call with loading true', () => {
      expect(setFavoriteMoviesToStorage).toHaveBeenCalledTimes(0);
    });

    it('AddFavorites should add the movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      addFavorites(movie);
      expect(favoritesState.favorites).toEqual([movie]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalled();
      });
    });

    it('AddFavorites should not add the same movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      favoritesState.favorites = [movie];
      addFavorites(movie);
      expect(favoritesState.favorites).toEqual([movie]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalled();
      });
    });

    it('removeFavorites should remove movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      favoritesState.favorites = [movie];
      removeFavorites(movie.imdbID);
      expect(favoritesState.favorites).toEqual([]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalled();
      });
    });

    it('toggleFavorites should add movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      toggleFavorites(movie);
      expect(favoritesState.favorites).toEqual([movie]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalled();
      });
    });

    it('toggleFavorites should remove movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      toggleFavorites(movie);
      toggleFavorites(movie);
      expect(favoritesState.favorites).toEqual([]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalled();
      });
    });
  });
});
