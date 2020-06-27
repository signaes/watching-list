const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
    'import/external-module-folders': ['node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': [1, 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/button-has-type': [0],
    'react/jsx-one-expression-per-line': [0],
    'react/prop-types': [0],
  },
};
