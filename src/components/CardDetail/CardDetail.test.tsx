import React from 'react';
import {render} from '@testing-library/react-native';
import CardDetail from './CardDetail';
import {mockCardDetails, mockListMovies} from '../../mock/MockData';

jest.mock('../BackButton/BackButton', () => {
  const {View} = require('react-native');
  // eslint-disable-next-line react/display-name -- there is no need to use it in such a scenario
  return () => <View testID="BackButton" />;
});

describe('renders CardDetail', () => {
  it('render CardDetail with details data', () => {
    const {getByTestId, queryByTestId} = render(
      <CardDetail data={mockCardDetails} />,
    );
    const image = getByTestId(`DetailsPage-Poster-${mockCardDetails.imdbID}`);
    expect(image.props.source).toEqual({
      uri: mockCardDetails.Poster,
    });

    const title = queryByTestId(
      `DetailsPage-AnimatedView-${mockCardDetails.imdbID}`,
    );
    expect(title).toBeTruthy();
  });

  it('render CardDetail with common data', () => {
    const {queryByTestId} = render(<CardDetail data={mockListMovies[0]} />);
    const title = queryByTestId(
      `DetailsPage-AnimatedView-${mockCardDetails.imdbID}`,
    );
    expect(title).toBeFalsy();
  });
});
