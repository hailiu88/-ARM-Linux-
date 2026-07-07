## 构建Yocto开发环境

要移植Linux操作系统，开发者需要运行在Linux环境中。可以在原生Linux环境下开发，也可以在通过Windows或MacOS的Docker运行的Linux虚拟机环境下开发。虽然
Docker 或虚拟化方案非常方便，但在严肃的 Linux
移植（尤其是底层驱动、内核和 BSP 开发）中，开发者依然强烈推荐使用原生
Linux（直接安装在物理硬件上的 Ubuntu或Debian）。作者使用的是Ubuntu 20.04
.06
LTS进行Linux操作系统移植。这里介绍的操作都是在原生Linux环境下进行的。

### 系统要求

Yocto项目对系统配置有一定的要求，不满足这些要求，生成Linux系统会失败。对开发主机的要求主要有：

- Linux，版本18.04或以上

- 硬盘，至少50G以上空白空间，建议120G，250G如果要包括机器学习，最好为固态硬盘

- 内存，4G，最好8G或16G

### 安装主机软件包

Yocto要求开发主机安装一些必要的软件包，具体要求可以到[yocto](https://docs.yoctoproject.org/current/ref-manual/)官网查看。在Linux终端界面输入如下命令安装开发用软件包：

```
$ sudo apt-get install gawk wget git-core diffstat unzip texinfo
gcc-multilib \

build-essential chrpath socat cpio python python3 python3-pip
python3-pexpect \

xz-utils debianutils iputils-ping python3-git python3-git python3-jinja2
libegl1-mesa libsdl1.2-dev \

pylint3 xterm rsync curl
```

### 设置repo工具

repo是建立在git之上的管理工具，利用repo，使得项目文件存于不同服务器的项目管理变得非常容易。要设置repo，在Linux终端输入如下命令：

```
$ mkdir ~/bin
```

国外：

```
$ curl <https://storage.googleapis.com/git-repo-downloads/repo> >
~/bin/repo
```

国内：

```
$ curl <https://mirrors.tuna.tsinghua.edu.cn/git/git-repo> >
~/bin/repo
```

```
$ chmod a+x ~/bin/repo
```

在.bashrc文件加入下列一行文字：

```
export PATH=~/bin: $PATH
```

### 设置Yocto项目

在Linux终端，输入如下命令：

```
$ git config --global user.name “你的名字”

$ git config --global user.email “你的邮箱地址”

$ mkdir imx-yocto-bsp（任何你喜欢的名字）

$ cd imx-yocto-bsp

\$ repo init -u [https://github.com/nxp-imx/imx-manifest -b
imx-linux-gatesgarth -m
imx-5.10.9-1.0..0.xml](https://github.com/nxp-imx/imx-manifest%20-b%20imx-linux-gatesgarth%20-m%20imx-5.10.9-1.0..0.xml)

$ repo sync
```

由于5.10.9已不维护，一些软件发生变化而没有在这里得到更新，下载时可能会找不到相应的版本，读者可以自己修改recipes或利用下面命令下载一个新版本，或找一个更新的版本：

```
$ repo init -u [https://github.com/nxp-imx/imx-manifest -b
imx-linux-langdale -m
imx-6.1.1-1.0..0.xml](https://github.com/nxp-imx/imx-manifest%20-b%20imx-linux-langdale%20-m%20imx-6.1.1-1.0..0.xml)
```

### 生成镜像文件

在当前目录下，运行：

```
$ DISTRO=fsl-imx-xwayland MACHINE=imx6solosabresd，source
imx-setup-release -b <镜像目录>
```

其中fsl-imx-xwayland为NXP的一个发行版配置名称，决定系统如何建。目前支持fsl-imx-wayland，fsl-imx-xwayland，fsl-imx-fb，分别支持wayland、xwayland及fb等不同的图形界面。MACHINE为支持的开发板名称，NXP
Linux BSP（Board Support
Package）支持十多种开发板，读者可参考NXP的技术手册。镜像目录可以自己命名。

运行命令后会出现有关GNU的版权信息，阅读后退出，回答y。命令会生成两个文件，分别为bblayers.conf，local.conf，位于\<镜像目录\>/conf/。bblayers.conf包含该项目所有的元数据层，local.conf包含在上面输入的machine和distro，通过该文件可以增减自己要发布的软件包的内容。

在当前目录（不要运行cd命令）运行命令生成镜像文件：

```
$ bitbake imx-image-multimedia
```

其中imx-image-multimedia为镜像配方，决定镜像里包含哪些内容。i.MX
yocto项目提供了多个配方，供开发者选择。不同配方提供不同的软件内容，利用imx-image-multimedia生成的镜像支持GUI，而利用imx-image-full生成的镜像支持GUI、机器学习及Qt5。

第一次运行bitbake时要从世界各地的服务器下载源代码，而且有上万甚至几十万的文件要编译，可能会花一天甚至几天的时间。

后面运行时不需要给DISTRO和MACHINE赋值，也不需要通过-b知道镜像目录，只需运行如下命令：

```
$ source setup-environment <指定的镜像目录>

$ bitbake <镜像配方名>
```
