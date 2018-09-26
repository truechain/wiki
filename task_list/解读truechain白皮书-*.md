
## 一.解读白皮书  by *
&nbsp;&nbsp;&nbsp;&nbsp;可以说现在的币圈、链圈人士都会很关心一个项目是否有白皮书，足已说明白皮书的重要性了，
所以经过在https://www.truechain.pro/Truechain.pdf 上阅读了一番之后，写下了这篇个人对truechain白皮书的理解<br>
(1) truechain的优势<br>
    1.支持无限节点进入<br>
    &nbsp;&nbsp;&nbsp;&nbsp;PBFT 的通信复杂度决定了参与决策的节点只能保持在极有限的范围内。而利用 PoW 可以接纳无限节点的特性与之结合可以弥补这一弱势。<br>
    2.安全性<br>
    &nbsp;&nbsp;&nbsp;&nbsp;相信大家都会听说过很著名的门头沟事件、parity事件、USDT事件等等，这些事无时无刻不在提醒着我们要重视安全，要慎重选择平台.官方白皮书说以pow为基础，选举产生 PBFT 节点的混合共识机制设计可以保证 PBFT 节点出现问题时及时进行重新选举，并对 PBFT 节点进行实时监督。但是却没有太多关于用户安全的信息，如果被恶意操纵市场，黑客盗取等造成用户的损失，白皮书中并没有对着进行相关立场的说明。<br>
    3.高性能<br>
    &nbsp;&nbsp;&nbsp;&nbsp;PBFT 接点的通讯效率足以支持 10,000-100,000 TPS（每秒交易处理量）。可以保证多个智能合约或商业应用同时处理交易时全链通讯不受到阻塞，账本按时间戳先后顺序准确记录交易<br>
    4.免费使用<br>
    &nbsp;&nbsp;&nbsp;&nbsp;初链将一直保持向所有用户免费开放的准则<br>
   总结：truechain的优势在于PBFT和pow两项技术，得益于这两项技术，体现出了truechain的优势。<br>
(2)技术架构<br>
   &nbsp;&nbsp;&nbsp;&nbsp;从技术架构上来看分为四层：一是底层服务；二是核心层；三是 API 接口层；四是智能合约层。具体设计在黄皮书和 github 的开源代码中有所体现，白皮书中介绍的最有特点的就是fPoW的挖矿机制，采用了水果链（FruitChain）的设计。<br>
   fPow的介绍：<br>
   &nbsp;&nbsp;&nbsp;&nbsp;fPoW 是一种全新的设计挖矿设计理念，初链采用了水果链（FruitChain）的设计，在挖矿过程中保证所有参与者的公平性<br>
   &nbsp;&nbsp;&nbsp;&nbsp;fPow的特点是解决了PoW的私挖矿，联合挖矿和不稳定的交易费等问题<br>
     
(2)团队阵容：<br>
 &nbsp;&nbsp;&nbsp;&nbsp;从TrueChain白皮书的团队介绍中可以看到，数位主要人物的介绍，都是清一色的名牌大学，其中不乏大厂出身之人。相当亮眼的就是作为CEO的张剑南和工程技术负责人Archit Sharma。团队阵容堪称豪华，而且他们也在TrueChain上证明了自己的实力。<br>
(3)truechain需要解决的问题<br>
 &nbsp;&nbsp;&nbsp;&nbsp;在共识机制上无论基于pos共识机制的以太坊还是基于Dpos的EOS都没有处理好TPS，安全性与交易成本的平衡问题，这也是阻挡区块链开发应用的主要屏障。truechain选择结合了PBFT与POW混合共识机制在实现了上述truechain优势的公链搭建，用来承载规模化商用Dapp的应用。
