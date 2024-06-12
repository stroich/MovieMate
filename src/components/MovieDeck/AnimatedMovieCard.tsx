import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CardType} from '../../types/moviesTypes';
import Animated, {
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {MovieCard} from '../MovieCard/MovieCard';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

type MovieCardProps = {
  data: CardType;
  delay: number;
};

export function AnimatedMovieCard({data, delay}: MovieCardProps) {
  const [visible, setVisible] = useState(true);
  const translateX = useSharedValue(-500);
  const rotateZ = useSharedValue(0);
  const rotate = useDerivedValue(() => {
    return `${rotateZ.value / 10}deg`;
  });

  const pan = Gesture.Pan()
    .onChange(event => {
      translateX.value += event.changeX;
      rotateZ.value += event.changeX;
    })
    .onFinalize(() => {
      const fadeOutAngle = 30;
      console.log(translateX.value);
      if (Math.abs(translateX.value) > fadeOutAngle) {
        runOnJS(setVisible)(false);
      } else {
        translateX.value = 0;
        rotateZ.value = 0;
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {scale: 1.7},
        {rotate: rotate.value},
      ],
    };
  });

  useEffect(() => {
    translateX.value = withDelay(delay, withTiming(0, {duration: 1000}));
  }, [translateX, delay]);

  if (!visible) {
    return null;
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.container, animatedCardStyle]}
        exiting={FadeOut}>
        <MovieCard data={data} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
});
