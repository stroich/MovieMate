import React from 'react';

import {useForm} from 'react-hook-form';
import {
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSnapshot} from 'valtio';

import ThemedText from '@components/ThemedText/ThemedText';
import DropdownForForm from '@page/SettingsScreen/components/ModalSetting/component/DropdownForForm';
import Input from '@page/SettingsScreen/components/ModalSetting/component/Input';
import {verificationRules} from '@page/SettingsScreen/components/ModalSetting/verificationRules';
import themeState from '@store/GlobalStores/themeState';
import constants from '@styles/constants';
import {PersonalSettingsType} from '@type/settingType';

type ModalSettingsProps = {
  visible: boolean;
  onCloseModal: () => void;
  onSubmit: (value: PersonalSettingsType) => void;
};

function ModalSettings({visible, onSubmit, onCloseModal}: ModalSettingsProps) {
  const insets = useSafeAreaInsets();
  const {colors} = useSnapshot(themeState);

  const defaultValues = {
    Username: '',
    Email: '',
    Preferences: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonalSettingsType>({
    defaultValues: defaultValues,
  });

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView
        style={[
          styles.container,
          {paddingTop: insets.top, backgroundColor: colors.colorSecondaryDark},
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity style={styles.containerIcon} onPress={onCloseModal}>
          <AntDesign
            style={styles.icon}
            name="arrowleft"
            size={24}
            color={colors.colorText}
          />
        </TouchableOpacity>
        <View style={styles.containerSettings}>
          <View style={styles.containerTitle}>
            <ThemedText style={styles.title}>
              Change Personal Settings
            </ThemedText>
          </View>
          <View style={styles.containerList}>
            <Input
              control={control}
              name="Username"
              errors={errors.Username}
              rules={verificationRules.Username}
            />
            <Input
              control={control}
              name="Email"
              errors={errors.Email}
              rules={verificationRules.Email}
            />
            <DropdownForForm
              control={control}
              name="Preferences"
              rules={verificationRules.Preferences}
              errors={errors.Preferences}
            />
          </View>

          <Button
            title=" SAVE "
            onPress={handleSubmit((data: PersonalSettingsType) =>
              onSubmit(data),
            )}
            color={
              Platform.OS === 'ios' ? colors.colorText : colors.colorButton
            }
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSettings: {
    width: '100%',
    alignItems: 'center',
    marginTop: '40%',
  },
  containerTitle: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
  },
  containerList: {
    width: '80%',
    marginBottom: 30,
  },
  list: {
    width: '100%',
  },
  input: {
    height: 40,
    width: '80%',
    margin: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: constants.colorGray,
    color: constants.colorWhite,
  },
  text: {
    color: constants.colorWhite,
    fontSize: 20,
  },
  containerIcon: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  icon: {
    borderBottomRightRadius: 30,
  },
});

export default ModalSettings;
