import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';
import List from '../../components/ListMovies/ListMovies.tsx';
import {ListMoviesType} from '../../types/moviesTypes.ts';
import themeState from '../../store/GlobalStores/themeState.ts';
import {useSnapshot} from 'valtio';
import {useFetchMovies} from './hooks/useFetchMovies.ts';

function SearchScreen(): React.JSX.Element {
  const [queryText, setQueryText] = useState('');
  const {colors} = useSnapshot(themeState);
  const {data, isLoading, error, fetchNextPage} = useFetchMovies(queryText);
  const movies = data?.pages.flat() as ListMoviesType;

  const handleSearch = (value: string) => {
    setQueryText(value);
  };

  const renderComponents = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (!queryText) {
      return null;
    }

    return <List data={movies} onEndReached={fetchNextPage} />;
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
});

export default SearchScreen;
