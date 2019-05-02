var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var obfuscator = require('gulp-javascript-obfuscator');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');



// Source Path
var js_src   = "initialize.js";
var style_src = "./src/style/*.less";

//JSFILES
var jsFiles = [js_src]
var jsFolder = "./src/js/"
 
// Dist Path
var dist  = "./dist/";
var js_dist_name = "dendron-lib.js";
var style_dist_name = "dendron-lib.css";


// Minify e Concat Scripts
/*gulp.task('scripts', function() {
	return gulp.src(js_src)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(obfuscator({compact:true}))
		.pipe(concat(js_dist_name))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(`${dist}/js`));
});*/

gulp.task('js', function(done) {
    jsFiles.map( function( entry ) {
        return browserify({
            entries: [jsFolder + entry]
        })
        .transform( babelify, { presets: ['@babel/env'] } )
        .bundle()
        .pipe( source( entry ) )
        .pipe( rename({ extname: '.min.js' }) )
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( `${dist}/js` ))
    });
    done();

    //browserify --> Para ler os modulos
    //transform babelify --> responsável por fazer meu novo script ficar legivel (vanilla js) em qualquer browser
    //bundle --> responsavel por agrupar tudo(modulos) em um unico arquivo 
    //buffer --> importante para adicionar novos conteúdos
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
	gulp.watch([jsFolder, style_src], gulp.series('js','less-to-css-minify'));
});

// Default
//gulp.task('default', ['scripts']);