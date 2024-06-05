import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type ErrorMessageProps = {
  error: string;
};

function ErrorMessage({error}: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default ErrorMessage;
