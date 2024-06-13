import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {CardType} from '../../../types/moviesTypes';
import Animated, {FadeOut} from 'react-native-reanimated';
import {MovieCard} from '../../MovieCard/MovieCard';
import {GestureDetector} from 'react-native-gesture-handler';
import CustomButton from '../../CustomButton/CustomButton';
import {SwipeDirectionEnum, useSwipe} from '../hooks/useSwipe';
import {addFavoriteMovie} from '../../../utils/asyncStorage/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MovieCardProps = {
  data: CardType;
  delay: number;
  onChangeNumberOfCard: () => void;
};

export function AnimatedMovieCard({
  data,
  delay,
  onChangeNumberOfCard,
}: MovieCardProps) {
  const [visible, setVisible] = useState(true);

  const successfulSwipe = async () => {
    onChangeNumberOfCard();
    setVisible(false);
    addFavoriteMovie(data);
  };

  const unsuccessfulSwipe = async () => {
    onChangeNumberOfCard();
    setVisible(false);
    await AsyncStorage.removeItem('favorites');
  };

  const {pan, animatedCardStyle, isSwiped, swipeDirection} = useSwipe({
    delay,
    unsuccessfulSwipe,
    successfulSwipe,
  });

  if (!visible) {
    return null;
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.container, animatedCardStyle]}
        exiting={FadeOut}>
        <MovieCard data={data} width={300} height={400} />
        {isSwiped && swipeDirection === SwipeDirectionEnum.right && (
          <CustomButton nameIcon={'check'} />
        )}
        {isSwiped && swipeDirection === SwipeDirectionEnum.left && (
          <CustomButton nameIcon={'close'} />
        )}
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
