/**
 * Created by Max on 08.05.2016.
 */

var baseSrcPath = 'frontend/src/';
// var baseDstPath = 'src/main/resources/static/';
var baseDstPath = 'src/main/resources/static/';
var baseTmpPath = 'frontend/tmp/';

module.exports = {
	path: {
		assetsJs: {
			src: [
				/*
				 '!'+baseSrcPath+'assets/js/angular/angular-mock.js',
				baseSrcPath + 'assets/js/jquery/jquery-2.2.1.min.js',
				baseSrcPath + 'assets/js/jquery/jquery-ui.min.js',
				baseSrcPath + 'assets/js/angular/angular.min.js',
				baseSrcPath + 'assets/js/bootstrap-datepicker.min.js',
				baseSrcPath + 'assets/js/datatables/datatables.min.js',
				baseSrcPath + 'assets/js/datatables/dataTables.buttons.js',
				*/
				'!' + baseSrcPath + 'assets/js/**/*.js.map',
				baseSrcPath + 'assets/js/**/*.js'],
			dest: baseDstPath + 'assets/js'
		},
		assetsCss: {
			src: [
				'!' + baseSrcPath
				+ 'assets/font-awesome/css/font-awesome.min.css',
				'!' + baseSrcPath
				+ 'assets/css/bootstrap/bootstrap.min.css',
				'!' + baseSrcPath + 'assets/css/style.css',
				baseSrcPath + 'assets/**/*.css'],
			dest: baseDstPath + 'assets'
		},
		fontAwesome: {
			src: baseSrcPath + 'assets/font-awesome/css/font-awesome.min.css',
			dest: baseDstPath + ''

		},
		img: {
			src: baseSrcPath + 'assets/img/**/*',
			dest: baseDstPath + 'assets/img'

		},
		patterns: {
			src: baseSrcPath + 'assets/css/patterns/**/*',
			dest: baseDstPath + 'assets/patterns'

		},
		fonts: {
			src: [baseSrcPath + 'assets/fonts/**/*',
				baseSrcPath + 'assets/font-awesome/fonts/**/*'],
			dest: baseDstPath + 'fonts'
		},
		assets: {
			src: [
				baseSrcPath
				+ 'assets/font-awesome/css/font-awesome.min.css',
				baseSrcPath + 'assets/css/bootstrap/bootstrap.min.css',
				baseSrcPath + 'assets/css/style.css'],
			dest: baseDstPath + 'assets'
		},
		datatablesTranslationFiles: {
			src: baseSrcPath + 'datatablesTranslationFiles/**/*',
			dest: baseDstPath + 'assets/datatablesTranslationFiles'
		},
		scripts: {
			src: [baseTmpPath + 'scripts'],
			dest: baseDstPath + 'assets'
		},
		index: {
			src: baseSrcPath + 'index.html',
			dst: baseDstPath + ''
		},
		main: {
			src: baseSrcPath + 'main.html',
			dst: baseDstPath + ''
		},
		logout: {
			src: baseSrcPath + 'logout.html',
			dst: baseDstPath + ''
		},
		componentViews: {
			src: baseSrcPath + 'components/**/*.html',
			dst: baseDstPath + 'components'
		},
		angular: {
			src: [
				baseTmpPath + 'js/App/App.Constants.js',
				baseTmpPath + 'js/App/App.Module.js',
				baseTmpPath + 'js/App/App.Controller.js',
				baseTmpPath + 'js/App/App.Resource.js',
				baseTmpPath + 'js/App/App.Common.js',
				//baseTmpPath + 'js/App/App.Route.js',
				baseTmpPath + 'js/App/App.Translation.js',

				baseTmpPath + 'js/**/*.js'
			],
			dst: baseDstPath + 'assets'
		},
		javascript: {
			src: baseSrcPath + 'components/**/*.js',
			dst: baseTmpPath + 'js/'
		},
		typescript: {
			src: [
				baseSrcPath + 'components/**/*.ts'],
			dst: baseTmpPath + 'js/'
		},
		clean: {
			src: [baseDstPath + '', '!' + baseTmpPath + 'js/app.module.js',
				'!' + baseTmpPath + 'js/app.routes.js',
				'!' + baseTmpPath + 'js/app.appCtrl.js',
				baseTmpPath + 'js/**/*.js']
		},
		browserSync: {
			src: [baseDstPath + '**/*.js', baseDstPath + '**/*.html']
		},
		proxy: 'http://localhost:5000',
		testConfig: 'frontend/test.config.js',
		fileHeader: baseSrcPath + 'FileHeader.txt'
	}
};