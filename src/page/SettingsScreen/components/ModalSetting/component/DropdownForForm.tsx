import React from 'react';

import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';

import Dropdown from '@components/Dropdown/Dropdown';
import {VideoType} from '@page/SettingsScreen/components/ModalSetting/verificationRules';
import constants from '@styles/constants';
import {PersonalSettingsType} from '@type/settingType';

const listOfOption = [
  {id: '1', value: VideoType.Episode},
  {id: '2', value: VideoType.Movie},
  {id: '3', value: VideoType.Series},
];

type InputProps = {
  control: Control<PersonalSettingsType, any>;
  name: keyof PersonalSettingsType;
  errors: FieldErrors<PersonalSettingsType>[keyof FieldErrors<PersonalSettingsType>];
  rules: RegisterOptions<PersonalSettingsType, keyof PersonalSettingsType>;
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
