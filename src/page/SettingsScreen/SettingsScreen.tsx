import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GeneralSettings from './components/GeneralSettings/GeneralSettings';
import PersonalSetting from './components/PersonalSettings/PersonalSettings';
import {useAppSelector} from '../../hooks/useAppDispatch';

function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const colors = useAppSelector(state => state.theme.color);

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
