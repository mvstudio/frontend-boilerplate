// CONFIGURATION
var path = {
    css : "css/",
    sass : "css/",
    js : "js/",
    jsDist: "js/dist/",
    maps: "maps/"
};

// IMPORTS
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');

// Sass
var sass = require("gulp-sass");
var postCSS = require('gulp-postcss');
var cleanCSS = require('postcss-clean');
var autoprefixer = require('autoprefixer');
var normalize = require('node-normalize-scss').includePaths;

// Grids
var susy = 'node_modules/susy/sass';

// Javascript
var babel = require("gulp-babel");

// TASKS
// Sass / css
gulp.task('sass', function() {
    gulp.src(path.sass+"*.scss")
        .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: [].concat(normalize, susy),
                outputStyle: 'nested'
            }).on("error", sass.logError))
            .pipe(postCSS([
                autoprefixer({ browsers: ['>1%', 'last 10 versions', 'IE 9'] }),
                cleanCSS({compatibility: 'ie9'})
            ]))
        .pipe(sourcemaps.write(path.maps))
        .pipe(gulp.dest(path.css));
});

// Javascript
gulp.task('js', function() {
    gulp.src(path.js+"*.js")
        .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ["ES2015"]
            }))
            .pipe(concat('app.js'))
            .pipe(gulp.dest(path.jsDist))
            .pipe(rename('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write(path.maps))
        .pipe(gulp.dest(path.jsDist));
});

// WATCHES
gulp.task('default', function() {
    gulp.watch(path.sass + "*.scss", ["sass"]);
    gulp.watch(path.js + "*.js", ["js"]);
});
