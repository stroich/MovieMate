import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProps} from '../../types/navigationTypes';
import {CardType} from '../../types/moviesTypes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ThemedText from '../ThemedText/ThemedText';
import {useSnapshot} from 'valtio';
import themeState from '../../store/GlobalStores/themeState';
import {removeFavorites} from '../../store/GlobalStores/favoritesState';

type MovieCardProps = {
  data: CardType;
  width: number;
  height: number;
  hasDeleteButton?: boolean;
};

export function MovieCard({
  data,
  width,
  height,
  hasDeleteButton,
}: MovieCardProps) {
  const navigation = useNavigation<UseNavigationProps>();
  const {colors} = useSnapshot(themeState);

  if (data.Poster === 'N/A') {
    return null;
  }

  const handlePressCard = () =>
    navigation.navigate('Details', {itemId: data.imdbID, data: data});

  const removeFromFavorites = () => {
    removeFavorites(data.imdbID);
  };

  return (
    <Pressable
      style={[
        styles.card,
        {width: width, backgroundColor: colors.colorSecondaryDarkest},
      ]}
      onPress={handlePressCard}>
      <Image
        style={[styles.image, {width: width, height: height}]}
        source={{uri: data.Poster}}
      />
      <View style={[styles.containerTitle]}>
        <ThemedText style={styles.title}>{data.Title}</ThemedText>
      </View>
      {hasDeleteButton && (
        <TouchableOpacity
          style={[
            styles.removeButton,
            {backgroundColor: colors.colorOpasity75},
          ]}
          onPress={removeFromFavorites}>
          <AntDesign name={'closecircleo'} size={26} color="white" />
        </TouchableOpacity>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: '100%',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'cover',
  },
  containerTitle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
  },
  removeButton: {
    position: 'absolute',
    borderRadius: 30,
    right: 0,
    top: 0,
  },
});
