# TrueChain: Explanation of hybrid consensus in latest yellow paper

## Introduction

**Consensus** is a foundational building block of distributed systems. 
A distributed ledger called a blockchain, its architecture certainly requires a consensus mechanism to confirm a new group of trustless transactions (so-called ‘blocks’). 

Currently, there are five most mainstream consensus mechanism: **PoW, PoS, DPoS, PBFT and DBFT**. 
For most public-chain project that adopts a single consensus mechanism, the speed, security, and decentralization cannot be combined with developers.

**TrueChain**, by adopting the **PBFT+fPoW** consensus mechanism, has pioneered the new generation **Hybrid Consensus** public-chain. 
Committed to solve the biggest problem of public-chain: the contradiction between decentralization and performance.

## Innovation

According to TrueChain's yellow paper[1], in the consensus section, it introduces a hybrid consensus protocol:

>The **fPoW** consensus ensures **incentivization and committee selection**, while the **PBFT** consensus, acts as a highly performant layer with capabilities like instant finality with high throughput, **transaction validation**, rotating committee for fair trade economy and a compensation infrastructure to deal with nonuniform infrastructure.  

Key innovation are below:

#### Inno1: Transfer PoW to fPoW

Currently, Nakamoto PoW encounters the following problems:

1. Mining pool
2. Selfish mining attack[2](A 25% Attack)
3. Unstable transaction fees

TrueChain adopts **Fruitchain**[3] as the slowchain (snailchain), instead of Nakamoto PoW, so-called fPoW.
During the mining process of fPoW, it will have the following characteristics:

**1) No need for mining pool**

In Fruitchain, Fruit Blocks can be made almost arbitrarily small, so they are less difficult than Nakamoto Blocks when mining.
And as a consequence, miners can get paid much more often. 
Indeed, experimental results show that with Bitcoin current block size of 1MB, by sacrificing 8% to 10% of the block to new meta data, Fruitchain can ensure that miners get paid 1000x more often (roughly on average, twice per day).
Consequently, there is no longer a need for pooled mining

**2) More resistant to selfish mining**

In Fruitchain, Fruit Blocks are not stable before they are written in a block, and it has a certain shelf life. 
The algorithm stipulates that the block containing the most fruit is the main chain, so the miner needs to involve the fruit into the block as soon as possible, rather than waiting silently and wasting others’computing power. 
Thus, selfish mining is resisted. 
The miner who achieves fruits will get the reward firstly, and then distribute certain rewards to the fruit which is included into the block.

**3) Parallel mining**

In Fruitchain, Fruit Blocks can be mined in any order, and this can make mining highly parallel.
Also it would be especially useful when combined with sharding.



#### Inno2: Computation and Data Sharding

TrueChain designs a speculative transaction processing system over shards. 
The design is based on security, but does not fully implement linear scalability.
It divides the world state of the blockchain into different shards, each of which is processed by a different PBFT committee in parallel.

In hybrid consensus, the DailyBFT instances are indexed into a determininstic sequence DailyBFT[1 ... R].
TrueChain allow multiple sequences of DailyBFT instances to exist at the same time. 
To be precise, TrueChain denotes the t-th DailyBFT sequence by shard St, and fix the number of shards as C. 
Each DailyBFT is a normal shard. Besides C normal shards, TrueChain have a primary shard Sp composed of csize nodes.

The job of the primary shard is to finalize the ordering of the output of normal shards as well as implementing the coordinator in distributed transaction processing systems.
And the normal shards, submit logs to the primary shard, and while the primary shard communicate with hybrid consensus component.


## Summary

For TrueChain hybrid consensus protocol, the fPoW makes TrueChain **more decentralized and fairer**. 
Also TrueChain sharding mechanism on top of PBFT, breaking through the limitations of scalability.

## References

[1] A. Sharma, J. L, H. Zhang, E. Zhang. TrueChain: Highly Performant Decentralized Public Ledger.

[2] Vitalik Buterin. Selfish Mining: A 25% Attack Against the Bitcoin Network

[3] R. Pass and E. Shi. Fruitchains: A fair blockchain.
 

