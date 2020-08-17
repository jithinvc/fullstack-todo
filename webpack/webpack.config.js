var webpack = require('webpack');
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//install
const HtmlWebPackPlugin = require('html-webpack-plugin');

var parentDir = path.join(__dirname, '../');
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log(process.env.NODE_ENV);
const plugins =[new HtmlWebPackPlugin({
  template: './index.html',
  filename: './index.html',
}),
  new MiniCssExtractPlugin({
  filename: isDevelopment ? '[name].css' : '[name].[hash].css',
  chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
})];
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
      loader: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: isDevelopment,
          },
        },
      ],
    }
    ]
  },
  plugins,
  performance: { hints: false },
  output: {
    path: parentDir + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:5000"
    },
  },
}