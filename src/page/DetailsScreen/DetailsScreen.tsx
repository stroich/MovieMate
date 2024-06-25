import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DetailsScreenProps} from '../../types/navigationTypes';
import {useFetchForGetMovie} from '../../hooks/useFetchForGetMovie';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CardDetail from '../../components/CardDetail/CardDetail';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppSelector} from '../../hooks/useAppDispatch';

function DetailsScreen({route}: DetailsScreenProps) {
  const colors = useAppSelector(state => state.theme.color);
  const {itemId, data: dataParam} = route.params;
  const insets = useSafeAreaInsets();
  const results = useFetchForGetMovie(itemId);
  const {data, error} = results;

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, backgroundColor: colors.colorSecondaryDark},
      ]}>
      {error && <ErrorMessage error={error} />}
      {!error && <CardDetail data={data ?? dataParam} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailsScreen;
