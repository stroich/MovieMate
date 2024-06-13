import React from 'react';
import {View, StyleSheet} from 'react-native';
import constants from '../../styles/constants';
import {Text} from 'react-native';

function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your favorites list is empty</Text>
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
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default FavoritesScreen;
