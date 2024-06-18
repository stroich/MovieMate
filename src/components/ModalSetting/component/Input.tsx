import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import constants from '../../../styles/constants';
import {Control, Controller, FieldErrors} from 'react-hook-form';
import {SettingData} from '../ModalSetting';

type InputProps = {
  control: Control<SettingData, any>;
  name: keyof SettingData;
  errors: FieldErrors<SettingData>[keyof FieldErrors<SettingData>];
};

function Input({control, name, errors}: InputProps) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
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
      {errors && <Text style={styles.text}>This is required.</Text>}
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
