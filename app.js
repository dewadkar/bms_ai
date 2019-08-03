var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var fs = require('fs');
var config = require('./config/app-config');

var app = express();

var PORT = config.app.port;

// var log = require('./lib/logging/app-logger');
// log.create();


// view engine setup
app.set('port', process.env.PORT || PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, '/node_modules')));


// API routes
require('./routes/routes.js')(app);

// app.use(function (request, response, next) {
//   response.status(404).render('error', {
//     title: "Sorry, page not found"
//   });
// });

if (config.app.env === 'development') {
  // Start server for development environment
  http.createServer(app).listen(app.get('port'), function () {
    // log.info(userInfo, '/app', 'Express server listening on port ' + app.get('port'));
    console.log('/app', 'Express server listening on port ' + app.get('port'));
  });
}

module.exports = app;