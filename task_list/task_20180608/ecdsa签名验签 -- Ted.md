# 使用ecdsa算法签名验签 -- Ted




```
package main

import (
	"crypto/ecdsa"
	"crypto/rand"
	"golang.org/x/crypto/sha3"
	"fmt"
	"github.com/btcsuite/btcd/btcec"
	"math/big"
	"log"
)


var (
	secp256k1N, _  = new(big.Int).SetString("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16)
	secp256k1halfN = new(big.Int).Div(secp256k1N, big.NewInt(2))
)

func main() {
	//通过GenerateKey获取私钥
	priv, err := ecdsa.GenerateKey(btcec.S256(), rand.Reader)
	if err != nil {
		fmt.Println(err)
	}
	//明文
	s1 := []byte("Hello World")
	//进行sha3散列
	b := sha3.Sum256(s1)
	//椭圆曲线签名
	sig,err:=Sign(b[:],priv)
	if err !=nil{
		log.Fatal(err)
	}

	////通过消息的哈希和签名恢复公钥序列化数组
	pubkey,err:=Ecrecover(b[:],sig)
	//通过公钥序列化数组和消息hash以及签名文件解密验证
	fmt.Println(VerifySignature(pubkey[:],b[:],sig[:64]))


}
//通过哈希和私钥计算ECDSA签名
func Sign(hash []byte, prv *ecdsa.PrivateKey) ([]byte, error) {
	if len(hash) != 32 {
		return nil, fmt.Errorf("hash必须是32位", len(hash))
	}
	if prv.Curve != btcec.S256() {
		return nil, fmt.Errorf("私钥必须由secp256k1生成")
	}
	//通过SignCompact函数生成签名文件
	sig, err := btcec.SignCompact(btcec.S256(), (*btcec.PrivateKey)(prv), hash, false)
	if err != nil {
		return nil, err
	}
	//转换为Ethereum签名格式，最后使用“recovery id”v。
	v := sig[0] - 27
	copy(sig, sig[1:])
	sig[64] = v
	return sig, nil
}

//通过消息的哈希和签名恢复公钥
func Ecrecover(hash, sig []byte) ([]byte, error) {
	//通过SigToPub获取公钥
	pub, err := SigToPub(hash, sig)
	if err != nil {
		return nil, err
	}
	//将公钥序列化返回
	bytes := (*btcec.PublicKey)(pub).SerializeUncompressed()
	return bytes, err
}

func SigToPub(hash, sig []byte) (*ecdsa.PublicKey, error) {
	//转换为btcec输入格式，通过特定算法获取原始的签名文件
	btcsig := make([]byte, 65)
	btcsig[0] = sig[64] + 27
	copy(btcsig[1:], sig)
	//通过签名和交易hash与对应的加密曲线进行推导公钥
	pub, _, err := btcec.RecoverCompact(btcec.S256(), btcsig, hash)
	return (*ecdsa.PublicKey)(pub), err
}

//验证签名有效性
func VerifySignature(pubkey, hash, signature []byte) bool {
	if len(signature) != 64 {
		fmt.Println("签名文件必须是长度必须是六十四")
		return false
	}
	//将签名文件转换成ecdsa签名的类型
	sig := &btcec.Signature{R: new(big.Int).SetBytes(signature[:32]), S: new(big.Int).SetBytes(signature[32:])}
	//将公钥数组反序列化 获取公钥对象
	key, err := btcec.ParsePubKey(pubkey, btcec.S256())
	if err != nil {
		return false
	}
	// Reject malleable signatures. libsecp256k1 does this check but btcec doesn't.
	if sig.S.Cmp(secp256k1halfN) > 0 {
		return false
	}
	//通过key公钥验证sig是否合法
	return sig.Verify(hash, key)
}





```
