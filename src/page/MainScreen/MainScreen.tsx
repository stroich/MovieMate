import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Loading from '../../components/Loading/Loading.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';
import MovieDeck from '../../components/MovieDeck/MovieDeck.tsx';
import {useAppSelector} from '../../hooks/useAppDispatch.ts';
import {useGetMoviesQuery} from '../../store/api/movieApi.ts';

function MainScreen() {
  const colors = useAppSelector(state => state.theme.color);
  const [page, setPage] = useState(1);
  const {data, isLoading, error} = useGetMoviesQuery({
    search: 'All',
    page,
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
