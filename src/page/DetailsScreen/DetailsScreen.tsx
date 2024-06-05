import React from 'react';
import {View, StyleSheet} from 'react-native';
import constants from '../../styles/constants';
import {DetailsScreenProps} from '../../types/navigationTypes';
import {useFetchForGetMovie} from '../../hooks/useFetchForGetMovie';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CardDetail from '../../components/CardDetail/CardDetail';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function DetailsScreen({route}: DetailsScreenProps) {
  const {itemId} = route.params;
  const insets = useSafeAreaInsets();
  const {data, loading, error} = useFetchForGetMovie(itemId);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {data && <CardDetail data={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colorSecondaryDark,
  },
  loading: {
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailsScreen;
