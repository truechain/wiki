Since its launch in November 2017, it has been researched, developed and tested for nearly a year，truechain Beta versionOfficially released at 08:00 on September 28 2018, Singapore time.Before this ,at 07:56 PBFT committee first consensus block and TrueChain fPOW creation block was dug out.
After reading some of the experts' interpretation of the truechain technology, I have some understanding. This article will study the code in the previous white paper  and some of the questions in the yellow book . The main idea here is the PBFT election.

### **elections Relevant content and issues in the White Paper and the Yellow paper**


The election of the PBFT in the white paper is described as follows:

Based on PoW, the hybrid consensus mechanism designed to elect PBFT nodes can ensure that PBFT nodes are re-elected in time when problems occur, and PBFT nodes are monitored in real time.

Therefore, the PBFT node is elected from the mining node of the snail chain. In some way, PBFT elections are also an aspect of double-chain interaction.

The description of the PBFT in the Yellow Paper is as follows:

The PoW protocol selects BFT committee members based on a combination of csize (number of blocks dug) and node equity. This provides a necessary admission system to handle dynamic members and switch committees in a licensed environment.

[Question] What is the difference between csize and node equity here?

[Answer] we can see from the code that the election of the committee sets the threshold for the number of fruits, and relies on the difficulty value to evaluate the probability of node selection. The threshold for setting the fruit here is to filter out those nodes that have less performance and have less performance.

There are two ways to change the term: a fixed-time mandatory change (the election here), a specific change triggered by misconduct.

[Question] Is the change triggered by misconduct implemented in the code? How to identify misbehavior?
[Answer] Not reflected in the code of the committee's election process, may be set in other locations, and needs to be learned and tracked.

## **Code interpretation**

electCommittee: Election Committee member

```
	// electCommittee elect committee members from snail block.
	
	func (e *Election) electCommittee(snailBeginNumber *big.Int, snailEndNumber *big.Int) []*types.CommitteeMember {
	
		log.Info("elect new committee..", "begin", snailBeginNumber, "end", snailEndNumber, "threshold", params.ElectionFruitsThreshold, "max", params.MaximumCommitteeNumber)

		
		var committee []*types.CommitteeMember
		
		if e.singleNode {
		
			committee = append(committee, e.genesisCommittee[0])
			return committee
		}
		
		for _, member := range e.defaultMembers {
			committee = append(committee, member)
		}
		
		seed, candidates := e.getCandinates(snailBeginNumber, snailEndNumber)
		if candidates == nil { 
			log.Info("can't get new committee, retain current committee")
		} else {
			members := e.elect(candidates, seed) // 

			for _, member := range members {
				committee = append(committee, member) 
			}
		}

		return committee）
	}


```
The function uses the following two ways: getting the candidate and electing the candidate. This is done by randomly electing committee members through a random number seed seed. Here, the random number seed seed is related to the block in the slow chain block interval selected in the election. If the difficulty interval of the mining node is larger, the possibility of obtaining the election is higher. And look at the analysis of the later elect.


## **getCandinates: Get the candidate**


