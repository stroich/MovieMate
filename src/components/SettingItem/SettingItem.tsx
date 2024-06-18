import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {settingItemType} from '../PersonalSettings/data';
import constants from '../../styles/constants';

type SettingItemProps = {
  data: settingItemType;
};

function SettingItem({data}: SettingItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.text}</Text>
      <View style={styles.textValue}>
        <Text style={styles.text}> </Text>
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
    color: constants.colorGrey,
    fontSize: 18,
    textAlign: 'center',
  },
  textValue: {
    width: '50%',
    borderBottomWidth: 1,
    borderBottomColor: constants.colorGrey,
  },
});

export default SettingItem;
