
var gulp = require('gulp'),
    path = require('./gulp.path.js').path,
    tslint = require("gulp-tslint");

gulp.task("tslint", function () {

    return gulp.src(path.typescript.src)
        .pipe(tslint({
            formatter: "prose",
            emitError: false,
            configuration: "frontend/gulp/tslintOptions.json"
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }))
});

