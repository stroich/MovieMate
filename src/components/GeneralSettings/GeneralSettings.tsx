import React, {useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import constants from '../../styles/constants';

function GeneralSettings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prevState => !prevState);

  return (
    <View style={[styles.container]}>
      <View style={styles.containerText}>
        <Text style={styles.title}>General Settings</Text>
      </View>
      <View style={styles.containerSwitch}>
        <Text style={styles.text}> Theme: </Text>
        <Switch
          trackColor={{
            false: constants.colorGray,
            true: constants.colorDarkGray,
          }}
          thumbColor={isEnabled ? constants.colorWhite : constants.colorBlack}
          ios_backgroundColor={constants.colorGray}
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
  containerText: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: constants.colorWhite,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    color: constants.colorGray,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default GeneralSettings;
