export function processScripts(gulp, plugins, paths) {
  // Note: Since we are not using useref in the scripts build pipeline,
  // you need to explicitly list your scripts here in the right order
  // to be correctly concatenated
  return () => {
    gulp.src(paths.scripts)
      .pipe(plugins.newer('.tmp/scripts'))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel())
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(plugins.concat('main.min.js'))
      .pipe(plugins.uglify({ preserveComments: 'some' }))
      // Output files
      .pipe(plugins.size({ title: 'scripts' }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/scripts'));
  };
};

