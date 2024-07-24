import React from 'react';

import {useQuery} from '@tanstack/react-query';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSnapshot} from 'valtio';

import CardDetail from '@components/CardDetail/CardDetail';
import ErrorMessage from '@components/ErrorMessage/ErrorMessage';
import Loading from '@components/Loading/Loading';
import themeState from '@store/GlobalStores/themeState';
import {getMovie} from '@utils/api/apiMovies';
import {DetailsScreenProps} from 'src/type/navigationTypes';

function DetailsScreen({route}: DetailsScreenProps) {
  const {colors} = useSnapshot(themeState);
  const {itemId} = route.params;
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
      {data && <CardDetail data={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
});

export default DetailsScreen;
