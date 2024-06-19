import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import constants from '../../styles/constants';

type SettingItemProps = {
  data: [string, string];
};

function SettingItem({data: [title, value]}: SettingItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.textValue}>
        <Text style={styles.text}> {value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: constants.colorGray,
    fontSize: 18,
    textAlign: 'center',
  },
  textValue: {
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: constants.colorGray,
  },
});

export default SettingItem;
