import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DetailsScreenProps} from '../../types/navigationTypes';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import CardDetail from '../../components/CardDetail/CardDetail';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Loading from '../../components/Loading/Loading';
import {useQuery} from '@tanstack/react-query';
import {getMovie} from '../../utils/api/apiMovies';
import {useSnapshot} from 'valtio';
import themeState from '../../store/GlobalStores/themeState';

function DetailsScreen({route}: DetailsScreenProps) {
  const {colors} = useSnapshot(themeState);
  const {itemId, data: dataParam} = route.params;
  const insets = useSafeAreaInsets();
  const {data, isLoading, error} = useQuery({
    queryKey: ['movie', itemId],
    queryFn: () => getMovie(itemId),
  });

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, backgroundColor: colors.colorSecondaryDark},
      ]}>
      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {data && <CardDetail data={data ?? dataParam} />}
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
