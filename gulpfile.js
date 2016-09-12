// Configuration
var path = {
    css : "css/",
    sass : "css/",
    js : "js/",
    jsDist: "js/dist/",
    maps: "maps/"
};

// Imports
var gulp = require("gulp");
var sourcemaps = require('gulp-sourcemaps');

var sass = require("gulp-sass");
var postCSS = require('gulp-postcss');
var cleanCSS = require('postcss-clean');
var autoprefixer = require('autoprefixer');

var babel = require("gulp-babel");
var concat = require("gulp-concat");

// Scripts
gulp.task('sass', function() {
    gulp.src(path.sass+"*.scss")
        .pipe(sass({outputStyle: 'nested'}).on("error", sass.logError))
        .pipe(postCSS([
            autoprefixer({ browsers: ['>1%', 'last 10 versions', 'IE 9'] }),
            cleanCSS({compatibility: 'ie9'})
        ]))
        .pipe(gulp.dest(path.css));
});

gulp.task('js', function() {
    gulp.src(path.js+"*.js")
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(babel({
                presets: ["ES2015"]
            }))
            .pipe(concat('app-dist.js'))
            .pipe(sourcemaps.write(path.maps))
        .pipe(gulp.dest(path.jsDist));
});

gulp.task('default', function() {
    gulp.watch(path.sass + "*.scss", ["sass"]);
    gulp.watch(path.js + "*.js", ["js"]);
});
