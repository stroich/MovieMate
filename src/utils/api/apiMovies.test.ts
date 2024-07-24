import fetchMock from 'jest-fetch-mock';

import {mockListMovies, mockCardDetails} from '@mock/MockData';
import {fetchQuery, getMovies, getMovie} from '@utils/api/apiMovies';

fetchMock.enableMocks();

jest.mock('react-native-config', () => ({
  API_URL: 'some',
  API_KEY: 'test',
}));

describe('apiMovies', () => {
  describe('fetchQuery', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should return JSON data when the fetch is successful', async () => {
      const mockData = {data: '12345'};
      fetchMock.mockResponseOnce(JSON.stringify(mockData));
      const url = 'https://api.example.com/data';
      const result = await fetchQuery(url);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith('https://api.example.com/data');
      expect(result).toEqual(mockData);
    });

    it('should throw an error when the fetch fails', async () => {
      const errorMessage = 'Fetch failed';
      fetchMock.mockReject(new Error(errorMessage));
      const url = 'https://api.example.com/data';
      await expect(fetchQuery(url)).rejects.toThrow(errorMessage);
      expect(fetch).toHaveBeenCalledWith(url);
    });
  });

  describe('getMovies', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should return list of movies when the fetch is successful', async () => {
      const mockData = {Search: mockListMovies};
      fetchMock.mockResponseOnce(JSON.stringify(mockData));
      const result = await getMovies();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockListMovies);
    });

    it('should return null when the query is empty', async () => {
      const result = await getMovies('', 1);
      expect(result).toBeNull();
    });

    it('should return empty list when the response is false', async () => {
      const mockData = {Search: mockListMovies, Response: 'False'};
      fetchMock.mockResponseOnce(JSON.stringify(mockData));
      const result = await getMovies();
      expect(result).toEqual([]);
    });

    it('should throw an error when the fetch fails', async () => {
      const errorMessage = 'Fetch failed';
      fetchMock.mockReject(new Error(errorMessage));
      await expect(getMovies()).rejects.toThrow(errorMessage);
    });
  });

  describe('getMovie', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should return movie when the fetch is successful', async () => {
      const mockData = mockCardDetails;
      fetchMock.mockResponseOnce(JSON.stringify(mockData));
      const result = await getMovie('tt2199571');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCardDetails);
    });

    it('should throw an error when the fetch fails', async () => {
      const errorMessage = 'Fetch failed';
      fetchMock.mockReject(new Error(errorMessage));
      await expect(getMovie('tt2199571')).rejects.toThrow(errorMessage);
    });
  });
});
