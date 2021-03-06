/**
 * 1. Start the server
 * 2. Launch Browser-Sync
 */

'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
//    bsyncSPA    = require('browser-sync-spa'),
    config      = require('../config')(),
    plg         = require('gulp-load-plugins')({
                    pattern: ['gulp-*', 'gulp.*'],
                    replaceString: /^gulp(-|\.)/,
                    camelize: true,
                    lazy: true});

gulp.task('runapp', function() {
  return plg.nodemon({
      script: 'src/server/app.js',
      ext: 'js',
      execMap: {
      'js': 'babel-node --optional strict'
      },
      ignore: [
        '.tmp/**',
        '.vagrant/**',
        'src/client/**',
        'vm/**',
        '.git/**',
        'node_modules/**',
        'bower_components/**',
        '.DS_Store',
        '.sass-cache'],
      verbose: true
    })
    .on('restart', function () {
      plg.notify('restarted');
      setTimeout(browserSync.reload, 500);
    });
});

// browserSync.use(bsyncSPA({
//   selector: '[ng-app]'// Only needed for angular apps
// }));

gulp.task('serve', ['sass', 'inject', 'runapp'], function() {

  browserSync.init({
    proxy: {
      target: '127.0.0.1:9000', // express' port
      middleware: function (req, res, next) {
        console.log(req.url);
        next();
      }
    },
    port: 3000, // browser-sync's port
    browser: ['google chrome'],
    files: [
      config.client + '**/*',
      config.temp + '**/*.css',
      config.sass
    ],
    open: false,
    ui: false,
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'topshelf',
    notify: true,
    ghost: false,
    xip: false
  });

  console.log('Starting BrowserSync on port 3000');
  gulp.watch(config.sass, ['sass'], reload);
  gulp.watch(config.ngApp, ['lint'], reload);
  gulp.watch(config.index, ['inject'], reload);
  gulp.watch(config.html, ['partials'], reload);
});
