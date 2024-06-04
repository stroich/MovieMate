import React from 'react';
import {View, StyleSheet, Text} from 'react-native'; // import {useFetch} from '../../hooks/useFetch';
import constants from '../../styles/constants';

function DetailsScreen() {
  //   const {data, loading, error} = useFetch('All');

  return (
    <View style={styles.container}>
      <Text>Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailsScreen;
