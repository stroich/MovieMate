import React from 'react';

import {render} from '@testing-library/react-native';

import TitleForSetting from '@page/SettingsScreen/components/TitleForSetting/TitleForSetting';

describe('GeneralSettings', () => {
  it('should has text without edit icon', () => {
    const {getByText, queryByTestId} = render(<TitleForSetting value="Test" />);
    expect(getByText('Test')).toBeTruthy();
    expect(queryByTestId('edit')).toBeFalsy();
  });

  it('should has text with edit icon', async () => {
    const {getByText, queryByTestId} = render(
      <TitleForSetting value="Test" isEdit={true} />,
    );

    expect(getByText('Test')).toBeTruthy();
    expect(queryByTestId('edit')).toBeTruthy();
  });
});
