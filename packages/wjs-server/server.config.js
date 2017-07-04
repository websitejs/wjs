/* jshint node: true */

'use strict';

var path = require('path'),
    Config = require(path.join(__dirname, '../../', 'project.config.js'));

var server = {
    root: Config.folders.build,

    folders: {
        views: [
            path.join(__dirname, 'views'),
            Config.folders.elements,
            Config.folders.components
        ]
    },

    filesToWatch: [
        path.join(Config.cwd, 'package.json'),
        path.join(__dirname, 'views', '**/*.html'),
        path.join(Config.folders.elements, '**/*.html'),
        path.join(Config.folders.components, '**/*.html')        
    ]
};

Config.server = server;

module.exports = Config;