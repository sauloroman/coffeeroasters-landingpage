const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')( require('sass') );
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

const imagesOptions = {
  quality: 50,
}

const compileCss = function( done ) {
  
  src('./src/scss/app.scss')
    .pipe( sass({ outputStyle: 'expanded'}))
    .pipe( dest('./dist/css') )
  
  done();
}

const dev = function() {
  watch('./src/scss/**/*.scss', compileCss );
}

const minifyImages = function( done ) {
  src('./src/assets/img/**/*')
    .pipe( imagemin({ optimizationLevel: 3 }))
    .pipe( dest('./dist/img') )

  done();
}

const imagesWebp = function( done ) {
  src('./src/assets/img/**/*.{jpg,jpeg,png}')
    .pipe( webp( imagesOptions ) )
    .pipe( dest('./dist/img' ))

  done();
}

const imagesAvif = function( done ) {
  src('./src/assets/img/**/*.{jpg,jpeg,png}')
    .pipe( avif( imagesOptions ) )
    .pipe( dest('./dist/img' ))

  done();
}

exports.compileCss = compileCss;
exports.dev = dev;

exports.imagesWebp = imagesWebp;
exports.imagesAvif = imagesAvif;

exports.minifyImages = minifyImages;
exports.convertImages = parallel( imagesWebp, imagesAvif );

exports.default = compileCss;