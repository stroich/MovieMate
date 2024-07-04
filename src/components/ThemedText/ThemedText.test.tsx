import React from 'react';
import {render} from '@testing-library/react-native';
import ThemedText from './ThemedText';

describe('renders ThemedText', () => {
  it('renders ThemedText without style', () => {
    const {getByText} = render(<ThemedText>Text</ThemedText>);
    getByText('Text');
  });

  it('renders ThemedText with style', () => {
    const TextStyle = {color: 'red'};
    const {getByText} = render(<ThemedText style={TextStyle}>Text</ThemedText>);
    const redText = getByText('Text');
    expect(redText).toHaveStyle(TextStyle);
  });
});
