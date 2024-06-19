import React, {useContext} from 'react';
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
import {useForm} from 'react-hook-form';
import Input from './component/Input';
import {verificationRules} from './verificationRules';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PersonalSettingsType as SettingData} from '../../../../types/settingType';
import {ThemeContext} from '../../../../components/ThemeProvider/ThemeProvider';
import ThemedText from '../../../../components/ThemedText/ThemedText';

type ModalSettingsProps = {
  visible: boolean;
  onCloseModal: () => void;
  onSubmit: (value: SettingData) => void;
};

function ModalSettings({visible, onSubmit, onCloseModal}: ModalSettingsProps) {
  const insets = useSafeAreaInsets();
  const {colors} = useContext(ThemeContext);

  const defaultValues = {
    Username: '',
    Email: '',
    Preferences: '',
  };

  const keysValue = Object.keys(defaultValues) as Array<keyof SettingData>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SettingData>({
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
        <View style={styles.containerTitle}>
          <ThemedText style={styles.title}>Change Personal Settings</ThemedText>
        </View>
        {keysValue.map((item, index) => (
          <Input
            key={index}
            control={control}
            name={item}
            errors={errors[item]}
            rules={verificationRules[item]}
          />
        ))}
        <Button
          title=" SAVE "
          onPress={handleSubmit((data: SettingData) => onSubmit(data))}
          color={Platform.OS === 'ios' ? colors.colorText : colors.colorButton}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitle: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
  },
  containerList: {
    width: '100%',
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
    borderBottomRightRadius: 30,
  },
});

export default ModalSettings;