```
// getCandinates get candinate miners and seed from given snail blocks
	
	func (e *Election) getCandinates(snailBeginNumber *big.Int, snailEndNumber *big.Int) (common.Hash, []*candidateMember) {
		
		var fruitsCount map[common.Address]uint64 = make(map[common.Address]uint64)
	
		var members []*candidateMember
		var seed []byte
		// get all fruits want to be elected and their pubic key is valid
		
		for blockNumber := snailBeginNumber; blockNumber.Cmp(snailEndNumber) <= 0; {
		
			block := e.snailchain.GetBlockByNumber(blockNumber.Uint64())
			if block == nil {
				return common.Hash{}, nil
			}
			
			seed = append(seed, block.Hash().Bytes()...)
		
			fruits := block.Fruits()
			for _, f := range fruits {
				if f.ToElect() { // 
					// get public Key
					pubkey, err := f.GetPubKey()
					if err != nil { // Exception handling
						continue
					}
					// Convert to Address by Public Key
					addr := crypto.PubkeyToAddress(*pubkey)
					// Get difficulty value
					act, diff := e.engine.GetDifficulty(f.Header())
				
					// coinbase is the miner address public key and  addressThe public key and address of the node that digs out the fruit
					
					member := &candidateMember{
						coinbase:   f.Coinbase(),
						publickey:  pubkey,
						address:    addr,
						difficulty: new(big.Int).Sub(act, diff),
					}
					// Put the member in the members slice; here are the nodes that are willing to be elected for each fruit excavated.
					members = append(members, member)
					// If fruitsCount[addr] has a value (indicating that the address was previously recorded), add one. Otherwise, a value of 1 indicates the first time the fruit was encountered at the address.
					if _, ok := fruitsCount[addr]; ok {
						fruitsCount[addr] += 1
					} else {
						fruitsCount[addr] = 1
					}
				}
			}
			blockNumber = new(big.Int).Add(blockNumber, big.NewInt(1)) 
		}
		// logRecord the fruits in the fruit that are willing to be elected, and the number of corresponding nodes (since members contain duplicate nodes)
		log.Debug("get committee candidate", "fruit", len(members), "members", len(fruitsCount))

		var candidates []*candidateMember
		
		td := big.NewInt(0)
		for _, member := range members {
			if cnt, ok := fruitsCount[member.address]; ok {
				
				log.Trace("get committee candidate", "keyAddr", member.address, "count", cnt, "diff", member.difficulty)
				// Record if the number of fruit excavated is greater than the set threshold
			
				if cnt >= params.ElectionFruitsThreshold {
					td.Add(td, member.difficulty)           // Accumulate the difficulty values of all nodes
					candidates = append(candidates, member) 
				}
			}
		}
		// log Records the final list of candidates: the number of candidates, the total difficulty of the candidate.
		log.Debug("get final candidate", "count", len(candidates), "td", td)
		if len(candidates) == 0 { // If there is no candidate's error warning
			log.Warn("getCandinates not get candidates")
			return common.Hash{}, nil
		}

		
		// dd：Intermediate value of accumulated difficulty
		dd := big.NewInt(0)
		// maxUint256 = 2 ^ 256 - 1
		rate := new(big.Int).Div(maxUint256, td)
		for i, member := range candidates {
			member.lower = new(big.Int).Mul(rate, dd)    // Lower limit of difficulty
			dd = new(big.Int).Add(dd, member.difficulty) // dd Performs the difficulty accumulation for each node
			if i == len(candidates)-1 {
				member.upper = new(big.Int).Set(maxUint256) // The upper limit of the difficulty of the last node is set to maxUint256
			} else {
				member.upper = new(big.Int).Mul(rate, dd) // The upper limit of the difficulty of a normal node (not the last one) is dd*rate
			}
			
			log.Trace("get power", "member", member.address, "lower", member.lower, "upper", member.upper)
		}
	
		return crypto.Keccak256Hash(seed), candidates
	}
--------------------- 

```
[GO] There is a knowledge point of the grammar of GO language in this program.


```
seed = append(seed, block.Hash().Bytes()...)
```
[Answer] 
append() is mainly used to append elements to a slice.
The first parameter is a slice, followed by the variable parameters of the slice storage element type.

The second parameter can also directly write another slice, appending all the element copies in it to the back of the first slice. It should be noted that the parameters of this usage function can only accept two slices, and add three points at the end.

Therefore, here is to copy all the elements in the slice.Hash().Bytes() slice to the seed slice.

The snail chain mining block finds the slow chain mining node of this block interval [snailBeginNumber,snailEndNumber], and if the node is willing to participate in the election, it is added to the candidate list.

Here is the threshold for the fruit to join the candidate: ElectionFruitsThreshold is set to 100 in the
protocal_params.go file (this value may increase continuously with the development of the initial chain).
However, the factor that increases the probability of selection is its difficulty value. Therefore, the number of fruit excavated is the threshold for joining the candidate, which is more difficult and will be more likely to be selected.
Let's take a look at the election function:


## **Elect: election process**


