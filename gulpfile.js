const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const gcmq = require('gulp-group-css-media-queries');
const svgstore = require('gulp-svgstore');

/*______ Medua Queries ______*/

function Gcmq() {
	return gulp.src('./css/dev.css')
				.pipe(gcmq())
				.pipe(rename('style.css'))
				.pipe(gulp.dest('./css'));
}


/*______ Svgstore ______*/

function Svgstore () {
	return gulp.src("img/icon-svg/*.svg")
				.pipe(svgstore({
					inlineSvg: true
				}))
				.pipe(rename("sprite-svg.svg"))
				.pipe(gulp.dest("img/icon-svg/"))
}

/*______ Browser-Sync ______*/

function BroserSync() {
	browserSync.init({
			server: {
					baseDir: "./"
			},
			notify: false
	});

	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch('./css/dev.css').on('change', gulp.series(Gcmq, browserSync.reload));
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
	
};

gulp.task('serve', BroserSync);

gulp.task('svg', Svgstore);
