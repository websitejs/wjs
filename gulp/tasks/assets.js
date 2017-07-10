import config from '../../project.config.js';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import imagemin from 'gulp-imagemin';

function cleanAssets(done) {
    del([path.join(config.folders.build.assets.images, '**/*.{jpg,png,gif}'), '!' + config.folders.build.assets.images]).then(paths => {
        if (config.debugMode) {
            gutil.log('Cleaned:\n', paths.join('\n'));
        }
        done();
    });
    done();
}

function compileAssets(done) {
    gulp.src(path.join(config.folders.src.assets.images, '**/*.{jpg,png,gif}'))
        .pipe(imagemin([], {
            verbose: config.debugMode
        }))
        .pipe(gulp.dest(config.folders.build.assets.images))
        .on('finish', () => { done(); });
}

const assets = gulp.series(cleanAssets, compileAssets);
assets.displayName = 'Copy and optimize assets.';

export default assets;
