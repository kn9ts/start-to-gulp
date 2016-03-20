export function cleanScripts(gulp, plugins) {
  return () => {
    return gulp.src(process.env.PROJECT_BUILD_FOLDER + '/js/**/*.+(js|map)', {
        read: false
      })
      .pipe(plugins.clean());
  };
}

