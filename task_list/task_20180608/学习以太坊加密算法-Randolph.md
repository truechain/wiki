纠结了半天， 实在没琢磨出来， 就找了前辈提交的代码先交了作业，再潜心学习， 还有简书上发现的一篇文章，讲的不错，链接：https://www.jianshu.com/p/d622e1ec9470?from=singlemessage

## 椭圆加密描述：
-在以太坊中，椭圆加密的作用是签名验证的作用，不是我们所理解的
-jia mi     asd ad asd asd a   
-
-
-
+在以太坊中，椭圆加密的作用是签名验证的作用，不是我们所理解的加解密。 
+流程描述：
+* 用随机数生成器产生一个随机数，此随机数就作为**私钥**，附带产生**公钥**
+* 将哈希后的明文与私钥，在椭圆加密的作用下，生成密文
+* 验证部分：将密文与公钥在椭圆加密下的验证函数作用下生成一串待验证明文
+* 将待验证明文和接收到的数据对比，即可验证收到的数据是否安全，
 
 ## 算法描述：
+我们在调用椭圆加密之前，对明文”hello world“使用了一次哈希散列，这就意味着我们只能完成签名验证的功能，不可能从密文回到”hello world“。
 


// ECDSA-secp256k1_test.go
package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"math/big"
)

func main() {
	fmt.Println("start!")

	//生成明文
	message := []byte("hello world")
	fmt.Println("明文是: hello world")

	//通过随机值, 得到私钥
	privateKey, _ := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)

	pub := privateKey.PublicKey
	//明文散列处理，第一次加密, 在以太坊中, 真正机密之前也进行了哈希散列处理
	Dig := sha256.Sum256(message)

	//椭圆签名生成证书, 这里用到的参数有 私钥, 散列后明文
	r, s, _ := ecdsa.Sign(rand.Reader, privateKey, Dig[:])
	fmt.Println("密文r,s分别是:\nr:", r, "\ns:", s)
	//设置私钥参数类型为曲线
	param := privateKey.Curve.Params()

	//获得私钥Ｋｅｙ　ｂｙｔｅ长度
	curveOrderByteSize := param.P.BitLen() / 8

	//获得签名返回值的　字节长度
	rbyte, sByte := r.Bytes(), s.Bytes()

	//创建一个数组，长度是密钥字节长度两倍
	signatue := make([]byte, curveOrderByteSize*2)

	//通过数组保存了签名结果的返回值
	copy(signatue[curveOrderByteSize-len(rbyte):], rbyte)
	copy(signatue[curveOrderByteSize*2-len(sByte):], sByte)

	//----------------------------------------------------------
	fmt.Println("------------------------------------------------------------")
	fmt.Println("下面是验证密文部分")
	//下面是验证部分代码

	//verify
	//将明文Ｈａｓｈ散列，为了验证内容对比

	Dig = sha256.Sum256(message)

	curveOrderByteSize = pub.Curve.Params().P.BitLen() / 8
	r, s = new(big.Int), new(big.Int)

	//设置证书值
	r.SetBytes(signatue[:curveOrderByteSize])
	s.SetBytes(signatue[curveOrderByteSize:])

	//verify
	e := ecdsa.Verify(&pub, Dig[:], r, s)

	if e == true {
		fmt.Println("succussful")
	} else {
		fmt.Println("failed")
	}

}


程序运行结果如下:
start!
明文是: hello world
密文r,s分别是:
r: 88940205377568558938456347963968359538879538691699891731127100507903439243168 
s: 62013676889096213978966954793759200294387160311896217800815350839462370913480
------------------------------------------------------------
下面是验证密文部分
succussful
