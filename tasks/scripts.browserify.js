export function transformScriptsFromBrowserify(gulp, plugins, paths) {
  return () => {
    const production = (process.env.ENV == 'production');
    // console.log('Enviroment: ' + String(process.env.ENV));

    var b = plugins.browserify({
      entries: './app/scripts/main.js',
      debug: true,
      paths: [paths.scripts],
      transform: [plugins.ngAnnotate]
    });

    return b.bundle()
      .pipe(plugins.source('main.js'))
      // vinyl-source-stream makes the bundle compatible with gulp
      .pipe(plugins.buffer())
      .pipe(plugins.size({ title: 'Before:', showFiles: true }))
      // in PRODUCTION env, it should be minified but retain the name so that
      // one is not required to change the reference of the file in the script src links
      // .pipe(plugins.rename(production ? 'main.min.js' : 'main.js'))
      .pipe(plugins.sourcemaps.init({
        loadMaps: true
      }))
      // Add transformation tasks to the pipeline here.
      .pipe(plugins.if(production, plugins.uglify()))
      // .pipe(plugins.if(production, plugins.rename('main.min.js')))
      .on('error', plugins.util.log)
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER + '/js'))
      .pipe(plugins.size({ title: 'After:', showFiles: true }));
  }
};
