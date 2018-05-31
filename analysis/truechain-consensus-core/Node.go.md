Node.go是Server Node的核心实现，完成了PBFT协议的基本功能。

##### 1. 初始化
通过外部调用Make函数进行初始化，函数定义为：
func Make(cfg Config, me int, port int, view int, applyCh chan ApplyMsg, max_requests int) *Node ；
主要包括几部分：
通过gob.Register注册进行RPC通讯的各个消息结构体，便于通讯时的序列化；
Node各个参数的初始化
建立数据与Log目录，用于保存数据
创建与其他Node的连接并启动监听。

Node各参数初始化
Node参数较多，：
![avatar](https://github.com/truechain/wiki/blob/master/analysis/truechain-consensus-core/img/node1.png)

nd.initializeKeys() 时，通过读取目录下的sign*.pub文件获取所有node的公钥，并读取自身私钥sign*.pem，用于签名。

nd.setupConnections()，监听管道 nd.SetupReady，然后创建rpc clinet连接所有Node。

nd.serverLoop() ，创建gRPC server，监听端口为nd.port，然后启动监听go server.Accept(l)，并向管道 nd.ListenReady 发送信号，便于主线程往下去创建client。

##### 2. 基本通讯流程
Node消息处理基本流程如下：
            newRequest --> PrePrepare --> Prepare --> Commit

newClientRequest
          主线程创建client后，向所有Node发送NewRequest信息，Node收到NewRequest后，触发方法func (nd *Node) ProxyNewClientRequest(arg ProxyNewClientRequestArg, reply *ProxyNewClientRequestReply) error{}，然后在方法 func (nd *Node) newClientRequest(req Request, clientID int) {}中处理：
  首先根据req的hash值判断 nd.active 中是否已经存在该消息，如果不存在，则添加到 nd.active 中，并调用 nd.addClientLog将req添加到log中
  注意此时会创建timer，超时的话，会调用nd.handleTimeout方法处理超时，并触发view的更新
  继续处理，如果该Node为primary，则seq++，并构建prePrepare信息，广播给所有其他Node。

PrePrepare
 Node接收到PrePrepare消息后，调用 func (nd *Node) processPrePrepare(req Request, clientID int) {} 进行处理：
         首先判断 收到的消息 node.nodeMessageLog.content[typePrePrepare]当中，根据seq序号，该消息已经存在，则不处理返回；
 注意此时会创建timer，超时的话，会调用nd.handleTimeout方法处理超时，并触发view的更新；
        继续处理，将消息保存到nodeMessageLog的prePrepare当中，（校验通过后），创建Prepare消息并广播给所有其他Node；
同时在本地维护了一个Prepare消息队列 nd.prepDict，将队列中该消息的接收计数+1；
然后调用checkPrepareMargin判断接收到的其他Node发送来的该条Prepare消息数是否已经超过2f+1，如果超过，则发送Prepare消息；

processPrepare
Node收到primary Node发送的PrePrepare消息后向其他Node发出该消息，接收后调用 func (nd *Node) processPrepare(req Request, clientID int) {} 进行处理：
  首先调用checkPrepareMargin 判断接收到其他Node发送过来的盖该条prepare消息是否已经超过2f + 1，如果超过，则创建commit消息，并广播给所有其他Node；
  同时该条消息放入本地队列 node.commDict；

processCommit
      Node接收到Prepare的个数超过2f+1后，向其他Node发送该消息，接收后调用 func (nd *Node) processCommit(req Request) {} 进行处理：
         首先调用 incCommDict ，判断本地队列 node.commDict，不存在进行添加，否则接收计数++
         然后调用 checkCommitMargin 判断，如果接收到commit个数 > 2f + 1，将状态 prepare置为true，并调用nd.recordPBFTCommit保存，并调用nd.executeInOrder执行相应命令。
         
processViewChange
如果Node处理消息超时，并且判断primary node，会向其他Node发送该消息。接收后调用func (nd *Node) processViewChange(req Request, from int) {} 进行处理：
  首先如果消息中的view id < nd.view 不进行处理；
 然后将消息中发序列化的所有信息；
调用nd.viewProcessCheckPoint 判断checkpoint是否符合要求；
然后调用viewProcessPrepare，如果可以，发送NewView消息给其他所有Node

processNewView


executeInOrder在执行时，首先将 队列 nd.waiting中已经存在的命令执行完，然后将该消息放入队列中.

