import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';
import {PersonalSettingsType as SettingData} from '../../../../../types/settingType';
import constants from '../../../../../styles/constants';
import Dropdown from '../../../../../components/Dropdown/Dropdown';
import {VideoType} from '../verificationRules';

const listOfOption = [
  {id: '1', value: VideoType.Episode},
  {id: '2', value: VideoType.Movie},
  {id: '3', value: VideoType.Series},
];

type InputProps = {
  control: Control<SettingData, any>;
  name: keyof SettingData;
  errors: FieldErrors<SettingData>[keyof FieldErrors<SettingData>];
  rules: RegisterOptions<SettingData, keyof SettingData>;
};

function DropdownForForm({control, name, errors, rules}: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <View style={styles.container}>
            <Dropdown data={listOfOption} onChange={onChange} value={value} />
          </View>
        )}
        name={name}
      />
      {errors && <Text style={styles.text}>{errors.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    bottom: -25,
    color: constants.colorRed,
    fontSize: 15,
  },
});

export default DropdownForForm;
