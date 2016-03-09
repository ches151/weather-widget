/* global module */
// Karma configuration
// Generated on Wed Mar 02 2016 02:53:18 GMT+0500 (Russia TZ 4 Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
          'Scripts/angular/angular.js',
          'Scripts/angular/angular-mocks.js',
          'Scripts/angular/angular-resource.js',
          'Scripts/angular/angular-route.js',
          'Scripts/angular/angular-messages.js',
          'Scripts/angular-material/angular-material.js',
          'Scripts/angular-aria/angular-aria.js',
          'Scripts/angular-animate/angular-animate.js',
          'widget-editor/**/*.js',
          'widget/**/*.js',
          'test/unit/**/*.js'
        ],

        // list of files to exclude
        exclude: [
            'Scripts/_references.js',
            'Scripts/modernizr-2.8.3.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        // configure which files should be tested for coverage
        preprocessors: {},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'dots', 'kjhtml'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        plugins: [
            'karma-jasmine-html-reporter',
           'karma-chrome-launcher',
           'karma-jasmine'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
