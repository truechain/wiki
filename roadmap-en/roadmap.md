# trueChain RoadMap
###### edit by happyfromtbq
## Main components：
<p>So we're developing a hybrid consensus that works on the following notions:</p>
1. A permissioned BFT that runs on a few nodes in the permissionless POW based network.<br>
2. The BFT committee is a rotating one, preventing corruption in a timely manner<br>
3. The BFT committee is responsible for transaction validation, and the POW nodes are only responsible
for choosing/electing the committee members according to some rules we've derived and re-defined, as
mentioned in the yellow paper!<br>
4. The new permissioned VM, we've surmised, could be inspired from the EVM, but with different block
states and transaction execution flows<br>
5. The contemporary permissionless EVM in the POW chain co-exists with this new permissioned VM
(which we call Truechain Virtual Machine - TVM)<br>
6. The TVM would be the one, as per current discussions, to validate any transaction, while EVM would
need to be re-worked to not really mine for consensus, but for election of BFT and maybe lightweight
wallet transactions (the part we'd be happy to discuss with you in design)<br>
7. The incentivation model needs to be re-worked such that it is based off of TVM, and also, that we
somehow still reward the miners in POW chain.<br>
8. We would eventually support sharding for the BFT committee nodes, for scalability.<br>
9. A compensation infrastructure, which accounts node spec non-uniformity (as in different
CPU/memory/network bandwidth in the node pool), would eventually be a part of the consensus, thus
speeding up transactions.<br>
10. The smart contracts execution would thus only happen in TVM (BFT node) and we do think the
deployment should be supported from POW nodes, thus raising a question about state replication in a
hybrid setting.<br>

**Notes：We might need changes in solidity as well as the current Mist wallet in Ethereum, which is what we
chose as our framework.<br>**

### Timeline：<br>
#### TODO:add details for specs/pseudo code specifics in timeline<br>

<table border=0 cellpadding=0 cellspacing=0 width=635 style='border-collapse:
 collapse;table-layout:fixed;width:477pt'>
 <col width=50 style='mso-width-source:userset;mso-width-alt:1600;width:38pt'>
 <col width=47 style='mso-width-source:userset;mso-width-alt:1504;width:35pt'>
 <col width=115 style='mso-width-source:userset;mso-width-alt:3680;width:86pt'>
 <col width=137 style='mso-width-source:userset;mso-width-alt:4384;width:103pt'>
 <col width=286 style='mso-width-source:userset;mso-width-alt:9152;width:215pt'>
 <tr height=38 style='height:28.5pt'>
  <td height=38 width=50 style='height:28.5pt;width:38pt'>Quarter</td>
  <td class=xl69 width=47 style='width:35pt'>Date (onwards or exact)</td>
  <td width=115 style='width:86pt'>Phases</td>
  <td width=137 style='width:103pt'>Details</td>
  <td width=286 style='width:215pt'>Remark</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'>Q1/18</td>
  <td></td>
  <td>Project.init()</td>
  <td>V&lt;3 Python</td>
  <td>V also&lt;3 GoLang</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'>Q1/18</td>
  <td></td>
  <td>Whitepaper release</td>
  <td></td>
  <td class=xl65><a href="https://www.truechain.pro/EnTruechain.pdf"
  target="_parent">https://www.truechain.pro/EnTruechain.pdf</a></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 style='height:28.5pt'>Q2/18</td>
  <td></td>
  <td>Yellow Paper - First Draft </td>
  <td class=xl69 width=137 style='width:103pt'>Hybrid consensus on arXiv</td>
  <td class=xl65><a href="https://arxiv.org/abs/1805.01457" target="_parent">https://arxiv.org/abs/1805.01457</a></td>
 </tr>
 <tr height=55 style='mso-height-source:userset;height:41.25pt'>
  <td rowspan=41 height=1581 style='height:1185.75pt'></td>
  <td colspan=2 style='mso-ignore:colspan'></td>
  <td class=xl67>BasicTVM</td>
  <td class=xl66>EVM (POW) +TVM(BFT)==&gt;PBFT+POW on single node</td>
 </tr>
 <tr height=59 style='mso-height-source:userset;height:44.25pt'>
  <td height=59 colspan=2 style='height:44.25pt;mso-ignore:colspan'></td>
  <td class=xl67>Incentivization scheme </td>
  <td class=xl70 width=286 style='width:215pt'>Develop an incentivisation scheme considering a different Txn fee model for the new hybrid virtual machines combination.</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>Yellow Paper TIP - 1</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=23 style='mso-height-source:userset;height:17.25pt'>
  <td height=23 colspan=2 style='height:17.25pt;mso-ignore:colspan'></td>
  <td class=xl68>Update arXiv paper</td>
  <td></td>
 </tr>
 <tr height=23 style='mso-height-source:userset;height:17.25pt'>
  <td height=23 colspan=2 style='height:17.25pt;mso-ignore:colspan'></td>
  <td class=xl68 colspan=2 style='mso-ignore:colspan'>hybrid consensus pseudo code release</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 colspan=2 style='height:57.0pt;mso-ignore:colspan'></td>
  <td class=xl70 width=137 style='width:103pt'><br>
    decoupling and coupling/rearrange ethereum to fit the consensus</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>adjust ethereum GAS token economy model </td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>Coding</td>
  <td colspan=2 style='mso-ignore:colspan'>Implement hybrid consensus codebase </td>
 </tr>
 <tr height=63 style='mso-height-source:userset;height:47.25pt'>
  <td height=63 style='height:47.25pt'></td>
  <td class=xl69 width=115 style='width:86pt'>(to be reordered,shortly and broken down further according to chronological importance and dependencies)</td>
  <td></td>
  <td class=xl69 width=286 style='width:215pt'>Node init：<br>
    1. forkVirtualNodeBFT()<br>
    2. SpawnBFTnode()</td>
 </tr>
 <tr height=133 style='height:99.75pt'>
  <td height=133 colspan=3 style='height:99.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Validation:<br>
    1. onChainValidation()<br>
    a. validateFromPOW()<br>
    b. FetchTxnHistory()<br>
    2. reElect()<br>
    3. checkTxnOrder()<br>
    4. updateSnailchain()</td>
 </tr>
 <tr height=57 style='height:42.75pt'>
  <td height=57 colspan=3 style='height:42.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>For view change and node corruption detection/complaing:<br>
    1. ViewChange()<br>
    2. complainToSnailChain()</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 colspan=3 style='height:57.0pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>For signatures:<br>
    1. keygen()<br>
    2. SignLog()<br>
    3. Keccak256/ECDSA wrappers</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 colspan=3 style='height:57.0pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Logging:<br>
    1. dailyLogOutput()<br>
    2. CreateLOG()<br>
    3. createTxTuple()</td>
 </tr>
 <tr height=133 style='height:99.75pt'>
  <td height=133 colspan=3 style='height:99.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Transaction pool:<br>
    1. mempoolSubprotocol()<br>
    a. propose()<br>
    b. query()<br>
    c. others..<br>
    2. DailyOffchainProtocol()<br>
    3.</td>
 </tr>
 <tr height=57 style='height:42.75pt'>
  <td height=57 colspan=3 style='height:42.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Election and VRF:<br>
    1. SeedSelectorVRF()<br>
    2. proposeStakeTransactions()</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=3 style='height:14.25pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Snapshots:</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=3 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>1. createSnapShot()</td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=3 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Communication:<br>
    1. gossipTxn()</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=3 style='height:14.25pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Sharding and Compensation infrastructure:</td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=3 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>Raincheck for basic tests - Integration,functional and unit</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>Geth re-engineering</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>Infra monitoring/devops</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>Security review</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>Server security hardening</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>Mist / Wallet re-engineering</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>frontend</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>Release design documents for smart contract execution
</td>
  <td class=xl68>publicly on github/elsewhere</td>
 </tr>
 <tr height=28 style='mso-height-source:userset;height:21.0pt'>
  <td height=28 colspan=2 style='height:21.0pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'><br>
    Custom Dapps</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td colspan=2 style='mso-ignore:colspan'>Experimental release - r1 - v0.? </td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td colspan=2 style='mso-ignore:colspan'>Developer Documentation for consensus</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=4 style='height:14.25pt;mso-ignore:colspan'></td>
 </tr>
 <tr height=57 style='height:42.75pt'>
  <td height=57 style='height:42.75pt'></td>
  <td class=xl69 width=115 style='width:86pt'>SCALE LAB: Setup public/private/hybrid cloud infra</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>Establish internal scale lab across global regions</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>Simulation and Testing</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>Testbed preparation</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>simulation basic for server load/cost</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>Adjustments, bug smashes and performance improvements
</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td colspan=2 style='mso-ignore:colspan'>Experimental release-r2-v0.?</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>TESTNET</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>Adjustments, bug smashes and performance improvements</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td colspan=2 style='mso-ignore:colspan'>Experimental release-r3-v0.?</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'>Q3/18</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
  <td>Dapps dev on ethereum</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td rowspan=4 height=152 style='height:114.0pt'></td>
  <td colspan=2 style='mso-ignore:colspan'></td>
  <td>Main Net</td>
  <td></td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 style='height:57.0pt'></td>
  <td class=xl69 width=115 style='width:86pt'>Requests for Feature Enhancements (RFEs) and TIPs (Truechain Improvement Proposals)</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>X86 considerations</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 style='height:28.5pt'></td>
  <td class=xl69 width=115 style='width:86pt'>And other future plans..</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <![if supportMisalignedColumns]>
 <tr height=0 style='display:none'>
  <td width=50 style='width:38pt'></td>
  <td width=47 style='width:35pt'></td>
  <td width=115 style='width:86pt'></td>
  <td width=137 style='width:103pt'></td>
  <td width=286 style='width:215pt'></td>
 </tr>
 <![endif]>
</table>
  <p style="text-align=right">January, February and March (Q1)</p>
  <p style="text-align=right">April, May and June (Q2)</p>
  <p style="text-align=right">July, August and September (Q3)</p>
  <p style="text-align=right">October, November and December (Q4)</p>
  
  ### 核心共识：<br>
  #### 在PBFT链funcs：<br>
  
  <P>阶段一：</p><br>
  
  *更新: 进一步细分*<br>
  
<table border=0 cellpadding=0 cellspacing=0 width=598 style='border-collapse:
 collapse;table-layout:fixed;width:448pt'>
 <col width=139 style='mso-width-source:userset;mso-width-alt:4448;width:104pt'>
 <col width=459 style='mso-width-source:userset;mso-width-alt:14688;width:344pt'>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl65 width=139 style='height:15.0pt;width:104pt'>方法</td>
  <td class=xl66 width=459 style='width:344pt'>功能</td>
 </tr>
 <tr height=62 style='mso-height-source:userset;height:46.5pt'>
  <td height=62 class=xl67 width=139 style='height:46.5pt;width:104pt'>dailyLogOutput()</td>
  <td class=xl68 width=459 style='width:344pt'>将日志输出到done（_，_）然后发送到非成员节点</td>
 </tr>
 <tr height=61 style='mso-height-source:userset;height:45.75pt'>
  <td height=61 class=xl67 width=139 style='height:45.75pt;width:104pt'>CreateLOG()</td>
  <td class=xl68 width=459 style='width:344pt'>根据所有其他节点的日志为每日日志创建元组，跟踪签名日志由非委员会成员负责</td>
 </tr>
 <tr height=71 style='mso-height-source:userset;height:53.25pt'>
  <td height=71 class=xl67 width=139 style='height:53.25pt;width:104pt'>mempoolSubprotocol()</td>
  <td class=xl68 width=459 style='width:344pt'>使用Union集合来跟踪传入交易,支持查询方法返回确认的交易.</td>
 </tr>
 <tr height=62 style='mso-height-source:userset;height:46.5pt'>
  <td height=62 class=xl67 width=139 style='height:46.5pt;width:104pt'>DailyOffchainProtocol()</td>
  <td class=xl68 width=459 style='width:344pt'>进行有条件的选举委员会成员,<font class="font5">
  </font><font class="font6">基于节点是否是BFT成员。</font></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl67 width=139 style='height:15.0pt;width:104pt'>keygen()</td>
  <td class=xl68 width=459 style='width:344pt'>　</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl67 width=139 style='height:15.0pt;width:104pt'>forkVirtualNodeBFT()</td>
  <td class=xl68 width=459 style='width:344pt'>　</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl67 width=139 style='height:15.0pt;width:104pt'>　</td>
  <td class=xl68 width=459 style='width:344pt'>一个历史日志</td>
 </tr>
 <tr height=35 style='height:26.25pt'>
  <td height=35 class=xl67 width=139 style='height:26.25pt;width:104pt'>complainToSnailChain()</td>
  <td class=xl68 width=459 style='width:344pt'>触发器<font class="font7">re_elect()</font></td>
 </tr>
 <tr height=57 style='mso-height-source:userset;height:42.75pt'>
  <td height=57 class=xl67 width=139 style='height:42.75pt;width:104pt'>ViewChange()</td>
  <td class=xl68 width=459 style='width:344pt'>触发viewchange，并反过来，触发complainToSnailChain（）</td>
 </tr>
 <tr height=52 style='mso-height-source:userset;height:39.0pt'>
  <td height=52 class=xl67 width=139 style='height:39.0pt;width:104pt'>createTxTuple()</td>
  <td class=xl68 width=459 style='width:344pt'>（R，l，tx）R - 当前日期，l是随机数（当天txn的序列）</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl67 width=139 style='height:15.0pt;width:104pt'>SeedSelectorVRF()</td>
  <td class=xl68 width=459 style='width:344pt'>　</td>
 </tr>
 <tr height=54 style='mso-height-source:userset;height:40.5pt'>
  <td height=54 class=xl67 width=139 style='height:40.5pt;width:104pt'>gossipTx()</td>
  <td class=xl68 width=459 style='width:344pt'>正直的委员会成员然后将签名的元组闲聊到网络上</td>
 </tr>
 <tr height=40 style='mso-height-source:userset;height:30.0pt'>
  <td height=40 class=xl67 width=139 style='height:30.0pt;width:104pt'>createSnapShot()</td>
  <td class=xl68 width=459 style='width:344pt'>创建一个世界状态快照</td>
 </tr>
 <![if supportMisalignedColumns]>
 <tr height=0 style='display:none'>
  <td width=139 style='width:104pt'></td>
  <td width=459 style='width:344pt'></td>
 </tr>
 <![endif]>
</table>

<p>阶段二：</p><br>
1.时间戳验证（初链黄皮书图一）<br>
2.create_shard() and speculative_transaction()（初链黄皮书图二）POW链中的funcs<br>

#### POW链中的funcs<br>

<p>阶段1：fPOW（果实链）</P>
*re_elect()  - POW挖掘功能，使用[Theta,LRU,stake_in/out]( snailchain内部块的数量)，基于以下之一：<br>
-由于腐败导致视图更改<br>
-物理时间戳限制引发的第K天触发<br>
-节点应该是DailyBFT委员会的过期Tstamp时间间隔会员<br>
- update_snailchain()从N个PBFT节点接收done（_，_）散列，并由每个节点执行，然后将链上的节点写入到snailchain总账中。<br>

### 钱包工程<br>
#### 模拟<br>

<p>确定以下内容</p>
1.	分片大小的上下限<br>
2.	Lambda安全参数边界<br>
3.	Theta手动参数<br>
<p>测试系列</p>
1.	检查一致性和活性<br>
2.	检查安全性<br>
3.	腐败检查<br>

### 智能合约重新设计/可靠性<br>
### TVM / WASM<br>

<P>文档</p><br>
<P>附录</p><br>
<P>符号</p><br>
<table border=0 cellpadding=0 cellspacing=0 width=604 style='border-collapse:
 collapse;table-layout:fixed;width:453pt'>
 <col width=96 style='mso-width-source:userset;mso-width-alt:3072;width:72pt'>
 <col width=508 style='mso-width-source:userset;mso-width-alt:16256;width:381pt'>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl65 width=96 style='height:15.0pt;width:72pt'>变量</td>
  <td class=xl66 width=508 style='width:381pt'>意义</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl69 width=96 style='height:15.0pt;width:72pt'>tx</td>
  <td class=xl68 width=508 style='width:381pt'>交易</td>
 </tr>
 <tr height=37 style='mso-height-source:userset;height:27.75pt'>
  <td height=37 class=xl69 width=96 style='height:27.75pt;width:72pt'>l</td>
  <td class=xl68 width=508 style='width:381pt'>每个BFT实例内的事务的序列号</td>
 </tr>
 <tr height=57 style='mso-height-source:userset;height:42.75pt'>
  <td height=57 class=xl69 width=96 style='height:42.75pt;width:72pt'>LOG</td>
  <td class=xl68 width=508 style='width:381pt'>每个节点输出的完全有序的日志，LOG总是按顺序填充</td>
 </tr>
 <tr height=48 style='mso-height-source:userset;height:36.0pt'>
  <td height=48 class=xl69 width=96 style='height:36.0pt;width:72pt'>log</td>
  <td class=xl68 width=508 style='width:381pt'>一个BFT实例的日志，称为日志</td>
 </tr>
 <tr height=55 style='mso-height-source:userset;height:41.25pt'>
  <td height=55 class=xl70 width=96 style='height:41.25pt;width:72pt'>log[l :
  l′]</td>
  <td class=xl68 width=508 style='width:381pt'>在日志中编号为l到l'的交易</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl70 width=96 style='height:15.0pt;width:72pt'>log[: l]</td>
  <td class=xl71 width=508 style='width:381pt'>log[1 : l]</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl70 width=96 style='height:15.0pt;width:72pt'>λ</td>
  <td class=xl68 width=508 style='width:381pt'>安全参数</td>
 </tr>
 <tr height=34 style='mso-height-source:userset;height:25.5pt'>
  <td height=34 class=xl70 width=96 style='height:25.5pt;width:72pt'>α</td>
  <td class=xl68 width=508 style='width:381pt'>对方的哈希片段</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl70 width=96 style='height:15.0pt;width:72pt'>δ</td>
  <td class=xl68 width=508 style='width:381pt'>网络最大实际时延</td>
 </tr>
 <tr height=49 style='mso-height-source:userset;height:36.75pt'>
  <td height=49 class=xl70 width=96 style='height:36.75pt;width:72pt'>Δ</td>
  <td class=xl68 width=508 style='width:381pt'>网络延迟的上界（通常松散）</td>
 </tr>
 <tr height=21 style='height:15.75pt'>
  <td height=21 class=xl70 width=96 style='height:15.75pt;width:72pt'>csize</td>
  <td class=xl68 width=508 style='width:381pt'>委员会大小，我们的协议集Csisie: =<font
  class="font9">λ</font></td>
 </tr>
 <tr height=21 style='height:15.75pt'>
  <td height=21 class=xl70 width=96 style='height:15.75pt;width:72pt'>th</td>
  <td class=xl72 width=508 style='width:381pt'>th := <font class="font10">&#8968;</font><font
  class="font9">csize/3</font><font class="font10">&#8969;</font><font class="font9">,</font><font
  class="font6">一个阈值</font></td>
 </tr>
 <tr height=35 style='height:26.25pt'>
  <td height=35 class=xl70 width=96 style='height:26.25pt;width:72pt'>lower(R),
  upper(R)</td>
  <td class=xl72 width=508 style='width:381pt'>lower(R) := (R &#8722; 1)csize + 1,
  upper(R) := R · csize</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl70 width=96 style='height:15.0pt;width:72pt'>chain</td>
  <td class=xl68 width=508 style='width:381pt'>底层SnayLink协议中的节点局部链</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl70 width=96 style='height:15.0pt;width:72pt'>chain[:
  &#8722;λ]</td>
  <td class=xl68 width=508 style='width:381pt'>除了节点的局部链的最后一个块</td>
 </tr>
 <tr height=90 style='mso-height-source:userset;height:67.5pt'>
  <td height=90 class=xl70 width=96 style='height:67.5pt;width:72pt'>MinersOf(chain[s
  : t])</td>
  <td class=xl68 width=508 style='width:381pt'>在链[s:t]中挖掘每个块的公共密钥。可能有几个公钥属于同一个节点</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl70 width=96 style='height:15.0pt;width:72pt'>{msg}pk&#8722;1</td>
  <td class=xl68 width=508 style='width:381pt'>签名消息MSG，其验证密钥是PK</td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl70 width=96 style='height:15.0pt;width:72pt'>Tbft</td>
  <td class=xl68 width=508 style='width:381pt'>基础BFT方案的活性参数</td>
 </tr>
 <![if supportMisalignedColumns]>
 <tr height=0 style='display:none'>
  <td width=96 style='width:72pt'></td>
  <td width=508 style='width:381pt'></td>
 </tr>
 <![endif]>
</table>



