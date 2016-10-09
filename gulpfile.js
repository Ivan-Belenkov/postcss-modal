/**
 * Created by Ivan on 09.10.2016.
 */

var gulp = require("gulp");

gulp.task("lint", function () {
    var eslint = require("gulp-eslint");

    return gulp.src(["index.js", "gulpfile.js", "./common/*.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task("default",["lint"]);