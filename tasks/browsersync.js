export function browserSync(gulp, plugins, url) {
  var config = {};
  // if no path or the path provided is a directory path
  // spun up a static server
  if (!url || url.indexOf('./')) {
    config.server = {
      baseDir: url ? url : "./public";
    }
  } else {
    // else spun up a proxy server
    config.proxy = url ? url : 'localhost:3000';
  }

  return () => {
    plugins.browserSync.init(config);
  };
}

