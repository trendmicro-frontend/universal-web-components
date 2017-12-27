var gulp = require('gulp')
var less = require('gulp-less')
var path = require('path')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')

gulp.task('less', function () {
    var processors = [autoprefixer]
    gulp.src('./src/third-party/less/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/styles'));
    gulp.src('./src/third-party/less/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('./src/third-party/less/images/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['less']);