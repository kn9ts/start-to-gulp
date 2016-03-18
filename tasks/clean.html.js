export function cleanHTMLFiles(gulp, plugins) {
  return () => {
    return gulp.src('./public/*.html', {
        read: false
      })
      .pipe(plugins.clean());
  };
}

