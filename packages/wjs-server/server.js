/* jshint node: true */

'use strict';

var path = require('path'),
    config = require('./server.config.js'),
    devIp = require('dev-ip'),
    findPort = require('find-free-port'),
    express = require('express'),
    //http = require('http'),
    nunjucks = require('nunjucks'),
    favicon = require('serve-favicon'),
    bs = require('browser-sync').create(),
    app = express();


// define browsersync watches
bs.watch(config.server.filesToWatch).on('change', function(filename, fileinfo) {
    console.log('\x1b[32mChanged \x1b[37m%s @ %s', path.relative(__dirname, filename), new Date(fileinfo.mtime).toUTCString());
    bs.reload();
});

// configure nunjucks
nunjucks.configure(config.server.folders.views, {
    autoescape: true,
    express: app,
    watch: true,
    nocache: true,
    debug: true
});

// let app use browsersync
app.use(require('connect-browser-sync')(bs));

// set static map
// app.use('/static', express.static(config.paths.build.root));

// favicon
app.use(favicon(path.join(config.server.root, 'assets', 'icons', 'favicon.ico')));

// // routers
// var routers = {
//     styleguide: require(path.join(config.paths.routers, 'styleguide'))
// };

// routing
app.get('/', function(req, res) {

    //console.log(res);
    res.render('index.html', {
        meta: {
            title: config.project.name
        },
        project: {
            title: config.project.name,
            version: config.project.version
        }
    });
});

// app.use('/styleguide', routers.styleguide);

// find free port and set up server
var port = process.env.PORT;
findPort(3000, 3100, '127.0.0.1', function(err, freePort){
    
    port = freePort;
    
    app.listen(port, function() {

        console.log('\x1b[37m\nstarting server...');

        // init browsersync
        bs.init({

            ui: false,
            logSnippet: false,
            reloadDelay: 2000,
            reloadOnRestart: true

        }, function() {

            var ip = devIp();
            console.log('\x1b[32mserver successfully started.');
            console.log('\x1b[37m-------------------------------------');
            console.log('\x1b[37m   local: \x1b[32mhttp://localhost:' + port);
            console.log('\x1b[37m\x1b[2m-------------------------------------');
            console.log('\x1b[37mexternal: \x1b[32mhttp://' + ip[0] + ':' + port);
            console.log('\x1b[37m-------------------------------------');

            if (ip.length > 1) {
                console.log('\x1b[37m     vpn: \x1b[32mhttp://' + ip[1] + ':' + port);
                console.log('\x1b[37m-------------------------------------');
            }

            console.log('\x1b[37m\n');
        });
    });
});
