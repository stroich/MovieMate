import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import GeneralSettings from './GeneralSettings';
import themeState from '../../../../store/GlobalStores/themeState';

describe('GeneralSettings', () => {
  it('should has style for black theme', async () => {
    const {getByRole} = render(<GeneralSettings />);
    const mySwitch = getByRole('switch');
    expect(mySwitch.props.thumbTintColor).toBe('#000000');
    expect(mySwitch.props.onTintColor).toBe('#1a1c20');
    expect(mySwitch.props.value).toBeFalsy();
  });

  it('should has style for white theme', async () => {
    const {getByRole} = render(<GeneralSettings />);
    const switchElement = getByRole('switch');

    await act(async () => {
      fireEvent(switchElement, 'onValueChange', true);
    });

    await waitFor(() => {
      expect(themeState.theme).toBe('light');
      expect(switchElement.props.thumbTintColor).toBe('#ffffff');
      expect(switchElement.props.onTintColor).toBe('#ded7b3');
      expect(switchElement.props.value).toBeTruthy();
    });
  });
});
