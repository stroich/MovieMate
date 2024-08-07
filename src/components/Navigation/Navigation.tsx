import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import DetailsScreen from '../../page/DetailsScreen/DetailsScreen';
import {RootStackParamList} from '../../types/navigationTypes';
import {useSnapshot} from 'valtio';
import themeState from '../../store/GlobalStores/themeState';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation(): React.JSX.Element {
  const {colors} = useSnapshot(themeState);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.colorSecondaryDarkest},
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
