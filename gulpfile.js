const gulp = require('gulp'); //Подключаем галп
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const node_sass = require('node-sass');
gulp.task('scss', function (done) {
    return gulp.src('./app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/'));
    done();
})

gulp.task('watch', function () {
    watch('./app/scss/**/*.scss', function () {
        setTimeout(gulp.parallel('scss'), 1000)
    })
    watch(['./dist/*.html', './dist/*.css'], gulp.parallel(browserSync.reload));

});

gulp.task('server', function (done) {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })

});

gulp.task('default', gulp.parallel('scss', 'server', 'watch'));
