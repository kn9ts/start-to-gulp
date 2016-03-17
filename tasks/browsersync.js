export function browserSync(gulp, plugins) {
  return () => {
    plugins.browserSync.init({
      server: {
        baseDir: "./public"
      }
    });
  };
}

