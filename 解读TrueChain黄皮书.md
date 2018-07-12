



# 标题：初链，你变了

[TOC]

------



##  序

本文用以介绍公链项目-初链的基本状况。分析论证依据来源白皮书，黄皮书，公众号文章，Github。并且本文将根据区块链的层级结构，从数据层，网路层，共识层，激励层，合约层，应用层逐一针对初链发展现状和未来技术路线进行解读，旨在表达的浅显易懂。分析内容包括：核心技术概括，技术落地可行性。申明该文只作为学习指导，不构成任何投资建议。

作者视角：经寄意兰舟介绍，进入社区单纯为了撸羊毛，一开始对TrueChain一无所知，固有观念对国内项目并不看好；伴随着两个月的学习，亲眼看见TrueChain的成长，在技术上的突破。最开始刚来的时候，主网没上线，社区，公众号，Github上什么都没有，白皮书的格式都不规范；到现在社区活跃度前列的项目，如今TrueChain的公众号高产似母猪，完善了自己的白皮书，有了自己的黄皮书，也算是看着TrueChain长大，看到了团队做实事的诚心。

>  **个人成长：如果要评判一个事物，还请先真正的走近她,	了解她.**

## 由浅入深

### 基本介绍

全世界公链数目不计其数，可说的上来的也就比特币，以太坊，EOS等等...看图***项目图

如果我们看白皮书，除了项目名字不同，字母简称不同，我们是看不上出他们本质上是有什么区别的。每一个项目都会说自己是颠覆了生产关系，打破了互联网的固有规则，会落地到各行各业，大家心里都很清楚，最后沉淀下来的就只有两三家,我大胆预测很可能不会超过五家。老大代表着货币体系的应用，老二代表着金融体系的交易合约应用，之后都会代表一个主流行业。

