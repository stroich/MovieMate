import React from 'react';

import {render, renderHook} from '@testing-library/react-native';
import Animated from 'react-native-reanimated';

import {useSwipe} from '@components/MovieDeck/hooks/useSwipe';

describe('useSwipe', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call with initial property', async () => {
    const {result} = renderHook(() =>
      useSwipe({
        delay: 300,
        successfulSwipe: jest.fn(),
        unsuccessfulSwipe: jest.fn(),
        testID: 'test',
      }),
    );

    expect(result.current.isSwiped).toBe(false);
    expect(result.current.swipeDirection).toBe(null);
    expect(result.current.animatedCardStyle).toHaveProperty('initial.value', {
      transform: [{translateX: -500}, {rotate: '0deg'}],
    });
  });

  it('should handle useEffect', async () => {
    const {result} = renderHook(() =>
      useSwipe({
        delay: 300,
        successfulSwipe: jest.fn(),
        unsuccessfulSwipe: jest.fn(),
        testID: 'test',
      }),
    );
    const {getByTestId} = render(
      <Animated.View
        style={result.current.animatedCardStyle}
        testID={'view'}
      />,
    );

    expect(getByTestId('view')).toHaveAnimatedStyle({
      transform: [{translateX: -500}, {rotate: '0deg'}],
    });

    jest.advanceTimersByTime(900);

    expect(getByTestId('view')).not.toHaveAnimatedStyle({
      transform: [{translateX: -500}, {rotate: '0deg'}],
    });
  });
});
