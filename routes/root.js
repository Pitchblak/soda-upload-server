var pkg       = require('../package.json');
var router        = require('express').Router();

router.get('/', function (req, res)  {
  res.send({name: pkg.name, env: process.env.NODE_ENV, version: pkg.version});
});

module.exports = router;