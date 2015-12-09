var gulp = require("gulp"),
    gutil = require("gulp-util"),
    sass = require("gulp-sass"),
    browserify = require("gulp-browserify"),
    livereload = require("gulp-livereload"),
    config = require("./config.json"),
    log_error = function(error) {
      gutil.log(gutil.colors.red(error.toString()));
      return this.emit("end");
    };

gulp.task("styles", function() {
  return gulp
    .src("styles/**/[^_]*.scss")
    .pipe(
      sass(config.sass).on("error", log_error)
    )
    .pipe(gulp.dest("example/css/"))
    .pipe(livereload());
});

gulp.task("scripts", function() {
  return gulp
    .src("example/app.js")
    .pipe(
      browserify(config.browserify).on("error", log_error)
    )
    .pipe(gulp.dest("example/js"))
    .pipe(livereload());
});

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch(["scripts/**/*.js", "example/app.js"], ["scripts"]);
  gulp.watch("styles/**/*", ["styles"]);
});

gulp.task("build", [
  "styles",
  "scripts"
]);

gulp.task("default", ["build", "watch"]);
