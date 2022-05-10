module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: 'airbnb-base',
  rules: {
    'max-len': ['error', { code: 140, ignoreComments: true }],
    'no-param-reassign': ['error', { props: false }],
    'guard-for-in': 'off',
    'max-classes-per-file': 'off',
  },
};
