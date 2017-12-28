var gulp = require('gulp')
var less = require('gulp-less')
var path = require('path')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var prefixwrap = require("postcss-prefixwrap")

gulp.task('less', function () {
    var processors = [
        autoprefixer,
        prefixwrap(".uwc")
    ]
    gulp.src('./src/third-party/less/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/styles'))
    gulp.src('./src/third-party/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
    gulp.src('./src/third-party/images/**/*')
        .pipe(gulp.dest('dist/images'))
});

gulp.task('default', ['less']);