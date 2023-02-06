module.exports = function (config) {
    config.set({
        frameworks: ['jasmne', 'jasmine-matchers'],
        preprocessors: {
            '*.js': ['coverage']
        },
        files: [
            './dist/custom-matchers.js',
            './dist/*.js',
            './dist/*.specs.js'
        ],
        plugins: [
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-chrome-launcher',
            'karma-coverage'
        ],
        reports: [
            'dots',
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
