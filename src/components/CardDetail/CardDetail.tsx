import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CardType, MovieType} from '../../types/moviesTypes';
import constants from '../../styles/constants';
import BackButton from '../BackButton/BackButton';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type CardDetailProps = {
  data: MovieType | CardType;
};

const isMovieType = (data: MovieType | CardType): data is MovieType => {
  return 'Genre' in data;
};

function CardDetail({data}: CardDetailProps) {
  const progress = useSharedValue(0);

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        progress.value,
        [0, 1],
        [constants.colorDarkGold, constants.colorGold],
      ),
    };
  });

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1 - progress.value, {duration: 3000}),
      0,
      true,
    );
  }, [progress]);

  return (
    <View>
      <Animated.Image
        sharedTransitionTag={data.imdbID}
        style={styles.image}
        source={{uri: data.Poster}}
      />
      {isMovieType(data) && (
        <View style={styles.container}>
          <Animated.Text style={[styles.title, animatedTitleStyle]}>
            {data.Title}
          </Animated.Text>
          <Text style={styles.textDetails}>{data.Genre}</Text>
          <View style={styles.containerDetails}>
            <Text
              style={
                styles.textDetails
              }>{`${data.Year} | ${data.Country}`}</Text>
            <Text style={styles.textDetails}>{data.Runtime}</Text>
          </View>
          <Text style={styles.text}>{data.Plot}</Text>
        </View>
      )}
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
    backgroundColor: constants.colorOpasity75,
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
