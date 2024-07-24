import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {render} from '@testing-library/react-native';

import SettingsScreen from '@page/SettingsScreen/SettingsScreen';

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('SettingsScreen', () => {
  it('should renders screen', () => {
    const {getByText} = render(<SettingsScreen />);
    getByText('General Settings');
    getByText('Personal Settings');
  });
});
