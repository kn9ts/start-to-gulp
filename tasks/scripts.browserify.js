export function transformScriptsFromBrowserify(gulp, plugins) {
  console.log('Enviroment: ' + String(process.env.ENV));
  const production = (process.env.ENV == 'production');

  return () => {
    var b = plugins.browserify({
      entries: './app/scripts/main.js',
      debug: true,
      paths: [
        './app/scripts/controllers/*.js',
        './app/scripts/decorators/*.js',
        './app/scripts/services/*.js',
        './app/scripts/directives/*.js',
        './app/scripts/filters/*.js',
        './app/scripts/routes/*.js',
        './app/scripts/**/*.js'
      ],
      transform: [plugins.ngAnnotate]
    });

    return b.bundle()
      .pipe(plugins.source('main.js'))
      // vinyl-source-stream makes the bundle compatible with gulp
      .pipe(plugins.buffer())
      .pipe(plugins.rename(production ? 'main.min.js' : 'main.js'))
      .pipe(plugins.sourcemaps.init({
        loadMaps: true
      }))
      // Add transformation tasks to the pipeline here.
      .pipe(plugins.if(production, plugins.uglify()))
      // .pipe(plugins.if(production, plugins.rename('main.min.js')))
      .on('error', plugins.util.log)
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest('./public/js/'))
      .pipe(plugins.browserSync.reload({
        stream: true
      }));
  }
};

