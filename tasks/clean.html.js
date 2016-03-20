export function cleanHTMLFiles(gulp, plugins) {
  return () => {
    return gulp.src(process.env.PROJECT_BUILD_FOLDER + '/*.html', {
        read: false
      })
      .pipe(plugins.clean());
  };
}

