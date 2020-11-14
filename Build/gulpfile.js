const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const minify = require("gulp-babel-minify");

gulp.task('js', () => {
    return gulp.src([
        'node_modules/klaro/dist/klaro.js',
        'node_modules/klaro/dist/klaro-no-css.js'])
        .pipe(gulp.dest('../Resources/Public/Library/klaro/js'));
});

gulp.task('babel', () => {
    return gulp.src('../Resources/Public/JavaScript/Src/ConsentApp.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env'],
            comments: false
        }))
        .pipe(minify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../Resources/Public/JavaScript/Dist/'));
});

gulp.task('css', () => {
    return gulp.src('node_modules/klaro/dist/*.css')
        .pipe(gulp.dest('../Resources/Public/Library/klaro/css'));
});

gulp.task('scss', () => {
    return gulp.src('node_modules/klaro/src/scss/**/*')
        .pipe(gulp.dest('../Resources/Public/Library/klaro/scss'));
});

gulp.task('build', gulp.parallel('babel', 'js', 'css', 'scss'));
