const fs = require('fs')

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.CI === 'true'

const prettierOptions = JSON.parse(fs.readFileSync('./.prettierrc', 'utf8'))

const allExtensions = ['.js', '.ts']

// http://eslint.org/docs/user-guide/configuring
// https://github.com/prettier/prettier#eslint
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: false,
    jest: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier', '@typescript-eslint', 'json', 'simple-import-sort'],
  rules: {
    'import/extensions': [2, 'ignorePackages', { js: 'never', ts: 'never' }],
    'prefer-promise-reject-errors': 0,
    'prettier/prettier': [2, prettierOptions],
    'no-console': isProduction ? 2 : 0,
    'no-debugger': isProduction ? 2 : 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'no-unused-vars': 0,
    'no-array-constructor': 0,
    'no-redeclare': [2, { builtinGlobals: true }],
    'no-underscore-dangle': [2, { allow: ['_id', '_rev', 'from_'] }],
    'no-shadow': 0,
    'sort-imports': 0,
    'import/order': 0,
    'simple-import-sort/exports': 1,
    'simple-import-sort/imports': [
      1,
      {
        groups: [
          // Side effect imports
          ['^\\u0000'],
          // Packages
          ['^@?[a-zA-Z0-9]'],
          // `lodash` related packages
          ['^lodash'],
          // Internal packages
          ['^Config(/.*|$)'],
          ['^Constants(/.*|$)'],
          ['^DataLoaders(/.*|$)'],
          ['^Entities(/.*|$)'],
          ['^Interfaces(/.*|$)'],
          ['^Middleware(/.*|$)'],
          ['^Models(/.*|$)'],
          ['^Policies(/.*|$)'],
          ['^Routes(/.*|$)'],
          ['^Schema/Shared(/.*|$)'],
          ['^Schema/Admin(/.*|$)'],
          ['^Schema/Public(/.*|$)'],
          ['^Schema(/.*|$)'],
          ['^Services(/.*|$)'],
          ['^Utils(/.*|$)'],
          // Other relative imports. Put same-folder imports and `.` last
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Parent imports. Put `..` last
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*.ts'],
      rules: {
        '@typescript-eslint/indent': 0,
        '@typescript-eslint/no-var-requires': 2,
        '@typescript-eslint/adjacent-overload-signatures': 2,
        '@typescript-eslint/consistent-type-assertions': 2,
        '@typescript-eslint/triple-slash-reference': 2,
        '@typescript-eslint/consistent-type-definitions': 2,
        '@typescript-eslint/array-type': 2,
        '@typescript-eslint/ban-types': 2,
        '@typescript-eslint/explicit-member-accessibility': 2,
        '@typescript-eslint/no-array-constructor': 2,
        '@typescript-eslint/no-empty-interface': 2,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-inferrable-types': 2,
        '@typescript-eslint/no-misused-new': 2,
        '@typescript-eslint/no-namespace': 2,
        '@typescript-eslint/no-non-null-assertion': 2,
        '@typescript-eslint/no-parameter-properties': 2,
        '@typescript-eslint/no-use-before-define': 2,
        '@typescript-eslint/prefer-namespace-keyword': 2,
        '@typescript-eslint/type-annotation-spacing': 2,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    typescript: true,
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: allExtensions,
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
