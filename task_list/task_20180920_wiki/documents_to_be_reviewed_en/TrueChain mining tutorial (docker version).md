# TrueChain mining tutorial (docker version)

## install docker

ubuntu reference https://docs.docker.com/install/linux/docker-ce/ubuntu/.
Mac reference https://docs.docker.com/docker-for-mac/install/.    
Windows reference https://docs.docker.com/docker-for-windows/install/. 

## start docker
`
service docker start
`
## pull truechain image
`
docker pull registry.cn-hangzhou.aliyuncs.com/truechain_space/truechain_image:latest
`
## change image tag to getrue
`
docker tag registry.cn-hangzhou.aliyuncs.com/truechain_space/truechain_image getrue
`
## create config file

1.create truechain folder
`
 mkdir truechain
`

2.enter truechain folder
`
 cd truechain
`

3.create config file, configure by your own command.

 1) participate in committee election
`
vi config
`
 copy the below content to the config file

```
[Etrue]
EnableElection = true  
Host = "124.251.110.179"//change this ip address to your local Internet IPv4 address
Etherbase = "0x58f5e2c7cf723c0e76ca1bc236bed39d2d82001d"//this address is mining address, please pay attention to changing the address to your own account address.
```

2）not participate in committee election
`
 vi config
 `
 copy the below content to the config file

```
[Etrue]   
Host = "124.251.110.177"//change this ip address to your local Internet IPv4 address
Etherbase = "0x58f5e2c7cf723c0e76ca1bc236bed39d2d82001d"//this address is mining address, please pay attention to changing the address to your own account address.
  

```

## run node's auto-mining process
run mining command, select below stpes depend on your command.

### mine as the committee election node

1.enter truechain folder, run auto-mining process depend on node's command.

1）only mine fruit

```
docker run -v $PWD:/truechain-engineering-code -it -p 30311:30311 -p 30310:30310 -p 30303:30303 -p 9215:9215 getrue --datadir /truechain-engineering-code/data --config /truechain-engineering-code/config --testnet --mine  --minefruit --election console
```
![](https://github.com/truechain/wiki/blob/master/developer/img/TrueChain_mining_procedure_02.jpg)

![](https://github.com/truechain/wiki/blob/master/developer/img/TrueChain_mining_procedure_01.jpg)


2）mine fruit and block

```
docker run -v $PWD:/truechain-engineering-code -it -p 30311:30311 -p 30310:30310 -p 30303:30303 -p 9215:9215 getrue --datadir /truechain-engineering-code/data --config /truechain-engineering-code/config --testnet --mine --election console
```
2.command analysis

-p : mapping the container's port to the host
--datadir : data storage folder
--minefruit : specify only mine fruit
--election : this node participate in committee election


### mine as the node which not participate in committee election

1.enter truechain folder, run auto-mining process depend on node's command.

1）only mine fruit

```
docker run -v $PWD:/truechain-engineering-code -it -p 30311:30311 -p 30310:30310 -p 30303:30303 -p 9215:9215 getrue --datadir /truechain-engineering-code/data --config /truechain-engineering-code/config --testnet --mine --minefruit console
```
![](https://github.com/truechain/wiki/blob/master/developer/img/TrueChain_mining_procedure_03.jpg)

![](https://github.com/truechain/wiki/blob/master/developer/img/TrueChain_mining_procedure_01.jpg)


2）mine fruit and block

```
docker run -v $PWD:/truechain-engineering-code -it -p 30311:30311 -p 30310:30310 -p 30303:30303 -p 9215:9215 getrue --datadir /truechain-engineering-code/data --config /truechain-engineering-code/config --testnet --mine console
```

2.command analysis

-p : mapping the container's port to the host
--datadir : data storage folder
--minefruit : specify only mine fruit
--election : this node participate in committee election


## enter node's console

1.query mining's coinbase address : etrue.coinbase

2.query account's balance : etrue.getBalance("account address")//account address is your own mining address

3.stop mining : miner.stop()

4.console restart mining, you can add number in the bracket, which means the number of the threads: miner.start()

5.exit console and exit program：exit
