import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ListMoviesType} from '../../types/moviesTypes';
import {AnimatedMovieCard} from './components/AnimatedMovieCard';
import constants from '../../styles/constants';

type MovieDeckProps = {
  data: ListMoviesType;
  handlePage: () => void;
};

function MovieDeck({data, handlePage}: MovieDeckProps) {
  const newData = data.filter(item => item.Poster !== 'N/A');
  const [numberOfCards, setNumberOfCards] = useState(data.length);

  const onChangeNumberOfCard = () => {
    setNumberOfCards(prevState => prevState - 1);
  };

  useEffect(() => {
    if (!numberOfCards) {
      handlePage();
      setNumberOfCards(newData.length);
    }
  }, [numberOfCards, newData.length, handlePage]);

  return (
    <View style={styles.list}>
      {newData.map((item, index) => (
        <AnimatedMovieCard
          key={item.imdbID}
          data={item}
          delay={index * 100}
          onChangeNumberOfCard={onChangeNumberOfCard}
        />
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
