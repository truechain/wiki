# True链开发准备篇-环境搭建（windows） #
关于True链的开发环境，目前支持Windows，MacOS,Linux,本篇主要是针对在Windows环境上搭建作一个详细说明。
## 1 环境准备##
### 1.1 操作系统环境 ###
Windows 10 专业版
### 1.2 安装Go ###
**1.2.1 下载 并且 安装Go安装包（需要V1.7+以上版本）**

Goland的V1.10.3官网最新下载地址：[https://dl.google.com/go/go1.10.3.windows-amd64.msi](https://dl.google.com/go/go1.10.3.windows-amd64.msi) 【需要梯子】，最新的百度下载地址如下所示:

Windwos 32位系统 百度下载链接： [https://pan.baidu.com/s/1_uR-rEiOwDYPYcHwLCBZwA](https://pan.baidu.com/s/1_uR-rEiOwDYPYcHwLCBZwA)   密码：qdyg

Windows 64位系统 百度下载链接： [https://pan.baidu.com/s/1mKeVZ9mWVcWUE0JJeaQ40w](https://pan.baidu.com/s/1mKeVZ9mWVcWUE0JJeaQ40w)   密码：s91q

选择自己windows系统合适的版本， 这里我选择**go1.10.3.windows-amd64.msi**进行安装，下载下来后，双击点击文件进行安装，

大家可以自己自定义安装路径，这里安装的路径为**E:\Go** 。

**1.2.2 配置Go环境变量**

(1). 新建 变量名：GOBIN 变量值 ：**E:\go\bin**

(2). 新建 变量名：GOARCH 变量值：**386**

(3). 新建 变量名：GOOS 变量值：**windows**

(4). 新建 变量名： GOROOT 变量值：**E:\go**

(5). 编辑 Path 在Path的变量值的最后加上 **%GOBIN%**

如果是msi安装文件，Go语言的环境变量会自动设置好。**【亲测 win10通过msi安装后，无需配置环境变量】**

**1.2.3 验证Go安装环境是否成功**

打开Windows中的命令提示符（cmd.exe）执行命令：go version 
正常情况下会显示：
go version go1.10.3 windows/amd64

如果出现 “’go‘不是内部或外部命令，也不是可运行的程序或批处理文件”， 请参考“**1.2.2 配置Go环境变量**”重新设置一下，直到验证成功为止。

### 1.3 安装Git ###
选择最新Git下载：

64位git-2.18.0-64-bit.exe下载地址:[https://github.com/git-for-windows/git/releases/download/v2.18.0.windows.1/Git-2.18.0-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.18.0.windows.1/Git-2.18.0-64-bit.exe)

32位git-2.1.8.0-32-bit.exe下载地址：[https://github.com/git-for-windows/git/releases/download/v2.18.0.windows.1/Git-2.18.0-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.18.0.windows.1/Git-2.18.0-64-bit.exe)

下载完成后，双击安装，这里我选在64位git-2.18.0-64-bit.exe， 安装路径用户可以自定义，我的安装路径为**E:\Program Files\Git**，在该路径下面找到

git-bash.exe文件，双击打开，会弹出一个MinGW64的命令行窗口，就可以执行git相关命令了， 执行git --version ,如果显示版本即成功。

### 1.4 安装编译器GCC ###

由于要在windows上编译True链代码，我们需要安装一个编译器MinGW， MinGW全称Minimalist GNU For Windows,是个精简的Windows平台C/C++、ADA及Fortran编译器。

MinGW-w64-for32 and 64 bit Window 下载地址：[https://sourceforge.net/projects/mingw-w64/files/latest/download](https://sourceforge.net/projects/mingw-w64/files/latest/download)

下载完成后，就开始安装了，64位电脑安装配置如下所示：

![](http://file.knowle.cn/miGw.png)

选择自定义安装路径， 这边我安装在E:\mingw-w64\目录下面，下一步，安装可能需要几分钟，耐心等待安装完成。

安装成功后设置环境gcc编译的环境变量,比如安装在E:\mingw-w64，将E:\mingw-w64\mingw64\bin添加到path的最后面， 

完成后在cmd中执行gcc -v ,如果显示版本即成功。

### 1.5 安装IDE ###

关于选择IDE，推荐使用Visual Studio Code， 具体下载地址如下：

[https://code.visualstudio.com/Download](https://code.visualstudio.com/Download) （根据自己的系统自行选择是32bit还是64bit）

这里我选择64位的下载，具体安装步骤如下图所示：

![](http://file.knowle.cn/truechain/1.5.1.png)

![](http://file.knowle.cn/truechain/1.5.2.png)

![](http://file.knowle.cn/truechain/1.5.3.png)

![](http://file.knowle.cn/truechain/1.5.4.png)

![](http://file.knowle.cn/truechain/1.5.5.png)

接下来启动VS Code后，先安装一下中文语言包（如果习惯了英文界面，请忽略下面此步骤），安装界面如下图所示：

![](http://file.knowle.cn/truechain/VSCode_install.png)

点击安装并重启按钮即可，安装完成后自动重启，重启后看到中文菜单，即表示安装成功，中文IDE如下图所示：

![](http://file.knowle.cn/truechain/VsCode_Chinese_UI.png)

看到中文界面，是不是倍感情切，尤其是小白们。

接下来是安装VS Code Go插件， 主要涉及到VS Code的自动安装， 但是可能存在部分Go的插件安装失败的，情况，这个时候就需要手动下载插件的源代

码，通过go get 命令安装。

**一. VS Code 自动安装**

启动VS Code IDE， 编写一个hello.go的sample， 写完之后， IDE会推荐需要安装Go的相关插件，选择**Install all**即可。

 在左侧边栏处位置， 有个”扩展“菜单， 选中， 在”扩展“搜索中， 输入 ”Go“，如下图所示，显示正在安装Go插件。

查看插件安装详细信息， 选中“输出”选项，如下图所示：

![](http://file.knowle.cn/truechain/1.6.1.png)

详细安装情况，选择“输出”选项，如下图所示：

![](http://file.knowle.cn/truechain/1.6.3.png)

等待所有安装完成后， 可能会出现安装失败的情况，如下图所示：

这些失败的库，不是没有下载下来，而是以来的文件在go官网上，导致失败。以下为解决办法：

![](http://file.knowle.cn/truechain/1.6.6.png)

1、在%GOPATH%\src\ 目录下，建立golang.org 文件夹，并再新建x文件夹。  目录为 "%GOPATH\src\golang.org\x\"

2、完成目录切换后，开始下载插件包：
git clone https://github.com/golang/tools.git tools

3、执行完以后，会多一个tools文件夹。

因为主要是gopkgs有goint 2个插件没有安装成功。

我通过cmd控制台， 找到之前环境变量配置的GoPath的安装目录， 我的目录是 **C:\Users\Administrator\go**，手动下载源文件，放到相应的目录，具体操作如下：

git clone https://github.com/uudashr/gopkgs.git

go get -u github.com/gopkgs/cmd/gopkgs

git clone https://github.com/golang/lint.git

go get -u github.com/lint/golint

如果上面错作没有报错，表示之前自动安装失败的2个插件手动安装成功，具体查看$GoPath\bin 目录，检测文件是否安装完成，如下图所示：

![](http://file.knowle.cn/truechain/1.6.7.png)

![](http://file.knowle.cn/truechain/1.6.8.png)

再次重新打开VS Code， 基本的go相关插件安装完成，如果需要安装Go其他插件，同样参考上述方法自动与手动结合起来安装， 

F5运行跑一下刚才的Hello.go程序，因为自动安装成功安装调试工具插件Dlv，也可以通过断点调试程序了，如果看到以下界面：

![](http://file.knowle.cn/truechain/finished.png) 

恭喜你， 整个IDE的Go开发配置安装完成。

### 1.6 代码下载与编译###

### 1.6.1 True链开发代码下载 ###

首先打开windows命令行窗口， 进入$GOPATH\src\目录下面，比如，我当前的$GOPATH是 **C:\Users\Administrator\go**,在进

入**cd C:\Users\Administrator\go\src\github.com** 目录下， 新建一个**truechain** 目录， 然后通过命令行下载最新的true链工程代码，

具体命令如下： **git clone https://github.com/truechain/truechain-engineering-code.git**，100%进度显示即表示下载完成。

### 1.6.2 代码编译 ###

目前推荐使用VS Code IDE进行开发， 首先打开刚才配置好的VS Code IDE， 选择“文件”-“打开文件夹”， 文件夹路径选择刚才下载的truechain路径，如：

**C:\Users\Administrator\go\src\github.com\truechain**。

第一步， True链工程编初始化参数修改

首先找到True链工程代码程序的入口， 具体位置在 “..\cmd\getrue\main.go", 通过”F5“编译， 第一次会提示是否打开”launch.json", 选择打开即可，如下图所示：

![](http://file.knowle.cn/truechain/Compile_true.png)

修改lanuch.json 代码如下：

![](http://file.knowle.cn/truechain/config_update.png)

补充一下“showLog”参数值改为true。


第二步， 编译与手动下载部分依赖库文件。

执行”F5“操作，这个时候有可能报错， 打开”调试控制台“ 界面，查看一下错误情况，我这边遇到就是”gosigar“这个依赖库下载失败。

需要手动下载安装，具体解决办法如下，执行下面操作：

git clone https://github.com/golang/sys.git $GOPATH/src/github.com/golang/sys

go get -u  github.com/elastic/gosigar

如果按照上述操作没有出现其他错误，就正常Run起来了，在控制台界面看到当前的运行状态，最后，愉快的开始True Chain的开发之旅吧！！！

------------------------------------------------------------------------------------------------
补充（考虑到大家翻墙的不方便，我把$GoPATH所有文件，包含Truechian的vscode代码一起放到了云盘，希望大家自行下载）

链接地址：[https://pan.baidu.com/s/1ucGJQF3ha3P0u1gl6BmciQ](https://pan.baidu.com/s/1ucGJQF3ha3P0u1gl6BmciQ) 密码：zfz5










