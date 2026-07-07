## U-BOOT引导程序移植

Linux系统移植的首要任务是移植bootloader。没有bootloader，所有对Linux的修改都无法在开发板上进行验证。在嵌入式系统中采用最为广泛的bootloader是U-BOOT引导程序，i.MX
Linux操作系统采用的也是U-BOOT引导程序。为了让硬件动起来，先必须让U-BOOT动起来。

U-BOOT
的移植本质上是“找同类、改配置、配设备树”的过程。除非是在做一款全新的
SoC，否则绝大多数工作都是在芯片原厂（Vendor）提供的 BSP 基础上进行微调。

U-BOOT移植是最困难的任务之一。这时没有工具可以帮助开发者显示程序运行结果，有时只能盲猜。所以U-BOOT移植的首要目标是让Uart先跑起来，以便能够获取运行结果。这时可以借助Segger或arm公司的仿真器/编程器及自带的调试器或开源gdb、kgdb等调试器进行调试

以下是移植 U-BOOT 到新硬件（Custom Board）的标准流程：

- 在 configs/ 目录下找到与你SoC
  型号一致、硬件最接近的默认配置，复制该配置文件并重命名为你的板级名称。

- 在 board/\<vendor\>/
  目录下创建一个新文件夹，存放板子特有的代码。核心文件有Makefile、Kconfig以及board.c。Makefile定义编译规则，Kconfig定义配置选项，board.c包含最底层的硬件初始化代码，比如
  GPIO 配置、复用管脚（Pinmux）初始化等；

- 在 include/configs/ 下创建对应的 \<board\>.h，用来定义宏（如
  CONFIG_SYS_PROMPT 或环境变量默认值）；

- 在 arch/arm/dts/ 路径下，参考原厂设备树文件（.dts /
  .dtsi）创建设备树。现代 U-BOOT
  严重依赖设备树来驱动硬件。尤其要定义串口（UART）、以太网（PHY
  地址）、存储器（eMMC/SD/QSPI Flash）以及内存（DDR）的基地址和参数；

- 用下列命令生成U-BOOT文件

```
 $ make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf-<your_board\>_defconfig
 $ make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- -j$(nproc)
```

- 按串口、DDR 初始化、存储介质 (MMC/Nand)、网络
  (Ethernet)顺序调试核心功能；

- 在 Yocto 环境下，通常不需要手动敲 make 命令，而是通过修改
  Recipe（.bbappend 文件）中的 SRC_URI 指向代码仓库，并更新
  U-BOOT_CONFIG 变量来自动完成上述过程

在原生Linux环境下过程要复杂一些。对于NXP的i.MX处理器，在Yocto环境下，如果运行了imx-setup-environment.sh脚本，只要一条命令：

```
$ bitbake U-BOOT-imx
```

就可以生成可运行的U-BOOT程序。

如果要脱离Yocto构建系统而独立地生成U-BOOT运行文件，首先要借助Yocto项目生成或从官网下载交叉（跨平台）生成工具，然后通过make指令编译并生成镜像文件。

Yocoto项目包括许多交叉开发工具，读者可以利用bitbake生成开发工具，然后脱离Yocto项目环境进行移植。对于不熟悉Yocto项目环境和bitbake语法的读者，这样更容易上手，也可以加快移植速度。下面是基于i.MX6
solo处理器的构建跨平台开发工具命令：

```
$ DISTRO=fsl-imx-xwayland MACHINE=imx6solosabresd bitbake core-image-minimal -c populate_sdk
```

发行版配置、镜像配方及开发板可以根据自己的需要选择。-c
populate_sdk告诉bitbake执行populate_sdk任务。

在bitbake运行的镜像目录，把位于tmp/deploy/sdk目录下后缀为.sh的文件拷贝到开发主机，在开发主机上执行该.sh文件，把跨平台开发工具安装到开发主机，就可以利用这些开发工具进行移植工作。

如果处理器为i.MX6 SoC或i.MX7 SoC，U-BOOT程序的生成步骤为：

- 在开发主机上运行

```
$ export CROSS_COMPILE=/opt/fsl-imx-fb/5.10.9/environment-setup-cortexa9hf-vfp-neon-poky-linux-gnueabi
$ export ARCH=arm
```

- 利用git命令获取源代码（如果还没有下载源代码）

```
> $ git clone https://github.com/nxp-imx/u-boot-imx
```

- 在开发主机上运行

```
$ cd u-boot-imx
$ make distclean
$ make mx6solosabresd_defconfig（选择适合自己的_defconfig文件）
$ make
```

利用imx-mkimage工具把U-BOOT二进制文件生成最后的flash.bin引导镜像.

如果是在Yocto环境下移植，文件一般位于\<镜像目录\>/tmp/work/开发板名-poky-linux-gnueabi/U-BOOT-imx/版本号/git目录下，涉及的目录通常包括arch、board、common及config。如果增减了文件或修改了文件名称，还需要修改该目录下的文件Makefile。

硬件配置不同，移植时需要修改的文件也会不同。如果基于imx6solosabresd开发板进行移植，需要修改的文件可能包括Makefile，xx.dts，xx_defconfig、xx_common.h、mx6sabresd.c、mx6sabresd.h、xx.cfg和soc.c等，xx对应所选开发板。xx.cfg用于设置DDR控制器。

