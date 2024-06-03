import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import constants from '../../styles/constants';
import MainScreen from '../../page/MainScreen/MainScreen';
import SearchScreen from '../../page/SearchScreen/SearchScreen';
import constants from '../../styles/constants';

import renderMyTabBar from '../NavList/renderMyTabBar';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={renderMyTabBar}
          screenOptions={{
            headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
            headerTintColor: 'white',
          }}>
          <Tab.Screen
            name="home"
            component={MainScreen}
            options={{title: 'MovieMate'}}
          />
          <Tab.Screen
            name="search1"
            component={SearchScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
        {/* <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
            headerTintColor: 'white',
          }}
        /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Navigation;
