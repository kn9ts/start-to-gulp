export function browserify(gulp, plugins) {
  const cachebust = new plugins.cachebust();
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
      .pipe(plugins.buffer())
      .pipe(cachebust.resources())
      // .pipe(plugins.uglify())
      .on('error', plugins.util.log)
      // vinyl-source-stream makes the bundle compatible with gulp
      .pipe(plugins.rename('main.js'))
      .pipe(plugins.sourcemaps.init({
        loadMaps: true
      }))
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest('./public/js/'));
  }
};

