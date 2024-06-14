import React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProps} from '../../types/navigationTypes';
import {CardType} from '../../types/moviesTypes';

type MovieCardProps = {
  data: CardType;
  width: number;
  height: number;
};

export function MovieCard({data, width, height}: MovieCardProps) {
  const navigation = useNavigation<UseNavigationProps>();

  if (data.Poster === 'N/A') {
    return null;
  }

  const handlePressCard = () =>
    navigation.navigate('Details', {itemId: data.imdbID, data: data});

  return (
    <Pressable style={[styles.card, {width: width}]} onPress={handlePressCard}>
      <Image
        style={[styles.image, {width: width, height: height}]}
        source={{uri: data.Poster}}
      />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{data.Title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: '100%',
    margin: 5,
    backgroundColor: '#151618',
    borderRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
