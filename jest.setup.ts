import '@testing-library/react-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
// import {setUpTests} from 'react-native-reanimated';

require('react-native-reanimated').setUpTests();

jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
