'use strict';
require('dotenv').config({silent: true});

var request             = require('supertest');
var app                 = require('../../app');
var config              = require('../config');

describe('Testing upload server:', function() {
  
  describe('POST /upload', function() {
    
    var successPayload = {
      key: 'testinteractionId/test-image.png'
    };
    
    it('should return 201 if successful', function(done) {
      request(app)
        .post('/upload')
        .set(config.defaultHeaders)
        .field('id', 'testinteractionId')
        .attach('media', './test/assets/test-image.png')
        .expect(201, successPayload, done);
    });

    it('should return 400 if id missing', function(done) {
      request(app)
        .post('/upload')
        .set(config.defaultHeaders)
        .attach('media', './test/assets/test-image.png')
        .expect(400, done);
    });
  
    it('should return 400 if mime type disallowed', function(done) {
      request(app)
        .post('/upload')
        .set(config.defaultHeaders)
        .field('interactionId', 'testinteractionId')
        .attach('media', './test/mocha.opts')
        .expect(400, done);
    });
  
    it('should return 400 if file too large', function(done) {
      request(app)
        .post('/upload')
        .set(config.defaultHeaders)
        .attach('media', './test/assets/7point1mb.m4a')
        .expect(400, done);
    });
    
  });
  
});