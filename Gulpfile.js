var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    jade         = require('gulp-jade'),
    imagemin     = require('gulp-imagemin'),
    htmlmin      = require('gulp-htmlmin'),
    plumber      = require('gulp-plumber'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

/* Defined path object */
var paths = {
  build: 'build',
  jade:  'Framer/jade',
  sass:  'Framer/sass',
  js:    'Framer/js',
  img:   'Framer/img',
	bower: 'bower_components'
};

/* Browser Sync */

gulp.task('browserSync', function(){
  browserSync({
    server: './build'
  });
});

/* Jade Compiler */

gulp.task('jade', function(){
	return gulp.src(paths.jade + '/**/*.jade')
    .pipe(plumber())
		.pipe(jade({
      pretty: true
    }))
		.pipe(gulp.dest(paths.build + '/'))
    .pipe(reload({stream: true}));
});



/* Sass Compiler */
gulp.task('sass', function(){
	return gulp.src(paths.sass + '/**/*.sass')
		.pipe(plumber())
		.pipe(sass({
			includePaths : [
				paths.bower + '/normalize-css/'
			],
      outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(paths.build + '/css'))
    .pipe(reload({stream: true}));

});

/* Script Minification  */
gulp.task('scripts', function(){
  return gulp.src([
    paths.js    + '/snapsvg.js',
    paths.bower + '/jquery/dist/jquery.js',
    paths.bower + '/masonry/dist/masonry.pkgd.js',
    paths.js    + '/jquery.easing.1.3.js',
    paths.js    + '/plugin.js'
  ])
  .pipe(plumber())
  .pipe(concat('app.js'))
  //.pipe(uglify())
  .pipe(gulp.dest(paths.build + '/js'))
  .pipe(reload({stream: true}));
});



/* Run the watch task */
gulp.task('watch', function(){
	gulp.watch(paths.sass + '/**/*.sass', ['sass']);
	gulp.watch(paths.js + '/**/*.js', ['scripts']);
	gulp.watch(paths.jade + '/**/*.jade', ['jade']);
});


/* Default task runner */
gulp.task('default', ['browserSync', 'sass', 'scripts', 'jade', 'watch']);
