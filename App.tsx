import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Navigation />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
