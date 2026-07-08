## initrd安全检查

initrd（初始化 RAM 盘—Initial RAM Disk）是 Linux
启动过程中使用的一种临时根文件系统。
它的核心作用是作为引导桥梁，在真正的磁盘驱动、分区和根文件系统（Root
FS）挂载之前，为内核提供一个在内存中运行的小型环境，以加载必要的驱动模块（如
RAID、SCSI、NVMe 驱动）或执行加密盘解密等前置任务。

现代 Linux
内核为了保持精简，通常不会把所有硬件驱动都编译进内核（vmlinuz）。
如果内核要包含所有可能的磁盘控制器驱动，体积会变得非常巨大。内核需要驱动才能读取磁盘上的根分区，但驱动文件又存放在根分区的
/lib/modules 里。Bootloader（如 GRUB）将内核和 initrd
镜像同时加载到内存中。内核启动后，先将内存中的 initrd
挂载为根，从中提取并加载所需的驱动，然后再去挂载真正的硬盘分区。

引导程序将内核和 initrd.img 加载到
RAM。内核将该内存区域虚拟化为一个块设备，并将其挂载为临时的根文件系统
/。执行 initrd 中的脚本（如 linuxrc 或
init），探测硬件并安装模块。一旦真正的根分区准备就绪，内核执行
pivot_root 系统调用，将根切换到真实的磁盘分区，并释放 initrd
占用的内存。

如果启用了 CONFIG_BLK_DEV_INITRD，内核会检查初始化 RAM
盘的内存地址是否合法。如果架构不允许 initrd
位于内核起始地址之下（initrd_below_start_ok = 0），但initrd
的物理页帧号（PFN）低于
min_low_pfn（意味着它位于内核保留区或其他非法区域），为了防止数据损坏，内核会通过
pr_crit 报错并禁用 initrd。
