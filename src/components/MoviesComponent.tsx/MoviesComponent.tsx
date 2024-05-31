import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import List, {ListMoviesType} from '../ListMovies/ListMovies';

type MoviesComponentProps = {
  isLoading: boolean;
  moviesData: ListMoviesType | null;
};

function MoviesComponent({isLoading, moviesData}: MoviesComponentProps) {
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  if (!moviesData) {
    return null;
  }

  if (!moviesData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Movie not found!</Text>
      </View>
    );
  }

  return <List data={moviesData} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default MoviesComponent;
