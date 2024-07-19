import React from 'react';
import {render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import SettingsScreen from './SettingsScreen.tsx';

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('SettingsScreen', () => {
  it('should renders screen', () => {
    const {getByRole} = render(<SettingsScreen />);
    const mySwitch = getByRole('switch');
    expect(mySwitch.props.thumbTintColor).toBe('#000000');
    expect(mySwitch.props.onTintColor).toBe('#1a1c20');
    expect(mySwitch.props.value).toBeFalsy();
  });
});
