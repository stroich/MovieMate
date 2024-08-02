import React from 'react';

import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import constants from '@styles/constants';

type CustomButtonProps = {
  nameIcon: string;
};

function CustomButton({nameIcon}: CustomButtonProps) {
  return (
    <TouchableOpacity testID={nameIcon} style={styles.card}>
      <AntDesign name={nameIcon} size={48} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.colorOpasity50,
    borderRadius: 5,
  },
});

export default CustomButton;