```
// elect is a lottery function that select committee members from candidates miners

	func (e *Election) elect(candidates []*candidateMember, seed common.Hash) []*types.CommitteeMember {
		// Addrs : mark whether the address is selected to avoid the same address being repeatedly elected.
		var addrs map[common.Address]uint = make(map[common.Address]uint)
		var members []*types.CommitteeMember
		// log records incoming parameters: number of candidates and seeds
		log.Debug("elect committee members ..", "count", len(candidates), "seed", seed)
		
		round := new(big.Int).Set(common.Big1)
		for {
			seedNumber := new(big.Int).Add(seed.Big(), round) // seed + 1
			hash := crypto.Keccak256Hash(seedNumber.Bytes())  // Take the hash of the seedNumber
			//prop := new(big.Int).Div(maxUint256, hash.Big())
			prop := hash.Big() // Can be understood as the random value obtained, by which the candidate is taken to obtain the elected committee members.

			for _, cm := range candidates {
				if prop.Cmp(cm.lower) < 0 { // If prop is less than the minimum difficulty of the candidate, the candidate is not selected.
					continue
				}
				if prop.Cmp(cm.upper) >= 0 { 
					continue
				}
				
				log.Trace("get member", "seed", hash, "member", cm.address, "prop", prop)
				if _, ok := addrs[cm.address]; ok { // Cannot repeatedly select the same address
					break
				}
				addrs[cm.address] = 1             // Indicates that the address is already selected
				member := &types.CommitteeMember{ // Assign a member to the miner's address and publicKey of the node
					Coinbase:  cm.coinbase,
					Publickey: cm.publickey,
				}
				members = append(members, member) 

				break
			}

			round = new(big.Int).Add(round, common.Big1) // plus one
			
			if round.Cmp(params.MaximumCommitteeNumber) > 0 { // Exit conditions: The number of committee members with the largest number of committee members selected
				break
			}
		}
		// log records debug information: number of members
		log.Debug("get new committee members", "count", len(members))

		return members // the number of committee members selected
	}
--------------------- 

```


Essentially, this random number seed is used to see which candidate's difficulty interval it falls into. Therefore, the greater the difficulty interval of the candidate, the higher the probability of being selected.
How often does the committee node conduct the election? How is the slow chain block interval determined here? Need to look at the upper level function of electCommittee. Here choose electCommittee for interpretation.

## **getCommittee: Get committee members**


```
// getCommittee returns the committee members who propose this fast block
	
	func (e *Election) getCommittee(fastNumber *big.Int, snailNumber *big.Int) *committee {
		/
		log.Info("get committee ..", "fastnumber", fastNumber, "snailnumber", snailNumber)
		// propotocol_params.go： ElectionPeriodNumber = big.NewInt(144) // snail block period number
		
		committeeNumber := new(big.Int).Div(snailNumber, params.ElectionPeriodNumber)
		量
		lastSnailNumber := new(big.Int).Mul(committeeNumber, params.ElectionPeriodNumber)
		// propotocol_params.go： SnailConfirmInterval = big.NewInt(12)
		// 
		switchCheckNumber := new(big.Int).Sub(lastSnailNumber, params.SnailConfirmInterval)

		log.Debug("get pre committee ", "committee", committeeNumber, "last", lastSnailNumber, "switchcheck", switchCheckNumber)

		if committeeNumber.Cmp(common.Big0) == 0 { 
			// genesis committee
			log.Debug("get genesis committee")
			return &committee{
				id:                  new(big.Int).Set(common.Big0),
				beginFastNumber:     new(big.Int).Set(common.Big1),
				endFastNumber:       new(big.Int).Set(common.Big0),
				firstElectionNumber: new(big.Int).Set(common.Big0),
				lastElectionNumber:  new(big.Int).Set(common.Big0),
				switchCheckNumber:   params.ElectionPeriodNumber,
				members:             e.genesisCommittee,
			}
		}

		// find the last committee end fastblock number
		
		switchCheckBlock := e.snailchain.GetBlockByNumber(switchCheckNumber.Uint64())
		if switchCheckBlock == nil {
			return nil
		}
	
		fruits := switchCheckBlock.Fruits()
		// propotocol_params.go： ElectionSwitchoverNumber = big.NewInt(300)
		
		lastFastNumber := new(big.Int).Add(fruits[len(fruits)-1].Number(), params.ElectionSwitchoverNumber)
	
		log.Debug("check last fast block", "committee", committeeNumber, "last fast", lastFastNumber, "current", fastNumber)
		if lastFastNumber.Cmp(fastNumber) >= 0 { // If the number of blocks of the fast chain to be switched by the committee member is greater than the current number of blocks, then only the members of the election committee are not switched.
			if committeeNumber.Cmp(common.Big1) == 0 { // If only one committee election is held, the endSnailNumber here is still negative, so you still have to use the Genesis Committee.
				// still at genesis committee
				log.Debug("get genesis committee")
				return &committee{
					id:                  new(big.Int).Set(common.Big0),
					beginFastNumber:     new(big.Int).Set(common.Big1),
					endFastNumber:       lastFastNumber,
					firstElectionNumber: new(big.Int).Set(common.Big0),
					lastElectionNumber:  new(big.Int).Set(common.Big0),
					switchCheckNumber:   params.ElectionPeriodNumber,
					members:             e.genesisCommittee,
				}
			}
			// get pre snail block to elect current committee
			// Get the last snail chain block to elect the current committee
			 ElectionPeriodNumber（144）
			endSnailNumber := new(big.Int).Sub(switchCheckNumber, params.ElectionPeriodNumber)
			// ：endSnailNumber - ElectionPeriodNumber（144） + 1
			beginSnailNumber := new(big.Int).Add(new(big.Int).Sub(endSnailNumber, params.ElectionPeriodNumber), common.Big1)
			if beginSnailNumber.Cmp(common.Big0) <= 0 { // beginSnailNumber < 0, set 1
				beginSnailNumber = new(big.Int).Set(common.Big1)
			}
			// 获取结束的慢链的区块
			endSnailBlock := e.snailchain.GetBlockByNumber(endSnailNumber.Uint64())
			// Get the fruit of the block
			fruits = endSnailBlock.Fruits()
			//  ElectionSwitchoverNumber(300)
			preEndFast := new(big.Int).Add(fruits[len(fruits)-1].FastNumber(), params.ElectionSwitchoverNumber)

			// Election committee members from the block height from the snail chain to the end block height

			members := e.electCommittee(beginSnailNumber, endSnailNumber)
			return &committee{ // In addition to the member value obtained by the Election Committee members, the following information is also recorded.：
				id:                  new(big.Int).Sub(committeeNumber, common.Big1), // id is committeeNumber+1
				beginFastNumber:     new(big.Int).Add(preEndFast, common.Big1),      // Fast chain block height for starting elections
				endFastNumber:       lastFastNumber,                                 // The height of the fast chain block that ends the election
				firstElectionNumber: beginSnailNumber,                               // snail chain block height for starting elections
				lastElectionNumber:  endSnailNumber,                                 // 
				switchCheckNumber:   lastSnailNumber,                                // 
				members:             members,
			}
		}

		
		// 
		endSnailNumber := new(big.Int).Set(switchCheckNumber)
		// 慢链开始区块数：endSnailNumber - ElectionPeriodNumber（144） + 1
		beginSnailNumber := new(big.Int).Add(new(big.Int).Sub(endSnailNumber, params.ElectionPeriodNumber), common.Big1)

		log.Debug("get committee", "electFirst", beginSnailNumber, "electLast", endSnailNumber, "lastFast", lastFastNumber)

		members := e.electCommittee(beginSnailNumber, endSnailNumber)
		return &committee{
			id:                  committeeNumber,                               // committeeNumber
			beginFastNumber:     new(big.Int).Add(lastFastNumber, common.Big1), // lastFastNumber + 1
			endFastNumber:       new(big.Int).Set(common.Big0),                 // 由于新的委员会选举出来，还没有切换，这里设置为0
			firstElectionNumber: beginSnailNumber,
			lastElectionNumber:  endSnailNumber,
			switchCheckNumber:   new(big.Int).Add(lastSnailNumber, params.ElectionPeriodNumber), // lastSnailNumber + ElectionPeriodNumber（144）
			members:             members,
		}
	}
--------------------- 

```
The link height of the snail chain and the fast chain needs to be calculated by the number value of the fruit. As the following example:


