export function bower(gulp, plugins) {
  return () => plugins.bower().pipe(gulp.dest('public/vendor/'));
};

