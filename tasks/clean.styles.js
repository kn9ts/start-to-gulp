export function cleanStyles(gulp, plugins) {
  return () => {
    return gulp.src(process.env.PROJECT_BUILD_FOLDER + '/css/**/*.+(css|map)', {
        read: false
      })
      .pipe(plugins.clean());
  };
}

