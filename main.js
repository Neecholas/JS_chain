//create a class for the block
//REMEMBER: JS uses lowerCamelcase, not snake_case like C, python and Ruby!!!
class Block{
  constructor(index, data, previousHash = ''){
    //creates the four instance variables, with previousHash auto set
    this.index = index;
    this.data = data;
    timestamp = new Date();
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = '';
  }

  calculateHash(){
    //creates a unique hash based on the index, timestamp, block data and previous hash
    //uses the sha256 algorithm to digest the data into a unique id
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
  constructor(){
    //set the chain as a list that contains the genesis block
    this.chain = [this.createGenesisBlock];
  }
  //manually create the first block, the 'genesis' block
  createGenesisBlock(){
    return new Block(0, "First block", "0");
  }

  getLatestBlock(){
    //returns the last element of the blockchain list
    //this will be important for getting the hash we need to point to to create a new block
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    //sets the previous hash property of the block to the hash of the last block
    newBlock.previousHash = this.getLatestBlock().hash;
    //calculates the unique hash of the latest block
    newBlock.hash = newBlock.calculateHash();
    //pushes it onto the blockchain list
    this.chain.push(newBlock);
  }
}

//test space
// let nickCoin = new Blockchain();
// console.log(nickCoin.chain);



