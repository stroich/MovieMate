import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Search from '../../components/Search/Search';
import constants from '../../styles/constants';
import {useFetchForGetMovies} from '../../hooks/useFetchForGetMovies.ts';
import Loading from '../../components/Loading/Loading.tsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.tsx';
import List from '../../components/ListMovies/ListMovies.tsx';

function SearchScreen(): React.JSX.Element {
  const [queryText, setQueryText] = useState('');
  const {data, loading, error, loadMoviesOnScroll} =
    useFetchForGetMovies(queryText);

  const handleSearch = (value: string) => {
    setQueryText(value);
  };

  const renderComponents = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (!data) {
      return null;
    }

    return <List data={data} onEndReached={loadMoviesOnScroll} />;
  };

  return (
    <View style={styles.container}>
      <Search onSearch={handleSearch} />
      {renderComponents()}
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
