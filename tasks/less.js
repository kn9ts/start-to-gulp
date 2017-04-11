export function preprocessLess(gulp, plugins, paths) {
  const production = (process.env.ENV == 'production');

  return () => {
    gulp.src(paths.styles)
      .pipe(plugins.size({ title: 'Before:', showFiles: true }))
      .pipe(plugins.plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        }
      }))
      .pipe(plugins.less())
      .pipe(plugins.autoprefixer('last 5 versions'))
      // Remove any unused CSS
      .pipe(plugins.uncss({
        html: [process.env.PROJECT_BUILD_FOLDER + '/**/*.html'],
        // CSS Selectors for UnCSS to ignore
        ignore: []
      }))
      .pipe(plugins.sourcemaps.init())
      // minify on production environment
      .pipe(plugins.if(production, plugins.cssnano()))
      .pipe(plugins.sourcemaps.write('./maps'))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER + '/css/'))
      .pipe(plugins.size({ title: 'After:', showFiles: true }))
      .pipe(plugins.browserSync.stream({ match: '**/*.css' }));
  };
};