![image.png](https://upload-images.jianshu.io/upload_images/10649797-85049d448fcfe50c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

按照目前区块链的层级划分:数据层,网络层,共识层,激励层,合约层,应用层.***层级图，从层级图可看出，所有项目都逃不出这个框架，下面三层是区块链的基本组成部分。对于投资者，开发者找到有竞争优势的团队是最大问题，这里面有巨大的信息不对称，我们无法花时间一个一个一去了解，团队是不是真正的做技术，这里面有时间成本。在有限的时间里，看到一个项目，从层级出发是理清思路提高了不少效率。如果能在网络层或者共识层或者激励层有自己的东西，你就可以选择继续看下去，否则这项目就可以丢了。知道了方法论，如何落实呢？我的方法是看黄皮书，Github代码，公众号推送的团队进度。

按照黄皮书中的介绍，初链团队在共识层和合约层走出了自己的创新。

### 共识层创新-混合公式算法

目前在分布式系统中，也就是区块链系统中，除了要解决一致性的基本问题，还要解决容错性的问题。也就是有节点联合起来故意作恶的问题。

公链共识总的来说有两个阶段，第一阶段：低效率的去中心化解决方案Nakamoto Pow；他们确实是颠覆性的创造了历史，从古老的PBFT拜占庭算法投票，上升到利用哈希算法，它具有随机性，难记算，易验证的特点。这就保证了过程的安全性，可靠性。但是在这十年的发展过程中，也暴露了一些问题。首先产生了针对Hash逻辑运算的ASIC矿机，联合矿池，这些产业都会让区块链走向中心化。综上传统的算法效率低，有中心化的风险。

第二阶段：委托协议阶段，DPOS。它虽然提高了效率，但是它委员会的制度，还不能完美的体现去中心的优势。

随即有团队给出了第三种方案，混合公式；这可以算是一次尝试，也正是TrueChain对混合共识算法给出了完整的定义，和方案，FPOW。

FPOW算法地址：https://github.com/truechain/truechain-fpow

![image.png](https://upload-images.jianshu.io/upload_images/10649797-3f0213ef9628485c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

FPOW完成状态：根据代码递交程度和TrueChain公众号的透露，已经完成Block数据结构的更改，加入了Fruit和Record字段，模拟了PBTFT发出交易包的行为，并将新的数据区块打包上链。

```
// Header represents a block header in the Ethereum blockchain.
type Header struct {
	ParentHash common.Hash `json:"parentHash"       gencodec:"required"`

	PointerHash  common.Hash `json:"pointerHash"      gencodec:"required"`
	FruitsHash   common.Hash `json:"fruitSetHash"     gencodec:"required"`
	RecordHash   common.Hash
	RecordNumber *big.Int
	Fruit		bool

	UncleHash   common.Hash    `json:"sha3Uncles"       gencodec:"required"`
	Coinbase    common.Address `json:"miner"            gencodec:"required"`
	Root        common.Hash    `json:"stateRoot"        gencodec:"required"`
	TxHash      common.Hash    `json:"transactionsRoot" gencodec:"required"`
	ReceiptHash common.Hash    `json:"receiptsRoot"     gencodec:"required"`
	Bloom       Bloom          `json:"logsBloom"        gencodec:"required"`
	Difficulty  *big.Int       `json:"difficulty"       gencodec:"required"`
	Number      *big.Int       `json:"number"           gencodec:"required"`
	GasLimit    uint64         `json:"gasLimit"         gencodec:"required"`
	GasUsed     uint64         `json:"gasUsed"          gencodec:"required"`
	Time        *big.Int       `json:"timestamp"        gencodec:"required"`
	Extra       []byte         `json:"extraData"        gencodec:"required"`
	MixDigest   common.Hash    `json:"mixHash"          gencodec:"required"`
	Nonce       BlockNonce     `json:"nonce"            gencodec:"required"`
}

// field type overrides for gencodec
type headerMarshaling struct {
	Difficulty *hexutil.Big
	Number     *hexutil.Big
	GasLimit   hexutil.Uint64
	GasUsed    hexutil.Uint64
	Time       *hexutil.Big
	Extra      hexutil.Bytes
	Hash       common.Hash `json:"hash"` // adds call to Hash() in MarshalJSON
}
```

以上代码就是TrueChain的底层区块的数据结构，可以清楚看到新增了`fruithash`的字段

在这里我还注意到另一个有趣的地方，TrueChain用到了Gas字段，着说明TrueChain团队沿用了ETH的结算方式。我非常认同这个做法，GAS结算可以说一非常聪明的设计，特别适合更高级的区块链架构，GAS的使用和比特币中的交易费的优势在于：1.通过限制区块GAS的上限来达到定义区块内存大小的作用。2.平衡了普通转账交易和复杂数据提交的费用问题，更加公平。

#### 完善了选举制度

不仅仅是在出现错误，作恶的情况下，会主动剔除节点；现在为了加快节点积极性和流动性。团队在原来的基础上加入时长变量，意味着到了固定时间，委员会的身份很更换一次，这进一步加强了去中心化，更多节点有了平等的权力。

![image.png](https://upload-images.jianshu.io/upload_images/10649797-61fffe57019f2714.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到社区相当活跃，相比于EOS只有大佬，大财团参与节点竞选。TrueChain在DAO社区制度的设计上优于EOS。最明显的特征就是有更多的个人节点参与进来了。这是一个社区健康良好生态的信号。如果一个DAO组织的节点和矿工都是庞大的资本，机构，最后只会让人担心和失望。

![image.png](https://upload-images.jianshu.io/upload_images/10649797-adb8aa28e8b49f88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

根据我和TrueChain开发团队的核实，目前该设想正在开发状态了。如果能实现那就已经在激励层面也就是经济模型层面超过了EOS。

####  引入了数据分片和分片事物处理系统

根据我的理解，这个部分的功能和区块时间戳有关。如果区块记录的不是当前状态的时间就是一个潜在的漏洞。

### 合约创新-复用了ETH的虚拟机原理TVM

#### TVM

如同ETH的EVM。就像一台计算机。

特别之处在于一个全节点会有两个虚拟机，为什么？因为FPOW算法的原因。一台虚拟机处理PBFT共识，一台虚拟机处理POW共识。

### 针对以太坊的范式修改

结合目前市场上已有的算力，TrueChain设计并改进了FPOW，将SnailChain的协议进行复用，具体细节包括补偿机制，非POW开采，讲实话黄皮的这一部分目前没有看懂。

但是解决了如下问题：

1.地址联合挖矿

2.地址自私挖矿

3.允许乱序挖矿

## 愿景

梦想是要有的，不然和咸鱼有什么分别。改一下，不然和空气比有什么分别。

作为区块链的参与公民，我很开心能看到TrueChain的努力，TrueChain的脚踏实地。

根据白皮书里的说明，TrueChain会最先应用到数字广告行业。这也是2C端非常热门的方向。看好TrueChain的未来

最后附上节点竞选的细则，希望看到最后的你也能参与进来：

https://mp.weixin.qq.com/s/dPiA95KcO5YsEIDRPoX-2w

## 关于我

![image.png](https://upload-images.jianshu.io/upload_images/10649797-88b4fc7272a51b98.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

香港城市大学 多媒体信息硕士

只爱三件事：撸代码，演讲，健身

现在最为区块链社区的一份子，有如何问题欢迎微信交流

wechat：Dinocchou

个人博客：https://rickeeyzhou.github.io/

------

## 黄皮书格式勘误

中文黄皮书勘误请及时查正：

1.中文版6.4节有错别字，倒数第四排，`陷入个人利息的膨胀的陷进`

2.关于交易的第五章的文本格式错误。



------

