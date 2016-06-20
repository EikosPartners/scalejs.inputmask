// Karma base configuration to share between configs.
var webpackConfig = require('../../webpack.config');

webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';

module.exports = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',

    // frameworks to use
    frameworks: ['mocha-debug', 'mocha', 'chai'],

    // list of files/patterns to load in the browser
    files: [
        'src/*.js',
        'test/tests/*.js'
    ],

    // list of files to exclude
    exclude: [

    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {
        'test/tests/*.js': ['webpack', 'sourcemap'],
        'src/**/*.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable/disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['Chrome'],

    // Continuous Integration mode
    singleRun: false,

    // Concurrency level
    concurrency: Infinity,

    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },

    plugins: [
        require('karma-webpack'),
        require('karma-mocha'),
        require('karma-mocha-debug'),
        require('karma-chai'),
        require('karma-chrome-launcher'),
        require('karma-sourcemap-loader')
    ]
}
