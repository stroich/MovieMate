import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {MovieCard} from '../MovieCard/MovieCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListMoviesType} from '../../types/moviesTypes';

type ListProps = {
  data: ListMoviesType;
};

function List({data}: ListProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.list, {marginBottom: insets.bottom}]}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({item}) => <MovieCard data={item} />}
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
