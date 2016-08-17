/**
 * Created by Max on 08.05.2016.
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('./gulp.path.js').path,
    order = require("gulp-order"),
    typescript = require('gulp-tsc');
strip = require('gulp-strip-comments');
uglify = require("gulp-uglify");
removeUseStrict = require("gulp-remove-use-strict");
replace = require('gulp-replace');
addsrc = require('gulp-add-src');
livereload = require('gulp-livereload');



gulp.task('angular-typescript', ['typescript-task'], function () {
    return gulp.start('angular-task');
});

gulp.task('angular-javascript', ['javascript'], function () {
    return gulp.start('angular-task');
});

gulp.task('angular', ['compile'], function () {
    return gulp.start('angular-task');
});
/*
gulp.task('angular-task', function () {
    return gulp.src(path.angular.src)
        .pipe(concat('angular.js'))
        .pipe(gulp.dest(path.angular.dst));       
});
*/
gulp.task('angular-task', ['compile', 'javascript', 'typescript-task'], function () {
    
   return gulp.src(path.angular.src)
        .pipe(strip())
        .pipe(replace(/"use strict";/g, ''))
        /*
        .pipe(uglify({         
            compress: {
                warnings: true,
                unused: false,
            },
            mangle: false,
        }))
        */
        .pipe(concat('angular.js'))
        .pipe(addsrc(path.fileHeader))
        .pipe(concat('angular.js'))
        .pipe(gulp.dest(path.angular.dst));
        
});
