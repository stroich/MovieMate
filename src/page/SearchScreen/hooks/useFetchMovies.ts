import {useInfiniteQuery} from '@tanstack/react-query';

import {getMovies} from '@utils/api/apiMovies';

export function useFetchMovies(queryText: string) {
  const {data, isLoading, error, fetchNextPage} = useInfiniteQuery({
    enabled: false,
    queryKey: ['movies', queryText],
    queryFn: ({pageParam}) => getMovies(queryText, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  return {data, isLoading, error, fetchNextPage};
}
