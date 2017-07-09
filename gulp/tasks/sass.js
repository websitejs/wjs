import config from '../../project.config.js';
import path from 'path';
import gulp from 'gulp';
import del from 'del';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import postCss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';

/**
 * Cleans previously build css file.
 * @param {function} done Callback.
 */
function cleanSass(done) {
    del([path.join(config.folders.build.css, config.cssFileName + '.{min.css,min.css.map}'), '!' + config.folders.build.css]).then(paths => {
        if (config.debugMode) {
            console.log('Deleted files and folders:\n', paths.join('\n'));
        }
        done();
    });
}

/**
 * Compiles main sass file to vendor prefixed minified css and sourcemap.
 * @param {function} done Callback. 
 */
function compileSass(done) {

    gulp.src(path.join(config.folders.src.root, config.cssFileName + '.{scss,sass}'))
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.init())
        .pipe(postCss([
            autoprefixer(),
            cssnano({
                discardComments: {
                    removeAll: true
                },
                zindex: false,
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false,
                safe: true
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.folders.build.css))
        .on('finish', () => { done(); });
}

const sass = gulp.series(cleanSass, compileSass);
sass.displayName = 'Compile sass';

export default sass;
