import {NavigationProp} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type HomeStackParamList = {
  home: undefined;
  search1: undefined;
  hearto: undefined;
};

export type RootStackParamList = {
  Tab: undefined;
  Details: {itemId: string};
};

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export type UseNavigationProps = NavigationProp<RootStackParamList>;