```
  lastFastNumber := new(big.Int).Add(fruits[len(fruits)-1].Number(), params.ElectionSwitchoverNumber)
```
The election is made every ElectionPeriodNumber (144) slow chain times. The slow chain block interval is also divided according to ElectionPeriodNumber (144).
This function includes concepts such as fast and slow links, committee elections, and committee switching. After reading this function, it is still somewhat confusing. Here is an example of some parameter data in the table:



Since its launch in November 2017, it has been researched, developed and tested for nearly a year，truechain Beta versionOfficially released at 08:00 on September 28 2018, Singapore time.Before this ,at 07:56 PBFT committee first consensus block and TrueChain fPOW creation block was dug out.
After reading some of the experts' interpretation of the truechain technology, I have some understanding. This article will study the code in the previous white paper  and some of the questions in the yellow book . The main idea here is the PBFT election.

### **elections Relevant content and issues in the White Paper and the Yellow paper**


The election of the PBFT in the white paper is described as follows:

Based on PoW, the hybrid consensus mechanism designed to elect PBFT nodes can ensure that PBFT nodes are re-elected in time when problems occur, and PBFT nodes are monitored in real time.

Therefore, the PBFT node is elected from the mining node of the snail chain. In some way, PBFT elections are also an aspect of double-chain interaction.

The description of the PBFT in the Yellow Paper is as follows:

The PoW protocol selects BFT committee members based on a combination of csize (number of blocks dug) and node equity. This provides a necessary admission system to handle dynamic members and switch committees in a licensed environment.

[Question] What is the difference between csize and node equity here?

