var gulp = require("gulp"),
    gutil = require("gulp-util"),
    sass = require("gulp-sass"),
    browserify = require("gulp-browserify"),
    livereload = require("gulp-livereload"),
    Config = require("./config.json"),
    config = Config.development,
    log_error = function(error) {
      gutil.log(gutil.colors.red(error.toString()));
      return this.emit("end");
    };

gulp.task("styles", function() {
  return gulp
    .src("styles/[^_]*.scss")
    .pipe(
      sass(config.sass).on("error", log_error)
    )
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

gulp.task("scripts", function() {
  return gulp
    .src("scripts/*.js")
    .pipe(
      browserify(config.browserify).on("error", log_error)
    )
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

gulp.task("development", function() { config = Config.development; });
gulp.task("production", function() { config = Config.production; });

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch(["scripts/**/*"], ["scripts"]);
  gulp.watch("styles/**/*", ["styles"]);
});

gulp.task("build", [
  "styles",
  "scripts"
]);

gulp.task("build-prod", ["production", "build"]);
gulp.task("build-dev", ["build", "watch"]);
gulp.task("default", ["build-dev"]);
