# 初链——打造承载未来商用去中心化应用的公链（一）
  作为一个软件开发人员，掌握多门新型技术是非常必要的。现在越来越多的人关注区块链，今天我打算从一个技术宅的角度讲讲区块链和TrueChain。如果你是小白，那可以好好看看这篇文章，因为从中你可以基本掌握什么是区块链、什么是TrueChain、什么是混合共识机制、什么是智能合约等等。
## 1 开发者学习路径
首先，我想给出一个开发者的学习路径，如果你对区块链有很深的兴趣，那么这样你就知道你如何阶段性的去学习区块链。

![avatar](https://github.com/truechain/wiki/blob/master/analysis/truechain-consensus-core/img/tu1.png)

  初期，可以阅读一些白皮书，比如以特币的白皮书、以太坊的白皮书来了解一些相关理论。
  中期，通过了解以太坊、以太坊虚拟机和智能合约去了解其运行环境和原理。
  高级，通过了解P2P网络等深层次的了解其网络结构等等。
  当然通过自身的实践是十分重要的，当然，在（一）中我主要谈谈我对区块链和TureaChain的了解和认识，进一步代码知识会通过（二）进行讲述。
## 2 区块链
  什么是区块链，我想在网上一搜就能出来无数条概念性的东西，那些东西我就不提了，我还是从技术层面讲讲它的组成，因为这是最基本的东西。区块链，顾名思义是由区块和链组成，区块又包括了区块头和区块体Node.go是Server Node的核心实现，完成了PBFT协议的基本功能。

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


executeInOrder在执行时，首先将 队列 nd.waiting中已经存在的命令执行完，然后将该消息放入队列中.。其中区块头包含摘要信息，如哈希、梅克尔根、区块时间戳等等；区块体包括交易事物数据。可以通过下面的图片看到其结构。

![avatar](https://github.com/truechain/wiki/blob/master/analysis/truechain-consensus-core/img/2.png)

  区块链主要有三种：公链、联盟链、私有链，其中公链通俗的讲法是指公用网络上所有点都可以加入；联盟链是加入的点必须的允许被加入的，一个联盟的；私有链是归个人的，不对外开放的。
  往往人们对区块链的作用有一定的误解，在我看来区块链是提高了信任而不是效率，尤其在金融方面它能够去除中介，直接让两个人进行交易，而不需要中介的干预。而不是提高了效率，比如在大数据的吞吐上等等。

![avatar](https://github.com/truechain/wiki/blob/master/analysis/truechain-consensus-core/img/4.png)

### 2.1 Mercle Tree——防篡改机制
  区块链很重要的特点是安全性极高，那是为什么呢？单单就从区块链结构中就可以看出这一点，下图是MercleTree的一个示例图。

![avatar](https://github.com/truechain/wiki/blob/master/analysis/truechain-consensus-core/img/3.png)

  梅尔根树是一个二叉树，每一笔交易都会产生一个hash值，同时梅尔根树只能增加不能进行删除和修改所以有一定的防篡改性，同时每一个交易数据所产生的hash值是唯一的，如果稍微有一点改动那么区块头就会改变，所以链接就改变了，所以通过这种结构和算法就能实现区块不同的连接不会被篡改。

### 2.2 区块链核心技术
  区块链当中的核心技术主要有共识算法、密码算法、脚本系统、账户模型、UTXO和网络服务。其中密码算法主要有Hash和SHA，其中Hash的核心是能够通过很多数据能够找出数据中的不同，一个数据得到一个数字，而且往往不可能由数据反推到数据。区块链的网络服务主要是P2P的网络服务进行连接，这就是常说的一种去中心化的服务。学习区块链要要想真正的了解技术层面的东西，这些知识是必须要掌握的。详细的东西我会在（二）详细说明。
## 3 TrueChain
  众所周知，区块链在联盟链和私有链中取得的不小的成绩，所以大家对公链的研发期望也来越高。但是公链的打造并不容易，如何在不断扩展的陌生节点之间建立信任并且保证其安全性和高效性是很困难的问题。但是初链提出来的混合共识机制为这个问题提供了很好的解决方法，
TrueChain旨在打造承载未来商用去中心化应用的公链，它的最终目的是打造自由平等的互信社会。正如它的白皮书所写，他们所提出的的是它在安全和性能之间取得了很好的平衡，优势在于能够支持无限节点进入、安全性高、具有高性能并且能够免费使用。
TrueChain的应用领域也是相当广泛，包括保险、医疗、游戏、资产证券化、数字广告行业、小额支付、价值传输、数字版权等等，我相信未来TrueChain会在深入到更多的领域。
## 4 TrueChain核心技术（亮点）
### 4.1 混合共识机制
  TrueChain为了平衡安全和性能之间的关系，尝试过不同的共识机制，最为突出的是混合共识机制，往往公链开发者使用单一的共识机制，如POW、POS、DPOS等等，但是往往都是顾此失彼。TrueChain采用强强联合的亮点，极大的吸取了PBFT高效性和POW去中心化的优势。
### 4.2 智能合约
  智能合约打个比方就是我想要做一个项目，我要雇一个公司来帮我完成这件事情，说先我要做的是我的费用，比如一个以太放进一个合约内，这时候这一个以太我是不能动的，公司也不能动，为了保证公司能够完成这个合同，公司也需要放一份押金，也是一个以太到合约中，这个时候这个合约里面就有两个以太。接下来公司就去完成项目，如果该项目完成的非常好，我可以发OK的信号也合约，然后合约就自动结束了，其中的两个以太就会给公司了。
我想我刚才的那个例子很好的解释了智能合约，但是智能合约是怎么生成使用的呢。下图所示：

![avatar](https://github.com/truechain/wiki/blob/master/analysis/truechain-consensus-core/img/6.png)

  最后生成的合约地址可由其他应用程序调用。智能合约TrueChain在共享机制落地应用的关键一步。
  在智能合约当中我还要涉及一下以太坊的知识，因为初链提出了在以太坊之上建立一个新的虚拟机的想法。说白了以太坊就是一个区块链，是在原基础上发展了一些新的技术和新的思想。以太坊是一个去中心的平台上面可以运行进行编好的应用程序，这些应用程序不会宕机、不会受到审查、不会受到第三方干预。其中以太坊虚拟机（EVM）最重要的概念就是账户、交易和费用。

![avatar](https://github.com/truechain/wiki/blob/master/analysis/truechain-consensus-core/img/5.png)


## 5 说明
  以上就是我对区块链、TrueChain的一些知识总结和交流，在初链——打造承载未来商用去中心化应用的公链（二）中我会详细交流一下如何构造智能合约和其他相关的技术知识，望相互交流和学习。
