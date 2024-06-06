import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
