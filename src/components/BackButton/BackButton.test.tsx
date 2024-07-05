import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import '@react-navigation/native';
import BackButton from './BackButton';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    const navigation = {
      goBack: mockGoBack,
    };
    return navigation;
  },
}));

jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');

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
