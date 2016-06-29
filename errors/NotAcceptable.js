'use strict';
module.exports = function NotAcceptableError(code, message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = typeof message === 'undefined' ? 'Request was malformed or information was missing' : message;
  this.code = typeof code === 'undefined' ? 'not_acceptable' : code;
  this.status = 400;
};

require('util').inherits(module.exports, Error);
