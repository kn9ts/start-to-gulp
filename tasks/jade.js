export function compileJade(gulp, plugins, paths) {
  var LOCAL_SETTINGS = {
    pretty: true
  };

  return () => {
    gulp.src(paths.jade)
      .pipe(plugins.jade({
        locals: LOCAL_SETTINGS
      }))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER));
  };
};

