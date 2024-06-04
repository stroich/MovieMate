import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../page/MainScreen/MainScreen';
import DetailsScreen from '../../page/DetailsScreen/DetailsScreen';
import constants from '../../styles/constants';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{title: 'MovieMate'}}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
