import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import renderMyTabBar from '../NavList/renderMyTabBar';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

function Navigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={renderMyTabBar}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="home" component={HomeStack} />
        <Tab.Screen name="search1" component={SearchStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;