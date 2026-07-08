## U-BOOT 命令

U-BOOT提供了大量针对外设、内存文件系统、以及网络的命令。用户可以利用这些命令读取设备数据，把数据写入设备，对外设进行配置，显示系统信息。U-BOOT提供了简单命令行接口和与B
shell兼容的命令行接口（HUSH）两种命令解释程序，通过简单的命令行接口与用户交互。

U-BOOT命令可以划分为信息、内存、闪存、执行控制、网络、环境变量、文件系统支持命令、特殊命令、高级命令及其它命令等。下面我们分类介绍U-BOOT命令。

### 信息命令

信息命令用于查询各类信息，这些命令包括：

- bdinfo

> 显示系统板信息。

- coninfo

> 显示控制终端信息。

- flinfo

> 显示闪存信息。

- iminfo

> 显示镜像文件头。

- imls

> 列表闪存上的文件。

- fatinfo

> 显示fat文件系统信息。

- mii

> ethernet mii及phy信息。

- help

> 显示线上帮助。

下面给出的是bdinfo命令的运行结果，其中=\>为命令提示符。

    => bdinfo

    memstart = 0x00000000

    memsize = 0x04000000

    flashstart = 0x40000000

    flashsize = 0x00800000

    flashoffset = 0x00030000

    sramstart = 0x00000000

    sramsize = 0x00000000

    immr_base = 0xFFF00000

    bootflags = 0x00000001

    intfreq = 50 MHz

    busfreq = 50 MHz

    ethaddr = 00:D0:93:00:28:81

    IP addr = 0.0.0.0

    baudrate = 115200 bps

    =>

下面给出的是help命令的运行结果

    =>help

    ? - alias for 'help'

    autoscr - run script from memory

    base - print or set address offset

    bdinfo - print Board Info structure

    boot - boot default, i.e., run 'bootcmd'

    bootd - boot default, i.e., run 'bootcmd'

    bootelf - Boot from an ELF image in memory

    bootm - boot application image from memory

    bootp - boot image via network using BootP/TFTP protocol

    bootvx - Boot vxWorks from an ELF image

    clock - Set Processor Clock

    cmp - memory compare

    coninfo - print console devices and information

    cp - memory copy

    crc32 - checksum calculation

    date - get/set/reset date & time

    dboot - Digi ConnectCore modules boot commands

    dcache - enable or disable data cache

    dhcp - invoke DHCP client to obtain IP/boot params

    echo - echo args to console

    envreset- Sets environment variables to default setting

    fatinfo - print information about filesystem

    fatload - load binary file from a dos filesystem

    fatls - list files in a directory (default /)

    flpart - displays or modifies the partition table.

    fsinfo - print information about filesystems

    fsload - load binary file from a filesystem image

    go - start application at address 'addr'

    help - print online help

    icache - enable or disable instruction cache

    icrc32 - checksum calculation

    iloop - infinite loop on address range

    imd - i2c memory display

    iminfo - print header information for application image

    imm - i2c memory modify (auto-incrementing)

    imw - memory write (fill)

    inm - memory modify (constant address)

    intnvram- displays or modifies NVRAM contents like IP or partition table

    iprobe - probe to discover valid I2C chip addresses

    itest - return true/false on integer compare

    loadb - load binary file over serial line (kermit mode)

    loads - load S-Record file over serial line

    loady - load binary file over serial line (ymodem mode)

    loop - infinite loop on address range

    ls - list files in a directory (default /)

    md - memory display

    mm - memory modify (auto-incrementing)

    mtest - simple RAM test

    mw - memory write (fill)

    nand - NAND sub-system

    nboot - boot from NAND device

    nfs - boot image via network using NFS protocol

    nm - memory modify (constant address)

    ping - send ICMP ECHO_REQUEST to network host

    printenv- print environment variables

    printenv_dynamic- Prints all dynamic variables

    rarpboot- boot image via network using RARP/TFTP protocol

    reset - Perform RESET of the CPU

    run - run commands in an environment variable

    saveenv - save environment variables to persistent storage

    setenv - set environment variables

    sleep - delay execution for some time

    sntp - synchronize RTC via network

    tftpboot- boot image via network using TFTP protocol

    update - Digi ConnectCore modules update commands

    usb - USB sub-system

    usbboot - boot from USB device

    version - print monitor version

如果想了解某条命令的使用方法，可以运行help command，如：

=\> help run

    run var [...]

    run the commands in the environment variable(s) 'var'

mii命令的使用方法为：

- mii device

> 显示所有ethernet器件。

- mii device \<name\>

> 设置当前器件。

- mii read \<addr\> \<reg\>

> 从mii phy \<addr\>读取寄存器\<reg\>的值。

- mii write \<addr\> \<reg\> \<data\>

> 把\<data\>写入到mii phy \<addr\>寄存器\<reg\>。

### 内存类命令

该类命令用于内存操作，主要有：

- base

> 显示或设置基地址，该地址被内存命令用作地址偏移量。

