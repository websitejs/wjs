/* jshint node: true */

'use strict';

// create paths/folders
var path = require('path'),
    pkg = require('./package.json'),

    project = {
        name: pkg.name,
        version: pkg.version
    },

    cwd = __dirname,

    folders = {
        src: path.join(cwd, 'src'),
        build: path.join(cwd, 'dist')
    },

    paths = {};

// create object
var Config = {
    project: project,
    cwd: cwd,
    folders: {
        src: folders.src,
        build: folders.build,
        elements: path.join(folders.src, 'elements'),
        components: path.join(folders.src, 'components')
    }
};

// export
module.exports = Config;