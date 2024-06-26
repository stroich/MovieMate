import {createSlice} from '@reduxjs/toolkit';
import {ColorType, constants} from '../../styles/ThemeColors';

export interface CounterState {
  theme: 'dark' | 'light';
  color: ColorType;
}

const initialState: CounterState = {
  theme: 'dark',
  color: constants.dark,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      state.theme = theme;
      state.color = constants[theme];
    },
  },
});

export const themeActions = themeSlice.actions;

const ThemeReduser = themeSlice.reducer;

export default ThemeReduser;
