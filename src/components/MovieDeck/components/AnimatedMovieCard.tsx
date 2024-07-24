import React, {useState} from 'react';

import {StyleSheet} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {FadeOut} from 'react-native-reanimated';

import {MovieCard} from '@components/MovieCard/MovieCard';
import CustomButton from '@components/MovieDeck/components/CustomButton/CustomButton';
import {SwipeDirectionEnum} from '@components/MovieDeck/hooks/swipeType';
import {useSwipe} from '@components/MovieDeck/hooks/useSwipe';
import {
  addFavorites,
  removeFavorites,
} from '@store/GlobalStores/favoritesState';
import {CardType} from '@type/moviesTypes';

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
  const testID = data.imdbID;
  const [visible, setVisible] = useState(true);

  const successfulSwipe = () => {
    onChangeNumberOfCard();
    setVisible(false);
    addFavorites(data);
  };

  const unsuccessfulSwipe = () => {
    onChangeNumberOfCard();
    setVisible(false);
    removeFavorites(data.imdbID);
  };

  const {pan, animatedCardStyle, isSwiped, swipeDirection} = useSwipe({
    delay,
    unsuccessfulSwipe,
    successfulSwipe,
    testID,
  });

  if (!visible) {
    return null;
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        testID={`Main-AnimatedCard-${data.imdbID}`}
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
