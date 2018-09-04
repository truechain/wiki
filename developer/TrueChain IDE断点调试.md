作者：Austin. 审阅：rectinajh

# TrueChain IDE断点调试

## 实验环境
- macOS 10.13.6 
- go version go1.9.3 darwin/amd6
- goland 2018.2.1
- truechain-fpow分支

## 代码下载
    git clone -b fpow ow https://github.com/truechain/truechain-engineering-code.git
    
## GoLand下载

    根据自身操作系统选择对应的GoLand版本，可以选择30天试用或者购买正版授权
    
    https://www.jetbrains.com/go/download

## GoLand环境配置

### 配置GoRoot
![](http://ww1.sinaimg.cn/large/c0e05d1cgy1fudwddnv5bj20s00ja3zy.jpg)

### 配置GoPath
![](http://ww1.sinaimg.cn/large/c0e05d1cgy1fudwfl8hjnj20s50j6mz7.jpg)


## 导入代码
    File >> Open ${ProjectPath}

## 代码编译
    
```
    # make之后会在build/bin下生成getrue可执行文件
    $ make getrue
    
    # 创建创世区块
    $ build/bin/getrue init cmd/getrue/genesis.json
    
    # 测试挖矿命令
    $ build/bin/getrue --nodiscover --mine --etherbase=0x8a45d70f096d3581866ed27a5017a4eeec0db2a1
       
        INFO [08-18|15:57:37.941] Maximum peer count                       ETH=25 LES=0 total=25
        INFO [08-18|15:57:37.952] Starting peer-to-peer node               instance=getrue/v1.8.12-stable-f132ca4b/darwin-amd64/go1.9.3
        INFO [08-18|15:57:37.953] Allocated cache and file handles         database=/Users/hongqianli/Library/Truechain/getrue/chaindata cache=768 handles=1024
        INFO [08-18|15:57:37.988] Initialised chain configuration          config="{ChainID: 10 Homestead: 0 DAO: <nil> DAOSupport: false EIP150: <nil> EIP155: 0 EIP158: 0 Byzantium: <nil> Constantinople: <nil> Engine: unknown}"
        INFO [08-18|15:57:37.988] Initialised chain configuration          config="{ChainID: 10 Homestead: 0 DAO: <nil> DAOSupport: false EIP150: <nil> EIP155: 0 EIP158: 0 Byzantium: <nil> Constantinople: <nil> Engine: unknown}"
        INFO [08-18|15:57:37.988] Disk storage enabled for ethash caches   dir=/Users/hongqianli/Library/Truechain/getrue/minerva count=3
        INFO [08-18|15:57:37.988] Disk storage enabled for ethash DAGs     dir=/Users/hongqianli/.minerva                         count=2
        INFO [08-18|15:57:37.989] Initialising Truechain protocol          versions="[63 62]" network=1
        INFO [08-18|15:57:38.000] Loaded most recent local header          number=0 hash=bc72c2…e31089
        INFO [08-18|15:57:38.000] Loaded most recent local full block      number=0 hash=bc72c2…e31089
        INFO [08-18|15:57:38.000] Loaded most recent local fast block      number=0 hash=bc72c2…e31089
        INFO [08-18|15:57:38.002] Loaded most recent local header          number=0 hash=fd3ea6…f3e803 td=512
        INFO [08-18|15:57:38.002] Loaded most recent local full block      number=0 hash=fd3ea6…f3e803 td=512
        INFO [08-18|15:57:38.009] Loaded local transaction journal         transactions=0 dropped=0
        INFO [08-18|15:57:38.009] Regenerated local transaction journal    transactions=0 accounts=0
        INFO [08-18|15:57:38.013] Starting P2P networking 
        INFO [08-18|15:57:38.016] RLPx listener up                         self="enode://405362d6ebb08430eda891d1582bb0bd6c31bdb72875dbb4b4ea7c2fb5a3fcd6aae7bef6465735dd0365e4f21e24ea87e8f7197a28c7d69c54aca0094c590f88@[::]:30303?discport=0"
        INFO [08-18|15:57:38.031] IPC endpoint opened                      url=/Users/hongqianli/Library/Truechain/geth.ipc
        INFO [08-18|15:57:38.032] Transaction pool price threshold updated price=18000000000
        INFO [08-18|15:57:38.032] Starting mining operation 
        ......
```
    
## DEBUG挖矿代码

![](http://ww1.sinaimg.cn/large/c0e05d1cgy1fudx4zpp5yj20u50mdaeq.jpg)

#### 在感兴趣的代码位置打上断点，就可以愉快的开始断点调试啦。
![](http://ww1.sinaimg.cn/large/c0e05d1cgy1fudy58t83ej20zr0p6aji.jpg)


----
