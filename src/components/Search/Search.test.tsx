import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Search from './Search';
import {useNavigation} from '@react-navigation/native';

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0};
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({children}) => children),
    SafeAreaConsumer: jest
      .fn()
      .mockImplementation(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: mockGoBack});

jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');

describe('renders Search', () => {
  it('render Search', () => {
    const {getByPlaceholderText} = render(<Search onSearch={() => {}} />);
    getByPlaceholderText('Search');
  });

  it('should call onSearch when the inpun is submitted', () => {
    const mockGOnSearch = jest.fn();
    const {getByPlaceholderText} = render(<Search onSearch={mockGOnSearch} />);
    const input = getByPlaceholderText('Search');
    fireEvent(input, 'submitEditing', {nativeEvent: {text: 'some text'}});
    expect(mockGOnSearch).toHaveBeenCalled();
  });

  it('should go to back when the button is pressed', () => {
    const mockGOnSearch = jest.fn();
    const {getByTestId} = render(<Search onSearch={mockGOnSearch} />);
    const backButton = getByTestId('SearchPage-backButton');
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalled();
  });
});
