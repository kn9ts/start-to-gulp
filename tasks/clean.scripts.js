export function cleanScripts(gulp, plugins) {
  return () => {
    return gulp.src('public/js/**/*.+(js|map)', {
        read: false
      })
      .pipe(plugins.clean());
  };
}

