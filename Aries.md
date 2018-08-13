Initial chain (a new generation of mixed consensus chain)

Safety and efficiency coexist

As we all know, block chain technology is difficult to balance before maintaining security and efficiency, high degree of de-centralization and high security, then more nodes will participate in voting, and the computational power required to ensure the security of voting can not be too low, so the efficiency will be lost, and the new generation of hybrid consensus common chain-initial chain is kept in the middle. At the same time,

The emergence of the hybrid consensus mechanism of PoW and PBFT brings the dawn to solve the problem.



POW: Proof of Work, short for proof of work, simply put it, the higher the calculation, the longer the mining time, the more money you get.

The abbreviation of PBFT:Practical Byzantine Fault Tolerance is a practical Byzantine fault-tolerant algorithm. The kernel provides (n-1) / 3 fault tolerance for the algorithm under the premise of ensuring liveness and safety.

Initial chain fruit chain advantage

The first chain uses the fruit chain design, namely fPow, to ensure the fairness of all participants in the mining process.

The fruit chain is characterized by fairness avoidance.

1. When a bad man digs a mine, he intentionally does not connect it to the original chain, but through the mine, he continues to dig down, trying to dig a longer chain.

2. Honest miners, dig to the mine connected to the original chain, bad people will link the longer ore to the original chain, so that honest framer efforts in vain.

3. The Mining Association firstly collects the high transaction fee data into the block, but the transaction fee of each transaction is different, and the consistent transaction fee is unstable.

The advantage of the fruit chain is that it is responsible for dividing the blocks into a number of fruits. These fruits have a shelf life. Each fruit records a number of transactions. Ordinary mining can only be done by verifying these transactions. There is no need to invest a lot of mining equipment, electricity and bandwidth.

To enable the participants to use ordinary computers or even use mobile phones, they can mine.
