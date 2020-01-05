var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, '../index.js')],
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          rootMode: 'upward',
        },
      },
    },
    {
      test: /\.s(a|c)ss$/,
      exclude: /\.module.(s(a|c)ss)$/,
      loader: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }
    ]
  },
  devtool: 'source-map',
  output: {
    path: parentDir + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
  },
}