const webpack = require('webpack');
const config = require('./webpack.config.js');

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: '"production"' },
  }),
);

module.exports = config;
