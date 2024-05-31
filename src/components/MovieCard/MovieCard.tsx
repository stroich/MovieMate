import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {dataType} from '../ListMovies/ListMovies';

type MovieCardProps = {
  data: dataType;
};

export function MovieCard({data}: MovieCardProps) {
  if (data.Poster === 'N/A') {
    return null;
  }
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: data.Poster}} />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{data.Title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    margin: 5,
    backgroundColor: '#151618',
    borderRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  containerTitle: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});
