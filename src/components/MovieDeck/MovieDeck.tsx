import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ListMoviesType} from '../../types/moviesTypes';
import {AnimatedMovieCard} from './AnimatedMovieCard';
import constants from '../../styles/constants';

type MovieDeckProps = {
  data: ListMoviesType;
};

function MovieDeck({data}: MovieDeckProps) {
  const newData = data.filter(item => item.Poster !== 'N/A');

  return (
    <View style={styles.list}>
      {newData.map((item, index) => (
        <AnimatedMovieCard key={item.imdbID} data={item} delay={index * 100} />
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
  containerButton: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 30,
    backgroundColor: constants.colorGold,
    padding: 5,
  } as ViewStyle,
});

export default MovieDeck;
