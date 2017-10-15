module.exports = {
  extends: 'airbnb-base',
  plugins: ['import'],
  env: {
    jest: true,
  },
  rules: {
    'no-underscore-dangle': 'off',
  },
};
