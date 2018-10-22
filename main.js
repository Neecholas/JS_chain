
//create a class for the block
//REMEMBER: JS uses lowerCamelcase, not snake_case like C, python and Ruby!!!
class Block{
  constructor{index, timestamp, data, previousHash = ''}{
    //creates the four instance variables, with previousHash auto set
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = '';
  }

  calculateHash(){
    //creates a unique hash based on the index, timestamp, block data and previous hash
    //this stops
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
    return new Block(0, "22/10/2018", "First block", "0");
  }

  getLatestBlock(){
    //returns the last element of the blockchain list
    //this will be important for getting the hash we need to point to to create a new block
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock.calculateHash;
  }
}


