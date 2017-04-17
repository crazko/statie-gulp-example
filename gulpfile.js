var gulp = require('gulp');
var run = require('gulp-run');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

gulp.task('default', gulp.parallel(styles, generate, watch));

function styles() {
  return gulp.src('source/less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('output/css/'))
    .pipe(browserSync.stream());
};

function generate() {
  return run('vendor/bin/statie generate').exec();
};

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  browserSync.init({
    server: 'output'
  });

  gulp.watch('source/**/*.less', styles);
  gulp.watch(['source/**/*', '!source/less/**/*'], gulp.series(generate, reload));
}