var http = require('http');
var options = {
  host: 'localhost',
  port: '3000',
  path: '/'
};
http.get(options, function(res) {
  console.log('======Got response:\n' + res.statusCode);
  console.log('\n');
  console.log(res);
});