- crc32

> 计算CRC的值。

- cmp

> 内存比较。

- cp

> 内存拷贝命令。

- md

> 显示内存内容。

- mm

> 修改内存内容。

- mtest

> 简单内存测试命令。

- mw

> 写内存。

- loop

> 在地址范围内无限循环。

下面给出的是base命令及md命令的使用方法和运行结果。

    => base

    Base Address: 0x00000000

    => md 0 c

    00000000: feffffff 00000000 7cbd2b78 7cdc3378 ........|. +x|.3x

    00000010: 3cfb3b78 3b000000 7c0002e4 39000000 <.;x;...|...9...

    00000020: 7d1043a6 3d000400 7918c3a6 3d00c000 }.C.=...y...=...

    => base 40000000

    Base Address: 0x40000000

    => md 0 c

    40000000: 27051956 50504342 6f6f7420 312e312e <u>'..VPPCBoot</u> 1.1.

    40000010: 3520284d 61722032 31203230 3032202d 5 (Mar 21 2002 -

    40000020: 2031393a 35353a30 34290000 00000000 19:55:04)......

    =>

### 闪存类命令

- cp

> 闪存编程命令。

- flinfo

> 闪存信息命令。

- erase

> 删除闪存命令。

- protect

> 设置或取消闪存写保护。

### 执行控制类命令

- autoscr

> 运行脚本。

- bootm

> 从内存引导程序。

- bootelf

> 从内存引导elf格式程序。

- bootvx

> 引导elf格式的Vx Work程序。

- go

> 从地址”addr”运行程序。

bootm的命令格式为：

    bootm [addr [arg ...]] - boot application image stored in memory
    passing arguments 'arg...'; when booting a Linux kernel,‘arg' can be the address of an initrd image。`

### 网络类命令

- bootp

> 利用bootp/tftp协议，通过网络引导镜像程序。

- cdp

> 进行cisco discovery协议配置。

- dhcp

> 调用dhcp客户端，获取ip地址及引导参数。

- loadb

> 利用串口线载入二进制文件。

- loads

> 通过串口线载入s-record格式文件。

- nfs

> 利用网络，通过NFS协议引导系统。

- ping

> 向网络主机发送ICMP ECHO_REQUEST命令。

- rarpboot

> 利用rarp/tptp协议，通过网络引导镜像程序。

- tftpboot

> 利用tftp协议，通过网络引导镜像程序。

Bootp命令的格式为：

    bootp [loadAddress] [bootfilename]

利用nfs引导程序的命令格式为：

    nfs [loadAddress] [host ip addr:bootfilename]

### 环境变量命令

- printenv

> 显示所有环境变量值。

- saveenv

> 把环境变量值保存到非易失性记忆体。

- askenv

> 从标准输入设备获取环境变量值。

- setenv

> 设置环境变量值。

- run

> 运行环境变量中的命令。

- bootd

> 默认引导，等价于run ‘bootcmd’。

### 文件系统类命令

- chpart

> 变换活动分区。

- fsinfo

> 显示文件系统信息。

- fsload

> 从文件系统调入二进制文件。

- ls

> 显示指定目录下的文件。

- fatinfo

> 显示文件系统信息。

- fatls

> 显示某一目录下的文件。

- fatload

> 从DOS文件系统导入二进制文件。

- nand

> nand子系统，包含许多操作nand的子命令。

- reiserls

> 显示reiser文件系统下子目录内容。

- reiserload

> 从reiser文件系统导入二进制文件。

### 特殊命令

- i2c

> i2c子系统。

- doc

> 盘片子系统。

- dtt

> 数字温度计和恒温器子系统。

- eeprom

> eeprom子系统。

- fpga

> fpga子系统。

- ide

> ide子系统。

- kgdb

> 进入内核调试模式。

- diskboot

> 利用ide设备引导。

- icache

> 利用或取消指令缓存。

- dcache

> 利用或取消数据缓存。

- diag

> 板级诊断。

- log

> 日志管理。

- pci

> 显示、访问pci配置空间。

- regdump

> 导出寄存器内容。

- usb

> usb子系统。

- sspi

> spi命令。

上述子系统均包含对子系统进行操作的子命令，利用帮助命令，可以了解各条命令的格式和使用方法。

### 其它命令

- bmp

> 处理bmp格式图像数据，如：
>
> bmp info \<image address\>可以显示指定地址处图像信息，而`bmp display <image address> [x,y]`则在（x,y）处显示`《image address》`处的图像。

- date

> 显示当前日期和时间。

- echo

> 在当前控制终端显示变量值。

- exit

> 退出脚本。

- kbd

> 读取键盘输入。

- in

> 从io口读取数据。

- out

> 把数据写到io口。

- reset

> 系统复位。

- sleep

> 延迟指令执行。

- test

> 最低限度的测试。

- version

> 显示当前U-BOOT版本。

- wd

> 检查、设置看门狗。

- ?

> 等价于help指令。

