'use strict';

import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import loadGulpPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import karma from 'karma';


const tasks = {};
const defaultBuildDirectory = './public';

// This gulp's file base bath should be the root of the project
const basename = path.basename(module.filename);

// if developer does not provide a new[optional] build folder
// it defaults to './public'
// can also be changed from here
if (!process.env.PROJECT_BUILD_FOLDER) {
  process.env.PROJECT_BUILD_FOLDER = defaultBuildDirectory;
}
tasks.projectBuildFolder = process.env.PROJECT_BUILD_FOLDER;

// Loads up all 'gulp-*' dependencies saved in package.json
const plugins = loadGulpPlugins();

// This are directory locations of all the files
// that make up the project
const paths = {
  images: 'app/images/**/*',
  jade: [
    '!app/views/layouts/*.jade',
    '!app/views/includes/*.jade',
    'app/views/**/*.jade',
  ],
  styles: [
    'app/styles/less/*.+(less|css)',
    '!app/styles/less/layouts/*.+(less|css)',
    '!app/styles/less/base/*.+(less|css)',
  ],
  staticFiles: [
    '!app/**/*.+(less|css|jade)',
    '!app/scripts/*.js',
    '!app/images/**/*',
    'app/**/*.*',
  ],
  staticScripts: ['app/libs/**/*.js'],
  scripts: 'app/scripts/**/*.js',
  backendScripts: 'server/**/*.+(js|coffee)',
  unitTests: [],
  serverTests: ['tests/server/**/*.spec.js'],
  libTests: ['public/vendor/**/tests/**/*.js'],
  // If you're serving your application using node.js
  // use the option commented and set the correct proxy you are using
  // For express is usually: localhost:3000
  serverURL: process.env.PROJECT_BUILD_FOLDER, // localhost:3000
};

// build directories for individual type of files
paths.html = process.env.PROJECT_BUILD_FOLDER + '/*.html';
paths.builtScripts = process.env.PROJECT_BUILD_FOLDER + '/js/**/*.js';
paths.builtStyles = process.env.PROJECT_BUILD_FOLDER + '/css/**/*.css';

// Plugins that do not start with 'gulp' have to loaded up manually
// and injected into the plugins object carrying
// the previously loaded up gulp plugins
plugins.browserSync = browserSync;
plugins.browserify = browserify;
plugins.babelify = babelify;
plugins.source = source;
plugins.buffer = buffer;

// initialise browserSync
plugins.browserSync.create();

// Require this to convert different ways of naming files into carmel case
// eg. clean-script.js, clean.scripts.js, clean_scripts.js, static_files-public.js
const camelCaseString = (string) =>
  ((/^[A-Z]/g.test(string) ? '-' : '') + string)
  .replace(/[-_.]+([^-_.])/g, (p1, p2) => p2.toUpperCase());

// This function gets all the tasks from your tasks folder
// adding the functions into tasks object
fs.readdirSync(path.join(__dirname, './tasks'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename))
  .forEach((file) => {
    // check if it's a javascript file, if not terminate current loop
    if (file.slice(-3) !== '.js') {
      return;
    }

    const module = require('./tasks/' + file);
    const filename = file.slice(0, file.length - 3);
    tasks[camelCaseString(filename)] = module[Object.keys(module)[0]];
  });

// console.log('List of tasks loaded: \n', tasks);
gulp.task('clean-styles', tasks.cleanStyles(gulp, plugins));
gulp.task('clean-scripts', tasks.cleanScripts(gulp, plugins));
gulp.task('clean-html', tasks.cleanHtml(gulp, plugins));

gulp.task('bower', tasks.bower(gulp, plugins));
gulp.task('browser-sync', tasks.browsersync(gulp, plugins, paths));

gulp.task('jade', tasks.jade(gulp, plugins, paths));
gulp.task('less', tasks.less(gulp, plugins, paths));
gulp.task('html', tasks.html(gulp, plugins, paths));

gulp.task('browserify', tasks.scriptsBrowserify(gulp, plugins, paths));
gulp.task('scripts', tasks.scripts(gulp, plugins, paths));

gulp.task('images', tasks.images(gulp, plugins, paths));
gulp.task('static-files', tasks.staticFiles(gulp, plugins, paths));

gulp.task('test:fend', () =>
  // Be sure to return the stream
  gulp.src(paths.unitTests)
  .pipe(karma({
    configFile: __dirname + '/karma.conf.js',
    action: 'run',
  }))
  .on('error', (err) => {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  }));

// Files to watch
gulp.task('watch', () => {
  // We want to watch all files
  // not the only ones compiled and moved to build folder
  // Since they import/include these other files
  // So we remove the '!' mark, which denotes ignore from each path
  gulp.watch(paths.jade.map(p => p.replace(/!/g, '')), ['jade']);
  gulp.watch(paths.styles.map(p => p.replace(/!/g, '')), ['less']);
  gulp.watch(paths.scripts, ['browserify']);
  gulp.watch(['./gulpfile.babel.js', './tasks/**/*.js'], ['build']);
});


// helpers tasks
gulp.task('clean', ['clean-scripts', 'clean-styles', 'clean-html']);

// Check if nodemon exists, was installed by you
// if was, high chances is that you're using node.js to serve your application
// if not, then browserify can be used to serve up the app statically
try {
  require('gulp-nodemon');
  gulp.task('nodemon', tasks.nodemon(gulp, plugins));

  gulp.task('default', ['nodemon', 'watch', 'build']);
  gulp.task('production', ['nodemon', 'build']);
} catch (e) {
  gulp.task('default', ['watch', 'build']);
  gulp.task('production', ['build']);
}

// default tasks
gulp.task('build', ['jade', 'less', 'static-files', 'images', 'browserify', 'bower']);
gulp.task('sync', ['clean', 'default', 'browser-sync']);

// for heroku
gulp.task('heroku:production', ['build']);
gulp.task('heroku:staging', ['build']);

// for tests
gulp.task('test', ['test:fend']);
