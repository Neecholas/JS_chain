var EC = require('elliptic').ec;
// creates a new elliptic curve using the secp256k1 algorithm
const ec = new EC('secp256k1');

// generate a keypair
const key = ec.genKeyPair();
// create public and private keys in hexadecimal format
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log();
console.log('Private key:', privateKey);

console.log();
console.log('Public key:', publicKey);
