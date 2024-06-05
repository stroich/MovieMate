import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import List from '../ListMovies/ListMovies';
import {ListMoviesType} from '../../types/moviesTypes';

type MoviesComponentProps = {
  isLoading: boolean;
  moviesData: ListMoviesType | null;
  error?: null | string;
};

function MoviesComponent({
  isLoading,
  error = null,
  moviesData,
}: MoviesComponentProps) {
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  }

  if (!moviesData) {
    return null;
  }

  if (!moviesData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Movies not found!</Text>
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
