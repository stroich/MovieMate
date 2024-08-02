import React from 'react';

import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSnapshot} from 'valtio';

import GeneralSettings from '@page/SettingsScreen/components/GeneralSettings/GeneralSettings';
import PersonalSetting from '@page/SettingsScreen/components/PersonalSettings/PersonalSettings';
import themeState from '@store/GlobalStores/themeState';

function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const {colors} = useSnapshot(themeState);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, backgroundColor: colors.colorSecondaryDark},
      ]}>
      <GeneralSettings />
      <PersonalSetting />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default SettingsScreen;
