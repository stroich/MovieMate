import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Loading from '../../components/Loading/Loading.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';
import MovieDeck from '../../components/MovieDeck/MovieDeck.tsx';
import {useQuery} from '@tanstack/react-query';
import {getMovies} from '../../utils/api/apiMovies.ts';
import {useSnapshot} from 'valtio';
import themeState from '../../store/GlobalStores/themeState.ts';

function MainScreen() {
  const {colors} = useSnapshot(themeState);
  const [page, setPage] = useState(1);
  const {data, isLoading, error} = useQuery({
    queryKey: ['movies', page],
    queryFn: () => getMovies('All', page),
  });

  const handlePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.colorSecondaryDark}]}>
      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {data && <MovieDeck data={data} handlePage={handlePage} />}
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
