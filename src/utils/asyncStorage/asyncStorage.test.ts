import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFavoriteMoviesToStorage,
  setFavoriteMoviesToStorage,
} from './asyncStorage';
import {mockListMovies} from '../../mock/MockData';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//   default: jest.fn(),
// }));

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
