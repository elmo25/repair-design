const { src, dest, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("./*.html").on("change", browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on("change", browserSync.reload);
}

function minCSS() {
  return gulp
    .src("./css/*.css")

    .pipe(rename({ suffix: ".min" }))

    .pipe(cleanCSS())

    .pipe(dest("./css"));
}

function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(dest("./css"))
    .pipe(browserSync.stream());
}

function build(done) {
  src("css/**/**.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist/css/"));
  done();
}
exports.serve = bs;
exports.build = build;
