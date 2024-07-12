import React from 'react';
import {render} from '@testing-library/react-native';
import CustomButton from './CustomButton';

describe('renders CustomButton', () => {
  it('should render CustomButton', () => {
    const {getByTestId} = render(<CustomButton nameIcon="icon" />);
    getByTestId('icon');
  });
});
