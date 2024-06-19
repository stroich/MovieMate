import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import constants from '../../../styles/constants';
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';
import {PersonalSettingsType as SettingData} from '../../../types/settingType';

type InputProps = {
  control: Control<SettingData, any>;
  name: keyof SettingData;
  errors: FieldErrors<SettingData>[keyof FieldErrors<SettingData>];
  rules: RegisterOptions<SettingData, keyof SettingData>;
};

function Input({control, name, errors, rules}: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder={name}
            placeholderTextColor={constants.colorGrey}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors && <Text style={styles.text}>{errors.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  input: {
    height: 40,
    width: '80%',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#343536CC',
    borderColor: '#606265',
    color: 'white',
  },
  text: {
    position: 'absolute',
    bottom: 5,
    color: constants.colorRed,
    fontSize: 15,
  },
});

export default Input;
