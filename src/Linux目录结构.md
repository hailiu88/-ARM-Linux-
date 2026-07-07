## Linux目录结构

在 Linux 文件系统分层标准 (FHS)
中，目录结构并非随意堆砌，而是遵循严格的逻辑。对于 i.MX6 Solo
等嵌入式系统，理解这些目录能帮你精准定位内核镜像、配置文件和驱动节点。

Linux 没有 C 盘、D 盘之分，所有设备都挂载在根目录 /
下的特定位置，以下是核心目录的速查指南。

核心引导与系统文件：

- /boot

> 存放启动核心文件。内核镜像（zImage）、
> 设备树文件、initramfs和bootloader通常存放在这里。

- /bin

> 存放系统启动及运行所需的基本命令（如 ls, cp,
> sh），对所有用户可用。如典型命令ls，cp，mv，cat，bash等均存放于此。

- /sbin

> 存放系统管理员命令（System Binaries），如
> ifconfig，fdisk，reboot，addgrp 等涉及硬件管理和系统维护的工具。

- /lib

> 存放系统最基本的动态链接共享库（.so
> 文件）和内核模块（modules）。没有它，/bin 里的命令无法运行。

硬件与配置：

- /dev

> 设备文件存放地。在 Linux 中，一切皆文件。串口（tty）、SD
> 卡（mmcblk0）、usb等都通过这里的节点访问。其中包含tty、sda和null等许多对应不同设备的子目录。这些文件由内核
> 和 udev 动态生成。

- /etc

> 系统的配置文件目录，Linux启动后的网络配置、用户密码、启动脚本（如
> rc.local）、内核参数配置（sysctl.conf）等都在此。

- /etc/passwd存放用户密码

- /etc/fstab定义系统启动时需要自动挂载的文件系统，以及挂载方式

- /etc/hostname用于保存主机名称

- /etc/systemd/存放 systemd
  的本地配置与服务单元文件，是系统服务管理的核心配置目录

 /sys & /proc虚拟文件系统：

- /proc

> 反映进程和内核状态（如 CPU
> 信息），通过该目录下的文件，用户可了解进程的状态。它 是 Linux
> 中一个虚拟文件系统（procfs），不占用磁盘空间，所有内容都由内核在内存中动态生成。每个进程对应一个以pid（进程编号）命名的子目录。

- /sys

> 导出内核对象和硬件拓扑（控制 GPIO 引脚或 LED
> 亮度常在这里操作）。系统管理员可以通过这里的文件进行资源配置及设备管理，常见顶层子目录包括：

- /sys/block

- /sys/bus

- /sys/class

- /sys/devices

- /sys/firmware

- /sys/fs

- /sys/kernel

- /sys/module

- /sys/power

> /sys/devices是设备树的核心目录，所有设备在内核中的层级结构都在这里。它反映真实物理拓扑关系，是
> sysfs
> 的"根"，如/sys/devices/pci0000:00/和/sys/devices/system/cpu/。所有
> /sys/class 和 /sys/bus
> 最终都会链接到这里，可以把它理解为是真实设备拓扑树。
>
> /sys/class是按功能分类的设备视图，通常是指向 /sys/devices
> 下实际设备的符号链接，是用户空间最常访问的接口。主要包括：

- /sys/class/net/

- /sys/class/block/

- /sys/class/leds/

- /sys/class/gpio/

  例如：

  /sys/class/net/eth0对应第一个以太网接口

  /sys/class/block/sda对应第一个磁盘

> /sys/block是块设备对应的目录。例如，/sys/block/sda/对应磁盘，/sys/block/mmcblk0/子目录对应第一个mmc（multimedia
> card）卡设备，其下包含size、queue/、stat等。通常用于存储性能分析、I/O
> 调优、嵌入式设备存储管理等。
>
> /sys/bus包含按总线类型组织的设备，如/sys/bus/pci/、/sys/bus/usb/、/sys/bus/i2c/、/sys/bus/platform/，分别对应pci总线设备、usb设备、i2c设备、平台集成设备等。每个总线包含设备描述子目录devices/和驱动器子目录drivers/，如/sys/bus/pci/devices/子目录和/sys/bus/pci/drivers/子目录。这是驱动与设备匹配的关键位置。
>
> /sys/module包含内核模块信息，如/sys/module/ext4/和/sys/module/nvme/。内容包括initsize、parameters/、refcnt和sections/等文件及子目录，可用于查看模块参数及修改动态修改模块变量。
>
> /sys/kernel是内核子系统控制接口，主要包括/sys/kernel/debug、/sys/kernel/mm和/sys/kernel/tracing。其中，/sys/kernel/debug
> 是 debugfs（需单独挂载），/sys/kernel/tracing 是 ftrace 接口。
>
> /sys/fs是文件系统子系统接口，例如，/sys/fs/cgroup，/sys/fs/ext4，/sys/fs/bpf。这里包含cgroup中特定文件系统的运行状态。
>
> /sys/firmware包含与固件相关的信息，如/sys/firmware/efi，/sys/firmware/devicetree

在 ARM 嵌入式系统中经常包含/sys/firmware/devicetree/base目录。

> /sys/power包含与电源管理有关的信息，如/sys/power/state和/sys/power/wakeup_count等。

可通过echo mem \> /sys/power/state让内存进入进入内存挂起状态。

> /sys/devices/system包含系统级设备，如/sys/devices/system/cpu/、/sys/devices/system/memory/和/sys/devices/system/node/。
>
> 可通过echo 0 \> /sys/devices/system/cpu/cpu1/online让cpu1上线。

用户与应用空间：

- /usr

> 存放用户的应用程序和文件，类似 Windows 的 C:\Program Files。

- /usr/bin

> 非核心的系统命令。

- /usr/lib

> 应用程序的库文件。

- /var

> 存放经常变动的数据，如日志文件（/var/log）或包管理器的缓存。

- /home

> 普通用户的个人主目录。

- /root：

> 超级管理员（root）的个人主目录，注意它不在 /home 下。

其他重要目录：

- /tmp

> 临时文件存放点，系统重启时通常会被清空。

- /mnt

> 用于手动临时挂接文件。

- /media

> 用于自动挂载移动设备（如 U 盘）。

- /opt

> 存放第三方安装的备选软件包。

- /run

> 用于保存运行时数据、pid文件和套接字（socket）文件。该文件夹启动后存在，重启清空。

- /lost+found

> 保存文件系统修复后恢复的碎片文件

