module.exports = {
  env: { browser: true, es2021: true, node: true },
  extends: ['next/core-web-vitals', 'plugin:storybook/recommended'],
  overrides: [
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        // example of overriding a rule
        'storybook/hierarchy-separator': 'error',
        // example of disabling a rule
        'storybook/default-exports': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    indent: ['off', 2],
    'linebreak-style': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/no-unknown-property': ['warn', { ignore: ['css'] }],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
