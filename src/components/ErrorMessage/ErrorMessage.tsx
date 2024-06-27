import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type ErrorMessageProps = {
  error: FetchBaseQueryError | SerializedError;
};

type ErrorData = {Error: string; Response: string};

function ErrorMessage({error}: ErrorMessageProps) {
  if ('data' in error) {
    const message = error.data as ErrorData;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{message.Error}</Text>
      </View>
    );
  }
  if ('message' in error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error.message}</Text>
      </View>
    );
  }
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
