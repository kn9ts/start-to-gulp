export function browserSync(gulp, plugins, paths) {
  var config = {};

  // check if nodemon has been installed
  // high chances is that you're using node.js/nodemon to serve your application
  // if not, then use browseSync's static server
  try {
    // spun up a proxy server
    require('gulp-nodemon');
    config.proxy = paths.serveURL ? paths.serveURL : 'localhost:3000';
  } catch (err) {
    // if no path or the path provided is a directory path
    // spun up a static server
    config.server = {
      baseDir: paths.serveURL ? paths.serveURL : process.env.PROJECT_BUILD_FOLDER
    };
  }

  return () => plugins.browserSync.init(config);
}

