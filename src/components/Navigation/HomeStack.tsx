import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../page/MainScreen/MainScreen';
import DetailsScreen from '../../page/DetailsScreen/DetailsScreen';
import constants from '../../styles/constants';
import {HomeStackParamList} from '../../types/navigationTypes';

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
        headerTintColor: 'white',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{title: 'MovieMate'}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
