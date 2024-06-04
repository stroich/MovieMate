import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import renderMyTabBar from '../NavList/renderMyTabBar';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';

const Tab = createBottomTabNavigator();

function Navigation(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={renderMyTabBar}
          screenOptions={{headerShown: false}}>
          <Tab.Screen name="home" component={HomeStack} />
          <Tab.Screen name="search1" component={SearchStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Navigation;
