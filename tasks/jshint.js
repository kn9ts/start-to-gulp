export function jshint(gulp, plugins) {
  return () => {
    return gulp.src([
        './app/scripts/**/*.js',
        './index.js',
        './server/**/*.js',
        './tests/**/*.js'
      ])
      .pipe(plugins.jshint('../.jshintrc'))
      .pipe(plugins.jshint.reporter(jshintStylish))
      .pipe(plugins.jshint.reporter('fail'))
      .pipe(plugins.plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        }
      }));
  };
};

