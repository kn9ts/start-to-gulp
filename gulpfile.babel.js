import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import loadGulpPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

var tasks = {};
const basename = path.basename(module.filename)
const plugins = loadGulpPlugins();
const paths = {
  public: 'public/**',
  images: 'app/images/**/*',
  jade: ['!app/includes/*.jade', 'app/**/*.jade'],
  styles: ['app/styles/*.+(less|css)', 'app/styles/layouts/*.+(less|css)', 'app/styles/base/*.+(less|css)'],
  staticFiles: [
    '!app/**/*.+(less|css|js|jade)',
    '!app/images/**/*',
    'app/**/*.*'
  ],
  scripts: 'app/scripts/**/*.js',
  backendScripts: 'server/**/*.+(js|coffee)',
  unitTests: [],
  serverTests: ['tests/resources/**/*.spec.js'],
  libTests: ['public/lib/tests/**/*.js']
};


browserSync.create();
plugins.browserSync = browserSync;
plugins.browserify = browserify;
plugins.source = source;
plugins.buffer = buffer;

String.prototype.toCamelCase = function() {
  return ((/^[A-Z]/g.test(this) ? "-" : "") + this).replace(/[-_.]+([^-_.])/g, function(p1, p2) {
    return p2.toUpperCase();
  });
};

fs.readdirSync(path.join(__dirname, './tasks'))
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    // check if it's a javascript file, if not terminate current loop
    if (file.slice(-3) !== '.js') {
      return;
    }

    var module = require('./tasks/' + file);
    var filename = file.slice(0, file.length - 3);
    tasks[filename.toCamelCase()] = module[Object.keys(module)[0]];
  });

// console.log(tasks);
gulp.task('clean-styles', tasks.cleanStyles(gulp, plugins));
gulp.task('clean-scripts', tasks.cleanScripts(gulp, plugins));

gulp.task('nodemon', tasks.nodemon(gulp, plugins));
gulp.task('browser-sync', tasks.browsersync(gulp, plugins));
gulp.task('bower', tasks.bower(gulp, plugins));

gulp.task('jade', tasks.jade(gulp, plugins, paths));
gulp.task('less', tasks.less(gulp, plugins, paths));
gulp.task('browserify', tasks.browserify(gulp, plugins, paths));

gulp.task('images', tasks.images(gulp, plugins, paths));
gulp.task('static-files', tasks.staticFiles(gulp, plugins, paths));
gulp.task('html', tasks.html(gulp, plugins, paths));
gulp.task('scripts', tasks.scripts(gulp, plugins, paths));

// Helpers tasks
gulp.task('clean', ['clean-scripts', 'clean-styles']);

// Default configs
gulp.task('build', ['jade', 'less', 'static-files', 'images', 'browserify', 'bower']);
gulp.task('sync', ['clean', 'default', 'browser-sync']);

try {
  require('nodemon');
  gulp.task('default', ['nodemon', 'watch', 'build']);
  gulp.task('production', ['nodemon', 'build']);
} catch (e) {
  gulp.task('default', ['watch', 'build', 'browser-sync']);
  gulp.task('production', ['build']);
}

// For heroku
gulp.task('heroku:production', ['build']);
gulp.task('heroku:staging', ['build']);

// Tests
gulp.task('test', ['test:fend', 'test:bend' /*, 'e2e' */ ]);

gulp.task('watch', () => {
  gulp.watch(paths.jade, ['jade'], browserSync.reload);
  gulp.watch(paths.styles, ['less'], browserSync.reload);
  gulp.watch(paths.scripts, ['browserify'], browserSync.reload);
  gulp.watch(['./gulpfile.babel.js'], ['build'], browserSync.reload);
});

