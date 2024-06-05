import React from 'react';
import {Image, Text, View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProps} from '../../types/navigationTypes';
import {MoviesType} from '../../types/moviesTypes';

type MovieCardProps = {
  data: MoviesType;
};

export function MovieCard({data}: MovieCardProps) {
  const navigation = useNavigation<UseNavigationProps>();
  if (data.Poster === 'N/A') {
    return null;
  }

  const handlePressCard = () =>
    navigation.navigate('Details', {itemId: data.imdbID});

  return (
    <Pressable style={styles.card} onPress={handlePressCard}>
      <Image style={styles.image} source={{uri: data.Poster}} />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{data.Title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    margin: 5,
    backgroundColor: '#151618',
    borderRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: 200,
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
