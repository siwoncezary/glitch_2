// server.js
// where your node app starts

// init project
var express = require('express');
var os = require('os');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami/", function(req, response){
    //response.send(request.headers['user-agent']);
    var ip;
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
      ip = req.connection.remoteAddress;
    } else {
      ip = req.ip;
    }
  var soft = req.headers['user-agent'];
  var exp = /\(([^)]+)\)/g;
  var stab = soft.match(exp);
  soft = stab[0].replace('(','');
  soft = soft.replace(')','');
  var lang = req.headers["accept-language"].split(',')[0]; 
  response.send({'ipadress':ip, 'language': lang, 'software': soft});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
