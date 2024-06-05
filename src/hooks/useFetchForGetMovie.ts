import {useCallback, useEffect, useState} from 'react';
import {getMovie} from '../api/apiMovies';

export function useFetchForGetMovie(id: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    getMovie(id)
      .then(res => setData(res))
      .catch(e => {
        console.error(e);
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, loading, error};
}
