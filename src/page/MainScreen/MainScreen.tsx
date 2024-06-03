import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MoviesComponent from '../../components/MoviesComponent.tsx/MoviesComponent';
import Footer from '../../components/Footer/Footer';
import {useFetch} from '../../hooks/useFetch';
import constants from '../../styles/constants';

function MainScreen() {
  const {data, loading, error} = useFetch('All');

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <MoviesComponent isLoading={loading} moviesData={data} />
      <Footer />
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
