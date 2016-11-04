/**
 * Created by Max on 09.05.2016.
 */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('./gulp.path.js').path,
    typescript = require('gulp-tsc'),
    order = require('gulp-order');

gulp.task('assets', ['concat-assetsCss', 'concat-basic-js', 'concat-jquery-js', 'concat-angular-js', 'concat-datatable-js', 'concat-others-js', 'copy-unbundled-js'], function () {
    return null;
});

gulp.task('concat-basic-js', function () {
    return gulp.src(path.assetsJs.basic.src)

        .pipe(order([
            "jquery-2.2.1.min.js",
            "jquery.metisMenu.js",
            "jquery-ui.min.js",
            "jquery.slimscroll.min.js",
            "jquery.ui.touch-punch.min.js",
            "angular.min.js",
            "bootstrap.min.js",
            "*.js"
        ]))
        .pipe(concat("basic.js"))

        .pipe(gulp.dest(path.assetsJs.basic.dst));
})

gulp.task('concat-jquery-js', function () {
    return gulp.src(path.assetsJs.jquery.src)
        .pipe(order([
            "angular.min.js",
        ]))
        .pipe(concat("basic.js"))
        .pipe(concat("jquery.js"))
        .pipe(gulp.dest(path.assetsJs.jquery.dst));
})

gulp.task('concat-angular-js', function () {
    return gulp.src(path.assetsJs.angular.src)
        .pipe(concat("angular.js"))
        .pipe(gulp.dest(path.assetsJs.angular.dst));
})

gulp.task('concat-datatable-js', function () {
    return gulp.src(path.assetsJs.datatable.src)
        .pipe(concat("datatable.js"))
        .pipe(gulp.dest(path.assetsJs.datatable.dst));
})

gulp.task('concat-others-js', function () {
    return gulp.src(path.assetsJs.others.src)
        .pipe(order([
            "spin.min.js",
            "ladda.min.js",
            "ladda.jquery.min.js",
            "moment.min.js",
            "*.js"
        ]))
        .pipe(concat("others.js"))
        .pipe(gulp.dest(path.assetsJs.others.dst));
})

gulp.task('copy-unbundled-js', function () {
    return gulp.src(path.assetsJs.unbundled.src)
        .pipe(gulp.dest(path.assetsJs.unbundled.dst));
})



gulp.task('concat-assetsCss', function () {
    return gulp.src(path.assetsCss.src)
        .pipe(concat('assets.css'))
        //.pipe(uglify())
        .pipe(gulp.dest(path.assetsCss.dest));
});