[Answer] we can see from the code that the election of the committee sets the threshold for the number of fruits, and relies on the difficulty value to evaluate the probability of node selection. The threshold for setting the fruit here is to filter out those nodes that have less performance and have less performance.

There are two ways to change the term: a fixed-time mandatory change (the election here), a specific change triggered by misconduct.

[Question] Is the change triggered by misconduct implemented in the code? How to identify misbehavior?
[Answer] Not reflected in the code of the committee's election process, may be set in other locations, and needs to be learned and tracked.

## **Code interpretation**

electCommittee: Election Committee member

```
	// electCommittee elect committee members from snail block.
	
	func (e *Election) electCommittee(snailBeginNumber *big.Int, snailEndNumber *big.Int) []*types.CommitteeMember {
	
		log.Info("elect new committee..", "begin", snailBeginNumber, "end", snailEndNumber, "threshold", params.ElectionFruitsThreshold, "max", params.MaximumCommitteeNumber)

		
		var committee []*types.CommitteeMember
		
		if e.singleNode {
		
			committee = append(committee, e.genesisCommittee[0])
			return committee
		}
		
		for _, member := range e.defaultMembers {
			committee = append(committee, member)
		}
		
		seed, candidates := e.getCandinates(snailBeginNumber, snailEndNumber)
		if candidates == nil { 
			log.Info("can't get new committee, retain current committee")
		} else {
			members := e.elect(candidates, seed) // 

			for _, member := range members {
				committee = append(committee, member) 
			}
		}

		return committee）
	}


```
The function uses the following two ways: getting the candidate and electing the candidate. This is done by randomly electing committee members through a random number seed seed. Here, the random number seed seed is related to the block in the slow chain block interval selected in the election. If the difficulty interval of the mining node is larger, the possibility of obtaining the election is higher. And look at the analysis of the later elect.


## **getCandinates: Get the candidate**


```
// getCandinates get candinate miners and seed from given snail blocks
	
	func (e *Election) getCandinates(snailBeginNumber *big.Int, snailEndNumber *big.Int) (common.Hash, []*candidateMember) {
		
		var fruitsCount map[common.Address]uint64 = make(map[common.Address]uint64)
	
		var members []*candidateMember
		var seed []byte
		// get all fruits want to be elected and their pubic key is valid
		
		for blockNumber := snailBeginNumber; blockNumber.Cmp(snailEndNumber) <= 0; {
		
			block := e.snailchain.GetBlockByNumber(blockNumber.Uint64())
			if block == nil {
				return common.Hash{}, nil
			}
			
			seed = append(seed, block.Hash().Bytes()...)
		
			fruits := block.Fruits()
			for _, f := range fruits {
				if f.ToElect() { // 
					// get public Key
					pubkey, err := f.GetPubKey()
					if err != nil { // Exception handling
						continue
					}
					// Convert to Address by Public Key
					addr := crypto.PubkeyToAddress(*pubkey)
					// Get difficulty value
					act, diff := e.engine.GetDifficulty(f.Header())
				
					// coinbase is the miner address public key and  addressThe public key and address of the node that digs out the fruit
					
					member := &candidateMember{
						coinbase:   f.Coinbase(),
						publickey:  pubkey,
						address:    addr,
						difficulty: new(big.Int).Sub(act, diff),
					}
					// Put the member in the members slice; here are the nodes that are willing to be elected for each fruit excavated.
					members = append(members, member)
					// If fruitsCount[addr] has a value (indicating that the address was previously recorded), add one. Otherwise, a value of 1 indicates the first time the fruit was encountered at the address.
					if _, ok := fruitsCount[addr]; ok {
						fruitsCount[addr] += 1
					} else {
						fruitsCount[addr] = 1
					}
				}
			}
			blockNumber = new(big.Int).Add(blockNumber, big.NewInt(1)) 
		}
		// logRecord the fruits in the fruit that are willing to be elected, and the number of corresponding nodes (since members contain duplicate nodes)
		log.Debug("get committee candidate", "fruit", len(members), "members", len(fruitsCount))

		var candidates []*candidateMember
		
		td := big.NewInt(0)
		for _, member := range members {
			if cnt, ok := fruitsCount[member.address]; ok {
				
				log.Trace("get committee candidate", "keyAddr", member.address, "count", cnt, "diff", member.difficulty)
				// Record if the number of fruit excavated is greater than the set threshold
			
				if cnt >= params.ElectionFruitsThreshold {
					td.Add(td, member.difficulty)           // Accumulate the difficulty values of all nodes
					candidates = append(candidates, member) 
				}
			}
		}
		// log Records the final list of candidates: the number of candidates, the total difficulty of the candidate.
		log.Debug("get final candidate", "count", len(candidates), "td", td)
		if len(candidates) == 0 { // If there is no candidate's error warning
			log.Warn("getCandinates not get candidates")
			return common.Hash{}, nil
		}

		
		// dd：Intermediate value of accumulated difficulty
		dd := big.NewInt(0)
		// maxUint256 = 2 ^ 256 - 1
		rate := new(big.Int).Div(maxUint256, td)
		for i, member := range candidates {
			member.lower = new(big.Int).Mul(rate, dd)    // Lower limit of difficulty
			dd = new(big.Int).Add(dd, member.difficulty) // dd Performs the difficulty accumulation for each node
			if i == len(candidates)-1 {
				member.upper = new(big.Int).Set(maxUint256) // The upper limit of the difficulty of the last node is set to maxUint256
			} else {
				member.upper = new(big.Int).Mul(rate, dd) // The upper limit of the difficulty of a normal node (not the last one) is dd*rate
			}
			
			log.Trace("get power", "member", member.address, "lower", member.lower, "upper", member.upper)
		}
	
		return crypto.Keccak256Hash(seed), candidates
	}
--------------------- 

```
[GO] There is a knowledge point of the grammar of GO language in this program.


