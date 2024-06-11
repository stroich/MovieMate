import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {CardType} from '../../types/moviesTypes';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MovieCard} from '../MovieCard/MovieCard';

type MovieCardProps = {
  data: CardType;
};

export function AnimatedMovieCard({data}: MovieCardProps) {
  const scaleValue = useSharedValue(1);
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
    };
  });

  useEffect(() => {
    scaleValue.value = withTiming(1.5, {duration: 2000});
  }, [scaleValue]);

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
