import React from 'react';
import {render, renderHook} from '@testing-library/react-native';
import {AnimatedMovieCard} from './AnimatedMovieCard';
import {mockListMovies} from '../../../mock/MockData';
import * as swipe from '../hooks/useSwipe';
import {SwipeDirectionEnum} from '../hooks/swipeType';

const {result} = renderHook(() =>
  swipe.useSwipe({
    delay: 300,
    successfulSwipe: jest.fn(),
    unsuccessfulSwipe: jest.fn(),
  }),
);
const pan = result.current.pan;
const animatedCardStyle = result.current.animatedCardStyle;

jest.mock('../../../utils/asyncStorage/asyncStorage', () => ({
  getFavoriteMoviesToStorage: jest.fn(),
  setFavoriteMoviesToStorage: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => {
    const navigation = {
      goBack: jest.fn(),
    };
    return navigation;
  },
}));

const mockUseSwipe = jest.spyOn(swipe, 'useSwipe');

describe('renders AnimatedMovieCard', () => {
  it('should render AnimatedMovieCard', async () => {
    mockUseSwipe.mockImplementation(() => {
      return {
        pan,
        animatedCardStyle,
        isSwiped: false,
        swipeDirection: null,
      };
    });
    const {getByText, queryByTestId} = render(
      <AnimatedMovieCard
        data={mockListMovies[0]}
        delay={300}
        onChangeNumberOfCard={() => {}}
      />,
    );
    const title = getByText('Harry Potter and the Deathly Hallows: Part 2');
    expect(title).toBeTruthy();

    const checkButton = queryByTestId('check');
    expect(checkButton).toBeFalsy();

    const closeButton = queryByTestId('close');
    expect(closeButton).toBeFalsy();
  });

  it('should swipe to the right', async () => {
    mockUseSwipe.mockImplementation(() => {
      return {
        pan,
        animatedCardStyle,
        isSwiped: true,
        swipeDirection: SwipeDirectionEnum.right,
      };
    });
    const {getByTestId} = render(
      <AnimatedMovieCard
        data={mockListMovies[0]}
        delay={300}
        onChangeNumberOfCard={() => {}}
      />,
    );
    const checkButton = getByTestId('check');
    expect(checkButton).toBeTruthy();
  });

  it('should swipe to the left', async () => {
    mockUseSwipe.mockImplementation(() => {
      return {
        pan,
        animatedCardStyle,
        isSwiped: true,
        swipeDirection: SwipeDirectionEnum.left,
      };
    });
    const {getByTestId} = render(
      <AnimatedMovieCard
        data={mockListMovies[0]}
        delay={300}
        onChangeNumberOfCard={() => {}}
      />,
    );
    const closeButton = getByTestId('close');
    expect(closeButton).toBeTruthy();
  });
});
