import {configureStore} from '@reduxjs/toolkit';
import favoritesReduser from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
