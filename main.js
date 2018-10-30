const {Blockchain, Transaction} = require('./block');
var EC = require('elliptic').ec;
// creates a new elliptic curve using the secp256k1 algorithm
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('bfc07f078396ac3ef19834710425772cbe751968e830729416c0330da837cb9b')
const myWalletAddress = myKey.getPublic('hex')
//test space
let nickCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
nickCoin.addTransaction(tx1);

nickCoin.minePendingTransactions(myWalletAddress);

console.log(JSON.stringify(nickCoin, null, 4));



