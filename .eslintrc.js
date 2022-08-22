module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    indent: ['error', 2],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': [0, 'never'],
    'array-bracket-spacing': [0, 'never'],
    'computed-property-spacing': [0, 'never'],
    'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-extend-native': 'off',
    'max-len': ['error', { code: 80 }],
    quotes: [1, 'single', { allowTemplateLiterals: true }],
    'import/extensions': 'off'
  }
}
