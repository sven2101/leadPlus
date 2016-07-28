/**
 * Created by Max on 18.06.2016.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('./gulp.path.js').path,
    typescript = require('gulp-tsc');
clean = require('gulp-clean');
ts = require('gulp-typescript');

gulp.task('clean', function () {
    return gulp.src(path.clean.src, {read: false})
        .pipe(clean());
});

