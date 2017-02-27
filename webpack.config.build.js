/**
 * Created by realm on 2017/2/15.
 */
const path = require('path');
const config = require('./webpack.config');

config.watch =false;
config.output.filename = '[name].min.js';
config.resolve.alias.config = path.resolve(__dirname, './config/build.js');

module.exports = config;