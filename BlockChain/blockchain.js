const SHA256 = require('crypto-js/sha256');
var datetime = new Date();

console.log("**********Creating Blocks**********")

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nounce = 0;
        //Nounce is a random number whose value is set so that the hash of the block will contain a sequence of leading zeroes. 
        //The rest of the fields may not be changed, as they have a defined meaning
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce++;
            this.hash = this.calculateHash();
        }
        console.log("** Block Mined **\n");
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        //Difficulty indicates the number of leading zeroes in the hash
    }

    createGenesisBlock() {
        return new Block(0, "25/02/2018", "Genesis block", "0");
        //The first block of the BlockChain
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        //Checking the integrity of the blockchian
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let bch = new Blockchain();

console.log("Mining Block 1...");
bch.addBlock(new Block(1, datetime, { amount: 4 }));

console.log("MIning Block 2...");
bch.addBlock(new Block(2, datetime, { amount: 10 }));

console.log(JSON.stringify(bch, null, 4));

console.log('Is BlockChain valid ? ' + bch.isChainValid());

console.log('Changing data in block 1 ...');
bch.chain[1].data = { amount: 100 };

console.log("Is BlockChain valid ? " + bch.isChainValid());