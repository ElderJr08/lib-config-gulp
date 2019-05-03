var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');


var browserify = require('browserify');
var babelify = require('babelify');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

var webpack = require('webpack-stream');



// Source Path
var js_src   = "./src/js/*.js";
var style_src = "./src/style/*.less";

//JSFILES
 
// Dist Path
var dist  = "./dist/";
var js_dist_name = "dendron-lib.js";
var style_dist_name = "dendron-lib.css";


// Compile,Minify e Concat Scripts

gulp.task('scripts', function() {
    return gulp.src(js_src)
        // .pipe(webpack({
        //     mode: 'development'
        // }))
        .pipe(babel({
            presets: ['@babel/env']
            //plugins: ['@babel/transform-runtime']
        }))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat(js_dist_name))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(`${dist}/js`));
});


gulp.task('less-to-css-minify', () => {
    return gulp.src(style_src)
      .pipe(less())
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(concat(style_dist_name))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(`${dist}/css`));
});

// Watch
gulp.task('watch', function() {
	gulp.watch([js_src, style_src], gulp.series('scripts','less-to-css-minify'));
});

// Default
//gulp.task('default', ['scripts']);