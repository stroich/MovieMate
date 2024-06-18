import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import {CardType} from './moviesTypes';

export type HomeStackParamList = {
  home: undefined;
  search1: undefined;
  hearto: undefined;
};

export type RootStackParamList = {
  Tab: undefined;
  Details: {itemId: string; data: CardType};
  ModalSettings: undefined;
};

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export type UseNavigationProps = NavigationProp<RootStackParamList>;
