const gulp = require("gulp");
const apidoc = require("gulp-apidoc");

gulp.task("apidoc", (done) => {
    apidoc({
        src: "./app/routes",
        dest: "./docs/apidoc"
    }, done);
});

gulp.task("watch", () => {
    gulp.watch(["./app/routes/*"], ["apidoc"]);
});