import {useCallback, useEffect, useState} from 'react';
import {getMovies} from '../api/apiMovies';

export function useFetch(query: string, page: number) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchData = useCallback(async () => {
    console.log(1);
    setLoading(true);
    getMovies(query, page)
      .then(res => setData(res))
      .catch(e => {
        console.error(e);
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, loading, error};
}
