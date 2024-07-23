import {State} from 'react-native-gesture-handler';

export const stateForSwipe = [
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
];
