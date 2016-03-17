export function compileJade(gulp, plugins, paths) {
  return () => {
    var LOCAL_SETTINGS = {};

    gulp.src(paths.jade)
      .pipe(plugins.jade({
        locals: LOCAL_SETTINGS
      }))
      .pipe(gulp.dest('./public/'));
  };
};

