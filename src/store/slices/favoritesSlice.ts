import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {CardType, ListMoviesType} from '../../types/moviesTypes';
import {
  getFavoriteMoviesToStorage,
  isInMovieList,
} from '../../utils/asyncStorage/asyncStorage';

export const fetchFavoritesFromStorage = createAsyncThunk(
  'favorites/fetchFavoritesFromStorage',
  async () => {
    return (await getFavoriteMoviesToStorage()) ?? [];
  },
);

export interface FavoritesState {
  favorites: ListMoviesType;
  loading: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: true,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites: (state, action: PayloadAction<CardType>) => {
      const value = action.payload;
      const hasMovie = isInMovieList(state.favorites, value.imdbID);
      if (!hasMovie) {
        state.favorites = [...state.favorites, value];
      }
    },
    removeFavorites: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      state.favorites = state.favorites.filter(item => value !== item.imdbID);
    },
    toggleFavorites: (state, action: PayloadAction<CardType>) => {
      const value = action.payload;
      if (isInMovieList(state.favorites, value.imdbID)) {
        state.favorites = state.favorites.filter(
          item => value.imdbID !== item.imdbID,
        );
      } else {
        state.favorites = [...state.favorites, value];
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFavoritesFromStorage.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
    });
  },
});

export const {addFavorites, removeFavorites, toggleFavorites} =
  favoritesSlice.actions;

const favoritesReduser = favoritesSlice.reducer;

export default favoritesReduser;
