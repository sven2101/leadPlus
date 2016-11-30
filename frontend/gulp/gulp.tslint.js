
var gulp = require('gulp'),
    path = require('./gulp.path.js').path,
    tslint = require("gulp-tslint"),
    todo = require('gulp-todo'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    gulpIf = require('gulp-if');

gulp.task("tslint", ["todo"], function () {

    return gulp.src(path.typescript.src)
        .pipe(tslint({
            formatter: "prose",
            emitError: false,
            configuration: "frontend/gulp/tslintOptions.json"
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));

});


gulp.task('todo', function () {
    gulp.src(path.typescript.src)
        .pipe(todo())
        .pipe(gulpIf(function (file) {
            logTodos(file.todos);
            return file.todos && Boolean(file.todos.length);
        }, gulp.dest('frontend/gulp/.'), vinylPaths(del)));
});

var logTodos = function (todos) {
    if (todos == null || todos.length == 0) {
        return;
    }
    console.log("Todos:");
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        console.log(todo.line + ': ' + todo.file + ': ' + todo.text);
    }

};