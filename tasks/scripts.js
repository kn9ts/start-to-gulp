export function transpileScripts(gulp, plugins, paths) {
  return () => {
    const production = (process.env.ENV == 'production');
    // console.log('Enviroment: ' + String(process.env.ENV));

    gulp.src(paths.scripts)
      .pipe(plugins.size({ title: 'Before:', showFiles: true }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel())
      .pipe(plugins.concat('main.js'))
      .pipe(plugins.if(production, plugins.uglify({ preserveComments: 'some' })))
      // Output files
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER + '/js'))
      .pipe(plugins.browserSync.stream({ match: '**/*.js' }))
      .pipe(plugins.size({ title: 'After:', showFiles: true }));
  };
};
