/**
 * Created by Max on 09.05.2016.
 */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('./gulp.path.js').path,
    typescript = require('gulp-tsc');

gulp.task('assets',['concat-assetsJs','concat-assetsCss','concat-scripts'],function () {
    return null;
});


gulp.task('concat-assetsJs', ['copy'], function () {
    return gulp.src(path.assetsJs.src)
        //.pipe(concat('assets.js'))
        .pipe(gulp.dest(path.assetsJs.dest));
});

gulp.task('concat-scripts', ['concat-assetsJs'], function () {
    return gulp.start('concat-scripts-task');
});

gulp.task('concat-scripts-task', function () {
    return gulp.src(path.scripts.src)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(path.scripts.dest));
});


gulp.task('concat-assetsCss', ['copy'], function () {
    return gulp.src(path.assetsCss.src)
        .pipe(concat('assets.css'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.assetsCss.dest));
});
