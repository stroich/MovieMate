import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../../components/ListMovies/ListMovies';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../../components/ThemeProvider/ThemeProvider';
import ThemedText from '../../components/ThemedText/ThemedText';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {setFavoriteMoviesToStorage} from '../../utils/asyncStorage/asyncStorage';

function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const {colors} = useContext(ThemeContext);
  const favorites = useAppSelector(state => state.favorites.favorites);
  const loading = useAppSelector(state => state.favorites.loading);
  const {fetchFavoritesFromStorage} = useAppDispatch();

  useEffect(() => {
    fetchFavoritesFromStorage();
  }, [fetchFavoritesFromStorage]);

  useEffect(() => {
    if (!loading) {
      setFavoriteMoviesToStorage(favorites);
    }
  }, [favorites, loading]);

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
