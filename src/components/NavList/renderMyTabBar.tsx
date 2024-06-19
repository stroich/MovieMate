import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import constants from '../../styles/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeContext} from '../ThemeProvider/ThemeProvider';

interface MyTabBarProps extends BottomTabBarProps {}

function MyTabBar({state, descriptors, navigation}: MyTabBarProps) {
  const {colors} = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.colorSecondaryDarkest},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <AntDesign
              name={route.name}
              size={24}
              color={isFocused ? constants.colorGold : colors.colorText}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default MyTabBar;
