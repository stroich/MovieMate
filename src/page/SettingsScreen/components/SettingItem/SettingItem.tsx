import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {ThemeContext} from '../../../../components/ThemeProvider/ThemeProvider';

type SettingItemProps = {
  data: [string, string];
};

function SettingItem({data: [title, value]}: SettingItemProps) {
  const {colors} = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: colors.colorGray}]}>{title}</Text>
      <View style={[styles.textValue, {borderBottomColor: colors.colorGray}]}>
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
    fontSize: 18,
    textAlign: 'center',
  },
  textValue: {
    width: '60%',
    borderBottomWidth: 1,
  },
});

export default SettingItem;
