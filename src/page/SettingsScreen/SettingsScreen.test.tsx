import React from 'react';
import {render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import SettingsScreen from './SettingsScreen.tsx';

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('SettingsScreen', () => {
  it('should renders screen', () => {
    const {getByText} = render(<SettingsScreen />);
    getByText('General Settings');
    getByText('Personal Settings');
  });
});
