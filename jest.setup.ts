import '@testing-library/react-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

require('react-native-reanimated').setUpTests();

jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
