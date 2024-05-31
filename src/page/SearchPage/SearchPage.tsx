import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import List, {ListMoviesType} from '../../components/ListMovies/ListMovies';
import {getMovies} from '../../api/apiMovies';
import Search from '../../components/Search/Search';
import Footer from '../../components/Footer/Footer';

function SearchPage(): React.JSX.Element {
  const [listOfMovies, setListOfMovies] = useState<ListMoviesType>([]);

  const getData = useCallback(async () => {
    const data = await getMovies('');
    setListOfMovies(data.Search);
  }, []);

  const handleSearch = useCallback((value: ListMoviesType) => {
    setListOfMovies(value);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View style={styles.container}>
      <Search searchMovies={handleSearch} />
      <List data={listOfMovies} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: '#282c34',
    justifyContent: 'space-between',
  },
});

export default SearchPage;
