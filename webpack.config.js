/**
 * Created by realm on 2017/2/15.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    dev: './app/dev.js',
    standalone: './app/dev-standalone.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
    vue: 'Vue',
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules|dist|build|docs|css/,
    poll: 1000
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: true
    }),
  ],
  devtool: 'source-map',
};