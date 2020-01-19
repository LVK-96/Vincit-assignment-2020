module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['jest'],
  env: {
    jest: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'global-require': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'no-console': 0,
    'no-param-reassign': 0,
  }
};
