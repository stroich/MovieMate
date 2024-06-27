import {configureStore} from '@reduxjs/toolkit';
import favoritesReduser from './slices/favoritesSlice';
import ThemeReduser from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReduser,
    theme: ThemeReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
