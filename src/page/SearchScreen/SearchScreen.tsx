import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Search from '../../components/Search/Search';
import MoviesComponent from '../../components/MoviesComponent.tsx/MoviesComponent';
import constants from '../../styles/constants';
import {useFetchForGetMovies} from '../../hooks/useFetchForGetMovies.ts';

function SearchScreen(): React.JSX.Element {
  const [queryText, setQueryText] = useState('');
  const {data, loading, error, loadMoviesOnScroll} =
    useFetchForGetMovies(queryText);

  const handleSearch = useCallback((value: string) => {
    setQueryText(value);
  }, []);

  return (
    <View style={styles.container}>
      <Search searchMovies={handleSearch} />
      <MoviesComponent
        isLoading={loading}
        moviesData={data}
        error={error}
        onEndReached={loadMoviesOnScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchScreen;
