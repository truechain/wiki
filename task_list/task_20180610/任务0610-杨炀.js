/*
	开发语言：js
	框架：web3.js
	以太坊测试环境：testrpc
	作者:杨炀
*/

let Web3 = require('web3');
let web3;

// 初始化 wb3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// 发起交易
var ts = web3.eth.sendTransaction({
    from: '0x9fad199945e19d6d555e6f52ec6906216356f705',
    to: '0xe7ced5db153502be6840241716d15219c15af89e',
    value: '10'
})
.then((res) => {
	// 输出结果
	console.log(res)
	
	// 查询订单,以太坊出块速度在9s左右，这里使用了testrpc，区块貌似立即打包了
	web3.eth.getTransaction(res.transactionHash).then((res2) => {
		// 输出结果
		console.log(res2)
	})
});

// 发起交易输出结果
/*
{ transactionHash:
   '0x8d929a4ff527b4189055f730b487b3703d3846ae14913513190e7c7da13c11dd',
  transactionIndex: 0,
  blockHash:
   '0xda4514e5c4a2b128e4912c482db558cf6b43646a226592e34513bc1ab084f9ed',
  blockNumber: 12,
  gasUsed: 21000,
  cumulativeGasUsed: 21000,
  contractAddress: null,
  logs: [],
  status: true 
}
*/

// 查询订单交易结果
/*
{ hash:
   '0x8d929a4ff527b4189055f730b487b3703d3846ae14913513190e7c7da13c11dd',
  nonce: 11,
  blockHash:
   '0xda4514e5c4a2b128e4912c482db558cf6b43646a226592e34513bc1ab084f9ed',
  blockNumber: 12,
  transactionIndex: 0,
  from: '0x9faD199945e19d6D555e6f52EC6906216356f705',
  to: '0xE7CEd5dB153502be6840241716D15219C15aF89e',
  value: '10',
  gas: 90000,
  gasPrice: '20000000000',
  input: '0x0' 
  }
*/
