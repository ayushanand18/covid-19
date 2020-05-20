// This application uses express as its web server
var express = require('express');
var path = require('path');
var cfenv = require('cfenv'); // cfenv provides access to your Cloud Foundry environment
const blockchain = require('./blockchain.js');
const bitcoin = new blockchain();
const sha256=require('sha256');
const fs = require('fs');

var path = require('path');
var filePath = path.join(__dirname, 'chainFile.txt');

// create a new express server
var app = express();

// static rendering from the homepage
app.use('/', express.static(path.join(__dirname,'public')));


// serve the blockchain app here from /app
app.get('/app', function(req,res) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            bitcoin.chain = JSON.parse(data);
            nextSteps();
        } else {
            console.log(err);
        }
    });
    const nextSteps = function(){
    var output = JSON.stringify(bitcoin)+'<br>';
    output = output+'<br>Validity of the Blockchain....';
    output = output+'<br>'+bitcoin.chainIsValid(bitcoin.chain);
    res.send(output);
    fs.writeFile("chainFile.txt", JSON.stringify(bitcoin.chain), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
    }); 
    };
});

// serving static files in dashboard
app.use('/hospital/dashboard', express.static(path.join(__dirname,'public/hosp_dashboard')));

// endpoint for creating ventilators
app.get('/createVentilator', function(req,res) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            bitcoin.chain = JSON.parse(data);
            nextSteps();
            res.send('created ventilator')
        } else {
            console.log(err);
        }
    });
    var nextSteps = function(){
        var hospital = req.param('hospital');
        var vacant = req.param('vacant');
        var occupied = req.param('occupied');

        var blockData = bitcoin.createVentilator(hospital,vacant,occupied);
        var currentHash = bitcoin.hash(bitcoin.getLastBlock().hash,blockData,100);
        bitcoin.createBlock(102,bitcoin.getLastBlock().hash,currentHash);
        fs.writeFile("chainFile.txt", JSON.stringify(bitcoin.chain), function(err) {
        if(err) {
            return console.log(err);
        }
        }); 
        };
});

// serving the blockchain
app.use('/chainFile', function(req,res) {
    res.sendFile(path.join(__dirname,"chainFile.txt"));
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