export function copyStaticFiles(gulp, plugins, paths) {
  return () => {
    return gulp.src(paths.staticFiles).pipe(gulp.dest('public/'));
  };
};

