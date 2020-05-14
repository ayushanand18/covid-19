// This application uses express as its web server
var express = require('express');
var path = require('path');
var cfenv = require('cfenv'); // cfenv provides access to your Cloud Foundry environment
var blockjs = require('./blockchain.js')
// create a new express server
var app = express();

// static rendering from the homepage
app.use('/', express.static(path.join(__dirname,'public')));


// serve the blockchain app here from /app
app.get('/app', function(req,res) {
	res.send(blockjs.main());
});

// #######################################
// # PLEASE DO NOT CHANGE ANYTHING BELOW #
// #######################################

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});