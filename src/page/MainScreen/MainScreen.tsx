import React from 'react';
import {View, StyleSheet} from 'react-native';
import MoviesComponent from '../../components/MoviesComponent.tsx/MoviesComponent';
import {useFetchForGetMovies} from '../../hooks/useFetchForGetMovies.ts';
import constants from '../../styles/constants';

function MainScreen() {
  const {data, loading, error, loadMoviesOnScroll} =
    useFetchForGetMovies('All');

  return (
    <View style={styles.container}>
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
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MainScreen;
