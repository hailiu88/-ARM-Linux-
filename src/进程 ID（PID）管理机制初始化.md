## 进程 ID（PID）管理机制初始化

程序运行到此，所有的指令都在引导CPU上顺序运行。要使程序能够在其它CPU上运行，或者想要系统具备多任务处理能力，操作系统必须具有创建和管理进程的能力。pid_idr_init()
是一个负责初始化进程 ID（PID）管理机制的关键内部函数。

要创建、管理和应用进程，内核需要一种高效的方式来分配唯一的数字（PID）并将其映射到进程控制块（task_struct）。pid_idr_init()
负责初始化这一映射机制所需的根结构，其主要任务是初始化 PID 分配范围
、PID分配器（idr）和 pid 对象缓存，确保在创建第一个用户空间进程（init
进程，PID 1）之前，PID 分配器已经准备就绪。

函数位于git/kernel/pid.c，其定义为：

```
void __init pid_idr_init(void)
{
	BUILD_BUG_ON(PID_MAX_LIMIT >= PIDNS_ADDING);
	pid_max = min(pid_max_max, max_t(int, pid_max,
			PIDS_PER_CPU_DEFAULT * num_possible_cpus()));
	pid_max_min = max_t(int, pid_max_min,
			PIDS_PER_CPU_MIN * num_possible_cpus());
	pr_info("pid_max: default: %u minimum: %u\n", pid_max, pid_max_min);
	idr_init(&init_pid_ns.idr);
	init_pid_ns.pid_cachep = KMEM_CACHE(pid,
		SLAB_HWCACHE_ALIGN | SLAB_PANIC | SLAB_ACCOUNT);
}
```

首先，该函数利用编译断言BUILD_BUG_ON()进行编译期安全检查，确保最大
PID（PID_MAX_LIMIT）小于 PIDNS_ADDING，防止 PID 空间和 namespace
内部状态值冲突，即保证 PID
数值空间和内部标志位不重叠。PIDNS_ADDING的主要作用是标记一个 PID
命名空间正处于初始化分配阶段，通常定义为 (1U \<\< 31)，占据了
pid_allocated 变量的最高位。最大 PID必小于该值。

接着函数计算默认 pid_max（上限）。PID 上限随 CPU
数量扩展，以免高并发不够用。最终取用户配置的
pid_max和系统计算的默认值的之间更大的值，但不能超过内核允许最大值（pid_max_max）。最终的结果是pid_max
不小于每个CPU的需求，不超过系统最大限制。

该函数还要确定pid下限，保证最小 PID 数量也随 CPU
扩展，保证即使用户设置很小，也不能小到“系统跑不动”。下限取内核允许最小值（pid_max_min）和所有
CPU 允许分配的最小 PID数量中较大的一个。

该函数最核心的部分是通过函数idr_init()，利用pid命名空间init_pid_ns的idr字段，初始化一个IDR
分配器。初始化后ID从
0开始分配，下一个分配位置idr-\>idr_next为0，基数树idr-\>idr_rt为空树（即
IDR
结构体内的根节点为空），相关的锁和标志位已设定，其中用idr-\>idr_rt.gfp_mask
= IDR_RT_MARKER标记 IDR 使用的基数树。

IDR（Integer ID Management）是内核的一种机制，专门用于数字
ID与内存指针之间的快速映射。简单说，当通过 kill -9 1234
发信号时，内核就是通过这个 IDR 结构，快速把数字 1234
变成指向该进程结构体的指针。IDR 本质是基于基数树的 ID 分配器。

函数pid_idr_init()的最后任务是利用宏KMEM_CACHE()，为存放类型为pid结构体的对象在内核缓冲区（kmem
cache）分配内存。pid结构体保存用于管理进程的元数据。
