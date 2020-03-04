'use strict';

let gulp            = require('gulp'),
    rigger          = require('gulp-rigger'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require("gulp-rename");


gulp.task('html', gulp.series(function(){
    return gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
}));

gulp.task('sass', function() {
    return gulp.src("src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});



// Static Server + watching js/scss/html files
gulp.task('serve', gulp.series('html', 'sass', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("./src/**/*.html",  gulp.parallel('html'));
    gulp.watch("./src/scss/**/*.scss", gulp.parallel('sass'));
    // gulp.watch("js/src/*.js", gulp.parallel('js'));
}));


gulp.task('default', gulp.series('serve'));