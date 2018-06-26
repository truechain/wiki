基于以太坊P2P模块和以太坊区块广播机制修改
大致流程
```
1，初始化源节点区块数据 和 目标节点
2，建立连接
3，源节点发送区块头广播
4，目标节点接受区块头广播，并发送获取区块广播
5，源节点接受获取区块的消息，并在本地找到区块头对应的区块发送区块广播
6，目标节点收到区块
````

mian.go
```
package main

import (
	"time"
	"fmt"
	"github.com/ethereum/go-ethereum/p2p"
	"math/big"
	"net"
)

const (
	BlockHeadersMsg   = 1
	GetBlockBodiesMsg = 2
	BlockBodiesMsg    = 3
	baseMsg     = uint64(16)
)

type BlockHeader struct {
	Number *big.Int
	GasLimit *big.Int
	GasUsed *big.Int
	Time *big.Int
}
type Transaction struct{
}
type Block struct {
	Header *BlockHeader
	Transactions []*Transaction
	Sig []*string
}

type P2PMessageNode struct {
	name string
	protos []p2p.Protocol
	blocks []*Block
	headers []*BlockHeader
}

func main(){
	mainP2PTest()
}

func mainP2PTest(){
	//初始化源节点数据
	srcNode := P2PMessageNode{name: "srcNode"}

	header1 := &BlockHeader{big.NewInt(0),
	big.NewInt(100),
	big.NewInt(100),
	big.NewInt(time.Now().Unix())}

	header2 := &BlockHeader{big.NewInt(1),
		big.NewInt(100),
		big.NewInt(100),
		big.NewInt(time.Now().Unix())}

	block1 := &Block{Header: header1}
	block2 := &Block{Header: header2}
	srcNode.headers = append(srcNode.headers, header1, header2)
	srcNode.blocks = append(srcNode.blocks, block1, block2)

	//初始化目标节点数据
	destNode := P2PMessageNode{name: "destNode"}

	fmt.Printf("srcNode = %v \n", srcNode)
	fmt.Printf("destNode = %v \n", destNode)

	//通讯协议数据处理方法
	proto := p2p.Protocol{
		Name:   "test",
		Length: 4,
		Run: func(peer *p2p.Peer, rw p2p.MsgReadWriter) error {
			fmt.Println("proto run start")
			for {
				msg, err := rw.ReadMsg()
				fmt.Printf("msg=%v err=%v, ", msg, err)
				if err != nil {
					return err
				}
				fmt.Printf("msgcode = %d \n", msg.Code)

				switch {
				case msg.Code == BlockHeadersMsg://目标节点接受区块头广播
					var query BlockHeader
					if err := msg.Decode(&query); err != nil {
						return nil
					}

					fmt.Printf("peer = %v recieve BlockHeadersMsg header = %v\n", peer.ID(), query)
					fmt.Printf("peer = %v send GetBlockBodiesMsg\n", peer.ID())
					p2p.Send(rw, GetBlockBodiesMsg, query)//目标节点发送获取区块广播

				case msg.Code == GetBlockBodiesMsg://源节点接受获取区块的消息
					var query BlockHeader
					if err := msg.Decode(&query); err != nil {
						return nil
					}
					fmt.Printf("peer = %v recieve GetBlockBodiesMsg\n header.number = %d \n", peer.ID(), query.Number)
					fmt.Printf("peer = %v send BlockBodiesMsg\n", peer.ID())
					//源节点在本地找到区块头对应的区块
					var block *Block
					for _, b := range srcNode.blocks{
						if cmp := b.Header.Number.Cmp(query.Number); cmp == 0 {
							block = b
						}
					}
					p2p.Send(rw, BlockBodiesMsg, block)//源节点发送区块广播

				case msg.Code == BlockBodiesMsg://目标节点收到区块
					var query Block
					if err := msg.Decode(&query); err != nil {
						return nil
					}
					fmt.Printf("peer = %v recieve BlockBodiesMsg block = %v\n", peer.ID(), query)
				default:
					//return fmt.Printf(ErrInvalidMsgCode, "%v", msg.Code)
				}
			}
			return nil

		},
	}

	//创建p2p节点
	fdSrc, fdDest := net.Pipe()

	srcCloser, fdSrcCon, _ := p2p.TestNewPeer(fdSrc, []p2p.Protocol{proto})
	defer srcCloser()

	destCloser, _, _ := p2p.TestNewPeer(fdDest, []p2p.Protocol{proto})
	defer destCloser()

	//源节点发送区块头广播
	p2p.Send(fdSrcCon, baseMsg + BlockHeadersMsg, srcNode.headers[0])


	select {
	case <-time.After(5 * time.Second):
		fmt.Println(" timeout")
	}
}
```

p2pTest.go 放在以太坊p2p目录下，方便使用非公开方法。
```
package p2p

