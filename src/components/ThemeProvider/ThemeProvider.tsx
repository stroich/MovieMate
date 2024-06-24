import React, {ReactNode, createContext, useMemo} from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {ColorType, constants} from '../../styles/ThemeColors';

type ThemeProviderContextType = {
  colors: ColorType;
};

type LayoutProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeProviderContextType>({
  colors: constants.dark,
});

Appearance.setColorScheme('dark');

function ThemeProvider({children}: LayoutProps) {
  const theme = useColorScheme() ?? 'dark';

  const value = useMemo(
    () => ({
      colors: constants[theme],
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
