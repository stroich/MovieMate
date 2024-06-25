import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {
  addFavorites,
  fetchFavoritesFromStorage,
  removeFavorites,
  toggleFavorites,
} from '../store/slices/favoritesSlice';
import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';

export function useAppDispatch() {
  const appDispatch = useDispatch<AppDispatch>();

  return useMemo(
    () =>
      bindActionCreators(
        {
          addFavorites,
          removeFavorites,
          toggleFavorites,
          fetchFavoritesFromStorage,
        },
        appDispatch,
      ),
    [appDispatch],
  );
}

export const useAppSelector = useSelector.withTypes<RootState>();
