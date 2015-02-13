var 
    del = require('del'),
    gulp = require('gulp'),
    path = require('path'),
    concat = require('gulp-concat'),
    copy = require('gulp-copy'),
    less = require('gulp-less'),
    merge = require('gulp-merge'),
    mincss = require('gulp-minify-css'),
    minhtml = require('gulp-minify-html');
    processhtml = require('gulp-processhtml'),
    uglify = require('gulp-uglify');

gulp.task('default', ["styles", "scripts", "files"], function() {

});


gulp.task("styles", [], function () {
    return merge(
            gulp
                .src([
                    "./src/_components/bootstrap/dist/css/bootstrap.min.css",
                    "./src/_components/bootstrap/dist/css/bootstrap-theme.min.css",
                ]),

            gulp
                .src('./src/styles/**/*.css'),

            gulp
                .src('./src/styles/**/*.less')
                .pipe(less({
                    paths: [ path.join(__dirname, 'less', 'includes') ]
                }))
                .pipe(mincss())
        )
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/styles/'))
});

gulp.task("scripts", [], function () {
    return merge(
            gulp
                .src([
                    "./src/_components/jquery/dist/jquery.min.js",
                    "./src/_components/bootstrap/dist/js/bootstrap.min.js"
                ]),

            gulp
                .src('./src/scripts/**/*.js')
                .pipe(uglify())
        )
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/scripts/'))
});


gulp.task("bootstrap-files", [], function () {
    return gulp
        .src("./src/_components/bootstrap/dist/fonts/**")
        .pipe(copy("./dist/fonts/", {prefix: 5}));
});


gulp.task("assets", [], function () {
    return gulp
        .src("./src/assets/**")
        .pipe(copy("./dist/assets/", {prefix: 2}));
});


gulp.task("app-files", [], function () {
    return gulp
        .src("./src/**/*.html")
        .pipe(processhtml({}))
        .pipe(minhtml())
        .pipe(gulp.dest("./dist/"));
});


gulp.task("files", ["bootstrap-files", "assets", "app-files"], function () {

});


gulp.task('clean', [], function (cb) {
  del('build/', cb);
});
