/**
 * Created by Max on 09.05.2016.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('./gulp.path.js').path,
    typescript = require('gulp-tsc');
ts = require('gulp-typescript');

gulp.task('copy',['copy-font-awesome','copy-assets','copy-datatablesTranslationFiles','copy-img','copy-patterns','copy-fonts'],function () {
    return null;
});

gulp.task('copy-assets',function () {
    return gulp.src(path.assets.src)
        .pipe(gulp.dest(path.assets.dest));
});

gulp.task('copy-font-awesome',function () {
    return gulp.src(path.fontAwesome.src)
        .pipe(gulp.dest(path.fontAwesome.dest));
});

gulp.task('copy-img',function () {
    return gulp.src(path.img.src)
        .pipe(gulp.dest(path.img.dest));
});

gulp.task('copy-patterns',function () {
    return gulp.src(path.patterns.src)
        .pipe(gulp.dest(path.patterns.dest));
});

gulp.task('copy-fonts',function () {
    return gulp.src(path.fonts.src)
        .pipe(gulp.dest(path.fonts.dest));
});

gulp.task('copy-datatablesTranslationFiles',function () {
    return gulp.src(path.datatablesTranslationFiles.src)
        .pipe(gulp.dest(path.datatablesTranslationFiles.dest));
});

