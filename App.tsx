import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
