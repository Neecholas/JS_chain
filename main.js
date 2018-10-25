const {Blockchain, Transaction} = require('./block');


//test space
let nickCoin = new Blockchain();
nickCoin.createTransaction(new Transaction("address1", "address2", 10));
nickCoin.createTransaction(new Transaction("address1", "address2", 5));




console.log(JSON.stringify(nickCoin, null, 4));



