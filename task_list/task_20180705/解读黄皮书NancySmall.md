## 走进初链黄皮书
##### 作者：NancySmall

### 揭开初链的面纱
前有比特币、以太坊等公链，这两者是区块链v1.0和v2.0版本的代表。比特币开启了去中心化的先河，以太坊实现了数字货币和智能合约的有机结合。顺着区块链技术的发展，初链应运而生。简而言之，初链的目的就是商用去中心化应用。TrueChain是全球最早的PBFT-POW最早的混合共识公链之一。简而言之，初链就是解决数字支付、智能合约等显示问题的。
### 混合共识
#### 1.了解混合共识
作为全球最早的PBFT-POW最早的混合共识公链之一，当然要先说一说，混合共识了。DBFT是一种改进的拜占庭容错算法，这个算法通过共识节点协商。
我们提出了TrueChain，一种PBFT的混合协议和POW一致。POW共识确保了激励和委员会的选择，而PBFT层作为一种高效的共识，如快速的终结性，高通量，交易验证，公平贸易经济的轮值委员会，以及处理非统一基础设施的补偿基础设施。混合协议的本质允许它最大限度地容忍大约三分之一的对等节点的腐败。
TrueChain提出共识设计主要基PBFT和POW的混合共识。在混合共识机制中，我们选择果实链作为我们的潜在链。果实链优点如下：
- 果实比矿块更容易开采，因此矿工们没有激励机制或形成采矿池。这使得PoW成为一个更公平的过程。
- 由于水果开采难度较低，很可能两种水果同时开采。 确定哪个有效的一种方法是通过选择具有较低散列值的那个。
直到他们写在一个块中后，果实才会稳定。因此，采矿奖励将支付给矿区的块矿工，然后块矿工会将奖励分配给矿区内的果实矿工。
- 果实链方案的一个优点是果实可以以任何顺序开采，这可以使采矿高度平行。与分片结合时，这将特别有用
- 采用果实链可以获得最佳韧性。<br>
#### 2.挖掘过程

区块链组成果实链
```
graph LR
区块链-->fruitchain
```
每个区块又包含自己的一组果实



```
sequenceDiagram
区块A->>区块B: 都包含自己的果实

```

#### 3.区块链算法
矿工只能运行一个挖掘算法随机产生散列值，区块链算法过程如下：

```js
 Initialize 
 chain = chain[0] 
 chain[0] = (0; 0; 0; 0;⊥; H(0; 0; 0; 0;⊥), ∅) 
 F = ∅ 
 if heard fruit f' then 
     if f' is the unique fruit corresponding to message m'then
         F = F ∪ f'
    if f'.h−1 < f.h−1 for all other fruits f such that f.m = m'. then
         F = F ∪ f'   
     if heard blockchain chain and |chain'F| > |chain.F| then
         chain = chain'
         where |chain.F| is the total number of fruit contained in chain.
foreach time step (1 sec) do
    Heard signed message m, broadcasted by PBFT. Let
    l = |chain| − 1, so chain = (chain[0], ..., chain[l]).
    F' = {f ∈ F : f recent w.r.t. chain, f ∈ chain}
    h' = chain[pos].h−1 where pos = max(1, l − κ).
    h−1 = chain[l − 1].h.
    while mined = FALSE do
        Randomly pick η ∈ {0, 1}κ
        Compute h = H(h−1; h'; η; d(F');m)
        if [h]−κ: < Dpf then
            f = (h−1; h'; η; d(F');m, h)
            F = F ∪ f
            boardcast fruit f
            mined = FRUIT
            if [h]:κ < Dp then
                chain[l] = ((h−1; h'; η; d(F')m, h), F')
                broadcast blockchain chain
                mined = BLOCK
```
### 结语
TrueChain有很多新技术：日长变化和混合委员会选举、计算和数据分片、虚拟机中的智能合约、非PoW开采等等，本文未完待续，深入了解TrueChain敬请期待。

