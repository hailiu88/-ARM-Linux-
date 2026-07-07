## initcall机制简介

initcall 是 Linux
内核中一种极为精妙的自动初始化机制。它允许内核在不显式调用每个驱动程序或子系统初始化函数的情况下，按照预定的优先级顺序自动执行它们。

内核将初始化过程分为不同的阶段，每个阶段对应一个级别(Initcall
Levels)。级别越低，初始化程序所占内存的地址越低，因此执行越早。初始化程序共分为八个级别，定义初始化程序的级别由下列宏定义完成：

```text
级别 		宏定义			用途示例

0 		pure_initcall 		仅初始化不依赖任何外部条件的变量

1 		core_initcall 		核心子系统（如调度器、内存管理）

2 		postcore_initcall 	核心之后的组件

3 		arch_initcall 		特定处理器架构相关的初始化（如 CPU 特性）

4 		subsys_initcall 	通用子系统（如网络栈、总线驱动）

5 		fs_initcall 		文件系统（如 VFS, ext4）

rootfs 		rootfs_initcall 	挂载根文件系统（如 initramfs 解压）

6 		device_initcall 	普通驱动程序（默认级别，等同于 module_init）

7 		late_initcall 		最后阶段的清理或非关键组件
```

initcall 并不像普通函数调用那样写在 main() 里，而是利用 ELF 段 (Section)
技术，把函数指针放进特定 ELF
段，然后在启动时按段顺序遍历执行。在早期内核中，初始化代码往往直接写在
start_kernel()
里。问题是一方面，子系统越来越多，另一方面，驱动是可选的。编译进内核的模块需要自动注册，还要控制初始化顺序，驱动程序编写极不方便。为此，开发人员设计了基于链接脚本的“分段注册 +
分级调用”的initcall机制。驱动程序或子系统编写者在编写初始化子程序时，只需通过宏定义选择自己初始化程序的级别，编译程序会利用宏自动创建一个指向自己的初始化函数的函数指针，并把这个指针强制存放在一个特殊的
ELF 段中（例如 .initcall6.init）。依据链接脚本
vmlinux.lds，链接程序将这些段按 0 到 7
的顺序排列在内存中，形成一个巨大的函数指针数组。同一级别的初始化程序，按照代码出现的先后次序在段内进行排列。内核在启动时，do_initcalls函数从数组头扫到数组尾，逐个执行初始化程序。

这些标记为 \_\_init
的函数在执行完毕后，其所在的内存段会被内核彻底释放。在 dmesg 中看到的
Freeing unused kernel memory 说的就是它们。

initcall 宏体系定义在git/include/linux/init.h文件内，其中最核心的宏是：

```
#define ___define_initcall(fn, id, __sec) 				\
	static initcall_t __initcall_##fn##id __used 				\
		__attribute__((__section__(#__sec ".init"))) = fn;
#define __define_initcall(fn, id) ___define_initcall(fn, id, .initcall##id)
```

这等价于：

```
#define ___define_initcall(fn, id, __sec) 				\
	static initcall_t __initcall_##fn##id __used 	__attribute__((__section__(#__sec ".init"))) = fn;
#endif
```

宏\_\_define_initcall(fn, id) 的作用是生成类似于如下形式的函数声明：

```
static initcall_t initcall_xx_yy used _attribute__((__section__(“.initcallyy.init”)))=xx;
```

其中，xx为初始化函数名称，yy为该初始化函数的级别，initcall_t由typedef
int (\*initcall_t)(void)定义，为无输入参数、返回整型数的函数指针。

例如core_initcall(sched_init) 首先会变成\_\_define_initcall(sched_init,
1)（这里，fn=sched_init，id=1），最终会变成：

```
static initcall_t __initcall_sched_init1 __used  __attribute__((__section__(".initcall1.init"))) = sched_init;
```

链接程序会通过链接脚本vmlinux.lds.h定义地址标号initccall0_start到initcall7_start的值。0级初始化函数地址保存在地址始于initcall0_start的内存区间，7级初始化函数地址会保留在地址始于initcall7_start的内存里，以此类推。初始化函数通过地址initcallX_start遍历并执行X级的初始化函数。内核不会硬编码每个驱动的加载顺序。相反，驱动开发者使用
device_initcall()
等宏将初始化函数放在位于\_\_initcall_start和\_\_initcall_end的段中。

这种机制非常高效，因为它通过链接器的手段将成百上千个分散在源代码各处的初始化函数汇总到一起，避免了在
main.c 中写一个巨大的、难以维护的调用列表。

