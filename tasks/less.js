export function preprocessLess(gulp, plugins, paths) {
  const cachebust = new plugins.cachebust();
  return () => {
    gulp.src(paths.styles)
      .pipe(plugins.plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(plugins.less())
      .pipe(plugins.autoprefixer('last 5 versions'))
      .pipe(gulp.dest('public/css/'))
      // Remove any unused CSS
      .pipe(plugins.uncss({
        html: [
          '../public/**/*.html'
        ],
        // CSS Selectors for UnCSS to ignore
        ignore: []
      }))
      .pipe(plugins.rename({
        suffix: '.min'
      }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.cssnano())
      .pipe(cachebust.resources())
      .pipe(plugins.rename('application.min.css'))
      .pipe(gulp.dest('public/css/'))
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(plugins.browserSync.reload({
        stream: true
      }));
  };
};

