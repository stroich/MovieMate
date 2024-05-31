import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {marginBottom: insets.bottom}]}>
      <Text style={styles.paragraph}>MovieMate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
    alignContent: 'flex-start',
    backgroundColor: '#151618',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Footer;
