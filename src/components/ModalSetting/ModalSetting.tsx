import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import constants from '../../styles/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function ModalSettings() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text> Setting </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
    paddingHorizontal: 16,
  },
  containerText: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ModalSettings;
