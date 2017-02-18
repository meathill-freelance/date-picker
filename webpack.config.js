/**
 * Created by realm on 2017/2/15.
 */
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  }
};