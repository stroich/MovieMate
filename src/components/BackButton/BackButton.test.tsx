import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {fireEvent, render} from '@testing-library/react-native';

import BackButton from '@components/BackButton/BackButton';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: mockGoBack});

describe('renders BackButton', () => {
  it('should render BackButton', () => {
    const {getByTestId} = render(<BackButton />);
    getByTestId('backButton');
  });

  it('should go to back', () => {
    const {getByTestId} = render(<BackButton />);
    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
