import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ListMoviesType} from '../../components/ListMovies/ListMovies';
import Search from '../../components/Search/Search';
import Footer from '../../components/Footer/Footer';
import MoviesComponent from '../../components/MoviesComponent.tsx/MoviesComponent';
import constants from '../../styles/constants';

function SearchScreen(): React.JSX.Element {
  const [listOfMovies, setListOfMovies] = useState<ListMoviesType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback((value: ListMoviesType) => {
    setListOfMovies(value);
  }, []);

  const handleLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  return (
    <View style={styles.container}>
      <Search searchMovies={handleSearch} handleLoading={handleLoading} />
      <MoviesComponent isLoading={isLoading} moviesData={listOfMovies} />
      <Footer />
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
