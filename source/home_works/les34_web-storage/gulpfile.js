'use strict';

var gulp       	 = require('gulp'),
    browserSync	 = require('browser-sync').create(),
    sass       	 = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    sourcemaps   = require('gulp-sourcemaps');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("js/src/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("js"))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', 'js', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", gulp.parallel('sass'));
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/src/*.js", gulp.parallel('js'));
}));


gulp.task('default', gulp.series('serve'));