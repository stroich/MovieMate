import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';
import List from '../../components/ListMovies/ListMovies.tsx';
import {useAppSelector} from '../../hooks/useAppDispatch.ts';
import {ListMoviesType} from '../../types/moviesTypes.ts';
import {useQuery} from '@tanstack/react-query';
import {getMovies} from '../../utils/api/apiMovies.ts';

function SearchScreen(): React.JSX.Element {
  const [queryText, setQueryText] = useState('');
  const colors = useAppSelector(state => state.theme.color);
  const [page, setPage] = useState(1);
  const {data, isLoading, error} = useQuery({
    queryKey: ['movies', page, queryText],
    queryFn: () => getMovies(queryText, page),
  });
  const [listMovies, setListMovies] = useState<ListMoviesType>([]);

  const handleSearch = (value: string) => {
    setQueryText(value);
  };

  const handlePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (data) {
      setListMovies(prevList => [...prevList, ...data]);
    }
  }, [data]);

  const renderComponents = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (!listMovies.length && !queryText) {
      return null;
    }

    return <List data={listMovies} onEndReached={handlePage} />;
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.colorSecondaryDark}]}>
      <Search onSearch={handleSearch} />
      {renderComponents()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchScreen;
