import {renderHook, waitFor} from '@testing-library/react-native';
import {useFetchMovies} from './useFetchMovies';
import {createWrapper} from '../../../mock/createWrapperForQuery';
import {fetchQuery} from '../../../utils/api/apiMovies';

const mockData = {Search: []};
jest.mock('../../../utils/api/apiMovies');
jest.mocked(fetchQuery).mockResolvedValue(mockData);

describe('useFetchMovies', () => {
  it('should render data', async () => {
    const {result} = renderHook(() => useFetchMovies('data'), {
      wrapper: createWrapper(),
    });
    expect(result.current.data).toBeFalsy();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
  });
});
