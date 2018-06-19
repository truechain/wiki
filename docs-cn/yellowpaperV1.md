# 初链：高性能去中心化公开账本
## （初稿）工作进行中
###### 初链研究小组 TECH@TRUECHAIN.PRO 中文翻译：王友强 施懿民

## 摘要：
本文介绍了初链协商一致协议的初步设计和其他技术细节。简而言之，我们的共识设计具有同样的一致性、活跃度、交易终结性和安全保障，这是与混合共识事实上的一致。我们讨论了轮值委员会成员的频率和物理时间戳限制等优化问题。我们接着提出了在以太坊之上建立一个新的虚拟机的想法，它在无权限的设置中增加了基于许可链的交易处理功能。我们还使用数据共享和投机交易的思想，评估混合云基础设施中智能合约的运行情况，使用现有的志愿计算协议来实现我们引入的补偿基础结构。
在这份黄皮书的下一个版本中，我们将正式讨论其中的一些属性，以及文件末尾列出的几个未来方向。

## 1，介绍
随着加密货币的日益普及，区块链技术已经引起了业界和学术界的关注。人们可以认为区块链是一种共享的计算环境，它涉及到对等的成员，可以自由地加入和退出，这是一种常见的协商共识协议的前提。
区块链的去中心化性，以及交易透明性、自治权、不可篡改特性，对于加密货币来说是至关重要的，为这类系统制定了基本要求。然而较早设计的顶级加密货币，如比特币[19]和以太坊[11]，在交易速度方面被广泛认为不可测量，同时也不经济，因为它们需要大量的能源消耗和计算能力。
随着在现实世界中使用公链的应用程序和平台的需求日益增长，能提高交易速度的可行协议是新系统的主要关注点。例如，考虑一个通用的公链，它可以在一个非常大的用户基础上托管CPU密集型点对点游戏应用程序。在这样的链中，如果它同时托管ICOs（初始代币发行）和数字广告应用程    
序，我们目前预计交易确认时间将会大大延迟。
还有一些其他的模型，比如权益证明的委托机制，以及被许可的拜占庭式容错协议。拜占庭式容错协议确保安全，只要一次攻击里系统中只有三分之一的参与者是有意/无意的恶意攻击者。这是一种非常好的机制，但是仅拜占庭式容错链存在可伸缩性和伪去中心化的问题。权益证明协议的少量验证器可以促进高吞吐量，但是系统本身高度依赖于少数利益相关方来决定是否包含和排除委托。此外，没有默克尔树也就没有透明度，这类制度总是会受到无端的悖论的影响。
在本文中，我们提出了TrueChain，一种PBFT[20]的混合协议[13]和POW一致。POW共识确保了激励和委员会的选择，而PBFT层作为一种高效的共识，如快速的终结性，高通量，交易验证，公平贸易经济的轮值委员会，以及处理非统一基础设施的补偿基础设施。混合协议的本质允许它最大限度地容忍大约三分之一的对等节点的腐败。

## 2，背景
这项建议的核心力量在于承认Rafael和Elaine在混合协议[20]中提出的定理。我们受益于这一事实，即在该文件中有大量的设计空间可供进一步优化。使用每BFT作为委员会成员允许委员会轮值功能，这为一致验证对等提供了更好的公平性。POW节点可以从激励基础设施中受益，同时它们也是较慢的Snailchain的一部分，帮助部署智能合约和验证，但主要是不断的赶上快速链。
2.1相关工作 混合共识遵循BFT和PoW结合在一起的设计模式，使其享有两边的优良特性。 一般而言，混合共识将采用BFT协议，默认情况下工作在许可设置中，在协议启用前所有身份都已知，作为处理大量传入交易的快速路径，以及具有stake_in / stake_out（随机选择）的PoW协议作为协议的支柱，在无权限设置中支持BFT处理动态成员和委员切换。

