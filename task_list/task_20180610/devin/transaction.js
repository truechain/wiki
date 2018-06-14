let Web3 = require('web3');
let web3;
let co = require('co');
let Tx = require('ethereumjs-tx');

// 初始化 wb3
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// 设置交易数据
let privateKey = new Buffer.from('19293ac90d1110fde72539889bb025cbcaf816ab6bef49be9494c5c7f2998ba1', 'hex')
let fromAccount = '0xef14d3e581b97a54618363ca2c74bdb9c1c7c4cb'
let toAccount = '0x2112605bc9ece4151f6a1447f22b2086504bb903'
let amountToSend = "1";
let gasPrice = "2";//or get with web3.eth.gasPrice
let gasLimit = 3000000;

// 异步代码同步化
co(function* () {
	// 获取付款账户nonce
	let nonce = yield web3.eth.getTransactionCount('0xef14d3e581b97a54618363ca2c74bdb9c1c7c4cb');
		
	// 组装交易数据	
	var rawTx = {
	  nonce: nonce,
	  gasPrice: web3.utils.toHex(gasPrice * 1e9), 
	  gasLimit: web3.utils.toHex(gasLimit),
	  to: toAccount, 
	  value: web3.utils.toHex(amountToSend), 
	  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
	}

	// 交易私钥签名
	var tx = new Tx(rawTx);
	tx.sign(privateKey);

	var serializedTx = tx.serialize();

	// 发起签名交易
	let err, hash = yield web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
	
	console.log('发起签名交易');
	console.log(hash);

	// 查询交易
	res = yield web3.eth.getTransaction(hash.transactionHash);
	console.log('查询交易');
	console.log(res);
})

