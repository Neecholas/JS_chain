const {Blockchain, Transaction} = require('./block');
var EC = require('elliptic').ec;
// creates a new elliptic curve using the secp256k1 algorithm
const ec = new EC('secp256k1');

const nickKey = ec.keyFromPrivate('bfc07f078396ac3ef19834710425772cbe751968e830729416c0330da837cb9b');
const nickWalletAddress = nickKey.getPublic('hex');
const altKey = ec.keyFromPrivate('2c800f9e5ec38efb9c9c26836805cb617ae63f360ba56dc8b9c9cf0143d62802');
const altWalletAddress = altKey.getPublic('hex');
//test space
let nickCoin = new Blockchain();

const tx1 = new Transaction(nickWalletAddress, altWalletAddress, 10);
tx1.signTransaction(nickKey);
nickCoin.addTransaction(tx1);

console.log('booting up the miner, difficulty:', nickCoin.difficulty);
nickCoin.minePendingTransactions(nickWalletAddress);
nickCoin.minePendingTransactions(altWalletAddress);

console.log('Nick\'s current balance:', nickCoin.getBalanceOfAddress(nickWalletAddress));
console.log('Other guy\'s current balance:', nickCoin.getBalanceOfAddress(altWalletAddress));


console.log(JSON.stringify(nickCoin, null, 4));



