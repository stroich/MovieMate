import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import constants from '../../styles/constants';
import {FlatList} from 'react-native-gesture-handler';
import {PERSONAL_INFORMATION as data} from './data';
import SettingItem from '../../components/SettingItem/SettingItem';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UseNavigationProps} from '../../types/navigationTypes';

function PersonalSetting() {
  const navigation = useNavigation<UseNavigationProps>();

  return (
    <View style={[styles.container]}>
      <View style={styles.containerText}>
        <Text style={styles.text}>Personal Settings</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ModalSettings')}>
          <AntDesign name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => <SettingItem data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
    paddingHorizontal: 16,
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
