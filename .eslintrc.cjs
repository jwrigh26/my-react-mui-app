module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: 'detect',
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': 'error',
    'react/jsx-no-bind': 'off',
    // Turned off
    'react-hooks/exhaustive-deps': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    // My rules
    'no-plusplus': 'error',
    'no-nested-ternary': 'error',
    'no-confusing-arrow': 'off', // I'll be the judge of this for it is confusing ;)
    'jsx-a11y/anchor-is-valid': 'off', // TODO: revisit
    'jsx-a11y/iframe-has-title': 'off',
    'no-return-await': 'off',
    'no-underscore-dangle': 'off',
    'no-undef': 'error',
    'no-extra-boolean-cast': 'off',

    // handled by prettier
    indent: 'off',
    'object-curly-spacing': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'generator-star-spacing': 'off',
    'react/jsx-curly-newline': 'off',
    'function-paren-newline': 'off',
    'array-bracket-spacing': 'off',
    quotes: 'off',
    'space-before-function-paren': 'off',
    'react/jsx-indent': 'off',
    semi: 'off',

    // show as warnings
    'prefer-template': 'warn',
    'object-shorthand': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/no-array-index-key': 'warn',
    'prefer-destructuring': 'warn',
    'react/destructuring-assignment': 'warn',
    'no-param-reassign': 'off', // TODO: turn this to "warn" after figuring out how to exclude slice files.
    'no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
    'no-useless-computed-key': 'off',
    'no-useless-catch': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'max-len': [
      2,
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: '^import .*',
      },
    ], // specify the maximum length of a line in your program (off by default)
  },
};