## 3，共识
我们的共识设计主要基于Pass和Shi [20]的混合共识，并进行了一些修改和改进，以便为我们关注的应用场景量身打造。 在本节中，我们将假设读者熟悉混合共识协议的每个细节。
### 3.1 设计概述 
在本小节中，我们将概述我们的共识协议。 在这个协议中，我们使用[20]中的相同的抽象符号和定义。 在本节的以下部分中，我们将解释我们在混合共识之上的修改和进一步的构造。我们的对手模型遵循[20]中的假设，即允许对手轻度适应性破坏任何节点，而破坏不会立即生效。 在下一版黄皮书中，我们将正式解释我们在通用复合模型中的修改[12]。请注意，为简单起见，本黄皮书中的所有伪代码都被简化了。 他们没有为工程优化。
### 3.2 混合共识协议的回顾
#### 3.2.1 每日链下共识协议。 
在DailyBFT中，委员会成员运行偏离BFT的实例来决定每日日志，而非成员计算委员会成员的签名。	
它将安全性扩展到委员会非成员和后期产卵节点。 它带有一个终止协议，该协议要求所有诚实的节点在终止时同意相同的最终日志。 在DailyBFT中，委员会成员输出签署的每日日志哈希值，稍后将被混合共识协议使用。 这些签署的每日日志哈希满足完整性和不可伪造性。
在公钥生成器上，将公钥添加到公钥列表中。在接收到通信信号时，节点作为委员会成员进行有条件的选举。环境有选择地开放了委员会。
下面是子协议在节点是BFT成员时的工作方式：-一个BFT虚拟节点然后分叉。这里的BFT虚拟节点，由BFTpk表示，然后开始接收TXs(交易)。只有当停止信号被至少三分之一的初始通信不同的公钥注销时，日志完成才会被检查和停止。在此期间，会进行连续的“直到完成”检查，并且一旦在每一步完成流言，所有停止日志条目都会被删除。
当节点不是BFT成员时，以下是子协议的工作原理： -在收到一个交易时，消息被添加到历史记录中，并由三分之一的初始通信不同的公钥签名。
签名算法用前缀0标记内部BFT实例的每个消息，为外部DailyBFT标记每条带有前缀1的消息，以避免名称空间冲突。
	
#### 3.2.2 内存池。
使用0初始化TXs，并使用并集跟踪传入交易。在接收到提议的呼叫时，它将交易添加到日志中，并与流言协议进行通信。它还支持返回已确认交易的查询方法。通过跟踪一组交易，它清除已经确认的交易。



#### 3.2.3主要混合共识协议。
一种新生成的节点，具有隐式消息路由，其中带有发送和接收的记录的历史记录。这与以下组件相互作用-内存池，SnailChain，预处理，日常脱链共识，以及链验证。

### 3.3 日长变化和混合委员会选举 
在[20]中，BFT委员会的实例每隔一段固定时间(以Snailchain作为逻辑时钟)进行切换。而新的委员会只是由矿工们组成的，他们在Snailchain内部拥有最新的csize数量。在我们的共识设计中，我们想利用一种直觉，如果委员会表现良好，我们就不必强迫他们转换，因此在某些场合可以避免交换委员会的开销。另一方面，如果前一个委员会保持良好的记录，这将增加新节点当选为委员会成员的难度。因此，我们仍然保留强制切换委员会每一固定时间的设计，但频率要低得多(例如，委员会将每K天切换一次)。另一方面，我们提出了Thunderella[22]认证投诉的观点，其中慢链可以作为BFT委员会失误的证据。也就是说，每当从Snailchain中检测到委员会的不当行为时，第二天的起点(不一定是第K天)就会触发强制切换。
更进一步，我们将取代委员会选举标准。在混合共识中，委员会成员是从最近的Snailchain区块的矿工中挑选出来的。我们决定选择委员会成员基于混合标准的股份和随机性。更具体地说，我们允许全节点提出特殊的stake_in和stake_out交易，以暂时冻结他们的通证资产。并且每当一个委员会切换发生时，我们将根据他们的冻结股份选择θ.csize的账户，其中θ∈[0,1]是一个手动参数。在[14]的设计之后，我们根据VRF[18]的结果，选择(1-θ).csize节点，其中种子是由先前委员会选择中使用的种子来确定的，以及从最近的csize区块中提出的随机性。与Algorand[14]不同，这里我们不计算选择部分的股权值。
注意，由随机函数选择的节点不上网的可能性很大。因此，考虑到估计的在线率 , 因为我们不希望离线节点接受拜占庭配额，	我们需要保证 ·θ < 
通常我们采用θ < ，另一个潜在的设计方案是，我们可以通过设计[21]允许离线节点。
请注意，负责大量计算资源的一方可能会操纵VRF的输入，但这已经超出了我们的安全假设。

