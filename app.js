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
    var output = "<h1>The Blockchain:</h1><br><br>"+ JSON.stringify(bitcoin)+'<br>';
    output = output+'<br>Validity of the Blockchain....';
    output = output+'<br>'+bitcoin.chainIsValid(bitcoin.chain);
    var dic={}
    for (var i in bitcoin.chain){
        if (bitcoin.chain[i].ventilators[0]){
            dic[bitcoin.chain[i].ventilators[0].hospid]=[bitcoin.chain[i].ventilators[0].vacant,bitcoin.chain[i].ventilators[0].occupied,bitcoin.chain[i].ventilators[0].longi,bitcoin.chain[i].ventilators[0].lati]
        }
    if (i==bitcoin.chain.length-1){
        output=output+'<br><br>Table of all hospitals and ventilator status<br>'+JSON.stringify(dic);
    }
    }
    res.send(output);
    }
});

// endpoint for creating ventilators
app.get('/createVentilator', function(req,res) {
    if (req.headers.referer=='https://6001-d57a59fb-d01a-4dd0-8676-496c969a8b9e.ws-us02.gitpod.io/hospital/login'|| req.headers.referer=="https://covid-19.eu-gb.cf.appdomain.cloud/hospital/login"){
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            bitcoin.chain = JSON.parse(data);
            nextSteps();
            res.send("Success: Created Ventilator. Redirecting to login page. Please wait... <script type='text/javascript'>setTimeout(() => {  window.location.href='/hospital/login'; }, 3000);</script>");
        } else {
            console.log(err);
        }
    });
    var nextSteps = function(){
        var userid=req.param('userid')
        var hospital = req.param('hospital');
        var vacant = parseInt(req.param('vacant'));
        var occupied = parseInt(req.param('occupied'));
        var longi = parseInt(req.param('longi'));
        var lati = parseInt(req.param('lati'));
        
        var blockData = bitcoin.createVentilator(hospital,vacant,occupied,longi,lati);
        var currentHash = bitcoin.hash(bitcoin.getLastBlock().hash,blockData,100);
        bitcoin.createBlock(102,bitcoin.getLastBlock().hash,currentHash);
        fs.writeFile("chainFile.txt", JSON.stringify(bitcoin.chain), function(err) {
        if(err) {
            return console.log(err);
        }
        }); 
        }
    }else {
        res.send("Invalid request. Only authorised users from hospitals are allowed to use their service.<script type='text/javascript'>setTimeout(() => {  window.location.href='/'; }, 3000);</script>")
    }
});

// serving the blockchain
app.get('/chainFile', function(req,res) {
    res.sendFile(path.join(__dirname,"chainFile.txt"));
});

app.get('/test', function(req,res){
    res.sendFile(path.join(__dirname,'test.html'));
})
// serving the login page for the hospitals
app.use('/hospital/login', express.static(path.join(__dirname,'public/hosp_login')));

// returning page after successfull signup
app.get('/register-success', function(req,res){
    res.sendFile(path.join(__dirname, 'public/hosp_login/register-success.html'))
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