
var gulp = require('gulp'),
    path = require('./gulp.path.js').path,
    tslint = require("gulp-tslint");

gulp.task("tslint", function () {
    gulp.src(path.typescript.src)
        .pipe(tslint({
            formatter: "prose",
            rulesDirectory: "frontend/gulp/tslintOptions.json"
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }))
}
);

