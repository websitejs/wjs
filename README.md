# WebsiteJS 2.0
 WebsiteJS 2.0 (wjs) follows a monorepo approach, all officially maintained modules are in the same repo.

 > The tool for managing the monorepo is [Lerna](https://github.com/lerna/lerna)

 ## Installation
 Install global dependencies:
 ```sh
 $ npm install -g node-gyp rimraf jshint lerna nodemon gulp-cli
 ```

 Install project dependencies:
```sh
$ npm install 
```

## Building
```sh
$ gulp
```

## Development Server
The development server is an nodejs express server based on browsersync and is kept alive by nodemon.
It uses the nunjucks template engine to render templates and updates on the fly. No preprocessing neccessary.
To start the server use
```sh
$ npm run server
```
> For more information see the 'wjs-server' package readme. 