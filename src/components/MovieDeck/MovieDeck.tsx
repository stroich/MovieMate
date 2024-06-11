import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListMoviesType} from '../../types/moviesTypes';
import {AnimatedMovieCard} from './AnimatedMovieCard';

type MovieDeckProps = {
  data: ListMoviesType;
};

function MovieDeck({data}: MovieDeckProps) {
  const newData = data.filter(item => item.Poster !== 'N/A');

  return (
    <View style={styles.list}>
      {newData.map(item => (
        <AnimatedMovieCard key={item.imdbID} data={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDeck;
