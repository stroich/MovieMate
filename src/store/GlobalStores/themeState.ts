import {proxy} from 'valtio';
import {ColorType, constants} from '../../styles/ThemeColors';

export interface ThemeStateType {
  theme: 'dark' | 'light';
  colors: ColorType;
  toggleTheme: () => void;
}

const themeState = proxy<ThemeStateType>({
  theme: 'dark',
  colors: constants.dark,
  toggleTheme: () => {
    const theme = themeState.theme === 'dark' ? 'light' : 'dark';
    themeState.theme = theme;
    themeState.colors = constants[theme];
  },
});

export default themeState;
