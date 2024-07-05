import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import constants from '../../styles/constants';

function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={styles.backButton}
      onPress={() => navigation.goBack()}
      testID="backButton">
      <AntDesign style={styles.icon} name="arrowleft" size={24} color="white" />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: constants.colorOpasity75,
    borderBottomRightRadius: 30,
  },
});

export default BackButton;
