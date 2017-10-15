const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    'quick-redux': path.resolve(__dirname, 'src/index.js'),
    vendor: 'redux',
  },
  target: 'web',
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    filename: '[name].js',
  },
  plugins: [
    new CleanPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel-loader'],
      },
    ],
  },
};
