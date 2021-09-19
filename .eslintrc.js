module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    expect: true
  },
  extends: [
    'standard'
  ],
  rules: {
    'generator-star-spacing': 'off',
    semi: [2, 'always'],
    'space-before-function-paren': [2, 'never']
  }
};
