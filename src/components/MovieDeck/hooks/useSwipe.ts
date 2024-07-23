import {useEffect, useState} from 'react';
import {Gesture} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useDerivedValue,
  runOnJS,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {SwipeDirectionEnum} from './swipeType';

type UseSwipeProps = {
  delay: number;
  successfulSwipe: () => void;
  unsuccessfulSwipe: () => void;
  testID: string;
};

type SwipeDirectionType = null | SwipeDirectionEnum;

export function useSwipe({
  successfulSwipe,
  unsuccessfulSwipe,
  delay,
  testID,
}: UseSwipeProps) {
  const [isSwiped, setIsSwiped] = useState(false);
  const [swipeDirection, setSwipeDirection] =
    useState<SwipeDirectionType>(null);
  const translateX = useSharedValue(-500);
  const rotateZ = useSharedValue(0);
  const rotate = useDerivedValue(() => {
    return `${rotateZ.value / 10}deg`;
  });

  const pan = Gesture.Pan()
    .onChange(event => {
      translateX.value += event.changeX;
      rotateZ.value += event.changeX;
      runOnJS(setIsSwiped)(true);
      if (translateX.value > 0) {
        runOnJS(setSwipeDirection)(SwipeDirectionEnum.right);
      } else {
        runOnJS(setSwipeDirection)(SwipeDirectionEnum.left);
      }
    })
    .onFinalize(() => {
      const fadeOutAngle = 30;
      if (Math.abs(translateX.value) > fadeOutAngle) {
        if (translateX.value > 0) {
          runOnJS(successfulSwipe)();
        } else {
          runOnJS(unsuccessfulSwipe)();
        }
      } else {
        translateX.value = 0;
        rotateZ.value = 0;
      }
      runOnJS(setIsSwiped)(false);
      runOnJS(setSwipeDirection)(null);
    })
    .withTestId(`panSwipe-${testID}`);

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}, {rotate: rotate.value}],
    };
  });

  useEffect(() => {
    translateX.value = withDelay(delay, withTiming(0, {duration: 1000}));
  }, [translateX, delay]);

  return {pan, animatedCardStyle, isSwiped, swipeDirection};
}
