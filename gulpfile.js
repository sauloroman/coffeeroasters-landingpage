import { dest, src, series, parallel, watch } from 'gulp'
import sass from ('gulp-sass')('sass');

const compileCss = function( done ) {
  
  src('./src/scss/app.scss')
    .pipe( sass({ outputStyle: 'compress'}))
    .pipe( dest('./dist/css') )
  
  done();
}

exports.compileCss = compileCss;