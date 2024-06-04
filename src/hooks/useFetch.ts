import {useEffect, useState} from 'react';
import {getMovies} from '../api/apiMovies';

export function useFetch(query: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoading(true);
    getMovies(query)
      .then(res => setData(res))
      .catch(e => {
        console.error(e);
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, [query]);

  return {data, loading, error};
}
