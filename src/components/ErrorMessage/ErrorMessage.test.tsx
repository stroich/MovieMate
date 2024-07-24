import React from 'react';

import {render} from '@testing-library/react-native';

import ErrorMessage from '@components/ErrorMessage/ErrorMessage';

describe('renders ErrorMessage', () => {
  it('should render ErrorMessage with error null', () => {
    const {getByText} = render(<ErrorMessage error={null} />);
    getByText('Not found');
  });

  it('should render ErrorMessage with error Error', () => {
    const error = new Error('Test error message');
    const {getByText} = render(<ErrorMessage error={error} />);
    getByText('Test error message');
  });
});
