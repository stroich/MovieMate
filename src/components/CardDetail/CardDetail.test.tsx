import React from 'react';
import {render} from '@testing-library/react-native';
import CardDetail from './CardDetail';
import {mockCardDetails} from '../../mock/MockData';

jest.mock('./components/CardMovieDescription', () => {
  return () => 'Text';
});

jest.mock('../BackButton/BackButton', () => {
  const {View} = require('react-native');
  return () => <View testID="BackButton" />;
});

describe('renders CardDetail', () => {
  it('render CardDetail', () => {
    const {getByTestId} = render(<CardDetail data={mockCardDetails} />);
    const image = getByTestId('DetailsPage-Poster-tt2199571');
    expect(image.props.source).toEqual({
      uri: 'https://m.media-amazon.com/300.jpg',
    });
  });
});
