var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    run = require('gulp-run'),
    cheerio = require('gulp-cheerio'),
    rename = require('gulp-rename'),
    mergeStream = require('merge-stream'),
    modifyFile = require('gulp-modify-file'),
    htmlhint = require('gulp-htmlhint'),
    watch = require('gulp-watch');

// this task will generate the xlf file, re-creates the default English translation file, copy to i18n folders, and then
// add missing translations to all translations
gulp.task('i18n-build', function () {
    runSequence('i18n-extract-xlf', 'i18n-default', 'i18n-merge-to-translations', 'i18n-xlf2ts');
});

var sourceElements = [];
gulp.task('i18n-get-source', function () {
    return gulp.src('./src/i18n/messages.en.xlf')
        .pipe(cheerio({
            run: function ($, file) {

                $('trans-unit').each(function () {
                    sourceElements.push($(this));
                });
            },
            parserOptions: {
                xmlMode: true
            }
        }));
});

gulp.task('i18n-merge-to-translations', ['i18n-get-source'], function () {
    var languages = ['de'];
    var tasks = [];
    for (var language of languages) {
        var path = "./src/i18n/messages." + language + ".xlf";
        tasks.push(
            gulp.src(path)
                .pipe(cheerio({
                    run: function ($, file) {
                        var sourceIds = [];
                        for (var sourceElement of sourceElements) {
                            var id = $(sourceElement).attr('id');
                            sourceIds.push(id);
                            var targetElement = $('#' + id);
                            if (targetElement.length == 0) {
                                // missing translation
                                $('body').append(sourceElement);
                            }
                        }
                        // now remove all redundant elements (i.e. removed)
                        $('trans-unit').map((function () {
                            var id = $(this).attr('id');
                            var existing = sourceIds.find((item) => { return item == id });

                            if (!existing) {
                                console.log("REMOVING");
                                // remove it 
                                $('#' + id).remove();
                            }
                        }));


                    },
                    parserOptions: {
                        xmlMode: true
                    }
                }))
                .pipe(gulp.dest('./src/i18n')));
    }
    return mergeStream(tasks);
})


// run ng-xi18n
gulp.task('i18n-extract-xlf', function () {
    return run('ng-xi18n').exec();
});



// create .ts files for all .xlf files so we can import it 
gulp.task('i18n-xlf2ts', function () {
    return gulp.src("./src/i18n/*.xlf")
        .pipe(rename(function (path) {
            path.extname = ".ts"
        }))
        .pipe(modifyFile(function (content, path, file) {
            var filename = path.replace(/^.*[\\\/]/, '')
            var language = filename.split(".")[1].toUpperCase();
            return "export const TRANSLATION_" + language + " = `" + content + "`;";
        }))
        .pipe(gulp.dest("./src/i18n"));
});

// copy all source values to the target value as a default translation and make that our English translation
gulp.task('i18n-default', function () {
    return gulp.src('./messages.xlf')
        .pipe(cheerio({
            run: function ($, file) {
                // Each file will be run through cheerio and each corresponding `$` will be passed here.
                // `file` is the gulp file object

                $('source').each(function () {
                    var source = $(this);
                    var target = source.parent().find('target');
                    //source.text(source.text().toUpperCase());
                    target.html(source.html());
                });
            },
            parserOptions: {
                xmlMode: true
            }

        }))
        .pipe(rename('messages.en.xlf'))
        .pipe(gulp.dest("./src/i18n"))
});

gulp.task('html', function () {
     gulp.start('html_task');
    watch('src/**/*.html', function () {
         gulp.start('html_task');
    });
    return null;
});

gulp.task('html_task', function () {
    return gulp.src([
        'src/**/*.html'
    ])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter());

});