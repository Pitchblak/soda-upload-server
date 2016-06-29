var aws       = require('aws-sdk');
var multer    = require('multer');
var multerS3  = require('multer-s3');
var Errors    = require('../errors');

var s3        = new aws.S3();

var s3Storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, req.body.interactionId + '/' + file.originalname);
  }
});

var upload = multer({
  storage: s3Storage,
  limits: {
    fileSize: 5242880
  },
  fileFilter: function(req, file, cb) {
    var allowableMimeTypes = ['image/jpeg', 'image/png', 'audio/mp4', 'audio/x-m4a'];
    if (allowableMimeTypes.indexOf(file.mimetype) > -1) {
      cb(null, true);
    } else {
      cb(new Errors.NotAcceptable('disallowed_mime_type', file.mimetype + ' is not allowed.'));
    }
  }
}).single('media');

exports.upload = (req, res, next) => {
  upload(req, res, err => {

    if (err) {
      return next(new Errors.NotAcceptable(err.code, err.message));
    } else if (!req.body.interactionId) {
      return next(new Errors.NotAcceptable('missing_fields', 'interactionId is missing.'));
    }

    res.status(201).send({key: req.file.key});
  });
};