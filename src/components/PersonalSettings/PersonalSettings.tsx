import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import constants from '../../styles/constants';
import {FlatList} from 'react-native-gesture-handler';
import SettingItem from '../../components/SettingItem/SettingItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalSettings from '../ModalSetting/ModalSetting';
import {PersonalSettingsType} from '../../types/settingType';

function PersonalSetting() {
  const [modalVisible, setModalVisible] = useState(false);
  const [personalSettings, setPersonalSettings] =
    useState<PersonalSettingsType>({
      Username: '',
      Email: '',
      Type: '',
    });

  const changeVisible = () => {
    setModalVisible(false);
  };

  const changePersonalSetting = (value: PersonalSettingsType) => {
    setPersonalSettings(value);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.containerText}>
        <Text style={styles.text}>Personal Settings</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    backgroundColor: constants.colorSecondaryDark,
  },
  containerText: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: constants.colorWhite,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default PersonalSetting;
