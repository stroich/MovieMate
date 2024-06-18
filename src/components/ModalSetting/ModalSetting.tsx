import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import constants from '../../styles/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import Input from './component/Input';
import BackButton from '../BackButton/BackButton';

export type SettingData = {
  Username: string;
  Email: string;
  Watchlists: string;
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
      Watchlists: '',
    },
  });
  const onSubmit = (data: SettingData) => console.log(data);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Change Personal Settings</Text>
      </View>
      <Input control={control} name="Username" errors={errors.Username} />
      <Input control={control} name="Email" errors={errors.Email} />
      <Input control={control} name="Watchlists" errors={errors.Watchlists} />
      <View style={styles.containerButton}>
        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          color={constants.colorGold}
        />
      </View>
      <BackButton />
    </View>
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
  containerButton: {
    padding: 10,
  },
});

export default ModalSettings;
