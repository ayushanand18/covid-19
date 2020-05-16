// the script for blockchain app here

function blockchain(){
        this.chain=[]
        this.pending=[]
};
blockchain.prototype.createBlock=function(nonce, prevHash, hash){
        const newBlock = {
            index:this.chain.length+1,
            timestamp:Date.now(),
            ventilators:this.pending,
            nonce:nonce,
            prevHash:prevHash,
            hash:hash
        }
        this.pending=[]
        this.chain.push(newBlock);
}
blockchain.prototype.hash= function(prevHash, blockData, nonce){
    hash = prevHash+ JSON.stringify(blockData)+ nonce.toString();
    return hash;
}


module.exports=blockchain();