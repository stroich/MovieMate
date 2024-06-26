import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store/store';
import {
  favoriteActions,
  fetchFavoritesFromStorage,
} from '../store/slices/favoritesSlice';
import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {themeActions} from '../store/slices/themeSlice';

export function useAppDispatch() {
  const appDispatch = useDispatch<AppDispatch>();

  return useMemo(
    () =>
      bindActionCreators(
        {
          ...favoriteActions,
          fetchFavoritesFromStorage,
          ...themeActions,
        },
        appDispatch,
      ),
    [appDispatch],
  );
}

export const useAppSelector = useSelector.withTypes<RootState>();
