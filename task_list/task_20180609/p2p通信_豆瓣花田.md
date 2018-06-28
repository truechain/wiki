## 服务器的代码 server.go

> 直接运行即可，代码中已经nat打洞技术，如果要测试nat打洞的话，server.go需要运行在公网的服务器中。如果不需要测试nat打洞，在任何地方都可以直接运行

```go
package main

import (
	"fmt"
	"log"
	"net"
	"time"
)

func main() {
	listener, err := net.ListenUDP("udp", &net.UDPAddr{IP: net.IPv4zero, Port: 9981})
	if err != nil {
		fmt.Println(err)
		return
	}
	log.Printf("本地地址: <%s> \n", listener.LocalAddr().String())
	peers := make([]net.UDPAddr, 0, 2)
	data := make([]byte, 1024)
	for {
		n, remoteAddr, err := listener.ReadFromUDP(data)
		if err != nil {
			fmt.Printf("error during read: %s", err)
		}
		log.Printf("<%s> %s\n", remoteAddr.String(), data[:n])
		peers = append(peers, *remoteAddr)
		if len(peers) == 2 {

			log.Printf("进行UDP打洞,建立 %s <--> %s 的连接\n", peers[0].String(), peers[1].String())
			listener.WriteToUDP([]byte(peers[1].String()), &peers[0])
			listener.WriteToUDP([]byte(peers[0].String()), &peers[1])
			time.Sleep(time.Second * 8)
			log.Println("中转服务器退出,仍不影响peers间通信")
			return
		}
	}
}
```
## 客户端代码（需要修改）peer.go

`dstAddr := &net.UDPAddr{IP: net.ParseIP("192.168.2.240"), Port: 9981}` 
这个代码中的`192.168.2.240`，替换为你`server.go` 所在的ip地址

**注意：peer.go需要在两个电脑上运行，demo中让两个节点接连服务器之后，就立刻进行打洞，然后就实现p2p通信**
你可以在一台电脑上运行server.go和peer.go,另一台电脑上再运行一个peer.go【注意修改ip】

```go
package main

import (
	"fmt"
	"log"
	"net"
	"strconv"
	"strings"
	"time"
	"math/big"
	"encoding/gob"
	"bytes"
)

var tag = "节点"

const HAND_SHAKE_MSG = "我是打洞消息"
//以下是要发送的数据，先定义数据的类型
type BlockHeader struct {
	Number *big.Int
	GasLimit *big.Int
	GasUsed *big.Int
	Time *big.Int
}
type Transaction struct{
	from string
	to string
	value int
}
type Block struct {
	Header *BlockHeader
	Transactions []*Transaction
	Sig string
}
// 将区块序列化成字节数组.这是是方便我们进行数据的传输
func (block *Block) Serialize() []byte {

	var result bytes.Buffer

	encoder := gob.NewEncoder(&result)

	err := encoder.Encode(block)
	if err != nil {
		log.Panic(err)
	}
	return result.Bytes()
}
// 反序列化，这里是方便我们收到数据进行反序列化
func DeserializeBlock(blockBytes []byte) *Block {

	var block Block

	decoder := gob.NewDecoder(bytes.NewReader(blockBytes))
	err := decoder.Decode(&block)
	if err != nil {
		log.Panic(err)
	}

	return &block
}
//定义我们要发送的数据
var blockHeader = &BlockHeader{big.NewInt(1),big.NewInt(1000),big.NewInt(1000),big.NewInt(time.Now().Unix())}
var transaction = &Transaction{"xiaohong","laowang",10}
var transactions []*Transaction



func main() {
	transactions  = append(transactions,transaction)
	var block = Block{blockHeader,transactions,"sign_string"}

	// 当前进程标记字符串,便于显示
	//tag = os.Args[1]
	srcAddr := &net.UDPAddr{IP: net.IPv4zero, Port: 9982} // 注意端口必须固定
	//注意这里的IP需要修改啊
	dstAddr := &net.UDPAddr{IP: net.ParseIP("192.168.2.240"), Port: 9981}

	conn, err := net.DialUDP("udp", srcAddr, dstAddr)
	if err != nil {
		fmt.Println(err)
	}
	if _, err = conn.Write([]byte("hello, I'm new peer:" + tag)); err != nil {
		log.Panic(err)
	}
	data := make([]byte, 1024)
	n, remoteAddr, err := conn.ReadFromUDP(data)
	if err != nil {
		fmt.Printf("error during read: %s", err)
	}
	conn.Close()
	anotherPeer := parseAddr(string(data[:n]))
	fmt.Printf("local:%s server:%s another:%s\n", srcAddr, remoteAddr, anotherPeer.String())

	// 开始打洞
	bidirectionHole(srcAddr, &anotherPeer,block)

}

func parseAddr(addr string) net.UDPAddr {
	t := strings.Split(addr, ":")
	port, _ := strconv.Atoi(t[1])
	return net.UDPAddr{
		IP:   net.ParseIP(t[0]),
		Port: port,
	}
}
//nat打洞的程序
func bidirectionHole(srcAddr *net.UDPAddr, anotherAddr *net.UDPAddr,block Block) {
	conn, err := net.DialUDP("udp", srcAddr, anotherAddr)
	if err != nil {
		fmt.Println(err)
	}
	defer conn.Close()
	// 向另一个peer发送一条udp消息(对方peer的nat设备会丢弃该消息,非法来源),用意是在自身的nat设备打开一条可进入的通道,这样对方peer就可以发过来udp消息
	if _, err = conn.Write([]byte(HAND_SHAKE_MSG)); err != nil {
		log.Println("send handshake:", err)
	}
	//每隔5秒钟发送一次数据
	go func() {
		for {
			time.Sleep(5 * time.Second)
			//if _, err = conn.Write([]byte("from [" + tag + "]")); err != nil {
			//	log.Println("send msg fail", err)
			//}
			if _, err = conn.Write(block.Serialize()); err != nil {
				log.Println("send msg fail", err)
			}
		}
	}()
	//循坏来不断接受数据
	for {
		data := make([]byte, 1024)
		n, _, err := conn.ReadFromUDP(data)
		Dblock := DeserializeBlock(data[:n])
		if err != nil {
			log.Printf("error during read: %s\n", err)
		} else {
			log.Printf("收到数据:%s\n", data[:n])
		}
		fmt.Println("---------------收到数据------------")
		fmt.Println(Dblock.Transactions)
		fmt.Println(Dblock.Header)
		fmt.Println(Dblock.Sig)
	}
}
```

