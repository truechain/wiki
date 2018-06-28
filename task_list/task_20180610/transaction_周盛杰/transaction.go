package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/accounts/keystore"
)

func main() {

  // 从文件读取密钥
	json, _ := ioutil.ReadFile("keystore/UTC--2018-06-18T03-10-35.268792533Z--76058343a3b72caadc69a98391eb23106a1c9f1a")
	key, _ := keystore.DecryptKey(json, "1")

	// 新建交易，nonce, &to, amount, gasLimit, gasPrice, data
	tx := types.NewTransaction(
		0,
		common.HexToAddress("0xb384d422102a0ef7bcf5492d86c74be5814f028c"),
		big.NewInt(1000), 21000, big.NewInt(30000),
		nil,
	)
  // 签名交易
	signedTx, _ := types.SignTx(tx, types.HomesteadSigner{}, key.PrivateKey)

	// https://godoc.org/github.com/obscuren/go-ethereum/
  rpcDial, _ := rpc.Dial("http://127.0.0.1:8545")
	client := ethclient.NewClient(rpcDial)
	client.SendTransaction(context.Background(), signedTx) // 发起交易

  // 查询状态
  txHash := signedTx.Hash() 
  tx, isPending, _ := client.TransactionByHash(context.Background(), txHash)
  fmt.Println(isPending)       // 检查是否成交

}
