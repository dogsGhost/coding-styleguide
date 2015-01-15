'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var markdown = require('gulp-markdown');
var del = require('del');
var open = require('open');

// Files will be concatenated in the order indicated by this array.
// Values correspond to filenames in markdown folder, excluding file extension.
// Also allows us to omit any files we don't need for our build.
var fileOrder = [
    'css',
    'sass',
    'js'
];

// Flag for opening html in the browser.
var alreadyOpen = false;

// Convert all the desired md files to html.
gulp.task('convert', function () {
    // Build array of md files we want to concat.
    var buildList = [];
    for (var i = 0, len = fileOrder.length; i < len; i++) {
        buildList.push('markdown/' + fileOrder[i] + '.md');
    }

    // Remove old html files.
    del(['html/*.html']);

    // Purposefully build each html file for future use case.
    return gulp.src(buildList)
        .pipe(markdown())
        .pipe(gulp.dest('html'));
});

// Concat all the html into one file.
gulp.task('build', ['convert'], function () {
    return gulp.src('html/*.html')
        .pipe(concat('index.html'))
        .pipe(gulp.dest(''));
});

gulp.task('view', ['build'], function () {
    if (!alreadyOpen) {
        open('index.html');    
    }
    alreadyOpen = true;
});

// Rebuilds on file change. Opens html in browser for previewing.
gulp.task('watch', ['build'], function() {
    gulp.watch('markdown/*.md', ['view']);
});

gulp.task('default', ['build']);