var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var gulppug = require('gulp-pug');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('views', function buildHTML() {
  return gulp.src('views/*.pug')
  .pipe(gulppug({
    // Your options in here. 
  }))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({stream:true}));
});



gulp.task('styles', function(){
  gulp.src(['assets/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch("assets/styles/**/*.scss", ['styles']);
  gulp.watch("views/*.pug", ['views']);
  gulp.watch(["*.html"], ['bs-reload']);
});