import config from '../../project.config.js';
import path from 'path';
import gulp from 'gulp';
import del from 'del';

/**
 * Cleans previously build scripts file.
 * @param {function} done Callback.
 */
function cleanScripts(done) {
    del([path.join(config.folders.build.js, config.jsFileName + '.{min.js,min.js.map}'), '!' + config.folders.build.js]).then(paths => {
        if (config.debugMode) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        }
        done();
    });
}

/**
 * Compiles main scripts file.
 * @param {function} done Callback. 
 */
function compileScripts(done) {
    console.log('SCRIPTS!');
    done();
}

const scripts = gulp.series(cleanScripts, compileScripts);
scripts.displayName = 'Compile scripts and modules.';

export default scripts;
