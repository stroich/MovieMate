import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {useNavigation} from '@react-navigation/native';
import PersonalSetting from './PersonalSettings';

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('PersonalSetting', () => {
  it('should renders screen', () => {
    const {getByText} = render(<PersonalSetting />);
    getByText('Personal Settings');
  });

  it('should open modal', () => {
    const {getByText, getByTestId} = render(<PersonalSetting />);
    getByText('Personal Settings');
    const button = getByTestId('settingPage-button-PersonalSettings');
    fireEvent.press(button);
    getByText('Change Personal Settings');
  });

  it('should close modal and update data', async () => {
    const {getByText, getByRole, getByTestId, getByPlaceholderText} = render(
      <PersonalSetting />,
    );
    const editButton = getByTestId('settingPage-button-PersonalSettings');

    fireEvent.press(editButton);
    fireEvent.changeText(getByPlaceholderText('Username'), 'text');
    fireEvent.changeText(getByPlaceholderText('Email'), 'text@example.com');

    const selected = getByText('Select options');
    fireEvent.press(selected);
    const movieButton = getByText('Movie');
    fireEvent.press(movieButton);
    const submitButton = getByRole('button');
    await act(() => {
      fireEvent.press(submitButton);
    });

    getByText('text');
    getByText('text@example.com');
    getByText('Movie');
  });
});
