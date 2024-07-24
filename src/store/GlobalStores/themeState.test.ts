import themeState, {toggleTheme} from '@store/GlobalStores/themeState';
import {constants} from '@styles/ThemeColors';

describe('ThemeState tests', () => {
  beforeEach(() => {
    themeState.theme = 'dark';
    themeState.colors = constants.dark;
  });

  it('ThemeState should be dark', () => {
    expect(themeState.theme).toBe('dark');
    expect(themeState.colors).toEqual(constants.dark);
  });

  it('ToggleTheme should change the theme to a light one', () => {
    toggleTheme();
    expect(themeState.theme).toBe('light');
    expect(themeState.colors).toEqual(constants.light);
  });

  it('ToggleTheme should change the theme to a dark one', () => {
    toggleTheme();
    toggleTheme();
    expect(themeState.theme).toBe('dark');
    expect(themeState.colors).toEqual(constants.dark);
  });
});
