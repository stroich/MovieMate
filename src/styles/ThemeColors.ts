export const constants = {
  dark: {
    colorSecondaryDark: '#282c34',
    colorSecondaryDarkest: '#1a1c20',
    colorOpasity50: '#282c3480',
    colorOpasity75: '#282c34cc',
    colorGold: '#B8860B',
    colorInput: '#343536CC',
    colorGray: '#9a9797',
    colorForDetails: '#9a9797',
    colorText: '#ffffff',
  },
  light: {
    colorSecondaryDark: '#efebd5',
    colorSecondaryDarkest: '#ded7b3',
    colorOpasity50: '#282c3480',
    colorOpasity75: '#7e7a7acc',
    colorGold: '#f9e063',
    colorInput: '#bfb687CC',
    colorGray: '#524f4f',
    colorForDetails: '#fdf2c0',
    colorText: '#000000',
  },
};
export type ColorType = typeof constants.dark;
