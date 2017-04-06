var fs = require('node-fs'),
    fse = require('fs-extra'),
    json = require('json-file'),
    themeName = json.read('./package.json').get('themeName'),
    themeDir = '../' + themeName;

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('init', function() {

  fs.mkdirSync(themeDir, 765, true);

  fse.copySync('theme-boilerplate', themeDir + '/');

});

gulp.task('sass', function() {
  gulp.src('css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('build'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('img', function() {
  return gulp.src('img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
    return del(['build', 'build/img']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'js', 'img', 'watch');
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('css/**/*.scss', ['sass']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['js']);

  // Watch image files
  gulp.watch('img/**/*', ['img']);

});
