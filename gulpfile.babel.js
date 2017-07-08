import config from './project.config.js';
import requireDir from 'require-dir';
import importDir from 'import-dir';
import gulp from 'gulp';

// get tasks from dir
const taskFiles = importDir(config.folders.gulpTasks);

Object.keys(taskFiles).forEach((taskName) => {
    exports[taskName] = taskFiles[taskName];
});

const build = gulp.series(exports.sass, exports.assets);
export { build };