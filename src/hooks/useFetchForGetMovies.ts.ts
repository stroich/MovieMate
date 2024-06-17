import {useCallback, useEffect, useState} from 'react';
import {ListMoviesType} from '../types/moviesTypes';
import {getMovies} from '../utils/api/apiMovies';

export function useFetchForGetMovies(query: string) {
  const [data, setData] = useState<ListMoviesType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(() => {
    setPage(1);
    setLoading(true);
    getMovies(query, 1)
      .then(res => {
        setData(res);
      })
      .catch(e => {
        console.error(e);
        setError('Something went wrong');
      })
      .finally(() => setLoading(false));
  }, [query]);

  const loadMoviesOnScroll = async () => {
    const newMovies = await getMovies(query, page + 1);
    setData(prevState => {
      if (prevState) {
        return [...prevState, ...newMovies];
      } else {
        return null;
      }
    });
    setPage(prevPage => prevPage + 1);
  };

  const addNewPage = useCallback(
    async (newPage: number) => {
      const newMovies = await getMovies(query, newPage);
      setData(prevState => {
        if (prevState) {
          return newMovies;
        } else {
          return null;
        }
      });
    },
    [query],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, loading, error, loadMoviesOnScroll, addNewPage};
}
