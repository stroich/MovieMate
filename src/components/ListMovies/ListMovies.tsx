import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MovieCard} from '../MovieCard/MovieCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListMoviesType} from '../../types/moviesTypes';

type ListProps = {
  data: ListMoviesType;
  onEndReached: () => void;
};

function List({data, onEndReached}: ListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.list, {marginBottom: insets.bottom}]}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({item}) => <MovieCard data={item} />}
        keyExtractor={movie => movie.imdbID}
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default List;
