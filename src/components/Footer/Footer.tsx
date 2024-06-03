import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LIST_OF_ICONS as data} from './data';
import Icon from '../Icon/Icon';
import constants from '../../styles/constants';

function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {marginBottom: insets.bottom}]}>
      {data.map(({id, name}) => (
        <Icon name={name} key={id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
    alignContent: 'flex-start',
    backgroundColor: constants.colorSecondaryDarkest,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    paddingLeft: 20,
  },
});

export default Footer;
