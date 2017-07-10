import config from '../../project.config.js';
import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

function cleanSvgIcons(done) {
    del([path.join(config.folders.build.assets.icons.svg, '**/*.svg'), '!' + config.folders.build.assets.icons.svg]).then(paths => {
        if (config.debugMode) {
            gutil.log('Cleaned:\n', paths.join('\n'));
        }
        done();
    });
    done();
}

function compileSvgIcons(done) {
    gulp.src(path.join(config.folders.src.assets.icons.svg, '**/*.svg'), { 
        base: config.folders.src.assets.icons.svg 
    })
        .pipe(svgmin())
        .pipe(rename(function(path) {
            var name = path.dirname.split(path.sep);
            if (name[0] !== '.' && name[0] !== '..') {
                name.push(path.basename);
                path.basename = name.join('-');
            }
        }))        
        .pipe(svgstore())
        .pipe(rename({
            basename: 'svgicons'    
        }))
        .pipe(gulp.dest(config.folders.build.assets.icons.svg))
        .on('finish', () => { done(); });
}

const svgicons = gulp.series(cleanSvgIcons, compileSvgIcons);
svgicons.displayName = 'Creates SVG icons spritesheet.';
export default svgicons;

