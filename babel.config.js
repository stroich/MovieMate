module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@store': './src/store',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@mock': './src/mock',
          '@page': './src/page',
          '@type': './src/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
