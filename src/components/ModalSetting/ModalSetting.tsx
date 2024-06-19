import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import constants from '../../styles/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm} from 'react-hook-form';
import Input from './component/Input';
import {
  rulesForEmail,
  rulesForType,
  rulesForUsername,
} from './verificationRules';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PersonalSettingsType as SettingData} from '../../types/settingType';

type ModalSettingsProps = {
  visible: boolean;
  onCloseModal: () => void;
  onSubmit: (value: SettingData) => void;
};

function ModalSettings({visible, onSubmit, onCloseModal}: ModalSettingsProps) {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SettingData>({
    defaultValues: {
      Username: '',
      Email: '',
      Preferences: '',
    },
  });

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView
        style={[styles.container, {paddingTop: insets.top}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={styles.containerIcon} onPress={onCloseModal}>
          <AntDesign
            style={styles.icon}
            name="arrowleft"
            size={24}
            color="white"
          />
        </TouchableOpacity>
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
          name="Preferences"
          errors={errors.Preferences}
          rules={rulesForType}
        />
        <Button
          title="Submit"
          onPress={handleSubmit((data: SettingData) => onSubmit(data))}
          color={constants.colorGold}
        />
      </KeyboardAvoidingView>
    </Modal>
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
  containerIcon: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  icon: {
    backgroundColor: constants.colorOpasity75,
    borderBottomRightRadius: 30,
  },
});

export default ModalSettings;
