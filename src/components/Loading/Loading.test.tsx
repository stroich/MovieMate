import React from 'react';
import {render} from '@testing-library/react-native';
import Loading from './Loading';

test('renders Loading', () => {
  const {getByTestId} = render(<Loading />);
  getByTestId('loading');
});
