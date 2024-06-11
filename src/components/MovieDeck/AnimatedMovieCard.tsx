import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {CardType} from '../../types/moviesTypes';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {MovieCard} from '../MovieCard/MovieCard';

type MovieCardProps = {
  data: CardType;
  delay: number;
};

export function AnimatedMovieCard({data, delay}: MovieCardProps) {
  const animatedPosition = useSharedValue(-500);
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animatedPosition.value}, {scale: 2}],
    };
  });

  useEffect(() => {
    animatedPosition.value = withDelay(delay, withTiming(0, {duration: 1000}));
  }, [animatedPosition, delay]);

  return (
    <Animated.View style={[styles.container, animatedCardStyle]}>
      <MovieCard data={data} />
    </Animated.View>
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
