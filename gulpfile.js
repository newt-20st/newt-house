var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// SCSSのファイル名とCSSの出力先を指定
gulp.task('sass:compile', () => {
    return gulp.src('public/style/scss/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/style/css'));
});

// 自動監視のタスクを作成
gulp.task('default', () => {
    gulp.watch('public/style/scss/*.scss', gulp.task('sass:compile'));
});


// "npm run gulp" コマンドでsass:watchが実行されるように指定
gulp.task('default', gulp.task('sass:watch'));