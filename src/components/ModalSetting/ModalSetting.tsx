import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import constants from '../../styles/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import Input from './component/Input';
import BackButton from '../BackButton/BackButton';
import {
  rulesForEmail,
  rulesForType,
  rulesForUsername,
} from './verificationRules';

export type SettingData = {
  Username: string;
  Email: string;
  Type: string;
};

function ModalSettings() {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SettingData>({
    defaultValues: {
      Username: '',
      Email: '',
      Type: '',
    },
  });
  const onSubmit = (data: SettingData) => {
    console.log(data);
    console.log(errors);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {paddingTop: insets.top}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Change Personal Settings</Text>
      </View>
      <Input
        control={control}
        name="Username"
        errors={errors.Username}
        rules={rulesForUsername}
      />
      <Input
        control={control}
        name="Email"
        errors={errors.Email}
        rules={rulesForEmail}
      />
      <Input
        control={control}
        name="Type"
        errors={errors.Type}
        rules={rulesForType}
      />
      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        color={constants.colorGold}
      />
      <BackButton />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitle: {
    paddingBottom: 20,
  },
  title: {
    color: constants.colorWhite,
    fontSize: 25,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#343536CC',
    borderColor: '#606265',
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default ModalSettings;
