/**
 * Created by meathill on 2017/2/18.
 */

const gulp = require('gulp');
const sequence = require('run-sequence');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const webpack = require('gulp-webpack');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const DEST = 'build/';

gulp.task('clear', () => {
  return del(DEST);
});

gulp.task('stylus', () => {
  return gulp.src('./styl/screen.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(cleanCSS())
    .pipe(rename('tqb-date-picker.min.css'))
    .pipe(gulp.dest(DEST + 'css/'));
});

gulp.task('webpack', () => {
  return gulp.src('src/main.js')
    .pipe(webpack( require('./webpack.config')))
    .pipe(uglify())
    .pipe(rename('tqb-date-picker.min.js'))
    .pipe(gulp.dest(DEST + 'js/'));
});

gulp.task('default', callback => {
  sequence('clear',
    ['stylus', 'webpack'],
    callback
  );
});