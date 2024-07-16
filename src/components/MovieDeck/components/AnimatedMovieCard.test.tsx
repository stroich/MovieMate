import React from 'react';
import {render, renderHook, waitFor} from '@testing-library/react-native';
import {AnimatedMovieCard} from './AnimatedMovieCard';
import {mockListMovies} from '../../../mock/MockData';
import * as swipe from '../hooks/useSwipe';
import {SwipeDirectionEnum} from '../hooks/swipeType';
import {useNavigation} from '@react-navigation/native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';

jest.mock('../../../utils/asyncStorage/asyncStorage', () => ({
  getFavoriteMoviesToStorage: jest.fn(),
  setFavoriteMoviesToStorage: jest.fn(),
}));

jest.mock('@react-navigation/native');
jest.mocked(useNavigation).mockReturnValue({goBack: jest.fn()});

describe('renders AnimatedMovieCard', () => {
  describe('check animation for CardMovieDescription', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should call successfulSwipe', async () => {
      const {queryByText} = render(
        <AnimatedMovieCard
          data={mockListMovies[0]}
          delay={300}
          onChangeNumberOfCard={() => {}}
        />,
      );

      jest.advanceTimersByTime(2000);

      await waitFor(async () => {
        await fireGestureHandler<PanGestureHandler>(
          getByGestureTestId(`panSwipe-${mockListMovies[0].imdbID}`),
          [
            {state: State.BEGAN, translationX: 0},
            {
              state: State.ACTIVE,
              translationX: 0,
            },
            {
              state: State.ACTIVE,
              translationX: 50,
            },
            {state: State.END, translationX: 50},
          ],
        );
      });

      await waitFor(() => {
        const title = queryByText(mockListMovies[0].Title);
        expect(title).toBeFalsy();
      });
    });

    it('should call unsuccessfulSwipe', async () => {
      const {queryByText} = render(
        <AnimatedMovieCard
          data={mockListMovies[0]}
          delay={300}
          onChangeNumberOfCard={() => {}}
        />,
      );

      jest.advanceTimersByTime(2000);

      await waitFor(async () => {
        await fireGestureHandler<PanGestureHandler>(
          getByGestureTestId(`panSwipe-${mockListMovies[0].imdbID}`),
          [
            {state: State.BEGAN, translationX: 0},
            {
              state: State.ACTIVE,
              translationX: 0,
            },
            {
              state: State.ACTIVE,
              translationX: -50,
            },
            {state: State.END, translationX: -50},
          ],
        );
      });

      await waitFor(() => {
        const title = queryByText(mockListMovies[0].Title);
        expect(title).toBeFalsy();
      });
    });
  });
  describe('render AnimatedMovieCard without animation', () => {
    const mockUseSwipe = jest.spyOn(swipe, 'useSwipe');

    const {result} = renderHook(() =>
      swipe.useSwipe({
        delay: 300,
        successfulSwipe: jest.fn(),
        unsuccessfulSwipe: jest.fn(),
        testID: 'test',
      }),
    );
    const pan = result.current.pan;
    const animatedCardStyle = result.current.animatedCardStyle;

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
      const title = getByText(mockListMovies[0].Title);
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
});
