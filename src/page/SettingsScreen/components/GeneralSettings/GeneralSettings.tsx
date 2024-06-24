import React, {useContext, useState} from 'react';
import {Appearance, StyleSheet, Switch, Text, View} from 'react-native';
import {ThemeContext} from '../../../../components/ThemeProvider/ThemeProvider';
import constants from '../../../../styles/constants';
import TitleForSetting from '../TitleForSetting/TitleForSetting';

function GeneralSettings() {
  const {colors} = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(prevState => {
      Appearance.setColorScheme(prevState ? 'dark' : 'light');
      return !prevState;
    });
  };

  return (
    <View style={[styles.container]}>
      <TitleForSetting>General Settings</TitleForSetting>
      <View style={styles.containerSwitch}>
        <Text style={[styles.text, {color: colors.colorGray}]}> Theme: </Text>
        <Switch
          trackColor={{
            false: colors.colorGray,
            true: colors.colorSecondaryDarkest,
          }}
          thumbColor={isEnabled ? constants.colorWhite : constants.colorBlack}
          ios_backgroundColor={colors.colorGray}
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
