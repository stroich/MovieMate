module.exports = {
  root: true,
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    '@react-native',
    'prettier',
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react', 'react-native', 'import'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    'react-native/sort-styles': 'off',
    'react-native/no-raw-text': ['error', {skip: ['ThemedText']}],
    'react-native/no-unused-styles': 'off',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*', './*'],
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {order: 'asc'},
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
  },
};
