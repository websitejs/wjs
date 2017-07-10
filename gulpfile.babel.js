import config from './project.config.js';
import importDir from 'import-dir';
import gulp from 'gulp';

// get tasks from dir
const taskFiles = importDir(config.folders.gulpTasks);

// export/register found tasks
Object.keys(taskFiles).forEach((taskName) => {
    exports[taskName] = taskFiles[taskName];
});

// export/register default (build) task
const build = gulp.series(gulp.parallel(exports.scripts, exports.sass), gulp.parallel(exports.svgicons, exports.assets));
export default build;