package main

import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"fmt"
)
var testAddrHex = "970e8128ab834e8eac17ab8e3812f010678cf791"
var testPrivHex = "289c2857d4598e37fb9647507e47a309d6133539bf21a8b9cb6df88fd5232032"


func main() {
	//将私钥转换格式
	key, _ := crypto.HexToECDSA(testPrivHex)
	addr := common.HexToAddress(testAddrHex)

	//将数据生成hash值
	msg := crypto.Keccak256([]byte("hello world!!"))
	sig, err := crypto.Sign(msg, key)
	if err != nil {
		fmt.Println("Sign error: %s", err)
	}
	//还原出公钥
	recoveredPub, err := crypto.Ecrecover(msg, sig)
	if err != nil {
		fmt.Println("ECRecover error: %s", err)
	}
	pubKey := crypto.ToECDSAPub(recoveredPub)
	//还原出地址
	recoveredAddr := crypto.PubkeyToAddress(*pubKey)
	if addr != recoveredAddr {
		fmt.Println("Address mismatch: want: %x have: %x", addr, recoveredAddr)
	}
	fmt.Println("public key is:%s",pubKey)
	fmt.Println("compress public key is:%s",crypto.CompressPubkey(pubKey))
	//验证
	if !crypto.VerifySignature(crypto.CompressPubkey(pubKey), msg, sig) {
		fmt.Println("can't verify signature with uncompressed key")
	}

}
