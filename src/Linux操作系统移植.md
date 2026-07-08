## Linux操作系统移植

在成功移植U-BOOT后才能开始移植Linux操作系统，否则程序无法在目标处理器上运行。

内核移植基本遵循如下步骤：

- 搭建开发环境与准备源码

> 安装针对目标架构的交叉编译器（如 gcc-arm-linux-gnueabihf）。
>
> 从 kernel.org 下载主线源码，或使用芯片厂商（如 TI, Rockchip,
> NXP）提供的 BSP 源码包。

- 确定基准配置 (Defconfig)

> 在内核源码的 arch/xxx/configs/
> 目录下找一个与硬件架构最接近的配置文件，xxx为芯片所在目录。
>
> 执行 make ARCH=xxx CROSS_COMPILE=xxx_defconfig。
>
> 使用 make menuconfig
> 进入图形界面，确保选件中包含了必要的串口驱动、时钟管理和存储驱动。

- 编写/修改设备树 (Device Tree)

> 根据硬件原理图修改 arch/xxx/boot/dts/ 下的 .dts
> 文件，包括定义核心频率、内存起始地址和大小，指定用于调试输出的串口，配置
> I2C、SPI、网络控制器 (MAC/PHY) 等节点的管脚定义 (Pinctrl) 和中断。

- 编译内核映像与设备树

> 执行 make ARCH=xxx CROSS_COMPILE=xxx -jN。编译完成后会生成内核镜像（如
> zImage 或 Image）以及设备树二进制文件（.dtb）。

- 烧录与启动调试 (Bring-up)

> 准备引导加载程序，通常使用 U-BOOT，设置环境变量以加载内核和 DTB
> 到内存。
>
> 指定控制台端口（如
> console=ttyS0,115200）和根文件系统位置，挂载根文件系统。

对i.MX系列处理器而言，如果要在脱离Yocto项目环境下移植Linux内核，首先利用前面介绍的方法生成并在开发主机上安装交叉开发工具链，然后透过合适的脚本设备编译环境。如果处理器是i.MX
6，可以按照如下步骤生成Linux内核镜像：

- 设置编译环境

```
$ source /opt/fsl-imx-wayland/environment-setup-cortexa9hf-vfp-neon-poky-linux-gnueabi
```

- 获取源代码

```
$ git clone https://github.com/nxp-imx/linux-imx
```

- 选择版本

```
$ git checkout -b rel_imx_5.10.9_1.0.0（选择L 5.10.9版）
```

- 初始化配置

```
$ cd linux-imx
$ make distclean
$ make imx_v7_defconfig
```

- 构建

```
$ make -j $(nproc) // -j: 同时运行的工作，一般不大于CPU核数的两倍
```

- 把内核镜像烧到SD卡

```
sudo dd if=<zImageName> of=/dev/sd<partition> bs=512 seek=2048 conv=fsync && sync
```

- 把U-BOOT烧到SD卡

```
$ sudo dd if=<DevicetreeName>.dtb of=/dev/sd<partition> bs=512  seek=20480 conv=fsync
```

如果利用Yocto构建工具集，可以遵循如下步骤移植基于i.MX
6处理器的Linux内核：

- 运行

```
$ DISTRO=fsl-imx-xwayland MACHINE=imx6solosabresd，source  imx-setup-release -b build（项目首次运行）
$ source setup-environment build（首次之后）
```

- 构建一个内核镜像

```
$ bitbake core-image-minimal（最基本的镜像，选择需要的镜像配方文件，例如imx-image-multimedia）
```

- 在source目录下创建自己的定制层，以保存自己所作的修改

```
$ bitbake-layers create-layer ../meta-my-new-layer（生成符号规范的目录结构）
$ bitbake-layers add-layer ../meta-my-new-layer（把生成的层添加到build/conf/bblayers.conf文件）
```

- 拷贝与所用处理器相关的机器配置文件到定制层

```
$ cp sources/meta-freescale/conf/machine/imx6qdlsabresd.conf <new  layer>/conf/machine/<custom_name>.conf
```

- 修改KERNEL_DEVICETREE、PREFERRED_PROVIDER及U-BOOT_CONFIG等变量的值

```
$ PREFERRED_PROVIDER_virtual/kernel_<custom_name> = "linux-imx"
$ KERNEL_DEVICETREE = “your_devicetree_name.dts”
```

- 构建镜像

```
$ bitbake core-image-sato（选择适合你的）
```
