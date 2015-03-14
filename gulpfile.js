var gulp = require('gulp');
var concat = require('gulp-concat');
var spawn = require('child_process').spawn;
var jsx = require('gulp-jsx');

var node = null;

gulp.task('vendor-styles',function() {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('public'));
});

gulp.task('vendor-scripts',function() {
    return gulp.src([
    'node_modules/react/dist/react.min.js',
    'node_modules/superagent/superagent.js']
    )
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('jsx',function() {
    return gulp.src('lib/**/*.jsx')
    .pipe(jsx())
    .pipe(gulp.dest('public'));
});

gulp.task('server',function(cb) {
    if (node) {
        console.log('Restarting express server...');
        node.kill();
    } else {
        process.on('exit',function() {
            node.kill();
        });
    }
    node = spawn('node',['index.js'],{stdio: 'inherit'});
    node.on('close',function(code) {
        if (code === 8) {
            console.log('Error detected, waiting for changes...');
        }
    });
    cb();
});

gulp.task('build',['vendor-styles','vendor-scripts','jsx']);

gulp.task('serverw',['build','server'],function() {
    gulp.watch('lib/**/*',['server']);
    gulp.watch('lib/**/*.jsx',['jsx']);
});

gulp.task('default',['serverw']);

