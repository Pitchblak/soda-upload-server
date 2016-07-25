// configure environment variables
require('dotenv').config({silent: true});

var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var bodyParser    = require('body-parser');
var upload        = require('./routes/upload');
var root          = require('./routes/root');
var helmet        = require('helmet');
var authenticate  = require('./helpers/auth');
var ApiError      = require('./errors')

var app = express();

app.use(helmet());
if(process.env.NODE_ENV !== 'test'){
  app.use(logger('dev'));
}
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', root);
app.use(function(req, res, next) {
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('multipart/form-data') !== 0)
    next(new ApiError.NotAcceptable('wrong_format', 'Format should be multipart/form-data'));
  else
    next();
});
app.use(authenticate);
app.use('/upload', upload);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.message = 'resource_not_found';
  err.code = 'not_found';
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'local') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
      name: err.name || 'InternalServerError',
      message: err.message || 'Internal Server Error',
      code: err.code || 'internal_error',
      status: err.status
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    name: err.name || 'InternalServerError',
    message: err.message || 'Internal Server Error',
    code: err.code || 'internal_error',
    status: err.status
  });
});


module.exports = app;
