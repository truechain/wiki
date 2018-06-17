# go 语言实现向以太坊网络发起一笔交易

标签（空格分隔）： 以太坊

---

geth是以太坊智能合约开发中最常用的开发工具，其具有挖矿、交易等多种功能。我们还可以用geth工具构建自己的私有链。geth作为一个server，提供了丰富json-rpc接口供开发者调用，本文我们主要实现golang程序调用geth的rpc接口，实现了发起一笔交易这个小功能。本文假定读者熟悉golang项目开发。

 1. 安装geth
 虽然mac和linux系统都有自己的包管理工具可以用来方便的安装geth，但是根据笔者的亲身体验，这种方式可能会出现一些比如进度卡死等问题。所以推荐直接下载源码构建的方式。

    `git clone https://github.com/ethereum/go-ethereum`
    下载完源码，编译geth
    `cd go-ethereum`
    `make geth`

 2. 运行geth
 编译成功后，go-ethereum/buid/bin下会生成名为geth的可执行文件，运行即可启动geth
`./geth --identity "pdj" --datadir "~/ethdev" --rpcport 8545 --rpccorsdomain "*" --port "30303" --nodiscover --nat "any" --networkid 15 --rpc --rpcapi "db,eth,net,web3,personal" --ipcpath "geth.ipc" console --dev --dev.period 1`
启动geth时带了很多参数。
--datadir "~/ethdev"：表示区块和账户数据放在~/ethdev下
--rpcport 8545：表示geth开放的rsp端口号是8545
--rpcapi "db,eth,net,web3,personal"：表示开放的rsp接口类型
--dev --dev.period1：表示以开发者模式启动，开发者模式启动后，会自动创建一个账户并启动挖矿，只有启动挖矿以后，调用rpc接口发起交易才会成功。
--networkid 15：表示创建的是私有链，当networkid为1时表示连接以太坊主网。

 3. 编码实现
```
package main

import (
    "fmt"
    "github.com/ethereum/go-ethereum/rpc"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"math/big"
)

//RPC接收的类型是/go-ethereum/internal/ethapi/api包下的SendTxArgs，不要用成别的

type SendTxArgs struct {
	From     common.Address
	To       *common.Address
	Gas      *hexutil.Uint64
	GasPrice *hexutil.Big
	Value    *hexutil.Big
	Nonce    *hexutil.Uint64
	// We accept "data" and "input" for backwards-compatibility reasons. "input" is the
	// newer name and should be preferred by clients.
	Data  *hexutil.Bytes
	Input *hexutil.Bytes
}

func main() {

	//连接RPC
    client, err := rpc.Dial("http://localhost:8545")
    if err != nil {
        fmt.Println("rpc.Dial err", err)
        return
    }   

    //获取geth管理的账户
    var account []common.Address
    err = client.Call(&account, "eth_accounts")
    if err != nil {
    	fmt.Println("client.Call err", err)
    	return
    }

    //参数含义，参考https://ethereum.gitbooks.io/frontier-guide/content/rpc.html#eth_sendtransaction
    var result string
    var gas hexutil.Uint64 = 30400
	var gasPrice *hexutil.Big = (*hexutil.Big)(big.NewInt(10000000000000))
    var value *hexutil.Big = (*hexutil.Big)(big.NewInt(2441406250))
	var nonce hexutil.Uint64 = 1

	stx := SendTxArgs{account[0], &account[1], &gas , gasPrice, value, &nonce, nil, nil}

    err = client.Call(&result, "eth_sendTransaction", stx)

    if err != nil {
        fmt.Println("client.Call err", err)
        return
    }   

    //打印RPC调用返回结果，成功的话应该是该交易的hash值
    fmt.Println("msg:", result)
}
```

该程序主要用到了go-ethereum项目中提供的rpc/client包，该包可以方便我们发起rpc请求。
在运行程序之前，先使用geth终端创建一个账户。

    > eth.newAccount('123')
123为密码，账户解锁等操作需要输入该秘密。
查询当前有几个账户

    > eth.accounts
查询两个账户的余额

    > eth.getBalance(eth.accounts[0])
    > eth.getBalance(eth.accounts[1])
第一个账户为挖矿账户，应该是有余额的，第二个账户是新建的账户，余额为0。接下来运行程序，可以观察到程序打印了一串哈希码。

    msg: 0x9b5ab8dc79688384e013c98cf6df16b98d5d5398e157cf342248cf4445239ca8
该哈希码即为rsp接口的返回值，该返回值为本次交易的哈希值。
最后在geth终端中查询账户2的余额，验证是否转账成功。

    > eth.getBalance(eth.account[1])
可以发现账户2中已经有了账户1转过来的以太坊。

     
