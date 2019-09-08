const { src, dest, watch, series, parallel } = require("gulp");
const $ = require("gulp-load-plugins")();
const minimist = require("minimist"); // 用來讀取指令轉成變數
const browserSync = require("browser-sync");
const autoprefixer = require("autoprefixer");

// production || development
// # gulp --env production
const envOptions = {
    string: "env",
    default: { env: "development" },
};

const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

// 刪除 public 資料夾
function clean() {
    return src(["./public"], {
        allowEmpty: true,
        read: false,
    }).pipe($.clean());
}

// 複製非 js/ css/ 至 public
function copy() {
    return src(["./src/**/**", "!src/scss/**/**", "!src/js/**/**"])
        .pipe(dest("./public/"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

// 編譯 SCSS
function sass() {
    // PostCSS AutoPrefixer
    const processors = [
        autoprefixer({
            overrideBrowserslist: ["last 3 version", "ie 6-8"],
        }),
    ];

    return src("./src/scss/**/*.scss")
        .pipe($.plumber()) // 讓 Gulp 在運行的過程中遇錯不會中斷
        .pipe($.sourcemaps.init())
        .pipe($.sass().on("error", $.sass.logError))
        .pipe($.postcss(processors)) // 幫 CSS 補上前綴詞
        .pipe($.if(options.env === "production", $.cleanCss())) // 如果是生產環境就壓縮 CSS
        .pipe($.sourcemaps.write("."))
        .pipe(dest("./public/css"))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

// 編譯 ES6 語法
function babel() {
    return (
        src("./src/js/**/*.js")
            .pipe($.plumber()) //讓 Gulp 在運行的過程中遇錯不會中斷
            .pipe($.sourcemaps.init())
            .pipe(
                $.babel({
                    presets: ["@babel/env"],
                })
            )
            // .pipe($.concat("all.js"))
            .pipe(
                // 如果是生產環境就壓縮 JavaScript
                $.if(
                    process.env.NODE_ENV === "production",
                    $.uglify({
                        compress: {
                            drop_console: true,
                        },
                    })
                )
            )
            .pipe($.sourcemaps.write("."))
            .pipe(dest("./public/js"))
            .pipe(browserSync.stream())
    );
}

// 壓縮圖片
function minifyImage() {
    return src("./src/images/**/*")
        .pipe($.if(process.env.NODE_ENV === "production", $.imagemin()))
        .pipe(dest("./public/images"));
}

// 網頁伺服器
function runBrowserSync() {
    browserSync.init({
        server: {
            baseDir: "./public",
        },
        reloadDebounce: 1000, // 設定 reload 時間間隔
    });
}

// 自動監聽檔案變更
function watchFiles() {
    watch("./src/scss/**/*.scss", sass);
    watch("./src/js/**/*.js", babel);
    watch("./src/**/*.html", copy);
}

// 自動發布 public 到 github page
function deploy() {
    return src("./public/**/*").pipe($.ghPages());
}

exports.build = series(clean, copy, sass, babel, minifyImage);

exports.deploy = deploy;

exports.default = parallel(
    copy,
    sass,
    babel,
    minifyImage,
    runBrowserSync,
    watchFiles
);
