## cpuset机制初始化

cpuset 是 Linux 内核
控制组框架下的一个子系统。它的核心功能是将特定的核和内存节点绑定给特定的进程组。如果说一般的调度器是自由分配，那么
cpuset 就是固定服务对象。

在多核服务器（尤其是多 CPU 插槽的 NUMA 架构）中，cpuset 主要用处是：

- 防止某个高负载进程抢占关键业务的 CPU 资源

- 在 NUMA 架构下，让进程运行在靠近其内存节点的 CPU
  上，避免跨节点访问内存导致的性能大幅下降

在 /sys/fs/cgroup/cpuset/
目录下有二十几个文件，有三个为只读文件，其余为可读写文件。其中的cpuset.cpus包含允许进程使用的
CPU 列表，cpuset.mems包含当前 cpuset（或
cgroup）允许使用的内存节点，cpuset.cpu_exclusive设置为 1 时，该组占用的
CPU 不允许被其他 cpuset 组共享。

cpuset_init()的核心任务是建立系统级的默认 CPU
和内存控制框架，把系统默认的cpuset（即根
cpuset或top_cpuset）先搭起来，并准备好 cpuset
运行所需的全局基础设施。函数位于git/kernel/cgroup/cpuset.c，其定义为：

```
int __init cpuset_init(void)
{
	BUG_ON(percpu_init_rwsem(&cpuset_rwsem));
	BUG_ON(!alloc_cpumask_var(&top_cpuset.cpus_allowed, GFP_KERNEL));
	BUG_ON(!alloc_cpumask_var(&top_cpuset.effective_cpus, GFP_KERNEL));
	BUG_ON(!zalloc_cpumask_var(&top_cpuset.subparts_cpus, GFP_KERNEL));
	cpumask_setall(top_cpuset.cpus_allowed);
	nodes_setall(top_cpuset.mems_allowed);
	cpumask_setall(top_cpuset.effective_cpus);
	nodes_setall(top_cpuset.effective_mems);
	fmeter_init(&top_cpuset.fmeter);
	set_bit(CS_SCHED_LOAD_BALANCE, &top_cpuset.flags);
	top_cpuset.relax_domain_level = -1;
	BUG_ON(!alloc_cpumask_var(&cpus_attach, GFP_KERNEL));
	return 0;
}
```

函数首先通过percpu_init_rwsem()初始化 cpuset
全局读写同步锁cpuset_rwsem。由于 CPU
绑定关系的读取频率远高于修改频率，每个CPU用自己的同步读写锁（percup版），减少多核间的锁竞争。之后通过函数alloc_cpumask_var()和zalloc_cpumask_var()分配掩码内存，并将内存地址分别赋予top_cpuset的三个掩码指针cpus_allowed、effective_cpus和subparts_cpus。如果失败，通过BUG_ON()直接触发宕机（panic）。因为
cpuset
是核心调度依赖，如果内存分配失败或锁初始化失败，内核会认为系统已不可靠。

为top_cpuset的掩码字段分配内存后，函数通过cpumask_setall()将
top_cpuset中的cpus_allowed和effective_cpus掩码字段设为全
1，表示包含系统所有内核。cpus_allowed包含想要的CPU，effective_cpus是实际生效的CPU。在某些
CPU 离线时，effective_cpus与 cpus_allowed 会有区别。字段subparts_cpus在
分配时清零，它表示根 cpuset 中被划给下一级cpuset时使用的 CPU 集合。

nodes_setall()将top_cpuset中的mems_allowed和effective_mems内存节点掩码设为全
1，表示包含所有 NUMA
内存节点。由于mems_allowed和effective_mems是top_cpuset的普通字段，再定义top_cpuset时这些字段已有相应的内存，不需要额外的内存分配操作。

top_cpuset为类型为cpuset结构体的变量，保存系统启动时的默认
cpuset，或cpuset 层级树的根节点，所有进程最开始都处于这个根 cpuset
中。它对应的含义就是整台机器默认允许使用的 CPU
和内存节点范围，所以初始化时，内核直接把它设成CPU全部允许，memory
node全部允许。

函数调用fmeter_init()初始化与负载迁移、调度、节流统计有关的频率计量器，然后通过set_bit()将top_cpuset的flags字段设置为CS_SCHED_LOAD_BALANCE，开启该组的全局负载均衡，允许进程在该组包含的所有
CPU核芯之间自由迁移。

top_cpuset的relax_domain_level字段用来设置调度域的搜索等级。当一个 CPU
空闲时，它会从其他繁忙 CPU
上寻找任务。这个参数决定了它是从同一个物理核的超线程里找，还是是从同一个
CPU 插槽的 L3 缓存里找，或者跨越主板总线去另一个物理 CPU
的内存节点找。-1
代表系统默认行为，让内核根据硬件拓扑自动决定最合适的搜索深度。

函数最后预分配一块临时掩码空间，将分配的内存地址赋予cpus_attach，用于后续在进程跨组迁移（Attach）时进行计算，避免在迁移路径上动态分配内存导致阻塞。在
cpuset 里，把任务迁移到某个 cpuset，或者重新绑定任务可运行 CPU
时，经常需要临时确定哪些 CPU 可以跨组迁移，哪些 CPU
需要更新，以及任务迁入后允许的 CPU 集合，这需要一个CPU掩码来保存这些
结果。

