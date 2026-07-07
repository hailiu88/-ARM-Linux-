## 初始化 NUMA策略

在 Linux 内核中，NUMA 策略（Memory Policy）
决定了程序申请内存时，内核应该优先从哪个物理插槽（Socket/Node）上的内存条分配空间。在多路服务器（如双路
Xeon 或 EPYC）中，访问本地内存（本 CPU
直接连接的内存）比访问远程内存（跨总线访问另一个 CPU
的内存）快得多。NUMA 策略就是为了管理这种延迟差异。

内核提供了四种主要的策略，可以通过 numactl 工具或 set_mempolicy
系统调用来设置：

- MPOL_DEFAULT (默认模式)

> 尝试在当前运行该线程的 CPU
> 所在的本地节点分配内存。大多数通用程序的最佳选择，延迟最低。

- MPOL_BIND (强制绑定)

> 严格限制内存只能从指定的几个节点分配。如果这些节点满了，分配会失败（触发
> OOM）。适用于高性能数据库（如
> Redis/MySQL），确保数据永远不跨节点流动。

- MPOL_INTERLEAVE (交错模式)

> 将内存页均匀地“撒”在所有指定的节点上（页 0 在节点 A，页 1 在节点
> B...）。适用于需要较大内存带宽的任务（如大规模科学计算），通过并行使用所有节点的内存控制器来提升吞吐量。

- MPOL_PREFERRED (优先模式)

> 尽量在指定节点分配，如果该节点内存不足，允许自动回退到其他节点。适用于希望保持局部性但又不希望程序因为内存不足而崩溃的情景。

NUMA 策略可分为系统级、任务级和内存区级三个层次。系统级由
numa_policy_init 初始化，通常是本地优先，任务级 （Task
Policy）是特定进程或线程及其子进程遵循的策略，内存区级 (VMA
Policy)是针对程序中某一段特定的虚拟内存地址设置的独立策略。

如果策略配置不当，会导致著名的 “NUMA 内存节点不平衡” 问题，即节点 0
的内存几乎耗尽并开始频繁换出（Swap），而节点 1 还有大量空闲内存。

numa_policy_init() 是 Linux
内核初始化的重要环节，专门负责在系统启动早期建立
NUMA（非统一内存访问）内存策略 框架。
其核心作用是建立系统默认策略，该函数会将系统的全局默认内存策略初始化为
MPOL_DEFAULT。对于绝大多数系统，这意味着执行 本地分配 (Local Allocation)
，即 CPU 优先从自己物理上连接的内存节点（Local
Node）申请内存，以获得最低的访问延迟。函数位于文件git/mm/mempolicy.c，其定义为：

```
void __init numa_policy_init(void)
{
	nodemask_t interleave_nodes;
	unsigned long largest = 0;
	int nid, prefer = 0;
	policy_cache = kmem_cache_create("numa_policy",
				 sizeof(struct mempolicy), 0, SLAB_PANIC, NULL);
	sn_cache = kmem_cache_create("shared_policy_node",
			     sizeof(struct sp_node), 0, SLAB_PANIC, NULL);
	for_each_node(nid) {
		preferred_node_policy[nid] = (struct mempolicy) {
			.refcnt = ATOMIC_INIT(1),
			.mode = MPOL_PREFERRED,
			.flags = MPOL_F_MOF | MPOL_F_MORON,
			.v = { .preferred_node = nid, },
		};
	}
	nodes_clear(interleave_nodes);
	for_each_node_state(nid, N_MEMORY) {
		unsigned long total_pages = node_present_pages(nid);
		if (largest < total_pages) {
			largest = total_pages;
			prefer = nid;
		}
		if ((total_pages << PAGE_SHIFT) >= (16 << 20))
			node_set(nid, interleave_nodes);
	}
	if (unlikely(nodes_empty(interleave_nodes)))
		node_set(prefer, interleave_nodes);
	if (do_set_mempolicy(MPOL_INTERLEAVE, 0, &interleave_nodes))
		pr_err("%s: interleaving failed\n", __func__);
	check_numabalancing_enable();
}
```

这段代码展示了 Linux 内核如何初始化 NUMA
策略，其核心逻辑与普通进程不同。在系统启动阶段，内核特意选择了
MPOL_INTERLEAVE（交错模式） 作为初始策略，而不是默认的本地分配。

该函数首先利用函数kmem_cache_create()创建了两个名为numa_policy（地址指针policy_cache）和shared_policy_node（地址指针sn_cache）的Slab
缓存区，分别用于存放 mempolicy
结构体和sp_node结构体。在处理共享内存段时的 NUMA
策略时使用sp_node结构体。如果内存不足无法创建这些缓存，系统将直接崩溃。

之后，函数为每个 NUMA
节点预先准备了一个优先策略，将自己设为自己的优先节点。这保证了从内核启动那一刻起，伙伴内存分配系统就开始遵循就近原则。虽然代码里初始化了这些优先自己的策略，但紧接着下面的代码却通过
do_set_mempolicy
把当前执行初始化的内核线程设为交错模式（线程级策略，即伙伴分配系统采用就近原则）。

内核希望在引导时将数据均匀分布在各个节点上，所以在引导阶段内核采用交错模式进行内存分配。该函数遍历所有带内存的节点（节点状态为N_MEMORY的节点），把容量
≥ 16MB
的节点加入交错掩码列表（<u>interleave_nodes</u>）。如果所有节点都小于16MB，则把那个最大的节点加入交错掩码。接着通过函数do_set_mempolicy()强制执行交错策略，即内核在这里将内核初始线程（0
号进程）的策略设为
交错模式，防止启动阶段的大量内核数据（如各种缓存、页表、驱动数据）全部拥挤在
Node 0
上，导致单节点内存压力过大。通过交错分布，可以均衡各个内存控制器的负载。

在函数的最后，内核通过调用check_numabalancing_enable()检查是否需要开启
自动NUMA平衡。如果开启，内核会在后台动态地根据访问频率将内存页迁移到更近的
CPU 节点。

该函数确保了内核在引导阶段不会将所有的内存分配都集中在节点0。由于 Linux
的进程属性是继承的，除非显式修改，随后产生的所有用户空间进程（包括未来的
init 进程，PID 1）默认都会沿用这一 NUMA 策略。
一旦系统进入用户态，进程可以再根据需要通过系统调用改为 MPOL_DEFAULT。

