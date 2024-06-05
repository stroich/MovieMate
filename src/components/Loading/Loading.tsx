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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
