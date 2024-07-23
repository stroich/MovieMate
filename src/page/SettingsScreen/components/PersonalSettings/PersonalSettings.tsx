import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import constants from '../../../../styles/constants';
import {PersonalSettingsType} from '../../../../types/settingType';
import TitleForSetting from '../TitleForSetting/TitleForSetting';
import SettingItem from '../SettingItem/SettingItem';
import ModalSettings from '../ModalSetting/ModalSetting';

function PersonalSetting() {
  const [modalVisible, setModalVisible] = useState(false);
  const [personalSettings, setPersonalSettings] =
    useState<PersonalSettingsType>({
      Username: '',
      Email: '',
      Preferences: '',
    });

  const changeVisible = () => {
    setModalVisible(prevState => !prevState);
  };

  const changePersonalSetting = (value: PersonalSettingsType) => {
    setPersonalSettings(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TitleForSetting
        isEdit
        onPressEdit={changeVisible}
        value="Personal Settings"
      />
      <FlatList
        data={Object.entries(personalSettings)}
        renderItem={({item}) => <SettingItem data={item} />}
        keyExtractor={item => item[0]}
      />
      <ModalSettings
        visible={modalVisible}
        onCloseModal={changeVisible}
        onSubmit={changePersonalSetting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerText: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: constants.colorWhite,
    marginBottom: 20,
  },
});

export default PersonalSetting;
