import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import {useSnapshot} from 'valtio';

import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import List from '@components/ListMovies/ListMovies';
import Loading from '@components/Loading/Loading';
import Search from '@components/Search/Search';
import {useFetchMovies} from '@page/SearchScreen/hooks/useFetchMovies';
import themeState from '@store/GlobalStores/themeState';
import {ListMoviesType} from '@type/moviesTypes';

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
