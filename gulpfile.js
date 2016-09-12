const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const sassPath = './blocks/';
const distPath = './dist/';

gulp.task('sass', () => {
  return gulp.src(sassPath + '*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(distPath));
});

gulp.task('sass:watch', ['sass'], () => {
  gulp.watch(sassPath + '*.scss', ['sass']);
});


gulp.task('build', ['webpack', 'sass']);