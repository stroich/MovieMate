import React from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../../components/ListMovies/ListMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ThemedText from '../../components/ThemedText/ThemedText';
import {useSnapshot} from 'valtio';
import themeState from '../../store/GlobalStores/themeState';
import favoritesState from '../../store/GlobalStores/favoritesState';

function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const {colors} = useSnapshot(themeState);
  const {favorites} = useSnapshot(favoritesState);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, backgroundColor: colors.colorSecondaryDark},
      ]}>
      <View style={styles.containerText}>
        <ThemedText style={styles.text}> In favorites</ThemedText>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    padding: 10,
  },
  text: {
    fontSize: 30,
  },
});

export default FavoritesScreen;
