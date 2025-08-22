/* eslint-disable @typescript-eslint/no-require-imports, no-undef */
const js = require('@eslint/js');
const ts = require('typescript-eslint');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const rn = require('eslint-plugin-react-native');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  { ignores: ['node_modules/', 'dist/', 'build/', 'android/', 'ios/'] },

  {
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: true, node: true },
    },
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat.recommended,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
      'react-native': rn,
      import: importPlugin,
    },
    rules: {
      ...prettier.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];
