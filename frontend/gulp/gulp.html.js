/**
 * Created by Max on 08.05.2016.
 */
var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    watch = require('gulp-watch'),
    path = require('./gulp.path').path,
    htmlhint = require("gulp-htmlhint");



var opts = {
    comments: false
};

gulp.task('html', ['minify-index', 'minify-main', 'minify-logout', 'minify-components-view'], function () {
    return null;
});

gulp.task('minify-index', ['validate-single-view'], function () {
    return gulp.src(path.index.src)

        .pipe(minifyHTML(opts))
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest(path.index.dst));
});

gulp.task('minify-main', ['validate-single-view'], function () {
    return gulp.src(path.main.src)

        .pipe(minifyHTML(opts))
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest(path.main.dst));
});

gulp.task('minify-logout', ['validate-single-view'], function () {
    return gulp.src(path.staticHtml.src)

        .pipe(minifyHTML(opts))
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest(path.staticHtml.dst));
});

gulp.task('minify-components-view', ['validate-components-view'], function () {
    return gulp.src(path.componentViews.src)

        .pipe(minifyHTML(opts))
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest(path.componentViews.dst));

});

gulp.task('validate-components-view', function () {
    return gulp.src([
        path.componentViews.src
    ])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter());
})

gulp.task('validate-single-view', function () {
    return gulp.src([
        path.index.src,
        path.main.src,

    ])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter());
})




