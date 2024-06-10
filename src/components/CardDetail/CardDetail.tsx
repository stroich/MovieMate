import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {MovieType} from '../../types/moviesTypes';
import constants from '../../styles/constants';
import BackButton from '../BackButton/BackButton';
import Animated, {
  Easing,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type CardDetailProps = {
  data: MovieType;
};

function CardDetail({data}: CardDetailProps) {
  const color = useSharedValue(constants.colorLightGold);

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      color: color.value,
    };
  });

  const onAnimation = () => {
    'worklet';
    color.value = withRepeat(
      withSequence(
        withTiming(constants.colorGold, {
          duration: 2000,
          easing: Easing.linear,
        }),
        withTiming(constants.colorDarkGold, {
          duration: 2000,
          easing: Easing.linear,
        }),
      ),
      0,
      true,
    );
  };

  useEffect(() => {
    runOnUI(onAnimation)();
  }, []);

  return (
    <View>
      <Animated.Image
        sharedTransitionTag={data.Title}
        style={styles.image}
        source={{uri: data.Poster}}
      />
      <View style={styles.container}>
        <Animated.Text style={[styles.title, animatedTitleStyle]}>
          {data.Title}
        </Animated.Text>
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
