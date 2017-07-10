# WebsiteJS 2.0
 WebsiteJS 2.0 (wjs) follows a monorepo approach, all officially maintained modules are in the same repo.

 > The tool for managing the monorepo is [Lerna](https://github.com/lerna/lerna)

 ## Installation
 Make sure you have [NodeJS](http://nodejs.org) version 7 or higher installed and
 install global dependencies:
 ```sh
 $ npm install -g npm node-gyp rimraf jshint lerna nodemon gulp-cli jasmine
 ```

 Install project dependencies:
```sh
$ npm install 
```
To install local packages and their dependencies run
```sh
$ lerna bootstrap
```

## Building
```sh
$ gulp
```
or
```sh
$ npm build
```

## Development Server
The development server is an nodejs express server based on browsersync and is kept alive by nodemon.
It uses the nunjucks template engine to render templates and updates on the fly. No preprocessing neccessary.
To start the server use
```sh
$ npm start
```
> For more information see the 'wjs-server' package readme. 

## Jasmine testing
To start the tests run
```sh
$ npm test
```
