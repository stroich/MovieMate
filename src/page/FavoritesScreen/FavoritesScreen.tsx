import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import constants from '../../styles/constants';
import List from '../../components/ListMovies/ListMovies';
import {Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FavoritesContext} from '../../components/FavoritesProvider/FavoritesProvider';

function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const {favorites} = useContext(FavoritesContext);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.containerText}>
        <Text style={styles.text}> In favorites</Text>
      </View>
      {favorites && (
        <List data={favorites} onEndReached={() => {}} hasDeleteButton />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    padding: 10,
  },
  text: {
    color: constants.colorWhite,
    fontSize: 30,
  },
});

export default FavoritesScreen;
