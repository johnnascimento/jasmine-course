const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'jasmine-matchers'],
        preprocessors: {
            './dist/*.js': ['coverage']
        },
        files: [
            "./dist/custom-matchers.js",
            './dist/*.js',
            './dist/*.spec.js'
        ],
        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-chrome-launcher',
            'karma-coverage'
        ],
        browsers: ['HeadlessChrome'],
        customLaunchers:{
            HeadlessChrome:{
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },
        reporters: ['dots', 'coverage', 'progress'],
        colors: true,
        singleRun: true,
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {
                    type: 'html',
                    subdir: 'html'
                }
            ]
        }
    })
};