import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {MovieType} from '../../../types/moviesTypes';
import constants from '../../../styles/constants';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {isInMovieList} from '../../../utils/asyncStorage/asyncStorage';
import {useSnapshot} from 'valtio';
import themeState from '../../../store/GlobalStores/themeState';
import favoritesState, {
  toggleFavorites,
} from '../../../store/GlobalStores/favoritesState';

type CardMovieDescriptionProps = {
  data: MovieType;
};

function CardMovieDescription({data}: CardMovieDescriptionProps) {
  const {favorites} = useSnapshot(favoritesState);
  const {colors} = useSnapshot(themeState);
  const heightDescription = useSharedValue(280);
  const isFavorites = isInMovieList(favorites, data.imdbID);
  const animatedDescription = useAnimatedStyle(() => {
    return {
      height: heightDescription.value,
    };
  });

  const pan = Gesture.Pan()
    .onChange(event => {
      if (event.translationY < 0) {
        heightDescription.value = clamp(heightDescription.value + 1, 280, 300);
      }
    })
    .onFinalize(() => {
      heightDescription.value = withSpring(280);
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.container,
          {backgroundColor: colors.colorOpasity75},
          animatedDescription,
        ]}>
        <Text style={[styles.title, {color: colors.colorGold}]}>
          {data.Title}
        </Text>
        <Text style={[styles.textDetails, {color: colors.colorForDetails}]}>
          {data.Genre}
        </Text>
        <View style={styles.containerDetails}>
          <Text
            style={[
              styles.textDetails,
              {color: colors.colorForDetails},
            ]}>{`${data.Year} | ${data.Country}`}</Text>
          <Text style={[styles.textDetails, {color: colors.colorForDetails}]}>
            {data.Runtime}
          </Text>
        </View>
        <Text style={styles.text}>{data.Plot}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => toggleFavorites(data)}>
          <AntDesign
            name={'heart'}
            size={26}
            color={isFavorites ? colors.colorGold : constants.colorWhite}
          />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
    fontSize: 18,
    bottom: 0,
  },
  containerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  title: {
    paddingBottom: 20,
    color: constants.colorGold,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: '#ffffff',
    fontSize: 15,
  },
  textDetails: {
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

export default CardMovieDescription;
