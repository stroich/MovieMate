import React from 'react';
import {View, StyleSheet} from 'react-native';
import constants from '../../styles/constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PersonalSetting from '../../components/PersonalSettings/PersonalSettings';
import GeneralSettings from '../../components/GeneralSettings/GeneralSettings';

function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <GeneralSettings />
      <PersonalSetting />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
    paddingHorizontal: 16,
  },
});

export default SettingsScreen;
