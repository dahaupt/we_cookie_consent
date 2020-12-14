const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const minify = require("gulp-babel-minify");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

sass.compiler = require('node-sass');

gulp.task('klaro-js', () => {
    return gulp.src([
        'node_modules/klaro/dist/klaro.js',
        'node_modules/klaro/dist/klaro-no-css.js'])
        .pipe(gulp.dest('../Resources/Public/Library/klaro/js'));
});

gulp.task('klaro-css', () => {
    return gulp.src('node_modules/klaro/dist/*.css')
        .pipe(gulp.dest('../Resources/Public/Library/klaro/css'));
});

gulp.task('klaro-scss', () => {
    return gulp.src('node_modules/klaro/src/scss/**/*')
        .pipe(gulp.dest('../Resources/Public/Library/klaro/scss'));
});

gulp.task('extension-scss', () => {
    return gulp.src([
        '../Resources/Public/Scss/style.scss',
        '../Resources/Public/Scss/list.scss'])
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('../Resources/Public/Css'))
        .pipe(sourcemaps.init())
        .pipe(postcss([cssnano()]))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../Resources/Public/Css'));
});

gulp.task('scss', gulp.parallel('klaro-scss', 'extension-scss'))

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

gulp.task('build', gulp.parallel('klaro-js', 'klaro-css', 'scss', 'babel'));
