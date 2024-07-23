import React from 'react';
import {render, renderHook} from '@testing-library/react-native';
import DropdownForForm from './DropdownForForm';
import {verificationRules} from '../verificationRules';
import {Control, useForm} from 'react-hook-form';
import {PersonalSettingsType as SettingData} from '../../../../../types/settingType';

const {result} = renderHook(() => useForm());
const control = result.current.control as unknown as Control<SettingData, any>;

describe('DropdownForForm', () => {
  it('should renders without errors', () => {
    const {queryByText} = render(
      <DropdownForForm
        control={control}
        name="Preferences"
        rules={verificationRules.Preferences}
        errors={{}}
      />,
    );
    expect(queryByText('This field is required')).toBeFalsy();
  });

  it('should renders with error by clicking empty TextInput', () => {
    const error = {
      message: 'This field is required',
      ref: {name: 'Preferences'},
      type: 'required',
    };
    const {queryByText} = render(
      <DropdownForForm
        control={control}
        name="Preferences"
        rules={verificationRules.Preferences}
        errors={error}
      />,
    );
    expect(queryByText('This field is required')).toBeTruthy();
  });
});
