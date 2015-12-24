/*

WeatherViz Server

Codefellows F2: Javascript (Sea-39) final project

June 2015

*/


'use strict';

//init express, set port

var express = require('express');
var app = express();
var compress = require('compression')
var port = process.env.PORT || 3000;
app.use(compress());
//make "/app" available

app.use(express.static('app'));

//let user know server is working after init launch
app.listen(port, function() {
  console.log('server available at http://localhost:' + port);
});

app.get('/', function(req, res) {
  res.sendFile('index.html');

});
