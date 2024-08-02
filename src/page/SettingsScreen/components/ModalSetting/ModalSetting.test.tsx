import React from 'react';

import {act, fireEvent, render} from '@testing-library/react-native';

import ModalSettings from '@page/SettingsScreen/components/ModalSetting/ModalSetting';

const RN = jest.requireActual('react-native');

describe('ModalSettings', () => {
  it('should renders screen for ios', () => {
    RN.Platform.OS = 'ios';
    const onSubmit = jest.fn();
    const onCloseModal = jest.fn();
    const {getByText} = render(
      <ModalSettings visible onCloseModal={onCloseModal} onSubmit={onSubmit} />,
    );
    const button = getByText('SAVE');
    expect(button).toHaveStyle({color: '#ffffff'});
  });

  it('should renders screen for android', () => {
    RN.Platform.OS = 'android';
    const onSubmit = jest.fn();
    const onCloseModal = jest.fn();
    const {getByRole} = render(
      <ModalSettings visible onCloseModal={onCloseModal} onSubmit={onSubmit} />,
    );
    const button = getByRole('button');
    expect(button).toHaveStyle({backgroundColor: '#B8860B'});
  });

  it('should renders errors by changing empty TextInputs', async () => {
    RN.Platform.OS = 'android';
    const onSubmit = jest.fn();
    const onCloseModal = jest.fn();
    const {getAllByText, getByRole} = render(
      <ModalSettings visible onCloseModal={onCloseModal} onSubmit={onSubmit} />,
    );

    const submitButton = getByRole('button');
    await act(() => {
      fireEvent.press(submitButton);
    });

    const errors = getAllByText('This field is required');
    expect(errors.length).toBe(3);
  });

  it('should renders error with invalid email', async () => {
    RN.Platform.OS = 'android';
    const onSubmit = jest.fn();
    const onCloseModal = jest.fn();
    const {getByPlaceholderText, getByText, getByRole} = render(
      <ModalSettings visible onCloseModal={onCloseModal} onSubmit={onSubmit} />,
    );

    const submitButton = getByRole('button');

    fireEvent.changeText(getByPlaceholderText('Email'), 'email');
    await act(() => {
      fireEvent.press(submitButton);
    });

    getByText('Invalid email address');
  });
});
