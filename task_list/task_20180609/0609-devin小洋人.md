###client

package main

import (
	"math/big"
	"fmt"
	"bytes"
	"encoding/gob"
	"log"
	"net"
	"math/rand"
	"time"
	"sync"
)
var count int64 = 1

var mutex = &sync.Mutex{}
// 块头部结构
type BlockHeader struct {
	Number *big.Int
	GasLimit *big.Int
	GasUsed *big.Int
	Time *big.Int
}
// 交易结构
type Transaction struct{
	TxHash string
	Vin string
	Vout string
}
// 块结构
type Block struct {
	Header *BlockHeader
	Transactions []*Transaction
	Sig string
}

// 序列化
func (block *Block) Serialize() []byte {

	var result bytes.Buffer

	encoder := gob.NewEncoder(&result)

	err := encoder.Encode(block)
	if err != nil {
		log.Panic(err)
	}
	return result.Bytes()
}

// 反序列化
func DeserializeBlock(blockBytes []byte) *Block {

	var block Block

	decoder := gob.NewDecoder(bytes.NewReader(blockBytes))
	err := decoder.Decode(&block)
	if err != nil {
		log.Panic(err)
	}

	return &block
}

func main() {
	//1.提供服务器地址
	tcpAddr, _ := net.ResolveTCPAddr("tcp4", "127.0.0.1:9527")
	//2.连接
	tcpConn, _ := net.DialTCP("tcp", nil, tcpAddr)
	handleData(tcpConn)
	// 阻塞 防止handleData 内goroutine无法执行
	select {}
}

// 创建交易
func createTransaction()[]*Transaction{
	return []*Transaction{}
}

// 创建区块头部
func creteBlockHeader( )*BlockHeader{
	var time1 =new(big.Int)
	time1.SetInt64(time.Now().Unix())
	var Number =new(big.Int)
	Number.SetInt64(count)

	return &BlockHeader{Number:Number,Time:time1}
}

// 创建区块
func createBlock( ) []byte{
	b  := new(Block)
	rand.Seed(time.Now().Unix())
	int1:=rand.Intn(1000)
	b.Header = creteBlockHeader()
	b.Transactions = createTransaction()
	b.Sig  =  string(int1)

	return b.Serialize()
}

func handleData(tcpConn *net.TCPConn){ //

	// 接受服务器广播
	go func() {
		for {
			n:=0
			//F:读取服务器
			bs := make([] byte, 2048*4)
			n, _ = tcpConn.Read(bs) //阻塞式
			content := DeserializeBlock(bs[:n])
			fmt.Println("区块高度:  ", content.Header.Number.Int64())
			fmt.Println("时间戳", time.Unix(content.Header.Time.Int64(), 0).Format("2006-01-02 03:04:05 PM"))
		}
	}()

	// 发送数据
	go func() {
		for {
			rand.Seed(time.Now().UnixNano())
			int1 := rand.Intn(10) + 1
			time.Sleep(time.Second * time.Duration(int1))
			if count % 10 == 0 {
				fmt.Println("退出请输入exit,继续则输入任意键")
				link:=""
				fmt.Scan(&link)
				if link == "exit" {
					tcpConn.Write([]byte{})
					log.Fatal("结束程序")
				}else{
					continue
				}
			}

			mutex.Lock()
			block := createBlock()
			mutex.Unlock()
			count++
			n, _ := tcpConn.Write(block)

			fmt.Println("\t\t\t\t\t广播区块 ：",count )
			fmt.Println()
			fmt.Println()
			if len(block) == 0 {
				fmt.Println("断开连接。。")
				fmt.Println(n)
				break
			}
		}

	}()
}


###server
package main

import (
	"math/big"
	"encoding/gob"
	"bytes"
	"fmt"
	"net"
	"log"
	"time"
)

type BlockHeader struct {
	Number *big.Int
	GasLimit *big.Int
	GasUsed *big.Int
	Time *big.Int
}
type Transaction struct{
	TxHash string
	Vin string
	Vout string
}
type Block struct {
	Header *BlockHeader
	Transactions []*Transaction
	Sig string
}

// 反序列化
func DeserializeBlock(blockBytes []byte) *Block {

	var block Block

	decoder := gob.NewDecoder(bytes.NewReader(blockBytes))
	err := decoder.Decode(&block)
	if err != nil {
		log.Panic(err)
	}

	return &block
}

// 存储已连接的客户端地址与连接
var map1 = make(map[net.Addr]net.Conn)

var count = 0

func main() {

	//1.提供本机的地址
	tcpAddr, _ := net.ResolveTCPAddr("tcp4", ":9527")
	//2.提供监听对象
	listener, _ := net.ListenTCP("tcp", tcpAddr)
	fmt.Println("服务器端已经就绪，等待客户端发送区块。。。")
	for{
		//3.等待客户端链接
		conn, _ := listener.Accept()
		count++
		fmt.Println("已有节点端连入。。", conn.RemoteAddr())
		map1[conn.RemoteAddr()] = conn
		fmt.Println(map1)
		//4.读写数据
		//C：服务器读取客户端
		go handleBlock(conn)

	}
}

func handleBlock(conn net.Conn) {
	for {
		bs := make([] byte, 2048*4)
		n, _ := conn.Read(bs) //阻塞的
		if  n == 0 {
			fmt.Println(conn.RemoteAddr().String(),"断开网络。。")
			// 去除已断开客户端
			delete(map1, conn.RemoteAddr())
			fmt.Println(map1)
			break
		}
		content := DeserializeBlock(bs[:n])
		fmt.Println("客户端发来区块：", content, n)
		fmt.Println("区块高度:  ",content.Header.Number.Int64())
		fmt.Println("时间戳",time.Unix(content.Header.Time.Int64(), 0).Format("2006-01-02 03:04:05 PM"))
		fmt.Println("正在广播")
		for ip,Conn:=range map1{
			fmt.Printf("正在往%s发送\n",ip)
			Conn.Write(bs)
		}
	}
	conn.Close()
}
