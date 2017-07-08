import config from '../../project.config.js';
import gulp from 'gulp';

function clean(done) {
    console.log('CLEAN SASS');
    done();
}

function compile(done) {
    console.log('SASS!');
    done();
}

const sass = gulp.series(clean, compile);
sass.displayName = 'Compile sass';

export default sass;
