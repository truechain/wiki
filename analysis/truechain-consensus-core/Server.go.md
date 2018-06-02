```go
/*
Copyright (c) 2018 TrueChain Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package pbft

// import (
// "path"
// "os"
// "net/rpc"
// "strconv"
// "fmt"
// )

type Server struct {
	IP   string
	Port int
	Nd   *Node
	Cfg  *Config
	Out  chan ApplyMsg
}
//Neo 20180524
//chan是golang非常重要的一个概念，用于在不同的goroutine之间通信或共享数据，是go推荐的共享数据的方式。
//chan有默认的deadlock检测机制
//
//
//Neo 20180524
//用来打印 server 结构体
func (sv *Server) Start() {
	MyPrint(1, "Firing up peer server...\n")
}
//Neo 20180524
//函数 start没有返回值
//函数定义需要注意
//函数无须前置声明
//
//不支持命名嵌套定义，支持匿名嵌套
//
//函数只能判断是否为nil，不支持其它比较操作
//
//支持多返回值
//
//支持命名返回值
//
//支持返回局部变量指针
//
//支持匿名函数和闭包

//参数
//Go语言中给函数传参时需要注意以下几点：
//
//不支持默认参数
//
//不支持命名实参
//
//参数视作为函数的局部变量
//
//必须按签名顺序传递指定类型和数量的实参
//
//相邻的同类型参数可以合并
//
//支持不定长变参，实质上是slice


//Neo 20180524
//创建服务器
//
func BuildServer(cfg Config, IP string, Port int, me int) *Server {
	sv := &Server{} //定义了SV结构体
	sv.IP = IP
	sv.Port = Port
	sv.Out = make(chan ApplyMsg)//创建一个 applymsg数组切片
	sv.Cfg = &cfg
	applyChan := make(chan ApplyMsg)
	//已并发的方式调用匿名函数func这样就可以提供程序的并发处理能力
	go func(aC chan ApplyMsg) {
		for {//for不带参数没搞懂，死循环，还是只运行一次
			//Channel是Go中的一个核心类型，你可以把它看成一个管道，通过它并发核心单元就可以发送或者接收数据进行通讯(communication)。
			c := <-aC
			MyPrint(4, "[0.0.0.0:%d] [%d] New Sequence Item: %v\n", sv.Port, me, c)
			sv.Out <- c
		}
	}(applyChan)
	sv.Nd = Make(cfg, me, Port, 0, applyChan, 100) // test 100 messages

	go sv.Start() // in case the server has some initial logic
	return sv
}

```
