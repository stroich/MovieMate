import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {CardType, MovieType} from '../../types/moviesTypes';
import BackButton from '../BackButton/BackButton';
import CardMovieDescription from './components/CardMovieDescription';

type CardDetailProps = {
  data: MovieType | CardType;
};

const isMovieType = (data: MovieType | CardType): data is MovieType => {
  return 'Genre' in data;
};

function CardDetail({data}: CardDetailProps) {
  return (
    <View>
      <Image
        testID={`DetailsPage-Poster-${data.imdbID}`}
        style={styles.image}
        source={{uri: data.Poster}}
      />
      {isMovieType(data) && <CardMovieDescription data={data} />}
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default CardDetail;
