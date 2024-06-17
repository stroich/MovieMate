import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FavoritesProvider from './src/components/FavoritesProvider/FavoritesProvider';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <FavoritesProvider>
          <Navigation />
        </FavoritesProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
