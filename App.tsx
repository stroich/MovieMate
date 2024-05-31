import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SearchPage from './src/page/SearchPage/SearchPage';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SearchPage />
    </SafeAreaProvider>
  );
}

export default App;
