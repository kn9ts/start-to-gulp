export function compileJade(gulp, plugins, paths) {
  return () => {
    return gulp.src(paths.jade)
      .pipe(plugins.jade())
      // npm i gulp-prettify -D
      .pipe(plugins.prettify({ indent_size: 4 }))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER))
      .pipe(plugins.browserSync.stream({ match: '**/*.html'}));
  };
};
