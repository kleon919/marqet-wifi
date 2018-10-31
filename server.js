'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');

app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));
app.use(bodyParser.json({limit: "16mb"}));

var router = express.Router();
app.use('/', router);

app.use(express.static('public-files'));

app.use(favicon(path.join(__dirname,'public-files','images','favicon.ico')));

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname + '/public-files/admin.html'))
})

app.get('/admin-dashboard', function (req, res) {
  res.sendFile(path.join(__dirname + '/public-files/admin-dashboard.html'))
})

app.get('/survey', function (req, res) {
  res.sendFile(path.join(__dirname + '/public-files/survey.html'))
})

// Start the server
var server = app.listen(process.env.PORT || '80', function () {
  console.log('App listening on port %s', server.address().port);
});
