import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FavoritesProvider from './src/components/FavoritesProvider/FavoritesProvider';
import ThemeProvider from './src/components/ThemeProvider/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ThemeProvider>
          <FavoritesProvider>
            <Navigation />
          </FavoritesProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
