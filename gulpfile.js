// Load plugins
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');
const path = require('path');
const mkdirp = require('mkdirp');
const isparta = require('isparta');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const through =require('through2');
const globby = require('globby');

const manifest = require('./package.json');
const config = manifest.configOptions;
const mainFile = manifest.main;

// Paths
const paths = {
  src: 'src/**/*.js',
  test: 'test/**/*.js',
  dist: 'dist',
  lib: 'lib'
};

// Make babel preprocess the scripts the user tries to import from here on.
require('babel-register');

// Linter function
function createLintTask(taskName, files) {
  gulp.task(taskName, function() {
    return gulp.src(files)
      .pipe($.plumber())
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.eslint.failAfterError());
  });
}

// Lint our source code
createLintTask('lint:src', [])

// Lint our test code
createLintTask('lint:test', [paths.test])

// Test function
function test() {
  // return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
  //   .pipe($.plumber())
  //   .pipe($.mocha({reporter: 'dot', globals: config.mochaGlobals}));
}

// Clean folders
function clean(folder) {
  // Remove the folder and files
  del([folder]).then( function() {
    // Create our output directory
    mkdirp.sync(folder);
  });
}

// Build the library
gulp.task('build:lib', ['lint:src'], function() {
  clean(paths.lib);

  return gulp.src([paths.src])
    .pipe($.plumber())
    .pipe($.babel())
    .pipe(gulp.dest(paths.lib));
});

// Build the dist files
gulp.task('build:dist', ['lint:src'], function() {
  clean(paths.dist);

  var bundledStream = through();

  bundledStream
    .pipe($.plumber())
    .pipe(source('dreamwidth.min.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist));

  globby([paths.src]).then(function(entries) {
    var b = browserify({
      entries: entries,
      debug: true
    }).transform('babelify', { presets: ['es2015'] })
      .bundle()
      .pipe(bundledStream);
  }).catch(function(err) {
    bundledStream.emit('error', err);
  });

  return bundledStream;
});

gulp.task('coverage', function(done) {
  gulp.src([paths.src])
    .pipe($.plumber())
    .pipe($.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      return test()
      .pipe($.istanbul.writeReports())
      .on('end', done);
    });
});

// Lint and run tests
gulp.task('test', ['lint:src'], test); // TODO: add 'lint:test'

// Watch
gulp.task('watch', ['test'], function() {
  gulp.watch([paths.src, paths.test, 'package.json', '**/.eslintrc'], ['test']);
});

// Build and bundle the library
gulp.task('build', ['build:lib', 'build:dist']);

// Default task
gulp.task('default', ['test']);
