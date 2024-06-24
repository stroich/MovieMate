import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../../components/ListMovies/ListMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FavoritesContext} from '../../components/FavoritesProvider/FavoritesProvider';
import {ThemeContext} from '../../components/ThemeProvider/ThemeProvider';
import ThemedText from '../../components/ThemedText/ThemedText';

function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const {colors} = useContext(ThemeContext);
  const {favorites} = useContext(FavoritesContext);

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