```
seed = append(seed, block.Hash().Bytes()...)
```
[Answer] 
append() is mainly used to append elements to a slice.
The first parameter is a slice, followed by the variable parameters of the slice storage element type.

The second parameter can also directly write another slice, appending all the element copies in it to the back of the first slice. It should be noted that the parameters of this usage function can only accept two slices, and add three points at the end.

Therefore, here is to copy all the elements in the slice.Hash().Bytes() slice to the seed slice.

The snail chain mining block finds the slow chain mining node of this block interval [snailBeginNumber,snailEndNumber], and if the node is willing to participate in the election, it is added to the candidate list.

Here is the threshold for the fruit to join the candidate: ElectionFruitsThreshold is set to 100 in the
protocal_params.go file (this value may increase continuously with the development of the initial chain).
However, the factor that increases the probability of selection is its difficulty value. Therefore, the number of fruit excavated is the threshold for joining the candidate, which is more difficult and will be more likely to be selected.
Let's take a look at the election function:


## **Elect: election process**


```
// elect is a lottery function that select committee members from candidates miners

	func (e *Election) elect(candidates []*candidateMember, seed common.Hash) []*types.CommitteeMember {
		// Addrs : mark whether the address is selected to avoid the same address being repeatedly elected.
		var addrs map[common.Address]uint = make(map[common.Address]uint)
		var members []*types.CommitteeMember
		// log records incoming parameters: number of candidates and seeds
		log.Debug("elect committee members ..", "count", len(candidates), "seed", seed)
		
		round := new(big.Int).Set(common.Big1)
		for {
			seedNumber := new(big.Int).Add(seed.Big(), round) // seed + 1
			hash := crypto.Keccak256Hash(seedNumber.Bytes())  // Take the hash of the seedNumber
			//prop := new(big.Int).Div(maxUint256, hash.Big())
			prop := hash.Big() // Can be understood as the random value obtained, by which the candidate is taken to obtain the elected committee members.

			for _, cm := range candidates {
				if prop.Cmp(cm.lower) < 0 { // If prop is less than the minimum difficulty of the candidate, the candidate is not selected.
					continue
				}
				if prop.Cmp(cm.upper) >= 0 { 
					continue
				}
				
				log.Trace("get member", "seed", hash, "member", cm.address, "prop", prop)
				if _, ok := addrs[cm.address]; ok { // Cannot repeatedly select the same address
					break
				}
				addrs[cm.address] = 1             // Indicates that the address is already selected
				member := &types.CommitteeMember{ // Assign a member to the miner's address and publicKey of the node
					Coinbase:  cm.coinbase,
					Publickey: cm.publickey,
				}
				members = append(members, member) 

				break
			}

			round = new(big.Int).Add(round, common.Big1) // plus one
			
			if round.Cmp(params.MaximumCommitteeNumber) > 0 { // Exit conditions: The number of committee members with the largest number of committee members selected
				break
			}
		}
		// log records debug information: number of members
		log.Debug("get new committee members", "count", len(members))

		return members // the number of committee members selected
	}
--------------------- 

```


