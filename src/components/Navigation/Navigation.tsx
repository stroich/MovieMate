import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import constants from '../../styles/constants';
import HomeStack from './HomeStack';
import DetailsScreen from '../../page/DetailsScreen/DetailsScreen';
import {RootStackParamList} from '../../types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
          headerTintColor: 'white',
          headerBackTitleVisible: false,
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen name="Tab" component={HomeStack} />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
