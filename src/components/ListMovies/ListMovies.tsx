import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {MovieCard} from '../MovieCard/MovieCard';
import {ListMoviesType} from '../../types/moviesTypes';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

type ListProps = {
  data: ListMoviesType;
  onEndReached: () => void;
};

function List({data, onEndReached}: ListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.containerList}
      style={styles.list}
      columnWrapperStyle={styles.row}
      numColumns={2}
      data={data}
      renderItem={({item}) => (
        <MovieCard data={item} width={170} height={200} />
      )}
      keyExtractor={movie => movie.imdbID}
      onEndReachedThreshold={0.1}
      onEndReached={onEndReached}
      ListEmptyComponent={<ErrorMessage error="Movies not found!" />}
    />
  );
}

const styles = StyleSheet.create({
  containerList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  row: {
    marginBottom: 10,
  },
});

export default List;
