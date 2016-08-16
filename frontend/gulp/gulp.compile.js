/**
 * Created by Max on 08.05.2016.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('./gulp.path.js').path,
    typescript = require('gulp-tsc');
ts = require('gulp-typescript');


gulp.task('compile', ['typescript'], function () {
    return null;
});
/*
gulp.task('typescript', function () {
    return gulp.src(path.typescript.src)
        .pipe(typescript())
        .pipe(gulp.dest(path.typescript.dst));
});
*/

gulp.task('typescript', ['javascript', 'tslint'], function () {
    return gulp.start('typescript-task');
});

gulp.task('typescript-task', function () {
    try {
        return gulp.src(path.typescript.src)
            .pipe(ts({

            }))
            .pipe(gulp.dest(path.typescript.dst));
    } catch (ex) {
        console.log(ex);
    }

});
gulp.task('javascript', function () {
    return gulp.src(path.javascript.src)
        .pipe(gulp.dest(path.javascript.dst));
});