var router            = require('express').Router();
var authenticate      = require('../helpers/auth');
var uploadController  = require('../controllers/upload');

router.use(authenticate);
router.post('/',uploadController.upload);

module.exports = router;