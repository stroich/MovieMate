import React from 'react';

import {render, renderHook} from '@testing-library/react-native';
import {Control, useForm} from 'react-hook-form';

import DropdownForForm from '@page/SettingsScreen/components/ModalSetting/component/DropdownForForm';
import {verificationRules} from '@page/SettingsScreen/components/ModalSetting/verificationRules';
import {PersonalSettingsType} from '@type/settingType';

const {result} = renderHook(() => useForm());
const control = result.current.control as unknown as Control<
  PersonalSettingsType,
  any
>;

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
