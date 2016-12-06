'use strict';
var gulp = require('gulp'),
	requireDir = require('require-dir');

requireDir('./frontend/gulp');

gulp.task('default', [
	'clean'
], function () {
	return gulp.start('default-task');
});

gulp.task('test', ['default-task'], function () {
	return gulp.start('test-task');
});

gulp.task('default-task', [
	'html',
	'typescript/angular-task',
	'copy',
	'assets',
	//'browserSync'
], function () {
	console.log("Compilation complete!");
});

gulp.task('watch', [
	'watch-minify-components-view',
	'watch-minify-main',
	'watch-minify-index',
	'watch-scripts',
	'watch-typescript/angular'
	//'watch-browserSync'
], function () {
	return;
});
