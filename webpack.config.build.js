/**
 * Created by realm on 2017/2/15.
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const config = require('./webpack.config');

const time = Date.now();

config.watch =false;
config.output.filename = '[name].min.js';
config.plugins = [
  new webpack.DefinePlugin({
    DEBUG: false,
    VERSION: `${pkg.version}.${time}`
  })
];

module.exports = config;