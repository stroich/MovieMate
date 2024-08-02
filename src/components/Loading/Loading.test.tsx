import React from 'react';

import {render} from '@testing-library/react-native';

import Loading from '@components/Loading/Loading';

test('renders Loading', () => {
  const {getByTestId} = render(<Loading />);
  getByTestId('loading');
});