import (
	"net"
	"github.com/ethereum/go-ethereum/p2p/discover"
	"github.com/ethereum/go-ethereum/crypto/sha3"
	"errors"
	"math/rand"
)

func randomID() (id discover.NodeID) {
	for i := range id {
		id[i] = byte(rand.Intn(255))
	}
	return id
}


func TestNewPeer(fd net.Conn, protos []Protocol) (func(), *conn, *Peer) {
	id := randomID()
	c := &conn{fd: fd, transport: newTestTransport(randomID(), fd), id: id}
	for _, p := range protos {
		c.caps = append(c.caps, p.cap())
	}

	peer := newPeer(c, protos)
	go func() {
		peer.run()
	}()

	closer := func() { c.close(errors.New("close func called")) }
	return closer, c, peer
}

type Conn2 struct {
	Conn *conn
}


func (p *Peer) Run1() (remoteRequested bool, err error) {
	return p.run()
}


func newTestTransport(id discover.NodeID, fd net.Conn) transport {
	wrapped := newRLPX(fd).(*rlpx)
	wrapped.rw = newRLPXFrameRW(fd, secrets{
		MAC:        zero16,
		AES:        zero16,
		IngressMAC: sha3.NewKeccak256(),
		EgressMAC:  sha3.NewKeccak256(),
	})
	return &testTransport{id: id, rlpx: wrapped}
}

type testTransport struct {
	id discover.NodeID
	*rlpx

	closeErr error
}

```

运行日志结果
```
srcNode = {srcNode [] [0xc420061b80 0xc420061bc0] [0xc420161f80 0xc420174020]} 
destNode = {destNode [] [] []} 
send ok
proto run start
proto run start
msg=msg #1 (9 bytes) err=<nil>, msgcode = 1 
peer = 9a60fc7855d7757c17629f6cbdf2d9070b5950929256553de53150858d0fcacb25ab85eacfe4a24ef38551788ce1ef0716e17e1d733f73ea23127827bbfa6e4d recieve BlockHeadersMsg header = {0 100 100 1529672509}
peer = 9a60fc7855d7757c17629f6cbdf2d9070b5950929256553de53150858d0fcacb25ab85eacfe4a24ef38551788ce1ef0716e17e1d733f73ea23127827bbfa6e4d send GetBlockBodiesMsg
send ok
msg=msg #2 (9 bytes) err=<nil>, msgcode = 2 
peer = 56847afe9799739b3d9677972a3b58ef609ba78332428f85ed2534d0b496108a4d92ae0b48d32d9c67dc9a302bfc765ed67bde3d5481cdfa531267aa655aa5ab recieve GetBlockBodiesMsg
 header.number = 0 
peer = 56847afe9799739b3d9677972a3b58ef609ba78332428f85ed2534d0b496108a4d92ae0b48d32d9c67dc9a302bfc765ed67bde3d5481cdfa531267aa655aa5ab send BlockBodiesMsg
send ok
msg=msg #3 (12 bytes) err=<nil>, msgcode = 3 
peer = 9a60fc7855d7757c17629f6cbdf2d9070b5950929256553de53150858d0fcacb25ab85eacfe4a24ef38551788ce1ef0716e17e1d733f73ea23127827bbfa6e4d recieve BlockBodiesMsg block = {0xc4201e4320 [] []}
 timeout

Process finished with exit code 0
```
