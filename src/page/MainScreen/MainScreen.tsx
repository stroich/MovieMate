import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFetchForGetMovies} from '../../hooks/useFetchForGetMovies.ts';
import Loading from '../../components/Loading/Loading.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';
import MovieDeck from '../../components/MovieDeck/MovieDeck.tsx';
import {ThemeContext} from '../../components/ThemeProvider/ThemeProvider.tsx';

function MainScreen() {
  const {colors} = useContext(ThemeContext);
  const {data, loading, error, addNewPage} = useFetchForGetMovies('All');

  return (
    <View
      style={[styles.container, {backgroundColor: colors.colorSecondaryDark}]}>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {data && <MovieDeck data={data} onEndReached={addNewPage} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default MainScreen;
