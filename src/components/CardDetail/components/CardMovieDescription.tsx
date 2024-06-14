import React, {useContext} from 'react';
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
import {FavoritesContext} from '../../Layout/Layout';
import {isInMovieList} from '../../../utils/asyncStorage/asyncStorage';

type CardMovieDescriptionProps = {
  data: MovieType;
};

function CardMovieDescription({data}: CardMovieDescriptionProps) {
  const {addFavorites, favorites, removeFavorites} =
    useContext(FavoritesContext);
  const isFavorites = isInMovieList(favorites, data.imdbID);
  const heightDescription = useSharedValue(250);

  const animatedDescription = useAnimatedStyle(() => {
    return {
      height: heightDescription.value,
    };
  });

  const pan = Gesture.Pan()
    .onChange(event => {
      if (event.translationY < 0) {
        heightDescription.value = clamp(heightDescription.value + 1, 250, 300);
      }
    })
    .onFinalize(() => {
      heightDescription.value = withSpring(250);
    });

  const addToFavorites = () => {
    if (isFavorites) {
      removeFavorites(data.imdbID);
    } else {
      addFavorites(data);
    }
  };

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, animatedDescription]}>
        <Text style={[styles.title]}>{data.Title}</Text>
        <Text style={styles.textDetails}>{data.Genre}</Text>
        <View style={styles.containerDetails}>
          <Text
            style={styles.textDetails}>{`${data.Year} | ${data.Country}`}</Text>
          <Text style={styles.textDetails}>{data.Runtime}</Text>
        </View>
        <Text style={styles.text}>{data.Plot}</Text>
        <TouchableOpacity style={styles.addButton} onPress={addToFavorites}>
          <AntDesign
            name={'heart'}
            size={26}
            color={isFavorites ? constants.colorGold : constants.colorWhite}
          />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: 'absolute',
    width: '100%',
    fontSize: 18,
    backgroundColor: constants.colorOpasity75,
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
    fontSize: 15,
    color: constants.colorWhite,
  },
  textDetails: {
    color: constants.colorGrey,
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    top: 55,
    right: 25,
  },
});

export default CardMovieDescription;
