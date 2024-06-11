import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProps} from '../../types/navigationTypes';
import {CardType} from '../../types/moviesTypes';
import Animated from 'react-native-reanimated';

type MovieCardProps = {
  data: CardType;
};

export function MovieCard({data}: MovieCardProps) {
  const navigation = useNavigation<UseNavigationProps>();

  if (data.Poster === 'N/A') {
    return null;
  }

  const handlePressCard = () =>
    navigation.navigate('Details', {itemId: data.imdbID, data: data});

  return (
    <Pressable style={[styles.card]} onPress={handlePressCard}>
      <Animated.Image
        sharedTransitionTag={data.imdbID}
        style={styles.image}
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
    width: 170,
    height: 250,
    margin: 5,
    backgroundColor: '#151618',
    borderRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: 170,
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
