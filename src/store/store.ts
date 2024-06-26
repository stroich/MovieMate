import {configureStore} from '@reduxjs/toolkit';
import favoritesReduser from './slices/favoritesSlice';
import ThemeReduser from './slices/themeSlice';
import {movieApi} from './api/movieApi';

export const store = configureStore({
  reducer: {
    favorites: favoritesReduser,
    theme: ThemeReduser,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
