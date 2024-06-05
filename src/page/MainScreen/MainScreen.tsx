import React from 'react';
import {View, StyleSheet} from 'react-native';
import MoviesComponent from '../../components/MoviesComponent.tsx/MoviesComponent';
import {useFetchForGetMovies} from '../../hooks/useFetchForGetMovies.ts';
import constants from '../../styles/constants';

function MainScreen() {
  const {data, loading, error} = useFetchForGetMovies('All', 1);

  return (
    <View style={styles.container}>
      <MoviesComponent isLoading={loading} moviesData={data} error={error} />
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
