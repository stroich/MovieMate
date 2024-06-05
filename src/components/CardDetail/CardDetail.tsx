import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {MovieType} from '../../types/moviesTypes';
import constants from '../../styles/constants';
import BackButton from '../BackButton/BackButton';

type CardDetailProps = {
  data: MovieType;
};

function CardDetail({data}: CardDetailProps) {
  return (
    <View>
      <Image style={styles.image} source={{uri: data.Poster}} />
      <View style={styles.container}>
        <Text style={styles.title}>{data.Title}</Text>
        <Text style={styles.textDetails}>{data.Genre}</Text>
        <View style={styles.containerDetails}>
          <Text
            style={styles.textDetails}>{`${data.Year} | ${data.Country}`}</Text>
          <Text style={styles.textDetails}>{data.Runtime}</Text>
        </View>
        <Text style={styles.text}>{data.Plot}</Text>
      </View>
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
  container: {
    padding: 20,
    position: 'absolute',
    width: '100%',
    fontSize: 18,
    backgroundColor: constants.colorOpasityDark,
    bottom: 0,
    justifyContent: 'space-around',
  },
  containerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  title: {
    paddingBottom: 15,
    color: constants.colorGold,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    color: constants.colorWhite,
  },
  textDetails: {
    color: constants.colorGrey,
    fontSize: 12,
  },
});

export default CardDetail;
