import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useFetchForGetMovies} from '../../hooks/useFetchForGetMovies.ts';
import constants from '../../styles/constants';
import Loading from '../../components/Loading/Loading.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';
import List from '../../components/ListMovies/ListMovies.tsx';

function MainScreen() {
  const {data, loading, error, loadMoviesOnScroll} =
    useFetchForGetMovies('All');

  return (
    <View style={styles.container}>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {data && <List data={data} onEndReached={loadMoviesOnScroll} />}
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
