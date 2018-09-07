 # 安装系统环境
作者：大野   审阅:rectinajh
注：本文操作在MAC环境下。
##### 1.安装go环境（go需要1.7及以上版本） 
 1. mac 执行命令 brew install go 即可。
    遇到被墙问题，可以浏览器打开[https://studygolang.com/dl/golang/go1.10.3.darwin-amd64.pkg]() 下载，然后一步步安装即可。
 2. 配置GOPATH环境变量。依次执行以下命令：
    执行 cd ~
    执行 vi .bash_profile
    在 .bash_profile中插入一行自己的项目目录地址  export GOPATH=/
sers/edz/go
    执行 go env
    若输出结果中有GOPATH值与上面设置的相同，则表示已成功设置。如图
   
  ![1.jpg](https://upload-images.jianshu.io/upload_images/13652489-f4e8d3d22ad967af.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   
   
#2.配置C编译器
1. mac 端执行 brew  install  gcc
 
###编译源文件
  1. 下载项目源码 https://github.com/truechain/truechain-engineering-code
  2. 进入项目目录。进行编译。执行命令： make getrue 
  3. 编译完成后。getrue命令所在路径为 项目目录/build/bin/。如图
  4. 将getrue路径添加系统环境变量
 
![3.jpg](https://upload-images.jianshu.io/upload_images/13652489-b56bff21c1e18e8d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


 
###getrue命令

   getrue --help 查看命令帮助,如图
    
 
![4.jpg](https://upload-images.jianshu.io/upload_images/13652489-7cd8768c6447ed25.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    

###genesis.json
创建自己的测试网络。首先需要创建网络的创世状态，让所有节点知道并同意这个状态。
    创世状态（或创世区块）是一个小型的JSON文件。如下图

![8.jpg](https://upload-images.jianshu.io/upload_images/13652489-97ceff43d3260c81.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


    
    简单介绍一下这个genesis.json
    chainId    链的ID
    alloc      系统自带的两个地址及余额
    coinbase   矿工工号
    difficulty 挖矿难度
    extraData  扩展字段
    gasLimit   交易手续费
    nonce      随机字符串，用于挖矿
    mixhash    配合nonce进行挖矿
    parentHash 上一个区块的哈希
    timestamp  区块生成的时间
    
###搭建测试网络
  step1. 建立测试目录。例如Test
    
  step2. 引用源码中cmd/getrue中的genesis.json文件，文件的内容如下。

```
 {
  "config": {
    "chainId": 10,
    "homesteadBlock": 0,
    "eip155Block": 0,
    "eip158Block": 0
  },
  "alloc":{
    "0x970e8128ab834e8eac17ab8e3812f010678cf791" : { "balance" : 90000000000000000000000},
    "0x68f2517b6c597ede0ae7c0559cdd4a84fd08c928" : { "balance" : 10000000000000000000000}
  },
  "committee":[
    {
      "address": "0x76ea2f3a002431fede1141b660dbb75c26ba6d97",
      "publickey": "0x04044308742b61976de7344edb8662d6d10be1c477dd46e8e4c433c1288442a79183480894107299ff7b0706490f1fb9c9b7c9e62ae62d57bd84a1e469460d8ac1"
    },
    {
      "address": "0x831151b7eb8e650dc442cd623fbc6ae20279df85",
      "publickey": "0x04ae5b1e301e167f9676937a2733242429ce7eb5dd2ad9f354669bc10eff23015d9810d17c0c680a1178b2f7d9abd925d5b62c7a463d157aa2e3e121d2e266bfc6"
    },{
      "address": "0x1074f7deccf8c66efcd0106e034d3356b7db3f2c",
      "publickey": "0x04013151837b19e4b0e7402ac576e4352091892d82504450864fc9fd156ddf15d22014a0f6bf3c8f9c12d03e75f628736f0c76b72322be28e7b6f0220cf7f4f5fb"
    },{
      "address": "0xd985e9871d1be109af5a7f6407b1d6b686901fff",
      "publickey": "0x04e3e59c07b320b5d35d65917d50806e1ee99e3d5ed062ed24d3435f61a47d29fb2f2ebb322011c1d2941b4853ce2dc71e8c4af57b59bbf40db66f76c3c740d41b"
    }
  ]
,
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
     
step3. 创建创世区块。执行如下命令

 getrue --datadir Test init path/to/cmd/getrue/genesis.json
    
 --datadir用来指定目录。以上命令执行完成后，目录中多了getrue和keystore两个文件夹。getrue文件夹下用来存放该链的相关数据，keystore文件夹下存放的是该链的用户信息如图
![15351055.jpg](https://upload-images.jianshu.io/upload_images/13652489-378d526dcf600caa.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    
 
 step4. 启动测试链起始节点。执行如下命令
 getrue --datadir Test --nodiscover console 启动成功后，如下图
![6.jpg](https://upload-images.jianshu.io/upload_images/13652489-75e16c76e4e70212.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###使用测试网络
step1. 创建一个新的账户
```
> personal.newAccount()
Passphrase: 
Repeat passphrase: 
"0xce0f1ee66b1695e33d5e8cb9dd79525764d68a48"
> 
```
输入两遍密码，创建一个新的账户。接下来可以查看账户
```
> etrue.accounts
["0xce0f1ee66b1695e33d5e8cb9dd79525764d68a48"]
> 
```
step2. 查询账户余额
```
> etrue.getBalance(etrue.accounts[0])
0
> 
```
step3. 挖矿
启动挖矿
```
> miner.start(1)
INFO [09-02|23:42:27.187] Updated mining threads                   threads=1
INFO [09-02|23:42:27.188] Transaction pool price threshold updated price=18000000000
INFO [09-02|23:42:27.188] Etherbase automatically configured       address=0xCE0F1EE66B1695E33D5e8cb9Dd79525764D68A48
INFO [09-02|23:42:27.188] Starting mining operation 
null
> 
```
停止挖矿
```
miner.stop
```
###在该测试网络中添加其他节点
step1. 在其他主机上使用相同NetWorkID的genesis.json 初始化节点
step2. 在其他主机本地控制台，使用admin.nodeInfo.enode获取enode信息。
```
> admin.nodeInfo.enode
"enode://35184ea5262987880b3a97a38a0678e32d279a9438770940293f181f4790738011f93401f91ba6f6a51804fd1a76a47f45c991a88661c7207513e5d7a8a73318@[::]:30303?discport=0"
> 
```
step3.在自己节点控制台中执行admin.addPeer(),就可以连到其它主机的节点
```
> admin.addPeer("enode://35184ea5262987880b3a97a38a0678e32d279a9438770940293f181f4790738011f93401f91ba6f6a51804fd1a76a47f45c991a88661c7207513e5d7a8a73318@[::]:30303?discport=0")
```
step4.两个节点连接成功后，以后两个节点都会自动同步交易
