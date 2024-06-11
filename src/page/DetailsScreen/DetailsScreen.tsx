import React from 'react';
import {View, StyleSheet} from 'react-native';
import constants from '../../styles/constants';
import {DetailsScreenProps} from '../../types/navigationTypes';
import {useFetchForGetMovie} from '../../hooks/useFetchForGetMovie';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CardDetail from '../../components/CardDetail/CardDetail';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function DetailsScreen({route}: DetailsScreenProps) {
  const {itemId, data: dataParam} = route.params;
  const insets = useSafeAreaInsets();
  const results = useFetchForGetMovie(itemId);
  const {data, error} = results;

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {error && <ErrorMessage error={error} />}
      {!error && <CardDetail data={data ?? dataParam} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailsScreen;
