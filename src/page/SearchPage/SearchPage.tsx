import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import List, {ListMoviesType} from '../../components/ListMovies/ListMovies';
import {getMovies} from '../../api/apiMovies';
import Search from '../../components/Search/Search';

function SearchPage(): React.JSX.Element {
  const [listOfMovies, setListOfMovies] = useState<ListMoviesType>([]);

  async function changeData() {
    const data = await getMovies('');
    setListOfMovies(data.Search);
  }

  const handleSearch = useCallback((value: ListMoviesType) => {
    setListOfMovies(value);
  }, []);

  useEffect(() => {
    changeData();
  }, []);

  return (
    <View style={styles.container}>
      <Search searchMovies={handleSearch} />
      <List data={listOfMovies} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: '#282c34',
  },
});

export default SearchPage;
