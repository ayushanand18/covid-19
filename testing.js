const fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'chainFile.txt');
const blockchain = require('./blockchain');
const bitcoin = new blockchain();

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
    console.log(output);
    var dic={}
    for (var i in bitcoin.chain){
        if (bitcoin.chain[i].ventilators[0]){
            console.log(bitcoin.chain[i].ventilators[0])
            dic[bitcoin.chain[i].ventilators[0].hospid]=[bitcoin.chain[i].ventilators[0].vacant,bitcoin.chain[i].ventilators[0].occupied,bitcoin.chain[i].ventilators[0].longi,bitcoin.chain[i].ventilators[0].lati]
        }
    }
    if (i==bitcoin.chain.length-1){
        console.log(dic)
    }
    }
    
    