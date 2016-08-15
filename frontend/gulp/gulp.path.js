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
		componentViews: {
			src: baseSrcPath + 'components/**/*.html',
			dst: baseDstPath + 'components'
		},
		angular: {
			/*
			src: [
				baseTmpPath+'js/app/App.Module.js',
				baseTmpPath+'js/app/App.Controller.js',
				baseTmpPath+'js/app/App.Routes.js',

				baseTmpPath+'js/app/services.js',
				baseTmpPath+'js/app/directives/childrow.js',
				baseTmpPath+'js/app/directives/childrow.js',

				baseTmpPath+'js/dashboard/Dashboard.Controller.js',
				baseTmpPath+'js/leads/Lead.Controller.js',
				baseTmpPath+'js/login/Login.Controller.js',
				baseTmpPath+'js/signup/SignUp.Controller.js',
				baseTmpPath+'js/offers/offers.js',
				baseTmpPath+'js/offers/offersAction.js',
				baseTmpPath+'js/sales/sales.js',
				baseTmpPath+'js/statistics/Statistic.Controller.js',
				baseTmpPath+'js/settings/Settings.Controller.js',
				baseTmpPath+'js/profile/Profile.Controller.js',

				baseTmpPath+'js/models/User.js',
				baseTmpPath+'js/models/SharedItemsPieChart.js',
				baseTmpPath+'js/models/EntireStatisticSpline.js',
				baseTmpPath+'js/models/EntireStatisticArea.js',
				baseTmpPath+'js/models/LeadsConversionRate.js',
				baseTmpPath+'js/models/OffersConversionRate.js',
			],

			*/
			src: baseTmpPath + 'js/**/*.js',
			dst: baseDstPath + 'assets'
		},
		javascript: {
			src: baseSrcPath + 'components/**/*.js',
			dst: baseTmpPath + 'js/'
		},
		typescript: {
			src: [baseSrcPath + 'app.module.ts',
				baseSrcPath + 'app.routes.ts',
				baseSrcPath + 'app.appCtrl.ts',
				baseSrcPath + 'models/*.ts',
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