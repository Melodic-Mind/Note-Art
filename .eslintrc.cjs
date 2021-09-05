module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended', 'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2021,
    'sourceType': 'module',
  },
  'plugins': ['@typescript-eslint'],
  'ignorePatterns': ['lib', 'node_modules'],
  'rules': {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error','single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        if: { after: false },
        for: { after: false },
      },
    }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'never'],
    'template-curly-spacing': ['error', 'never'],
    'dot-notation': 'off',
    'space-in-parens': ['error', 'never'],
    camelcase: 'off',
    'no-unused-vars': 'error',
    'no-undef': 'off',

    //typescript
    '@typescript-eslint/no-var-requires': 'off',
  },
};
