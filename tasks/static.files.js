export function copyStaticFiles(gulp, plugins, paths) {
  return () => gulp.src(paths.staticFiles).pipe(gulp.dest(process.env.PROJECT_BUILD_FOLDER));
};