### 3.4 具体应用设计。
在我们的一致设计中，我们始终了解应用程序的特定需求，并在一致性、活性和安全性属性不受损害的情况下为它们量身定做。
#### 3.4.1物理时间限制。
默认情况下，传统的共识设计允许矿工/委员会成员/领导人在一个小的时间窗口内重新安排交易。这给一些分散的应用程序带来了一个问题，如商业交易所，交易公平性要求交易之间的时间顺序必须谨慎地保持，否则恶意(甚至是正常的理性)参与者将有动机重新订购交易，甚至插入自己的交易，以获得额外的利润。在高产量的情况下，这一激励将被放大。
更糟糕的是，这样的恶意重新排序是不可能区分的，因为自然网络等待时间将导致重新排序，并且这种延迟只能由接收机本身来观察，并且因此它具有关于网络等待时间的最终数量的证据
为了支持去中心化的广告交换，我们试图通过合并一个被称为粘性时间戳的限制来减少这些问题。更具体地说，使用启发式参数，在提出交易时，我们要求客户端放置物理时间戳在交易处理的元数据中，这个物理时间戳与交易的其他部分一起签名。稍后，当BFT内部的验证器验证事务时，它将执行以下额外检查，如算法1所示。
在BFT内部实现日志的阶段，领导者将根据其物理时间对事务批次进行排序--篡改和中断与序列号的联系(尽管非常不可能)。实际上，这一步并不是必要的，因为我们可以在评估和验证的后面强制执行命令。但为了简单起见，我们把它放在这里。

这组修改给了我们一些额外的属性：

* （1）来自任何节点的事务顺序根据其物理时间戳在内部保存。因此，这些事务的顺序顺序被严格执行。这将消除某些恶意重新排序的可能性，这种重新排序涉及来自同一个节点的两次交易。
* （2）由BFT委员会输出的批量交易中的顺序严格按时间戳排序。
* （3）节点不能操纵假物理时间戳。因为定时窗口的限制。
这种修改的一个明显缺点是，当参数不适合变化的网络延迟时，由于中止事务而导致吞吐量下降。另一个缺点是，BFT委员会成员仍然可以谎报当地时间，拒绝某些交易。然而，委员会成员无论如何都可以拒绝某些交易。但是，诚实的节点可能会拒绝无知的交易，因为它们的时钟不同步。这个问题可以通过增加对BFT委员会职能的限制来减少。稍后，我们将看到，要进入委员会，节点应该提供同步时钟的证据。

### 3.5.计算和数据分片，以及投机事务的执行。
在本节中，我们将介绍我们的分片方案。
对原始混合共识的一个重要修改是，我们为其添加了计算和数据分片支持。更重要的是，我们首先设计了一个基于分片的投机交易处理系统。这个想法很清楚。
在混合共识中，DailyBFT实例被索引为一个确定性序列DailyBFT [1 ... R] 。我们允许同时存在多个DailyBFT实例序列。准确地说，我们通过分片表示t-th DailyDFT序列，为了简单起见，我们将分片的数量固定为C，每一个DailyBFT是一个普通的分片，除了C普通分片，我们有一个由csize节点组成的主分片。主分片的工作是最后确定正常分片输出的顺序，以及在分布式事务处理系统中实现协调器。而普通的分片不是直接连接到混合协商一致组件，而是将日志提交给主分片，然后主分片与混合共识进行对话。
* 我们不允许任何两个分片(普通的或主的)共享公共节点，这可以在委员会选择过程中强制执行。多个分片的选举类似于第3.3节所述的选举流程。
* 我们将状态数据(在帐户范围内)统一地划分为C分片。这将确保对相应的分片的每个查询都返回一致的状态。由于我们将包括每个数据单元的元数据，所以我们将数据拆分为数据扇区的单元，并为每个数据扇区分配一个地址。我们有从数据位置到数据扇区地址的映射。为了简单起见，从现在开始，我们只在数据扇区级别进行讨论。每个数据扇区DS[addr]都有rts, wts, readers, writers元数据。我们假设分区原则是公共的，并且给定地址addr，我们可以通过调用函数host(addr)来获得它的主机分片。
请注意，如果我们将每个正常的分片(当对方的数量不多)作为一个分布式处理单元处理，则可以将逻辑时间戳[25]的设计合并到分布式交易处理系统[17]中，这将增强交易的处理能力。在这里，我们使用了一个简化的MaaT版本，在这里我们不对其他交易的时间戳进行自动调整。
对于普通分片，除了一些改动以执行并行计算以外，严格按照DailyBFT的行为运行。

