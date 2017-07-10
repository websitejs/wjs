const config = require('../project.config.js');
const path = require('path');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

jasmine.loadConfig({
    spec_dir: path.relative(config.cwd, path.join(config.folders.test, 'spec')),
    spec_files: [
        '**/*[sS]pec.js'
    ],
    helpers: [
        'helpers/**/*.js'
    ],
    stopSpecOnExpectationFailure: false,
    random: false
});

jasmine.configureDefaultReporter({
    showColors: true
});

jasmine.addReporter(new Jasmine2HtmlReporter({
    savePath: path.relative(config.cwd, path.join(config.folders.test, 'report')),
    fileName: 'index',
    takeScreenshots: false
}));

jasmine.execute();