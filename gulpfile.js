const { src, dest, parallel, series, watch } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const mozjpeg = require('imagemin-mozjpeg');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');
const lr = require('tiny-lr');
const server = lr();

function styles() {
    return src('./src/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(clean())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./dist/css'));
}

function img() {
    return src('./src/images/**/*')
        .pipe(imagemin([
            mozjpeg({ quality: 50 })
        ]))
        .pipe(gulp.dest('./dist/images/'))
}

function js() {
    return src(['./src/js/resources.js', './src/js/app.js', './src/js/engine.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['@babel/preset-env', { modules: false }]
            ]
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(minify())
        .pipe(gulp.dest('./dist/js'))
}

function html() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist'))
}

exports.styles = styles;
exports.img = img;
exports.js = js;
exports.html = html;

exports.all = gulp.series(styles, js, img, html, function () {
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/*js', js);
    /* gulp.watch('./index.html', html); */
});