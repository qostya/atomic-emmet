var http = require('http');
var sttck = require('node-static');
var file = new sttck.Server('./dist');

http.createServer((req, res) => {
  file.serve(req, res);
}).listen(554);