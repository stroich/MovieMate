import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import constants from '../../../../styles/constants';
import TitleForSetting from '../TitleForSetting/TitleForSetting';
import {useSnapshot} from 'valtio';
import themeState from '../../../../store/GlobalStores/themeState';

function GeneralSettings() {
  const state = useSnapshot(themeState);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    themeState.toggleTheme();
    setIsEnabled(prevState => {
      return !prevState;
    });
  };

  return (
    <View style={[styles.container]}>
      <TitleForSetting>General Settings</TitleForSetting>
      <View style={styles.containerSwitch}>
        <Text style={[styles.text, {color: state.colors.colorGray}]}>
          {' '}
          Theme:{' '}
        </Text>
        <Switch
          trackColor={{
            false: state.colors.colorGray,
            true: state.colors.colorSecondaryDarkest,
          }}
          thumbColor={isEnabled ? constants.colorWhite : constants.colorBlack}
          ios_backgroundColor={state.colors.colorGray}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  containerSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default GeneralSettings;
