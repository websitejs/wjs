/* jshint node: true */

'use strict';

var config = require('./.config.js'),
    devIp = require('dev-ip'),
    express = require('express'),
    //http = require('http'),
    path = require('path'),
    nunjucks = require('nunjucks'),
    favicon = require('serve-favicon'),
    bs = require('browser-sync').create(),

    app = express();


// define browsersync watches
bs.watch([config.paths.views.root, '**/*.html', config.paths.components, '**/*.html']).on('change', function(filename, fileinfo) {
    console.log('\x1b[32mChanged \x1b[37m%s @ %s', path.relative(__dirname, filename), new Date(fileinfo.mtime).toUTCString());
    bs.reload();
});

// configure nunjucks
nunjucks.configure([
    config.paths.views.root,
    config.paths.build.root,
    config.paths.elements,
    config.paths.components
], {
    autoescape: true,
    express: app,
    watch: true,
    nocache: true,
    debug: true
});

// let app use browsersync
app.use(require('connect-browser-sync')(bs));

// set static map
app.use('/static', express.static(config.paths.build.root));

// favicon
app.use(favicon(path.join('static', 'assets', 'img', 'favicon.ico')));


// routers
var routers = {
    styleguide: require(path.join(config.paths.routers, 'styleguide'))
};

// routing
app.get('/', function(req, res) {

    //console.log(res);
    res.render('index.html', {
        meta: {
            title: 'DAF Frontend'
        },
        title: 'DAF Frontend',
        paths: config.paths.build
    });
});

app.use('/styleguide', routers.styleguide);

// set up server
var port = process.env.PORT || 3000;
app.listen(port, function() {

    console.log('\x1b[37m\nstarting server...');

    // init browsersync
    bs.init({

        ui: false,
        logSnippet: false

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