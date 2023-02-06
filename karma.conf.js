process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'jasmine-matchers'],
        preprocessors: {
            '*.js': ['coverage']
        },
        files: [
            './dist/custom-matchers.js',
            './dist/*.js',
            './dist/*.spec.js'
        ],
        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-chrome-launcher',
            'karma-coverage'
        ],
        reports: [
            'dots',
            'progress',
            'coverage'
        ],
        color: true,
        browsers: [
            'ChromeHeadless'
        ],
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
    });
};
