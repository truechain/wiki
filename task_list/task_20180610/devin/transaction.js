var Web3 = require('web3');
var web3;
var co = require('co');
var Tx = require('ethereumjs-tx');
var keyth=require('keythereum'); 

// 初始化 wb3
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://47.94.20.94:8545"));
}

// 直接知道私钥的情况
// let privateKey = new Buffer.from('619744be9a747a1da67602caf5dfe3fd9da43a6786878c449dfb01f65029f0d6', 'hex');

// 不知道私钥，有keystore文件，可以根据文件和密码推导出私钥
let fromAccount = '0xabc475d81f1e2fe8b0f748ba4531f179c86821ad';
var keyobj=keyth.importFromFile(fromAccount,'/Users/yangyang/learn/block/');
var privateKey=keyth.recover('devin',keyobj);  

// 设置收款公钥及收款金额
let toAccount = '0xddb011611215b357ef480a4aa8c9e573b3b804d5';
let amountToSend = "1";
// let gasPrice = web3.eth.gasPrice;//or get with web3.eth.gasPrice

// 异步代码同步化
co(function* () {
	
	let gasPrice = yield web3.eth.getGasPrice();
  	let nonce = yield web3.eth.getTransactionCount(fromAccount);
	var rawTx = {
		nonce: nonce,
		gasPrice: web3.utils.toHex(gasPrice),
		gasLimit: web3.utils.toHex(90000),
		to: toAccount,
		value: web3.utils.toHex(amountToSend),
		data: ''
  }

  var tx = new Tx(rawTx);
  tx.sign(privateKey);

  var serializedTx = tx.serialize();
  
	web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .on('receipt', console.log);

})

/*
 
查询结果
> web3.eth.getTransaction('0x41dd4adff8b3a5691d8ff6f38ef07eabc34c7f17a7148aa671eac09e05f36bc3')
{
  blockHash: "0x72ff4c7bb1ca4ce1c52dd7255523ebaa8c72926453eda3d7b7478ca30113cff4",
  blockNumber: 282,
  from: "0xabc475d81f1e2fe8b0f748ba4531f179c86821ad",
  gas: 90000,
  gasPrice: 18000000000,
  hash: "0x41dd4adff8b3a5691d8ff6f38ef07eabc34c7f17a7148aa671eac09e05f36bc3",
  input: "0x",
  nonce: 6,
  r: "0x507cf9449b395928f26eaf39f8d1d07a7b6492f921005a3967721975704bb57",
  s: "0x69c4ad484a267d236cd0aa0e0e2db2f1d92498ac216cee3eb70fcc01b4d652f9",
  to: "0xddb011611215b357ef480a4aa8c9e573b3b804d5",
  transactionIndex: 0,
  v: "0x1c",
  value: 1
}


 * */


