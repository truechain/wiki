			最美混合共识公链--附《初链技术黄皮书》解读
初链作为一个快速安全、不受限、可扩容的混合共识公链的先驱，它将PBFT和POW共识结合在一起，既保证了价值流通和商业应用环境下需要的性能要求，又满足了去中心化的安全与自由，可以说是一条完美的混合共识公有链，具有极大的发展空间和潜力。下面是我对其技术黄皮书的解读，整理自己的认识同时让大家参与到初链中来：
一、采用PBFT和POW的混合共识协议
	POW（Proof Of Work）：工作证明[1][2]。简单来讲就是通过一份证明，来确定你的工作。它通过不停地产生随机数并进行散列，通过网络预先广播的规则（复杂度），让每个参与的节点自证明其是否符合成为检查点的资格，从而选择出块节点。初链正是通过这一算法来确保了激励和委员会的选举，从而有效的防止恶意攻击。
PBFT（Practical Byzantine Fault Tolerance）：实用拜占庭容错[3]。它是一种状态机副本复制算法，即服务作为状态机进行建模，状态机在分布式系统的不同节点进行副本复制。每个状态机的副本都保存了服务的状态，同时也实现了服务的操作。它保证了初链具有高吞吐量，并且在同一时刻处理但效率很少损失，还保证了交易的验证等。同时由于PBFT 算法可以允许1/3的的主机宕机、腐败、作恶都不会出问题，从而在初链中允许最⼤限度地容忍三分之⼀对等节点的腐败。初链通过这种混合共识机制，即把私有链和联盟链才能使用的节点性质转换为公有链，还保证了其高效和互信性。开发出了一条高性能、高可靠性的公链。
二、初链的创新
	1、根据黄皮书的介绍，初链⽔果链作为慢链(snailchain),⽤以代替Nakamoto(传统链),以抵御1/3−ε腐败(inhashpower)随机⼩常数ε,以获得最优的适应性。我们都知道，传统的挖矿过程，需要强大的计算资源，包括投入大量的挖矿设备、 电力和带宽。而水果链将PBFT产生的大区块分成若干水果，作为其轻节点设计理念，可以让普通参与者使用普通的计算机，甚至于使用手机就能实现挖矿。
	2、交易处理与IPFS的存储合并，初链的存储分为三个层次，分别是存储在每个PoW节点上、类似ipfs的⽂件系统、本地存储。用户可以通过不同的存储级别来支付不同的费用。
	3、初链虚拟机（TVM）[4]，它将EVM应用于慢链之上,并在PBFT主干节点中应用TVM,以使得每个全节点能够响应不同调用请求,并能按需调用。
下面链接给出了TrueChain的黄皮书地址，欢迎大家阅读交流！
https://www.truechain.pro/paper_zh.pdf

 [1] Analysis of Blockchain Consensus Mechanism——Discussion on Advantages and Disadvantages of PoW, PoS, DPos and DAG. URL http://www.8btc.com/blockchain-concensus-mech.
 [2] Blockchain Consensus Algorithm - POW. URL https://www.jianshu.com/p/b23cbafbbad2.
 [3] Blockchain core technology: PBFT by Byzantine consensus algorithm https://www.jianshu.com/p/fb5edf031afd.
 [4] G. Wood. Ethereum: A secure decentralized generalized transaction ledger. URL 
https://ethereum.github.io/yellowpaper/paper.pdf,2018.
