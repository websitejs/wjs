import config from '../../project.config.js';
import gulp from 'gulp';

function clean(done) {
    console.log('CLEAN ASSETS');
    done();
}

function compile(done) {
    console.log('ASSETS!');
    done();
}

const assets = gulp.series(clean, compile);
assets.displayName = 'Copy and optimize assets.';

export default assets;
