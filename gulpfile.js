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
	'angular',
	'copy',
	'assets',
	//'browserSync'
], function () {
	return;
});

gulp.task('watch', [
	'watch-angular',
	'watch-javascript',
	'watch-minify-components-view',
	'watch-minify-main',
	'watch-minify-index',
	'watch-scripts',
	//'watch-browserSync'
], function () {
	return;
});
	