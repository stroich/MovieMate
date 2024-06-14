import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/Navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Layout from './src/components/Layout/Layout';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Layout>
          <Navigation />
        </Layout>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
