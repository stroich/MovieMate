import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './src/page/MainScreen/MainScreen';
import SearchScreen from './src/page/SearchScreen/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import constants from './src/styles/constants';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="Search"
          screenOptions={{
            headerStyle: {backgroundColor: constants.colorSecondaryDarkest},
            headerTintColor: 'white',
          }}>
          <Stack.Screen name="MovieMate" component={MainScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
