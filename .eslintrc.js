module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 13,
  },
  extends: 'airbnb-base',
  rules: {
    'max-len': ['error', { code: 140, ignoreComments: true }],
    'no-param-reassign': ['error', { props: false }],
    'guard-for-in': 'off',
    'max-classes-per-file': 'off',
    'no-restricted-syntax': 'off',
  },
  settings: { // 設定require時能判斷path起始是由哪裡開始
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
};
