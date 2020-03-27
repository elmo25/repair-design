const { src, dest, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const minify = require("gulp-minify");
const htmlmin = require("gulp-htmlmin");
const tinypng = require("gulp-tinypng-compress");

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

function buildCSS(done) {
  src("css/**/**.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist/css/"));
  done();
}

function buildJS(done) {
  src(["js/**.js", "!js/**.min.js"])
    .pipe(
      minify({
        ext: {
          min: ".js"
        }
      })
    )
    .pipe(dest("dist/js/"));
  src("js/**.min.js").pipe(dest("dist/js/"));
  done();
}
function bulidHTML(done) {
  src("**.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/"));
  done();
}
function php(done) {
  src("**.php").pipe(dest("dist/"));
  src("phpmailer/**/**").pipe(dest("dist/phpmailer/"));
  done();
}
function fonts(done) {
  src("fonts/**/**").pipe(dest("dist/fonts/"));

  done();
}
function imageMIN(done) {
  src("image/**/*.png")
    .pipe(
      tinypng({
        key: "Mws0HLbYhVPtKzdKSMjc6bkxgDmlJJBS"
      })
    )
    .pipe(dest("dist/image/"));
  src("image/icons/**.svg").pipe(dest("dist/image/icons/"));
  src("image/**/*.jpg")
    .pipe(
      tinypng({
        key: "Mws0HLbYhVPtKzdKSMjc6bkxgDmlJJBS"
      })
    )
    .pipe(dest("dist/image/"));
  done();
}
exports.serve = bs;
exports.build = series(buildCSS, buildJS, bulidHTML, php, fonts, imageMIN);