对于主分片，其收集普通分片的输出。注意，交易的数据依赖可以轻易的从它们的元数据里推导。事实上，一个交易如果用到多个远程分片，它会在所有参与的分片上留下痕迹。当普通分片提交日志给主分片时，同时会写到Snailchain上。

当主分片收到（或者从snailchain上抓取）一个片机的批量txn交易，它会检查其是否收到了这批次的所有片机上的交易。如果在一段时间内其没有收到特定批次的所有交易信息，意味着这批次交易失败了。这种情况下，第二天的启动时间会触发一个全委员会开关。当收到所有分片的日志，主分片根据提交的时间戳排序这些交易（如果有些交易有早一点批次号，会被当做排序过程中的第一个标准。然而，如果其时间戳与大部分片的时间戳相违，我们将认为这个批次是无效的，而改批次里所有的交易都会放弃）。排序后，主分片过滤所有的交易并依据时间戳保留最长的非递减序列号，并记录到混合共识组件里当做当日的日志。
还有许多改进空间，确认时间不是实时的是一个明显的缺点。

算法1：关于物理时间戳的额外验证
```js
Data: Input Transaction TX
Result: A Boolean value that indicates whether the verification is passed 
current_time ← Time.Now();
if |current time − TX.| >  then
   return false;
// if the time skew is too large, reject TX.
var txn_history = new static dictionary of lists; 
if txn_history[TX.from] == NULL then
    txn_history[TX.from] == [TX ]; 
else
     if txn_history[TX.from][−1]. − TX. > 0 then 
         return false;
              // To make sure the transactions from the same node preserve timing order.
     else
         txn_history[TX.from].append(TX); 
         return true;
```
图1 额外验证的伪代码

