'use strict';
module.exports = (config) => {
  const babelConfig = JSON.parse(require('fs').readFileSync('.babelrc'));
  babelConfig.plugins.push(['istanbul', {
    exclude: [
      '**/*.spec.js',
      'public/vendor/**/*.js',
      'app/scripts/services/*.js',
    ],
  }]);

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // enable / disable watching file and executing tests whenever any file changes
    // on true, on Circle CI will break
    autoWatch: false,
    singleRun: true,


    // your prefered testing framework, be sure to install the karma plugin
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai', 'browserify'],


    browserify: {
      debug: true,
      transform: [
        [
          'babelify', babelConfig,
        ],
      ],
    },


    // files to include, ordered by dependencies
    // list of files / patterns to load in the browser
    files: [
      { pattern: 'public/index.html', watched: false },
      'node_modules/babel-polyfill/dist/polyfill.min.js',
    ],


    plugins: [
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sinon-chai',
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // 'app/scripts/**/!(*main).js': ['browserify', 'coverage'],
      'tests/**/*.js': ['browserify'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage', 'spec', 'failed'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values:
    // - config.LOG_DISABLE
    // - config.LOG_ERROR
    // - config.LOG_WARN
    // - config.LOG_INFO
    // - config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // Options:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    // - IE
    browsers: ['Chrome'],

    // https://www.youtube.com/watch?v=FQwZrOAmMAc
    // To turn off chrome's security limitations that do not allow some basics things to run
    // That are required while developing
    // customLauncher: {
    //   chrome_without_security: {
    //     base: 'Chrome',
    //     flags: ['--disable-web-security']
    //   }
    // },

    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'html',
        subdir: 'html',
      }, {
        type: 'lcovonly',
        subdir: 'lcov',
      }, {
        type: 'cobertura',
        subdir: 'cobertura',
      }, {
        type: 'json',
        subdir: 'json',
      }],
    },

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
