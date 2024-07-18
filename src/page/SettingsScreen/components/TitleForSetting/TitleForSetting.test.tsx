import React from 'react';
import {render} from '@testing-library/react-native';
import TitleForSetting from './TitleForSetting';

describe('GeneralSettings', () => {
  it('should has text without edit icon', () => {
    const {getByText, queryByTestId} = render(
      <TitleForSetting>Test</TitleForSetting>,
    );
    expect(getByText('Test')).toBeTruthy();
    expect(queryByTestId('edit')).toBeFalsy();
  });

  it('should has text with edit icon', async () => {
    const {getByText, queryByTestId} = render(
      <TitleForSetting isEdit={true}>Test</TitleForSetting>,
    );

    expect(getByText('Test')).toBeTruthy();
    expect(queryByTestId('edit')).toBeTruthy();
  });
});
