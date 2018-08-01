# True链开发快速入门（windows）

如果你想快速入门true链开发，可以阅读此文档。它将告诉你“what?”, “how?” and “why?” 的问题。它包括了true链介绍，安装的过程。然后我们创建你的创始块，并进行挖矿。

## 1 ture链介绍
### 1.1 背景：
去中心化的最终目的，是打造自由平等的互信社会。经过以太坊等公链项目的努力，公链开发已取得显著进步，数字货币和智能合约的商业化使用成为可能。在此之前，部分私有链与联盟链已成功落地应用，让人们对公链开发者们产生了更大期望，希望商用公链的到来可以解决数字支付、智能合约等成本较高的现实问题。然而，公链之所以区别于私有链与联盟链，核心正在于其共识机制的设计需要保证互不相识、不断扩充的节点能通过技术手段彼此间建立信任，并集合算力完成任务，保障公链稳定、高效地运行。现有的共识机制设计大多难于在安全性与性能间实现良好平衡，正如分散决策与行政效率间的两难取舍，困扰住了公链开发者们。

### 1.2我们的主要目标：
打造承载未来商用去中心化应用的公链，是时代的需求，也是初链的梦想。基于混合共识机制设计的初链，旨在为社会提供高速点对点通信、价值传输以及智能合约基础设施。
初链希望在保持去中心化本质的同时，尽可能提升效率。POW 与 PBFT 相结合的混合共识机制设想的出现，为问题的解决带来了一丝曙光。
初链的技术架构自下而上共分为三层：混合共识机制、智能合约、合约抽象。具体设计请参阅初链技术黄皮书或 github 开源代码 https://github.com/truechain。


___

## 2. 系统需求
windows/ios/linux 均支持，这篇属于windows的入门。

### 2.1 环境
true链需要 Golang 和 gcc ，所有代码托管于github .

#### 安装go : 
版本要求为1.7+ ，我们建议你下载最新的稳定版本，[戳我](https://golangtc.com/download)。
安装成功后设置GOPATH GOROOT PATH，
比如安装在c:\Go中，c:\Go\bin添加到PATH，c:\GoGOROOT，GOPATH设置为d:\gopath 
完成后在cmd中执行go version ,如果显示版本即成功。


#### 安装git :
true链的代码完全开源，任何支持github的git版本均可以使用，我们建议你下载最新的版本,[戳我](https://git-scm.com/downloads)。
完成后在cmd中执行git --version ,如果显示版本即成功。



#### 安装gcc:
MinGW全称Minimalist GNU For Windows,是个精简的Windows平台C/C++、ADA及Fortran编译器，我们建议你下载最新的版本,[戳我](https://nuwen.net/mingw.html)。
安装成功后设置GPATH,比如安装在D:\mingw-w64，将D:\mingw-w64\mingw64\bin添加到path
完成后在cmd中执行gcc -v ,如果显示版本即成功。



### 2.2 IDE
理论上可以使用任何支持go的IDE，但是我们推荐vscode和goland进行开发和调试。

Visual Studio Code ：一个运行于 Mac OS X、Windows和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器。
我们推荐使用最新版本,[戳我](https://code.visualstudio.com/Download)，第一次打开可安装中文插件和go插件。



### 2.3 调试工具
Dlv，也称为Delve，是Go语言的源码调试工具
安装直接执行下面命令即可
go get github.com/derekparker/delve/cmd/dlv

___

## 3 获取代码

依次在cmd中执行以下命令,其中$GOPATH为之前配置的工作路径，如果文件夹不存在请执行创建

cd $GOPATH\src\github.com\ethereum  

git clone https://github.com/truechain/truechain-fpow.git

ren  truechain-fpow go-ethereum

打开vscode，文件--打开文件夹--选择$GOPATH\src\github.com\ethereum\go-ethereum--确定

现在，true精妙的代码都展示在你面前了。

这时可能会有部分依赖需要下载，那我们分别执行go get 即可。

___

## 4 初始化创世区块
现在，要模拟一条链，第一步需要创建一个创世区块，让我们开始

### 4.1 找到cmd-geth-main.go,执行F5，会提示打开launch.json，类似如此：
```js
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {},
            "args": [],
            "showLog": true
        }
    ]
}
```

### 4.2 修改launch.json，
```js
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {
            },
            "args": ["init", "./genesis.json"],
            "showLog": true
        }
    ]
}
```

### 4.3 将genesis.json放入cmd -- geth 目录下
```js
{
  "config": {
    "chainId": 10,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "alloc":{
    "0x970e8128ab834e8eac17ab8e3812f010678cf791" : { "balance" : "90000000000000000000000"},
    "0x68f2517b6c597ede0ae7c0559cdd4a84fd08c928" : { "balance" : "10000000000000000000000"}
  },
  "coinbase"   : "0x0000000000000000000000000000000000000000",
  "difficulty" : "0x200",
  "extraData"  : "",
  "gasLimit"   : "0x2fefd8",
  "nonce"      : "0x0000000000000042",
  "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00"
}
```

### 4.4 打开main.go,执行F5，显示初始化成功


## 5 挖矿
### 5.1 修改launch.json，--nodiscover 用于保证私链。
```js
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "debug",
            "remotePath": "",
            "port": 2345,
            "host": "127.0.0.1",
            "program": "${fileDirname}",
            "env": {
            },
            "args":["--nodiscover", "--mine", "--etherbase", "8a45d70f096d3581866ed27a5017a4eeec0db2a1"],
            "showLog": true
        }
    ]
}
```

### 5.2 打开main.go,执行F5，日志会显示挖矿的进度
好了，现在可以开始加入true链的开发了。
