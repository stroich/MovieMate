import {act, waitFor} from '@testing-library/react-native';

import {mockListMovies} from '@mock/MockData';
import favoritesState, {
  addFavorites,
  removeFavorites,
  toggleFavorites,
} from '@store/GlobalStores/favoritesState';
import {
  getFavoriteMoviesToStorage,
  setFavoriteMoviesToStorage,
} from '@utils/asyncStorage/asyncStorage';

jest.mock('../../utils/asyncStorage/asyncStorage', () => ({
  getFavoriteMoviesToStorage: jest.fn(),
  setFavoriteMoviesToStorage: jest.fn(),
}));

describe('favoritesState', () => {
  describe('favoritesState without data from async storage', () => {
    beforeEach(() => {
      (getFavoriteMoviesToStorage as jest.Mock).mockResolvedValue(null);
    });

    afterEach(async () => {
      favoritesState.favorites = [];
      await act(() => Promise.resolve());
      jest.clearAllMocks();
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
        expect(setFavoriteMoviesToStorage).toHaveBeenCalledTimes(1);
      });
    });

    it('AddFavorites should not add the same movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      favoritesState.favorites = [movie];
      addFavorites(movie);
      expect(favoritesState.favorites).toEqual([movie]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalledTimes(0);
      });
    });

    it('removeFavorites should remove movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      favoritesState.favorites = [movie];
      await act(() => Promise.resolve());
      removeFavorites(movie.imdbID);
      expect(favoritesState.favorites).toEqual([]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalledTimes(2);
      });
    });

    it('toggleFavorites should add movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      toggleFavorites(movie);
      expect(favoritesState.favorites).toEqual([movie]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalledTimes(1);
      });
    });

    it('toggleFavorites should remove movie card', async () => {
      expect(favoritesState.favorites).toEqual([]);
      const movie = mockListMovies[0];
      toggleFavorites(movie);
      await act(() => Promise.resolve());
      expect(favoritesState.favorites).toEqual([movie]);
      toggleFavorites(movie);
      expect(favoritesState.favorites).toEqual([]);

      await waitFor(() => {
        expect(setFavoriteMoviesToStorage).toHaveBeenCalledTimes(2);
      });
    });
  });
});
