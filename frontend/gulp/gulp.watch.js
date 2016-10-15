/**
 * Created by Max on 18.06.2016.
 */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('./gulp.path.js').path,
    typescript = require('gulp-tsc');
ts = require('gulp-typescript');


gulp.task('watch-angular', ['default'], function () {
    watch(path.typescript.src, function () {
        gulp.start('angular-typescript');
    });
});

gulp.task('watch-javascript', ['default'], function () {
    watch(path.javascript.src, function () {
        gulp.start('angular-javascript');
    });
});

gulp.task('watch-minify-index', ['default'], function () {
    watch(path.index.src, function () {
        gulp.start('minify-index');
    });
    return null;
});

gulp.task('watch-minify-logout', ['default'], function () {
    watch(path.logout.src, function () {
        gulp.start('minify-logout');
    });
    return null;
});

gulp.task('watch-minify-main', ['default'], function () {
    watch(path.main.src, function () {
        gulp.start('minify-main');
    });
    return null;
});

gulp.task('watch-minify-components-view', ['default'], function () {
    watch(path.componentViews.src, function () {
        gulp.start('minify-components-view');

    });
    return null;
});

gulp.task('watch-scripts', ['default'], function () {
    watch(path.scripts.src, function () {
        gulp.start('concat-scripts-task');
    });
    return null;
});

gulp.task('watch-browserSync', ['default'], function () {
    watch(path.componentViews.dst, function () {

        browserSync.reload;
        console.log('BS');
    })
    return null;
});

gulp.task('watch-typescript/angular', ['default'], function () {
    watch(path.typescript.src, function () {
        gulp.start('complete');
    });
});

gulp.task('complete', ['typescript/angular-task'], function () {
    console.log("Compilation complete!");
});



