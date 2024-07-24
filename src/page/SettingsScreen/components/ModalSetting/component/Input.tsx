import React from 'react';

import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useSnapshot} from 'valtio';

import themeState from '@store/GlobalStores/themeState';
import constants from '@styles/constants';
import {PersonalSettingsType as SettingData} from 'src/type/settingType';

type InputProps = {
  control: Control<SettingData, any>;
  name: keyof SettingData;
  errors: FieldErrors<SettingData>[keyof FieldErrors<SettingData>];
  rules: RegisterOptions<SettingData, keyof SettingData>;
};

function Input({control, name, errors, rules}: InputProps) {
  const {colors} = useSnapshot(themeState);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.input,
              {backgroundColor: colors.colorInput, color: colors.colorText},
            ]}
            placeholder={name}
            placeholderTextColor={colors.colorGray}
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
    width: '100%',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: constants.colorGray,
    color: constants.colorWhite,
  },
  text: {
    position: 'absolute',
    bottom: 5,
    color: constants.colorRed,
    fontSize: 15,
  },
});

export default Input;
