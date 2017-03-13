// Load plugins
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// Paths
const paths = {
  src: 'src/**/*.js',
  test: 'test/**/*.js',
  dist: 'lib'
};

// Clean folders
gulp.task('clean', function() {
  return gulp.src(paths.dist)
    .pipe($.plumber())
    .pipe($.clean());
});

// Lint scripts
gulp.task('lint', function() {
  return gulp.src([paths.src])
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

// Build the library
gulp.task('build', ['clean', 'lint'], function() {
  return gulp.src([paths.src])
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest(paths.dist));
});

// Watch
gulp.task('watch', ['lint'], function() {
  gulp.watch([paths.src, paths.test], ['build']);
});

// Default task
gulp.task('default', ['build', 'watch']);