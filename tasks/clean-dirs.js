import gulp from 'gulp';
import clean from 'gulp-clean';

gulp.task('clean-styles', () => {
  return gulp.src('public/css/**/*.+(css|map)', {
      read: false
    })
    .pipe(clean());
});

gulp.task('clean-scripts', () => {
  return gulp.src('public/js/**/*.+(js|map)', {
      read: false
    })
    .pipe(clean());
});

