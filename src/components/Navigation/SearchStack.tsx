import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../../page/DetailsScreen/DetailsScreen';
import SearchScreen from '../../page/SearchScreen/SearchScreen';
import constants from '../../styles/constants';

const Stack = createNativeStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default SearchStack;
