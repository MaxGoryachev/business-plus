
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    cache       = require('gulp-cache');

gulp.task('sass', function () {
    return gulp.src('site/sass/*.+(sass|scss)')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('site/css'))
});

gulp.task('min', ['sass'], function () {
    return gulp.src('site/css/main.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('site/css'))
});

gulp.task('clean-prod', function () {
    return del.sync('production')
});

gulp.task('watch', function () {
    gulp.watch('site/sass/**/*.+(sass|scss)', ['sass']);
    gulp.watch('site/css/main.css', ['min']);
});

gulp.task('fill', ['clean-prod', 'min'], function () {
    return gulp.src('site/**/*')
        .pipe(gulp.dest('production'))
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);