Essentially, this random number seed is used to see which candidate's difficulty interval it falls into. Therefore, the greater the difficulty interval of the candidate, the higher the probability of being selected.
How often does the committee node conduct the election? How is the slow chain block interval determined here? Need to look at the upper level function of electCommittee. Here choose electCommittee for interpretation.

## **getCommittee: Get committee members**


```
// getCommittee returns the committee members who propose this fast block
	
	func (e *Election) getCommittee(fastNumber *big.Int, snailNumber *big.Int) *committee {
		/
		log.Info("get committee ..", "fastnumber", fastNumber, "snailnumber", snailNumber)
		// propotocol_params.go： ElectionPeriodNumber = big.NewInt(144) // snail block period number
		
		committeeNumber := new(big.Int).Div(snailNumber, params.ElectionPeriodNumber)
		
		lastSnailNumber := new(big.Int).Mul(committeeNumber, params.ElectionPeriodNumber)
		// propotocol_params.go： SnailConfirmInterval = big.NewInt(12)
		// 
		switchCheckNumber := new(big.Int).Sub(lastSnailNumber, params.SnailConfirmInterval)

		log.Debug("get pre committee ", "committee", committeeNumber, "last", lastSnailNumber, "switchcheck", switchCheckNumber)

		if committeeNumber.Cmp(common.Big0) == 0 { 
			// genesis committee
			log.Debug("get genesis committee")
			return &committee{
				id:                  new(big.Int).Set(common.Big0),
				beginFastNumber:     new(big.Int).Set(common.Big1),
				endFastNumber:       new(big.Int).Set(common.Big0),
				firstElectionNumber: new(big.Int).Set(common.Big0),
				lastElectionNumber:  new(big.Int).Set(common.Big0),
				switchCheckNumber:   params.ElectionPeriodNumber,
				members:             e.genesisCommittee,
			}
		}

		// find the last committee end fastblock number
		
		switchCheckBlock := e.snailchain.GetBlockByNumber(switchCheckNumber.Uint64())
		if switchCheckBlock == nil {
			return nil
		}
	
		fruits := switchCheckBlock.Fruits()
		// propotocol_params.go： ElectionSwitchoverNumber = big.NewInt(300)
		
		lastFastNumber := new(big.Int).Add(fruits[len(fruits)-1].Number(), params.ElectionSwitchoverNumber)
	
		log.Debug("check last fast block", "committee", committeeNumber, "last fast", lastFastNumber, "current", fastNumber)
		if lastFastNumber.Cmp(fastNumber) >= 0 { // If the number of blocks of the fast chain to be switched by the committee member is greater than the current number of blocks, then only the members of the election committee are not switched.
			if committeeNumber.Cmp(common.Big1) == 0 { // If only one committee election is held, the endSnailNumber here is still negative, so you still have to use the Genesis Committee.
				// still at genesis committee
				log.Debug("get genesis committee")
				return &committee{
					id:                  new(big.Int).Set(common.Big0),
					beginFastNumber:     new(big.Int).Set(common.Big1),
					endFastNumber:       lastFastNumber,
					firstElectionNumber: new(big.Int).Set(common.Big0),
					lastElectionNumber:  new(big.Int).Set(common.Big0),
					switchCheckNumber:   params.ElectionPeriodNumber,
					members:             e.genesisCommittee,
				}
			}
			// get pre snail block to elect current committee
			// Get the last snail chain block to elect the current committee
			 ElectionPeriodNumber（144）
			endSnailNumber := new(big.Int).Sub(switchCheckNumber, params.ElectionPeriodNumber)
			// ：endSnailNumber - ElectionPeriodNumber（144） + 1
			beginSnailNumber := new(big.Int).Add(new(big.Int).Sub(endSnailNumber, params.ElectionPeriodNumber), common.Big1)
			if beginSnailNumber.Cmp(common.Big0) <= 0 { // beginSnailNumber < 0, set 1
				beginSnailNumber = new(big.Int).Set(common.Big1)
			}
			// 
			endSnailBlock := e.snailchain.GetBlockByNumber(endSnailNumber.Uint64())
			// Get the fruit of the block
			fruits = endSnailBlock.Fruits()
			//  ElectionSwitchoverNumber(300)
			preEndFast := new(big.Int).Add(fruits[len(fruits)-1].FastNumber(), params.ElectionSwitchoverNumber)

			// Election committee members from the block height from the snail chain to the end block height

			members := e.electCommittee(beginSnailNumber, endSnailNumber)
			return &committee{ // In addition to the member value obtained by the Election Committee members, the following information is also recorded.：
				id:                  new(big.Int).Sub(committeeNumber, common.Big1), // id is committeeNumber+1
				beginFastNumber:     new(big.Int).Add(preEndFast, common.Big1),      // Fast chain block height for starting elections
				endFastNumber:       lastFastNumber,                                 // The height of the fast chain block that ends the election
				firstElectionNumber: beginSnailNumber,                               // snail chain block height for starting elections
				lastElectionNumber:  endSnailNumber,                                 // 
				switchCheckNumber:   lastSnailNumber,                                // 
				members:             members,
			}
		}

		
		// 
		endSnailNumber := new(big.Int).Set(switchCheckNumber)
		// ：endSnailNumber - ElectionPeriodNumber（144） + 1
		beginSnailNumber := new(big.Int).Add(new(big.Int).Sub(endSnailNumber, params.ElectionPeriodNumber), common.Big1)

		log.Debug("get committee", "electFirst", beginSnailNumber, "electLast", endSnailNumber, "lastFast", lastFastNumber)

		members := e.electCommittee(beginSnailNumber, endSnailNumber)
		return &committee{
			id:                  committeeNumber,                               // committeeNumber
			beginFastNumber:     new(big.Int).Add(lastFastNumber, common.Big1), // lastFastNumber + 1
			endFastNumber:       new(big.Int).Set(common.Big0),                 // 
			firstElectionNumber: beginSnailNumber,
			lastElectionNumber:  endSnailNumber,
			switchCheckNumber:   new(big.Int).Add(lastSnailNumber, params.ElectionPeriodNumber), // lastSnailNumber + ElectionPeriodNumber（144）
			members:             members,
		}
	}
--------------------- 

```
The link height of the snail chain and the fast chain needs to be calculated by the number value of the fruit. As the following example:


