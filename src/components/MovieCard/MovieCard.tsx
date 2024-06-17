import React, {useContext} from 'react';
import {
  Text,
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
import {FavoritesContext} from '../FavoritesProvider/FavoritesProvider';
import constants from '../../styles/constants';

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
  const {removeFavorites} = useContext(FavoritesContext);

  if (data.Poster === 'N/A') {
    return null;
  }

  const handlePressCard = () =>
    navigation.navigate('Details', {itemId: data.imdbID, data: data});

  const removeFromFavorites = () => {
    removeFavorites(data.imdbID);
  };

  return (
    <Pressable style={[styles.card, {width: width}]} onPress={handlePressCard}>
      <Image
        style={[styles.image, {width: width, height: height}]}
        source={{uri: data.Poster}}
      />
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{data.Title}</Text>
      </View>
      {hasDeleteButton && (
        <TouchableOpacity
          style={styles.removeButton}
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
    margin: 5,
    backgroundColor: '#151618',
    borderRadius: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'cover',
  },
  containerTitle: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  removeButton: {
    position: 'absolute',
    backgroundColor: constants.colorOpasity75,
    borderRadius: 30,
    right: 5,
  },
});
