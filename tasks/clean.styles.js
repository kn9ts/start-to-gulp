export function cleanStyles(gulp, plugins) {
  return () => {
    return gulp.src('public/css/**/*.+(css|map)', {
        read: false
      })
      .pipe(plugins.clean());
  };
}

