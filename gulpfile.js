var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

// Consultando banco de dados na nuvem mongodb

var app = require('express')();
var MongoClient = require('mongodb').MongoClient;
var ObjectId    = require('mongodb').ObjectID;
var url = 'mongodb://estacionebem:aplicativo@ds139715.mlab.com:39715/estacionebem';

// caso chamado esse get  retorna Json com essas informacoes 
app.get('/ocorrencias/listar', function(req, res) {
      console.log("teste");
      MongoClient.connect(url, function(err, db) {
                  db.collection('totens').find().toArray(function(err, results) {
                       console.log("teste");
                    // res.render('courses', { courses: results });
                    console.log(results);
                    //res.json(results);// aqui se envia os dados para quem pediu o pacote de dados
                    db.close();
                  })
                  db.addListener("error", function(error){
                  console.log("Error connecting to MongoLab");
                  });
      });

});