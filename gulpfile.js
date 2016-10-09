/**
 * Created by Ivan on 09.10.2016.
 */

var gulp = require("gulp");

gulp.task("lint", function () {
    var eslint = require("gulp-eslint");

    return gulp.src(["index.js", "gulpfile.js", "./common/*.js", "./test/test.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("test", function () {
    var mocha = require("gulp-mocha");
    return gulp.src("test/*.js", { read: false }).pipe(mocha());
});

gulp.task("default",["lint", "test"]);