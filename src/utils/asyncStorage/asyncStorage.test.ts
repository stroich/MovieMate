import AsyncStorage from '@react-native-async-storage/async-storage';

import {mockListMovies} from '@mock/MockData';
import {
  getFavoriteMoviesToStorage,
  setFavoriteMoviesToStorage,
} from '@utils/asyncStorage/asyncStorage';

describe('AsyncStorage functions', () => {
  describe('getFavoriteMoviesToStorage', () => {
    it('should call with favorites property', async () => {
      await getFavoriteMoviesToStorage();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('favorites');
    });

    it('should return null if there are no favorite movies in storage', async () => {
      const result = await getFavoriteMoviesToStorage();
      expect(result).toBeNull();
    });
  });

  describe('setFavoriteMoviesToStorage', () => {
    it('should save the list of favorite movies to storage', async () => {
      await setFavoriteMoviesToStorage(mockListMovies);
      const result = await getFavoriteMoviesToStorage();
      expect(result).toEqual(mockListMovies);
    });
  });
});
