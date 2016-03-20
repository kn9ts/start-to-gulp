export function optimiseImages(gulp, plugins) {
  return () => {
    gulp.src('app/images/**/*')
      .pipe(plugins.cache(plugins.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      })))
      .pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER + '/images'))
      .pipe(plugins.size({ title: 'images' }));
  };
}

