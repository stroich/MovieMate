import React from 'react';
import MainScreen from '../../page/MainScreen/MainScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../NavList/renderMyTabBar';
import SearchScreen from '../../page/SearchScreen/SearchScreen';
import FavoritesScreen from '../../page/FavoritesScreen/FavoritesScreen';
import SettingsScreen from '../../page/SettingsScreen/SettingsScreen';

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components -- false positive component detection
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="home" component={MainScreen} />
      <Tab.Screen name="search1" component={SearchScreen} />
      <Tab.Screen name="hearto" component={FavoritesScreen} />
      <Tab.Screen name="setting" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default HomeStack;
