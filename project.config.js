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
    gulpTasks = path.join(cwd, 'gulp', 'tasks'),
    srcRoot = path.join(cwd, 'src'),
    buildRoot = path.join(cwd, 'dist'),

    jsFileName = 'scripts',
    cssFileName = 'styles',

    folders = {
        src: {
            root: srcRoot,
            js: path.join(srcRoot, 'js'),
            css: path.join(srcRoot, 'scss'),
            assets: {
                root: path.join(srcRoot, 'assets'),
                images: path.join(srcRoot, 'assets', 'images'),
                icons: {
                    root: path.join(srcRoot, 'assets', 'icons'),
                    svg: path.join(srcRoot, 'assets', 'icons', 'svg')
                },
                fonts: path.join(srcRoot, 'assets', 'fonts')
            },
            elements: path.join(srcRoot, 'elements'),
            components: path.join(srcRoot, 'components')
        },
        build: {
            root: buildRoot,
            js: path.join(buildRoot, 'js'),
            css: path.join(buildRoot, 'css'),
            assets: {
                root: path.join(buildRoot, 'assets'),
                images: path.join(buildRoot, 'assets', 'images'),
                icons: {
                    root: path.join(buildRoot, 'assets', 'icons'),
                    svg: path.join(buildRoot, 'assets', 'icons', 'svg')
                },
                fonts: path.join(buildRoot, 'assets', 'fonts')
            },
            elements: path.join(buildRoot, 'elements'),
            components: path.join(buildRoot, 'components')
        }
    };

// create object
var config = {
    project: project,
    cwd: cwd,
    jsFileName: jsFileName,
    cssFileName: cssFileName,
    folders: {
        gulpTasks: gulpTasks,
        src: folders.src,
        build: folders.build
    }
};

// export
module.exports = config;