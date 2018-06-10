# trueChain 里程碑
###### 翻译者：金燕琪
## 主要内容：
<p>因此，我们正在制定一种混合共识机制，它的运行主要遵循以下几点：</p>
1. 已被许可的BFT是在基于POW共识机制的网络中的几个节点上运行的。<br>
2. BFT委员会是一个轮值委员会，能够有效地防止腐败现象的发生。<br>
3. BFT委员会负责交易验证，而POW节点只负责根据我们得出和重新定义在以太坊黄皮书中提到的一些规则来选择或者选举委员会成员！<br>
4. 据猜测，新许可的虚拟机（VM）灵感是源自以太坊虚拟机（EVM）。但是它又有不同于EVM的区块状态和事物执行流程。<br>
5. 当前，POW链中的无许可以太坊虚拟机和新的许可虚拟机共存（这种虚拟机被称为初链虚拟机-TVM）。<br>
6. 根据当前的讨论，初链虚拟机（TVM）将成为验证任何交易的一种方式，而EVM需要重新工作，不是为了共识而采取行动，而是轻量级钱包交易的BFT选举。<br>
7. 这种激励模式，需要重新开展工作，使其基于TVM，也就是我们仍然以某种方式奖励POW链中的矿工。<br>
8. 我们最终会支持分享BFT委员会的节点，提高可扩展性。<br>
9. 补偿基础结构，如果节点规格不一致性（比如在节点池中不同的CPU /内存/网络带宽等）最终都会将成为共识的一部分，加快交易。<br>
10. 因此，智能合约的执行只会发生在TVM（BFT节点），我们确实认为在混合设置中应该从POW节点支持部署，从而引发关于状态复制的问题。<br>
**注意：我们可能需要改变稳固性以及以太坊目前的轻钱包，这正是我们把它作为框架的选择。<br>**
### 时间计划：<br>
#### TODO:在时间计划中添加规范或者伪代码的细节<br>
<table border=0 cellpadding=0 cellspacing=0 width=635 style='border-collapse:
 collapse;table-layout:fixed;width:477pt'>
 <col width=50 style='mso-width-source:userset;mso-width-alt:1600;width:38pt'>
 <col width=47 style='mso-width-source:userset;mso-width-alt:1504;width:35pt'>
 <col width=115 style='mso-width-source:userset;mso-width-alt:3680;width:86pt'>
 <col width=137 style='mso-width-source:userset;mso-width-alt:4384;width:103pt'>
 <col width=286 style='mso-width-source:userset;mso-width-alt:9152;width:215pt'>
 <tr height=38 style='height:28.5pt'>
  <td height=38 width=50 style='height:28.5pt;width:38pt'>章节</td>
  <td class=xl69 width=47 style='width:35pt'>时间(起点)</td>
  <td width=115 style='width:86pt'>阶段</td>
  <td width=137 style='width:103pt'>详细</td>
  <td width=286 style='width:215pt'>备注</td>
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
  <td>白皮书发布</td>
  <td></td>
  <td class=xl65><a href="https://www.truechain.pro/EnTruechain.pdf"
  target="_parent">https://www.truechain.pro/EnTruechain.pdf</a></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 style='height:28.5pt'>Q2/18</td>
  <td></td>
  <td>黄皮书第一草案</td>
  <td class=xl69 width=137 style='width:103pt'>混合共识文档收录在 arXiv上</td>
  <td class=xl65><a href="https://arxiv.org/abs/1805.01457" target="_parent">https://arxiv.org/abs/1805.01457</a></td>
 </tr>
 <tr height=55 style='mso-height-source:userset;height:41.25pt'>
  <td rowspan=41 height=1581 style='height:1185.75pt'></td>
  <td colspan=2 style='mso-ignore:colspan'></td>
  <td class=xl67>基本的TVM</td>
  <td class=xl66>EVM (POW) +TVM(BFT)==&gt;PBFT+POW在单个节点上</td>
 </tr>
 <tr height=59 style='mso-height-source:userset;height:44.25pt'>
  <td height=59 colspan=2 style='height:44.25pt;mso-ignore:colspan'></td>
  <td class=xl67>激励计划</td>
  <td class=xl70 width=286 style='width:215pt'>为新的虚拟机组合制定激励计划，考虑一个不同的Txn费用模型</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>黄皮书TIP-1</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=23 style='mso-height-source:userset;height:17.25pt'>
  <td height=23 colspan=2 style='height:17.25pt;mso-ignore:colspan'></td>
  <td class=xl68>更新arXiv上的论文</td>
  <td></td>
 </tr>
 <tr height=23 style='mso-height-source:userset;height:17.25pt'>
  <td height=23 colspan=2 style='height:17.25pt;mso-ignore:colspan'></td>
  <td class=xl68 colspan=2 style='mso-ignore:colspan'>混合共识伪代码发布</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 colspan=2 style='height:57.0pt;mso-ignore:colspan'></td>
  <td class=xl70 width=137 style='width:103pt'><br>
    去耦和耦合/重新排列以太坊来适应共识</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>调整以太坊Gas的经济模式</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>代码</td>
  <td colspan=2 style='mso-ignore:colspan'>实施混合共识代码库</td>
 </tr>
 <tr height=63 style='mso-height-source:userset;height:47.25pt'>
  <td height=63 style='height:47.25pt'></td>
  <td class=xl69 width=115 style='width:86pt'>根据时间的重要性和依赖，重新排序，很快又进一步细分</td>
  <td></td>
  <td class=xl69 width=286 style='width:215pt'>初始化节点：<span
  style='mso-spacerun:yes'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>1. forkVirtualNodeBFT()<br>
    2. SpawnBFTnode()</td>
 </tr>
 <tr height=133 style='height:99.75pt'>
  <td height=133 colspan=3 style='height:99.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>验证：<br>
    1. onChainValidation()<br>
    a. validateFromPOW()<br>
    b. FetchTxnHistory()<br>
    2. reElect()<br>
    3. checkTxnOrder()<br>
    4. updateSnailchain()</td>
 </tr>
 <tr height=57 style='height:42.75pt'>
  <td height=57 colspan=3 style='height:42.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>对于视图更改和节点损坏的检测/更改<br>
    1. ViewChange()<br>
    2. complainToSnailChain()</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 colspan=3 style='height:57.0pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>特征：<br>
    1. keygen()<br>
    2. SignLog()<br>
    3. Keccak256/ECDSA wrappers</td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 colspan=3 style='height:57.0pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>日志：<br>
    1. dailyLogOutput()<br>
    2. CreateLOG()<br>
    3. createTxTuple()</td>
 </tr>
 <tr height=133 style='height:99.75pt'>
  <td height=133 colspan=3 style='height:99.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>交易池:<br>
    1. mempoolSubprotocol()<br>
    a. propose()<br>
    b. query()<br>
    c. others..<br>
    2. DailyOffchainProtocol()<br>
    3.</td>
 </tr>
 <tr height=57 style='height:42.75pt'>
  <td height=57 colspan=3 style='height:42.75pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>选择和 VRF:<br>
    1. SeedSelectorVRF()<br>
    2. proposeStakeTransactions()</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=3 style='height:14.25pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>简要说明：</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=3 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>1. createSnapShot()</td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=3 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>交流：<br>
    1. gossipTxn()</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=3 style='height:14.25pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>分享和补偿基础措施</td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=3 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=286 style='width:215pt'>基本的测试：集成测试、功能测试、单元测试</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>工程再造</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>基础设施监控/建设</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>安全审查</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>服务器安全强化</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>轻量级钱包再造</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>前端</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>发布设计文档，用于智能合约执行</td>
  <td class=xl68>公开在github /其他地方</td>
 </tr>
 <tr height=28 style='mso-height-source:userset;height:21.0pt'>
  <td height=28 colspan=2 style='height:21.0pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'><br>
    自定义Dapps</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td colspan=2 style='mso-ignore:colspan'>实验版本-r1-v0.?</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td colspan=2 style='mso-ignore:colspan'>开发者文档达成共识</td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=4 style='height:14.25pt;mso-ignore:colspan'></td>
 </tr>
 <tr height=57 style='height:42.75pt'>
  <td height=57 style='height:42.75pt'></td>
  <td class=xl69 width=115 style='width:86pt'>规模实验：建立在公有、私有、云</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>在全球各地区，建立内部规模实验室</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>仿真和测试</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>实验准备</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>模拟基本服务器负荷/成本</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>调整，修复bug，性能改进</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td colspan=2 style='mso-ignore:colspan'>实验版本-r2-v0.?</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 colspan=2 style='height:14.25pt;mso-ignore:colspan'></td>
  <td>测试网</td>
  <td></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 colspan=2 style='height:28.5pt;mso-ignore:colspan'></td>
  <td class=xl69 width=137 style='width:103pt'>调整，修复bug，性能改进</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td colspan=2 style='mso-ignore:colspan'>实验版本-r3-v0.?</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'>Q3/18</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
  <td>在以太坊Dapps dev</td>
  <td></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td rowspan=4 height=152 style='height:114.0pt'></td>
  <td colspan=2 style='mso-ignore:colspan'></td>
  <td>主要网络</td>
  <td></td>
 </tr>
 <tr height=76 style='height:57.0pt'>
  <td height=76 style='height:57.0pt'></td>
  <td class=xl69 width=115 style='width:86pt'>特征请求、增强功能(RFES)和方法(TrueChain)，改进建议</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=19 style='height:14.25pt'>
  <td height=19 style='height:14.25pt'></td>
  <td>X86 平台</td>
  <td colspan=2 style='mso-ignore:colspan'></td>
 </tr>
 <tr height=38 style='height:28.5pt'>
  <td height=38 style='height:28.5pt'></td>
  <td class=xl69 width=115 style='width:86pt'>一些未来的发展规划</td>
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
  <p style="text-align=right">(Q1)1、2、3月</p>
  <p style="text-align=right">(Q2)4、5、6月</p>
  <p style="text-align=right">(Q3)7、8、9月</p>
  <p style="text-align=right">(Q4)10、11、12月</p>
  ###核心共识：<br>
  ####在PBFT链funcs：<br>
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
####POW链中的funcs<br>
<p>阶段1：fPOW（果实链）</P>
*re_elect()  - POW挖掘功能，使用[Theta,LRU,stake_in/out]( snailchain内部块的数量)，基于以下之一：<br>
-由于腐败导致视图更改<br>
-物理时间戳限制引发的第K天触发<br>
-节点应该是DailyBFT委员会的过期Tstamp时间间隔会员<br>
- update_snailchain()从N个PBFT节点接收done（_，_）散列，并由每个节点执行，然后将链上的节点写入到snailchain总账中。<br>
###钱包工程<br>
####模拟<br>
<p>确定以下内容</p>
1.	分片大小的上下限<br>
2.	Lambda安全参数边界<br>
3.	Theta手动参数<br>
<p>测试系列</p>
1.	检查一致性和活性<br>
2.	检查安全性<br>
3.	腐败检查<br>
###智能合约重新设计/可靠性<br>
###TVM / WASM<br>
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



