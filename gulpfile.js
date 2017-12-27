var gulp = require('gulp')
var less = require('gulp-less')
var path = require('path')

gulp.task('less', function () {
    gulp.src('./src/third-party/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/styles'));
    gulp.src('./src/third-party/less/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
    gulp.src('./src/third-party/less/images/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['less']);