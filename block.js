// create a class for the block
// REMEMBER: JS uses lowerCamelcase, not snake_case like C, python and Ruby!!!
// pull in the sha256 hashing algorithm
const SHA256 = require('crypto-js/sha256');
var EC = require('elliptic').ec;
// creates a new elliptic curve using the secp256k1 algorithm
const ec = new EC('secp256k1');

class Block{
  constructor(transactions, previousHash = ''){
    //creates the four instance variables, with previousHash auto set
    this.transactions = transactions;
    let timestamp = new Date();
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(){
    //creates a unique hash based on the index, timestamp, block data and previous hash
    //uses the sha256 algorithm to digest the data into a unique id
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
      this.nonce ++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }

  hasValidTransaction(){
    for(const tx = this.transactions){
      if(!tx.isReal()){
        return false;
      }
    }

    return true;
  }
}

class Transaction {
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  caclculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(keySign){
    if(signingKey.getPublic('hex') !== this.fromAddress){
      throw new Error('You cannot sign transactions for orther wallets!');
    }

    const hashTran = this.calculateHash();
    const sig = keySign.sign(hashTran, 'base64');
    this.signature = sig.toDER('hex');
  }

  isReal(){
    if(this.fromAddress === null) return true;

    if(!this.signature || this.signature.length === 0){
      throw new Error('No signature in this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

class Blockchain{
  constructor(){
    //set the chain as a list that contains the genesis block
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }
  //manually create the first block, the 'genesis' block
  createGenesisBlock(){
    return new Block("First block", "0");
  }

  getLatestBlock(){
    //returns the last element of the blockchain list
    //this will be important for getting the hash we need to point to to create a new block
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress){
    //block is created with an array of pending transactions as it's transactions
    let block = new Block(this.pendingTransactions);
    //block is mined
    block.mineBlock(this.difficulty);
    console.log("Block sucessfully mined");
    //mined block is added to the chain
    this.chain.push(block);

    this.pendingTransactions = [
      //gives a transaction with no from address to the miner and replaces the mined transactions
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  createTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address){
    let balance = 0;

    for(const block of this.chain){
      for(const trans of block.transactions){
        //checks your address against transaction addresses and calculates your balance
        if(trans.fromAddress === address){
          balance -= trans.amount;
        }
        if(trans.toAddress === address){
          balance += trans.amount;
        }
      }
    }
    //returns the balance
    return balance;
  }
  //create a method to validate the blockchain
  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }

    return true;
  }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
