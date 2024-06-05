import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../../page/DetailsScreen/DetailsScreen';
import SearchScreen from '../../page/SearchScreen/SearchScreen';
import constants from '../../styles/constants';
import {SearchStackParamList} from '../../types/navigationTypes';

const Stack = createNativeStackNavigator<SearchStackParamList>();

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
        headerTintColor: 'white',
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default SearchStack;
