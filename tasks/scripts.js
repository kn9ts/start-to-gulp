export function transpileScripts(gulp, plugins, paths) {
  // Note: Since we are not using useref in the scripts build pipeline,
  // you need to explicitly list your scripts here in the right order
  // to be correctly concatenated
  return () => {
    gulp.src(paths.scripts)
      .pipe(plugins.size({ title: 'Before:', showFiles: true }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel())
      .pipe(plugins.concat('main.js'))
      .pipe(plugins.uglify({ preserveComments: 'some' }))
      // Output files
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER + '/js'))
      .pipe(plugins.size({ title: 'After:', showFiles: true }))
      .pipe(plugins.browserSync.reload({
        stream: true
      }));
  };
};

