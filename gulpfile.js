/**
 * This is gulp config file
 * Created by PengLunJian on 2017-5-15.
 */
var gulp = require('gulp');
var rev = require('gulp-rev');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var less = require('gulp-less');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var assetRev = require('gulp-asset-rev');
var runSequence = require('run-sequence');
var revCollector = require('gulp-rev-collector');

var path = {
    cssSrc: 'src/css/*.css',
    cssMinSrc: 'public/css/*.css',
    jsSrc: 'src/js/{*.js,**/*.js}',
    jsMinSrc: 'public/js/{*.js,**/*.js}',
    lessSrc: 'src/less/*.less',
    imgMinSrc: 'src/images/{*.{png,jpg,gif,ico},**/*.{png,jpg,gif,ico}}',
    htmlSrc: 'src/*.html',
    htmlMinSrc: 'public/*.html',
    fontSrc: 'src/fonts/*',
    iconFont: 'src/iconfont/*'
};

gulp.task('clean', function () {
    var url = [
        'public/css',
        'public/js',
        'public/version',
        'public/*.html'
    ];
    return gulp.src(url, {read: false})
        .pipe(clean())
})

//编译less 定义一个less任务（自定义任务名称）
gulp.task('less', function () {
    return gulp.src(path.lessSrc)
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function () {
    return gulp.src(path.cssMinSrc)
        .pipe(assetRev())
        .pipe(gulp.dest('public/css'));
});

//压缩css
gulp.task('cssMin', function () {
    return gulp.src(path.lessSrc)
    // .pipe(rename({suffix: '.min'}))
        .pipe(less())
        // .pipe(minifyCss())
        .pipe(gulp.dest('public/css'));
});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function () {
    return gulp.src(path.cssMinSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/version/css'));
});

//压缩js
gulp.task('uglify', function () {
    return gulp.src(path.jsSrc)
        .pipe(jshint())
        // .pipe(rename({suffix: '.min'}))
        // .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function () {
    return gulp.src(path.jsMinSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/version/js'));
});

//压缩html
gulp.task('htmlMin', function () {
    var options = {
        collapseWhitespace: true,  //从字面意思应该可以看出来，清除空格，压缩html，这一条比较重要，作用比较大，引起的改变压缩量也特别大。
        collapseBooleanAttributes: true,  //省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>。
        removeComments: true,  //清除html中注释的部分，我们应该减少html页面中的注释。
        removeEmptyAttributes: true,  //清除所有的空属性。
        removeScriptTypeAttributes: true,  //清除所有script标签中的type="text/javascript"属性。
        removeStyleLinkTypeAttributes: true,  //清楚所有Link标签上的type属性。
        minifyJS: true,  //压缩html中的javascript代码。
        minifyCSS: true  //压缩html中的css代码。
    };
    return gulp.src(path.htmlSrc)
        // .pipe(htmlmin(options))
        .pipe(gulp.dest('public'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('verHtml', function () {
    return gulp.src(path.htmlMinSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/version/html'));
});

//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['public/**/*.json', 'public/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('public'));
});

//压缩image
gulp.task('imageMin', function () {
    gulp.src(path.imgMinSrc)
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'));
});

gulp.task('revImage', function () {
    return gulp.src(path.imgMinSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/version/images'));
});

gulp.task('font', function () {
    return gulp.src(path.fontSrc)
        .pipe(gulp.dest('public/fonts'));
})

gulp.task('iconFont', function () {
    return gulp.src(path.iconFont)
        .pipe(gulp.dest('public/iconfont'));
})

gulp.task('revFont', function () {
    return gulp.src(path.iconFont)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/version/iconfont'));
});

gulp.task('build', function (done) {
    runSequence(
        'assetRev', 'font',
        'cssMin', 'revCss',
        'uglify', 'revJs',
        // 'imageMin', 'revImage',
        'iconFont', 'revFont',
        'htmlMin', 'verHtml', 'revHtml',
        done);
})

gulp.task('watch', function () {
    gulp.watch([
        path.htmlSrc,
        path.lessSrc,
        path.jsSrc
    ], ['build']);
    console.log("SUCCESS!");
});

gulp.task('default', ['build'], function () {
    console.log("SUCCESS!");
});