```
  lastFastNumber := new(big.Int).Add(fruits[len(fruits)-1].Number(), params.ElectionSwitchoverNumber)
```
The election is made every ElectionPeriodNumber (144) slow chain times. The slow chain block interval is also divided according to ElectionPeriodNumber (144).
This function includes concepts such as fast and slow links, committee elections, and committee switching. After reading this function, it is still somewhat confusing. Here is an example of some parameter data in the table:


![](https://i.loli.net/2018/11/05/5bdfd11910bc8.png)  


In case 1, since the commitNumber is 0, the Genesis Committee was selected;
In case 2, since the commitNumber is 1, since endSnailNumber=switchCheckNumber-144 will become negative, the election is still not possible here, and the Genesis Committee is still used;
In case 3, a committee election is held. This will wait for the time of the SnailConfirmInterval(12) slow chain block to provide the committee to switch, or it may be because of the confirmation time of the election result: the latest slow chain block has not been confirmed enough (the confirmation of the slow chain block) Time is also the block time of 12 slow chains).
In case 4, a committee switch is made. It can be seen that its firstElectionNumber and lastElectionNumber can be continuous. And the id is used to indicate that the switch is the first few election results.

Members of the committee are elected from miners in the slow-chain fruit. The process of election is a random election for the difficulty range, rather than relying solely on the amount of fruit and so on. There is a certain time interval between the election of the committee and the switching of the members of the committee. The election process is called twice in the function. The height of the starting block of the corresponding fast chain and slow chain is recorded in the commit, which is based on the slow chain for obtaining candidates and elections. The block, the block of the fast chain is only recorded by the value of the fast chain of the fruit record of the slow chain, and is not used during the election process.

In case 1, since the commitNumber is 0, the Genesis Committee was selected;
In case 2, since the commitNumber is 1, since endSnailNumber=switchCheckNumber-144 will become negative, the election is still not possible here, and the Genesis Committee is still used;
In case 3, a committee election is held. This will wait for the time of the SnailConfirmInterval(12) slow chain block to provide the committee to switch, or it may be because of the confirmation time of the election result: the latest slow chain block has not been confirmed enough (the confirmation of the slow chain block) Time is also the block time of 12 slow chains).
In case 4, a committee switch is made. It can be seen that its firstElectionNumber and lastElectionNumber can be continuous. And the id is used to indicate that the switch is the first few election results.


## **sum up**

Members of the committee are elected from miners in the slow-chain fruit. The process of election is a random election for the difficulty range, rather than relying solely on the amount of fruit and so on. There is a certain time interval between the election of the committee and the switching of the members of the committee. The election process is called twice in the function. The height of the starting block of the corresponding fast chain and slow chain is recorded in the commit, which is based on the slow chain for obtaining candidates and elections. The block, the block of the fast chain is only recorded by the value of the fast chain of the fruit record of the slow chain, and is not used during the election process.
