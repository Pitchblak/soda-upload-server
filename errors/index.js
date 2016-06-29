// Load '*.js' under current directory as properties
//  i.e., 'BadRequest.js' will become 'exports.BadRequest'
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    exports[name] = require('./' + file);
  }
});