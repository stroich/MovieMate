import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationProp} from '@react-navigation/native';
import {CardType} from './moviesTypes';

export type HomeStackParamList = {
  Home: undefined;
  Details: {itemId: string; data: CardType};
};

export type SearchStackParamList = {
  Search: undefined;
  Details: {itemId: string; data: CardType};
};

export type DetailsScreenProps =
  | NativeStackScreenProps<HomeStackParamList, 'Details'>
  | NativeStackScreenProps<SearchStackParamList, 'Details'>;

export type UseNavigationProps = NavigationProp<
  HomeStackParamList | SearchStackParamList
>;
