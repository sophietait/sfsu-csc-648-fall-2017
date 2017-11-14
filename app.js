var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Routes
var routes = require('./controllers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
	name: 'sessionId',
	secret: 'fa17g05', 
	resave: false, 
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
	}
}));

// Set user session to unregistered user if they are not logged in
app.use(function(req, res, next) {
	if(!req.session.user) {
		req.session.user = { type: -1 };
	}
	next();
});

// Routes
app.use('/', routes); // Send all routing to app controller

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
