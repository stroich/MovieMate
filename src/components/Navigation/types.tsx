import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Details: {itemId: string};
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type PlaceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;
