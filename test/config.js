require('dotenv').config({silent: true});

var config = {
  defaultHeaders: { 'Authorization' : 'Bearer ' + process.env.AUTH0_TEST_ACCOUNT_TOKEN }
};

module.exports = config;