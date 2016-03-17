export function browserSync(gulp, plugins) {
  return () => {
    plugins.browserSync.init({
      server: {
        proxy: "localhost:3000"
      }
    });
  };
};

