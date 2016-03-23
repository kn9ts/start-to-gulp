export function initBrowserSync(gulp, plugins, paths) {
  var config = {};
  config.logPrefix = 'awesome project';
  config.reloadDebounce = 3000;

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

  return () => {
    // var bs = plugins.browseSync;
    // bs.watch(paths.html).on('change', (file) => bs.reload);
    // bs.watch(paths.builtScripts).on('change', (file) => bs.reload);
    // bs.watch(paths.builtStyles).on('change', (file) => bs.reload('**/*.css'));
    plugins.browserSync.init(config);
  }
}