## 4，虚拟机中的智能合约
### 4.1 设计原理阐述。
以太坊虚拟机的一个目的是在工作量证明模型下采用交易手续费运作。但True是混合模型，我们将进一步探寻这块领域。让我们来考虑混合云生态下的可能性。
人们对以太坊黄皮书遇到的一个基本问题是里面的数学符号。因此我们希望遵循类似KEVM黄皮书的做法来列出我们的EVM和TVM规范。将来，我们会通过初链的github账号(https://github.com/truechain).来维护我们自己的规范。
#### 4.1.1 如果将虚拟机替换成容器会怎样？
现在已经有一个区块链框架的方案接近这个想法，是超级账本的Fabric框架。如果要将Fabric的权限化的性质改成去权限化的话，那面临的第一个挑战就是解决chaincode的问题。虽然可以将一个chaincode或智能合约放在一个容器里，但这对公链来说不是一个可扩展的模型。采用这种模型意味着公链的一个节点可能有几千个容器对应运行在其上的几千个智能合约（因为每个节点都维护一份拷贝）。	社区已经有人尝试限制运行在一个节点上面的最多容器数。这个限额目前是一个节点100个pod，根据Kubernete容器编排平台[5]和Red Hat的Openshift 3.9的集群限制[7]，差不多是250个容器一个节点。即使采用如块多路复用[1]这样的最新存储技术，最大容器数也不大可能超过1000（至少从目前来说）。这个问题可以在Kubernete的github的issues页面[4]上看到关于负载限额决定了一个pod上可运行的最大容器数（MAX_CONTR）的更深入的讨论。如果要扩展容器，大家一般倾向于水平扩展而不是垂直扩展，这是因为后者极大地增加了设计决策的复杂度。由于完全取决于工作负载，并没有一个适合所有人尺寸的集群扩展配置规则，对于True这样的分布式网络则更为复杂。目前，这已经变成一个创新的问题而不是简单的技术规范研究问题。以太坊目前部署有超过1000个智能合约，因此这已经变成优化容器生态的设计问题了。







算法2：分片和投机交易处理
```js
On BecomeShard:
  Initialize all the state data sectors: lastReaderTS = −1, lastWriterTS = −1, readers = [], writers = []   
With transaction TX on shard  :
On Initialization:
  TX.lowerBound = 0; 
  TX.upperBound = +∞; 
  TX.state = RUNNING; 
  TX.before = []; 
  TX.after = [];
  TX.ID = rand;      
On Read Address(addr):
if host(addr) ==  then
    Send readRemote(addr) to itself; 
else
    Broadcast readRemote(addr, TX.id) to host(addr);
    Async wait for 2f + 1 valid signed replies within timeout  ;
    Abort TX when the timeout ticks;
Let val, wts, IDs be the majority reply; 
TX.before.append(IDs);
TX.lowerBound = max(TX.lowerBound, wts); 
return val;
On Write Address(addr): 
if host(addr) ==  then
    Send writeRemote(addr) to itself; 
else
    Broadcast writeRemote(addr, TX.id) to host(addr);
    Async wait for 2f + 1 valid signed replies within timeout  ;
    Abort TX when the timeout ticks.
Let rts, IDs be the majority reply;
TX.after.append(IDs) TX.lowerBound = max(TX.lowerBound, rts); 
return;
On Finish Execution: for every TX′in TX.before do
   TX.lowerBound = max(TX.lowerBound, TX’.upperBound);
for every TX′ in TX .after do
   TX.upperBound = min(TX.upperBound, TX’.lowerBound);
if TX.lowerBound ¿ TX.upperBound then 
   Abort TX;
Broadcast Precommit(TX.ID,⌊⌋) to all the previous remote shards which TX has accessed; 
// If  TX.upperBound = ∞, we can set an arbitrary number larger than TX.lowerBound. 
On receive readRemote(addr, ID):
if host(addr) ==  then
   DS[addr].readers.append(ID);
   return DS[addr].value, DS[addr].wts, DS[addr].writers;
else
   Ignore
On receive writeRemote(addr, ID): 
if host(addr) ==  then
   DS[addr].writers.append(ID);
   Write to a local copy;
   return DS[addr].rts, DS[addr].readers;
else
   Ignore
```

图2 用于分片和投机交易处理的伪代码
算法3：分片和投机交易处理续
```js
On receive Precommit(ID, cts)
Look up TX by ID;
if Found and cts not in [TX.lowerBound, TX.upperBound] then
   Broadcast Abort(ID) to the sender’s shard.;
TX.lowerBound = TX.upperBound = cts;
For every data sector DS [addr ] TX reads, set DS [addr ].rts = max (DS [addr ].rts , cts );
For every data sector DS [addr ] TX writes, set DS [addr ].wts = max (DS [addr ].wts , cts );
Broadcast Commit(ID, batchCounter)to the sender’s shard.;
       // batchCounter is a number which increases by 1 whenever the shard submit a batch of log to the primary shard.
On receive 2f + 1 Commit(ID, batchCounter) from each remote shards which TX has accessed: 
TX.lowerBound = TX.upperBound = cts;
For every data sector DS [addr ] TX reads, set DS [addr ].rts = max (DS [addr ].rts , cts );
For every data sector DS [addr ] TX writes, set DS [addr ].wts = max (DS [addr ].wts , cts );
Mark TX committed;
Let TX .metadata = [ShardID , batchCounter ];
On output log
Sort TX’s based on their cts . Break ties by physical timestamp.
```
图3 用于分片和投机交易处理的伪代码（续）
让我们在进一步研讨容器的场景。按照上面的论述，一个可行的解决方案是将容器应用在无服务器架构中。考虑有超过2000个的合约同时在线的并发请求场景，这时同时调用chaincode（活动窗口）的请求超过了MAX_CONTR的值，又会碰到相同的问题。因此，建议在最大并发请求上加上一个限流率的阈值。这样从共识基础上限制了每秒并发交易数。工程技术方面不是一个瓶颈。因此，我们依然选择EVM的设计，但做一些小的改动。

### 4.2 初链虚拟机（TVM）。这个领域的典型案例是以太坊虚拟机，其试图遵循完全确定，尽量按简化计算步骤而优化。它还支持如栈外内存，合约委托和中间调用值存储。

我们会复用EVM的规范，但在本黄皮书的下一版本里对TVM添加一个对EVM的设计思路仔细考虑过的新的规范，将采取使用Keccak-256哈希算法，椭圆曲线加密（ECC）算法和栈式架构等技术。

初链基础架构将整合EVM和类似EVM字节码执行引擎来运行智能合约。我们会使用一个虚拟机来处理POW共识，另外一个虚拟机处理PBFT共识，都集成在全节点，因此它们可以处理按需调用。	TVM基于DailyBFT公链技术，与以下组件交互：
* 复用一些tendermint的想法，如ABCI（区块链应用编程接口），其提供了一个抽象层，允许在一个进程中运行的共识引擎管理另一个进程的应用状态；
* 适合dailyBFT的另外一个共识引擎。
* 权限化的以太坊虚拟机。
* 保证交易达成的RPC网关。
待办事项-正式定义TVM的过渡状态、智能合约部署策略以及将权限化的 VM部署到无权限链上的方法。
待办事项-定义参数以在POW和整个节点(POW和PBFT)之间切换。

5，区块、状态和交易
待办事项-讨论区块、世界状态流、交易和执行模型的更改。


6，对以太坊区块链范式的修改
待办事项-讨论创世区块

6.1 经济激励设计
待办事项-讨论激励设计
6.2 奖励基础架构 本节我们展现一个奖励基础架构来平衡BFT委员会成员和非成员节点的工作负荷。

根据网络带宽、CPU为标准对所有片区一视同仁将导致倾斜性结果，如不一致的TPS，或者更严重的是有时超过了超时限制，因为交易的顺序是由主片决定的。为了处理这个问题，我们建议的奖励基础设施，与网络计算领域的伯克利开放网络一起工作。前面在这领域做过类似尝试的是Gridcoin和Golem网络。

Gridcoin的分布式处理模型基于类似网络计算的伯克利开放网络（BOINC）的预审框架，它是一个开源的分布式志愿计算网络，广泛应用于cernVM，由LHC项目治理。这样的框架用来处理长期非均匀财富分配。另一方面，Golem是一个非常好的采用稳健激励模型的项目，可以拿来作为奖励机制的借鉴。但值得注意的是，区块链技术驱动的基于奖励模型的志愿计算网络，如果设计不当，很容易陷入利息膨胀的陷进。所以说，在早期投资者因为早鸟利好的因素获得的收益和后来者的获益差距，随着时间的推移会越来越大。

取决于交易的类型和针对一些智能合约是否需要分布式存储，我们采用BOINC和IPFS/Swarm的混合架构，包括EVM和TVm。这样可以采用Linux容器进行资源隔离。我们希望在黄皮书的下一个版本里展开这一节的讨论。
	7，未来方向

即使对最初的混合共识机制采取优化，我们认为还有更多的优化空间，如：
改进所有节点的时间戳同步，而不需要中心化的NTP服务器。
喜欢奖励基础设施里的激励技术，这样重度投资基础设施的投资人不会遭遇“被忽视”，“亏本”的问题。
支持副本创建的分片技术，尽量减少被BFT会员会拒绝的交易集。
添加零知识证明以增强隐私。
EVM、TVM和Linux容器技术的混合基础设施。
改进虚拟机规范中的二进制数据编码方法，交易签名，收费表等章节。
8，结论
我们正式定义了混合共识协议和其实现方法，在本草案里，我们介绍了下一版将引入的多种新的理念。我们建议大家在部署POW全节点时采用抗ASIC的硬件方案，关于硬件方案的更多细节将尽快给出。
9，致谢
我们对付出的孜孜不倦的努力，推动整个分布式协议进展，涵盖设计理念，实现细节以及前文所述的各个方案等架构的以下人员，致以我们最真诚的协议：
Rafael Pass, Miguel Castro, Satoshi Nakamoto, Vitalik Buterin, Gavin Wood, Ethan Buchman, Andrew Miller et al。向他们在论坛提出改进建议，通过参与Reddit、邮件组、聊天群、白皮书和黄皮书撰写等多种不懈努力致谢。
对CNCF and Kubernetes 社区提出的混合云计算的灵感致谢

参考文献

* [1] Container-native storage for the openshift masses. URL https://redhatstorage.redhat.com/2017/10/05/container-native-storage-for-the-openshift-masses/.
* [2] Deploying 2048 openshift nodes on the cncf cluster. URL https://blog.openshift.com/deploying-2048-openshift-nodes-cncf-cluster/. 
* [3] Gridcoin whitepaper: The computation power of a blockchain driving science and data analysis. URL https://www.gridcoin.us/assets/img/whitepaper.pdf.
* [4] Increase maximum pods per node: github/kubernetes/kubernetes#23349. URL https://github.com/kubernetes/kubernetes/issues/23349.
* [5] Kubernetes: Building large clusters. URL https://kubernetes.io/docs/admin/cluster-large/.
* [6] Kubernetes scaling and performance goals. URL https://github.com/kubernetes/community/blob/master/sig-scalability/goals.md.
* [7] Red hat openshift container platform’s cluster limits. URL       https://access.redhat.com/documentation/en-us/openshift_container_platform/3.9/html/scaling_and_performance guide/. 
* [8] D. P. Anderson. Boinc: A system for public-resource computing and storage. URL https://boinc.berkeley.edu/grid paper 04.pdf.
* [9] E. Androulaki, A. Barger, and V. e. a. Bortnikov. Hyperledger fabric: A distributed operating system for permissioned blockchains. URL https://arxiv.org/pdf/1801.10228v1.pdf, 2018.
* [10] J.Blomer,L.Franco,A.Harutyunian,P.Mato,Y.Yao,C.AguadoSanchez, and P. Buncic. Cernvm a virtual software appliance for lhc applications. URL http://iopscience.iop.org/article/10.1088/17426596/219/4/042003/pdf, 2017.
* [11] V. Buterin. Ethereum white paper, 2014. URL https://github.com/ethereum/wiki/wiki/White-Paper.
* [12] R. Canetti. Universally composable security: A new paradigm for cryptographic protocols. In Foundations of Computer Science, 2001. Proceedings. 42nd IEEE Symposium on, pages 136–145. IEEE, 2001.
* [13] M. Castro, B. Liskov, et al. Practical byzantine fault tolerance. In OSDI, volume 99, pages 173–186, 1999.
* [14] Y. Gilad, R. Hemo, S. Micali, G. Vlachos, and N. Zeldovich. Algorand: Scaling byzantine agreements for cryptocurrencies. In Proceedings of the 26th Symposium on Operating Systems Principles, pages 51–68. ACM, 2017.
* [15] E. Hildenbrandt, M. Saxena, and X. e. a. Zhu. Kevm: A complete semantics of the ethereum virtual machine. URL https://www.ideals.illinois.edu/handle/2142/97207, 2017.
* [16] D. e. a. Lombraa Gonzlez. Lhchome: a volunteer computing system for massive numerical simulations of beam dynamics and high energy physics events.    URL http://inspirehep.net/record/1125350/.
* [17] H. A. Mahmoud, V. Arora, F. Nawab, D. Agrawal, and A. El Abbadi. Maat: Effective and scalable coordination of distributed transactions in the cloud. Proceedings of the VLDB Endowment, 7(5):329–340, 2014.
* [18] S. Micali, M. Rabin, and S. Vadhan. Verifiable random functions. In Foundations of Computer Science, 1999. 40th Annual Symposium on, pages 120– 130. IEEE, 1999.
* [19] S. Nakamoto. Bitcoin: A peer-to-peer electronic cash system. URL http://bitcoin.org/bitcoin.pdf, 2008.
* [20] R. Pass and E. Shi. Hybrid consensus: Efficient consensus in the permissionless model. In LIPIcs-Leibniz International Proceedings in Informatics, volume 91. Schloss Dagstuhl-Leibniz-Zentrum fuer Informatik, 2017.


* [21] R. Pass and E. Shi. The sleepy model of consensus. In International Conference on the Theory and Application of Cryptology and Information Security, pages 380–409. Springer, 2017.
* [22] R. Pass and E. Shi. Thunderella: blockchains with optimistic instant confirmation, 2017.
* [23] T. G. team. The golem project: The golem project. URL https://golem.network/doc/Golemwhitepaper.pdf, 2016.
* [24] G. Wood. Ethereum: A secure decentralized generalized transaction ledger. URL https://ethereum.github.io/yellowpaper/paper.pdf, 2018.
* [25] X. Yu, A. Pavlo, D. Sanchez, and S. Devadas. Tictoc: Time traveling optimistic concurrency control. In Proceedings of the 2016 International Conference on Management of Data, pages 1629–1642. ACM, 2016. 


附录A.术语
TrueChainVirtualMachine(TVM): 与处理激励和轮值委员会选择的EVM不同，TVM基于类似的设计原则，但基于PBFT的混合共识进行实际共识和投票。