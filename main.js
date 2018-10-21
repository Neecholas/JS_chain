
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


