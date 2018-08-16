'use strict'

module.exports = {
  parser: 'typescript-eslint-parser',
  extends: [
    'standard'
  ],
  plugins: [
    'typescript'
  ],
  rules: {
    'eqeqeq': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'space-infix-ops': 'off',
    'strict': 'off'
  }
}
