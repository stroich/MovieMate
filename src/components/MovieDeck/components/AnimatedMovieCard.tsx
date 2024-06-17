import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import {CardType} from '../../../types/moviesTypes';
import Animated, {FadeOut} from 'react-native-reanimated';
import {MovieCard} from '../../MovieCard/MovieCard';
import {GestureDetector} from 'react-native-gesture-handler';
import CustomButton from './CustomButton/CustomButton';
import {SwipeDirectionEnum, useSwipe} from '../hooks/useSwipe';
import {FavoritesContext} from '../../FavoritesProvider/FavoritesProvider';

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
  const {addFavorites, removeFavorites} = useContext(FavoritesContext);
  const [visible, setVisible] = useState(true);

  const successfulSwipe = () => {
    onChangeNumberOfCard();
    setVisible(false);
    addFavorites(data);
  };

  const unsuccessfulSwipe = async () => {
    onChangeNumberOfCard();
    setVisible(false);
    removeFavorites(data.imdbID);
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
