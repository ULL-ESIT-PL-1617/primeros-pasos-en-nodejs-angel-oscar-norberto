var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

/*
var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})
*/
app.listen(process.env.PORT, process.env.IP);