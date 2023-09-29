module.exports = {
  env: { browser: true, es2021: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: 'next',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    indent: ['off', 2],
    'linebreak-style': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/no-unknown-property': ['warn', { ignore: ['css'] }],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
