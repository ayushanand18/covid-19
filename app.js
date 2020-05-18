// This application uses express as its web server
var express = require('express');
var path = require('path');
var cfenv = require('cfenv'); // cfenv provides access to your Cloud Foundry environment
const blockchain = require('./blockchain.js')
const bitcoin = new blockchain()
const sha256=require('sha256');
// create a new express server
var app = express();

// static rendering from the homepage
app.use('/', express.static(path.join(__dirname,'public')));


// serve the blockchain app here from /app
app.get('/app', function(req,res) {
    bitcoin.createBlock(100, '0', '0');
    var output = JSON.stringify(bitcoin)+'<br><br>';
    var hospital = sha256('John Hopkins University')
    var vacant=200
    var occupied=100
    var blockData = bitcoin.createVentilator(hospital,vacant,occupied)
    output = output+ JSON.stringify(bitcoin)+'<br><br>';
    var currentHash = bitcoin.hash(bitcoin.getLastBlock().hash,blockData,100)
    bitcoin.createBlock(102,bitcoin.getLastBlock().hash,currentHash)
    output = output+ JSON.stringify(bitcoin)+'<br>';
    output = output+'<br>Validity of the Blockchain....';
    output = output+'<br>'+bitcoin.chainIsValid(bitcoin.chain);
    res.send(output);
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