import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type ErrorMessageProps = {
  error: Error | null;
};

function ErrorMessage({error}: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error?.message ?? 'Not found'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    padding: 20,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default ErrorMessage;
