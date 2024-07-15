import {render, renderHook} from '@testing-library/react-native';
import {useSwipe} from './useSwipe';
import React from 'react';
import Animated from 'react-native-reanimated';
import {PanGesture, State} from 'react-native-gesture-handler';

const mockedEventHandlers = () => {
  return {
    begin: jest.fn(),
    start: jest.fn(),
    active: jest.fn(),
    end: jest.fn(),
    fail: jest.fn(),
    cancel: jest.fn(),
    finish: jest.fn(),
  };
};

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
