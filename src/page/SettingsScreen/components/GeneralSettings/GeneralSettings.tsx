import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import constants from '../../../../styles/constants';
import TitleForSetting from '../TitleForSetting/TitleForSetting';
import {useSnapshot} from 'valtio';
import themeState, {
  toggleTheme,
} from '../../../../store/GlobalStores/themeState';

function GeneralSettings() {
  const state = useSnapshot(themeState);

  const toggleSwitch = () => {
    toggleTheme();
  };

  return (
    <View style={styles.container}>
      <TitleForSetting value="General Settings" />
      <View style={styles.containerSwitch}>
        <Text style={[styles.text, {color: state.colors.colorGray}]}>
          {' '}
          Theme:{' '}
        </Text>
        {state.theme !== 'dark' ? (
          <Switch
            trackColor={{
              false: state.colors.colorGray,
              true: state.colors.colorSecondaryDarkest,
            }}
            thumbColor={constants.colorWhite}
            ios_backgroundColor={state.colors.colorGray}
            onValueChange={toggleSwitch}
            value
          />
        ) : (
          <Switch
            trackColor={{
              false: state.colors.colorGray,
              true: state.colors.colorSecondaryDarkest,
            }}
            thumbColor={constants.colorBlack}
            ios_backgroundColor={state.colors.colorGray}
            onValueChange={toggleSwitch}
            value={false}
          />
        )}
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
