/**
 * Created by Max on 08.05.2016.
 */
var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    watch = require('gulp-watch'),
    path = require('./gulp.path').path;
  


var opts = {
    comments: false
};

gulp.task('html',['minify-index','minify-main','minify-logout','minify-components-view'],function () {
    return null;
});

gulp.task('minify-index', function () {
    return gulp.src(path.index.src)
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(path.index.dst));
});

gulp.task('minify-main', function () {
    return gulp.src(path.main.src)
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(path.main.dst));
});

gulp.task('minify-logout', function () {
    return gulp.src(path.logout.src)
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(path.logout.dst));
});

gulp.task('minify-components-view', function () {
    return gulp.src(path.componentViews.src)
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(path.componentViews.dst));
       
  });

