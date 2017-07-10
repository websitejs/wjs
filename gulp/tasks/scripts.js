import config from '../../project.config.js';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import through from 'through2';
import named from 'vinyl-named';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

/**
 * Cleans previously build scripts file.
 * @param {function} done Callback.
 */
function cleanScripts(done) {
    del([path.join(config.folders.build.js, config.jsFileName + '.{min.js,min.js.map}'), '!' + config.folders.build.js]).then(paths => {
        if (config.debugMode) {
            gutil.log('Cleaned:\n', paths.join('\n'));
        }
        done();
    });
}

/**
 * Compiles main scripts file.
 * @param {function} done Callback. 
 */
function compileScripts(done) {
    gulp.src([path.join(config.folders.src.root, config.jsFileName + '.js')])
        .pipe(named())
        .pipe(webpackStream(require(path.join(config.cwd, 'webpack.config.js')), webpack, function(err, stats) {
            if(err) throw new gutil.PluginError('webpack', err);        
            if (config.debugMode) {
                gutil.log(stats.toJson());
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.init({ 
            loadMaps: true 
        }))
        .pipe(through.obj(function(file, enc, cb) {
            // Dont pipe through any source map files as it will be handled
            // by gulp-sourcemaps
            var isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) this.push(file);
            cb();
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.folders.build.js))
        .on('finish', () => { done(); });
}

const scripts = gulp.series(cleanScripts, compileScripts);
scripts.displayName = 'Compile scripts and modules using webpack.';

export default scripts;
