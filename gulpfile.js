// プラグインの読み込み
const gulp = require("gulp");
const sass = require("gulp-sass");
var plumber = require( 'gulp-plumber' );
const sassGlob = require("gulp-sass-glob");
var prefix = require("gulp-autoprefixer");
var mmq = require( 'gulp-merge-media-queries' );

// Sassコンパイルタスクの定義
gulp.task("sass", function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sassGlob()) // Sassの@importにおけるglobを有効にする
    .pipe(sass({outputStyle: 'expanded'})) //sassのコンパイル
    .pipe(prefix({ //auto-prefixer
      cascade: false
     }))
    .pipe( mmq() ) //
    .pipe(plumber()) //watch中のエラーを防ぐ
    .pipe(gulp.dest('./css'));
});

gulp.task( 'watch', function() {
  gulp.watch( './sass/**/*.scss', gulp.task( 'sass' ) );
});


// CSSコードの圧縮
var cleanCSS = require('gulp-clean-css');
var rename   = require("gulp-rename");

gulp.task('mincss', function() {
  return gulp.src("css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/'));
});

//JavaScriptコードの圧縮
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('minjs', function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js/'));
});


// 画像の圧縮
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");

var imageminOption = [
  imageminPngquant({ quality: [0.65, 0.8] }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo()
];

gulp.task( 'imagemin', function() {
  return gulp
    .src( './img/base/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( './img' ) );
});