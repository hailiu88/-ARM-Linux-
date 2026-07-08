## RCU初始化

在 Linux 内核中，rcu_init()
是RCU子系统的核心初始化函数，在内核启动过程中起着关键作用。Linux提供两种RCU算法，分别用于不同场景。一种用于小型单核CPU，定义在git/kernel/tiny.c，适用于单核（UP）系统，代码极简，不处理多核同步问题。另一种适用于多核（SMP）系统，强调高扩展性，定义在git/kernel/tree.c文件中。在编译时，只选择其中一个进行编译。如果CONFIG_TINY_RCU=y，则编译tiny.c中的rcu_init()函数，如果CONFIG_TREE_RCU=y，则编译tree.c中的rcu_init()函数。用于多核系统的RCU初始化函数定义为：

```
void __init rcu_init(void)
{
	int cpu; 
	rcu_early_boot_tests();
	kfree_rcu_batch_init();
	rcu_bootup_announce();
	rcu_init_geometry();
	rcu_init_one();
	if (dump_tree)
		rcu_dump_rcu_node_tree();
	if (use_softirq)
		open_softirq(RCU_SOFTIRQ, rcu_core_si);
	pm_notifier(rcu_pm_notify, 0);
	for_each_online_cpu(cpu) {
		rcutree_prepare_cpu(cpu);
		rcu_cpu_starting(cpu);
		rcutree_online_cpu(cpu);
	}
	rcu_gp_wq = alloc_workqueue("rcu_gp", WQ_MEM_RECLAIM, 0);
	WARN_ON(!rcu_gp_wq);
	rcu_par_gp_wq = alloc_workqueue("rcu_par_gp", WQ_MEM_RECLAIM, 0);
	WARN_ON(!rcu_par_gp_wq);
	srcu_init();
	if (qovld < 0)
		qovld_calc = DEFAULT_RCU_QOVLD_MULT * qhimark;
	else
		qovld_calc = qovld;
}
```
这段代码可以拆解为如下几个核心功能模块：

1.  预启动与基础准备

如果内核配置了 CONFIG_PROVE_RCU
或相关调试选项，rcu_early_boot_tests()会进行早期冒烟测试，确保 RCU
在正式运行前逻辑正常。rcu_early_boot_tests()调用early_boot_test_call_rcu()测试call_rcu()、call_srcu()和kfree_rcu()函数。这些测试主要用于测试RCU
子系统初始化是否完成、回调链表是否能工作、GP 机制是否能推进、Tree SRCU
是否能正常工作、SRCU
回调是否被正确触发、自动释放内存是否正常工作。call_rcu()、call_srcu()把所用的临时数据结构体对象挂入
RCU 回调链表后，等待宽限期结束，然后调用test_callback()函数进行测试。

内存回收不能立即进行，必须等待一个完整的宽限期，因此，kfree_rcu()
并不是每个对象单独等待一个 宽限期再释放。为了优化性能，每个
CPU利用自己的 kfree_rcu_cpu结构
批量缓存，攒够一批后一次性回调释放。kfree_rcu_batch_init()初始化无锁的
kfree_rcu() 批处理回收系统（per-CPU
批量延迟释放机制）。这是内存回收的高效路径，它专门为 kfree_rcu() 建立
per-CPU 批量释放框架。

kfree_rcu_cpu结构体包含多个字段。为了更好地理解初始化代码，下面简单介绍krw_arr
、monitor_work、page_cache_work和initialized等几个比较重要的字段成员。

krw_arr以结构体类型数组（通常为2个单元）方式将回调任务分成了不同的批次，包括当前批次和等待批次。当前批次正在收集由
kvfree_rcu()
传进来的内存指针，而等待批次的收集数量已达到预定值、正在等待 RCU
宽限期结束的指针。通过数组形式，RCU
可以实现一批内存在等待宽限期时，另一批内存可以继续被收集，而不会相互阻塞。

内存回收过程可分为收集、触发宽限期、切换索引和回调释放四步。当调用
kvfree_rcu() 时，内核将指针放入当前活动的 krw_arr
索引对应的容器中。在收集到一定数量或超时后，内核会调用 call_rcu()
或者是特定的 RCU 等待函数。此时，该 krw_arr
成员的状态变为等待中，系统会切换到数组的另一个元素，继续收集新的内存释放请求。当
RCU 宽限期结束，RCU 核心会触发 krw_arr\[i\] 绑定的工作函数（通常是
kfree_rcu_work），将该批次内所有的内存真正释放回内存分配器。

krw_arr数组中的每个元素实际上是一个管理单元，包含用于向 RCU
核心注册宽限期等待的rcu_work
结构体和指向该批次数据的指针。指针指向记录这一批需要释放的 bulk_data
链表。

monitor_work是一个定时器，其作用是监控批次的等待时间。当定时器触发时，不管这个批次的累计数量是否达到预定值，都会回收内存，以免造成不必要的浪费。

在kfree_rcu_cpu 结构体中，page_cache_work 是 KVFREE_RCU（专门用于
kfree_rcu() 和 kvfree() 的 RCU
变体）中非常关键的一个组件。它的存在是为了解决一个核心矛盾，即当内存紧张时，RCU
需要内存来更高效地释放内存。它是一个标准的工作队列任务，绑定的处理函数通常是fill_page_cache_func。其核心职责是异步地为当前
CPU 申请物理页，作为缓存存放在 bkvcache
链表中，供后续的内存释放操作使用。因此，page_cache_work
就像是一个预充值机制，在后台默默地申请好页面，确保
kvfree_rcu在内存紧张时 始终有可用的页面容器。

kfree_rcu_batch_init()首先利用宏INIT_RCU_WORK(&krcp-\>krw_arr\[i\].rcu_work,
kfree_rcu_work) 初始化一个 RCU
工作批次（初始化krw_arr）。它将回调函数（krw_arr
<u>\[i\].rcu_work</u>）设置为 kfree_rcu_work。当 RCU
宽限期结束后，内核会触发此工作项来实际执行 kfree()
释放操作。之后，该函数通过宏定义INIT_DELAYED_WORK(&krcp-\>monitor_work,
kfree_rcu_monitor)初始化定时器（monitor_work），将定时器设置为函数kfree_rcu_monitor。接着通过任务初始化宏定义INIT_WORK(&krcp-\>page_cache_work,
fill_page_cache_func)，该初始化函数将page_cache_work设置为fill_page_cache_func()。

kfree_rcu_batch_init()最后的任务是把函数kfree_rcu_shrinker注册为shrinker函数。通过注册shrinker函数，RCU
子系统向内核内存管理单元传递“如果系统内存吃紧，请告诉我，我可以加速清理那些积压在缓冲区里的内存”的信息。当系统内存不足触发回收信号时，内核会回调该
shrinker 处理函数

2.  树状RCU （TreeRCU）层级结构初始化

树状 RCU是 Linux 内核中
RCU的一种分层实现方式，主要用于满足高性能、多核（SMP）系统的可扩展性需求。
与适用于单核或极小内存系统的 Tiny RCU 不同，Tree RCU
通过一种树状结构来管理 CPU
状态，从而避免了大规模系统中全局锁带来的性能瓶颈。

Tree RCU 将系统中的所有 CPU
组织成一个多层级的树状结构，包括叶子层节点（rcu_data）、中间层节点与根节点（rcu_node）和全局状态（rcu_state）。其中叶子层节点是一个
per-CPU 变量，用于存储每个 CPU 独有的 RCU
状态，如静止状态检测和回调队列管理。中间层节点与根节点构成了树的骨架。它们负责收集来自下层的静止状态信息，并逐级向上汇总到根节点。通过将
CPU 分组，每组拥有独立的锁，极大地减少了锁竞争。全局状态是整个 RCU
子系统的控制中枢，负责启动和管理宽限期，并协调 rcu_node 之间的通信。

树状RCU 的核心任务是确定何时可以安全地释放内存，即所有 CPU
都度过了宽限期。确定方法遵循自下而上，然后由上到下的路径。 每个 CPU
在自己的 rcu_data
中检测静止状态，然后在向上汇总，信息从叶子传递到对应的节点。当一个 CPU
进入静止状态，就意味着它在过去的一段时间里，没有在读取任何受 RCU
保护的共享数据。当一个节点下的所有 CPU
都报告了静止状态，该节点会向父节点报告，直至到达根节点。当根节点确认所有
CPU
已通过静止状态后，确认宽限期结束。宽限期结束后，宽限期结束的信息从根节点逐级下传，最终通知各
CPU 执行积压的回调函数（如 kfree）。

Tree RCU 的本质是通过分层汇总替代全局同步。这种设计让 Linux
内核能够顺滑地从几个CPU核芯扩展到数千个CPU核芯，同时保持 RCU
读端几乎零开销的特性

rcu_init_geometry()计算 RCU 树的几何结构（层数、每层节点数）。它会根据
NR_CPUS 和缩放因子动态计算。

rcu_init_one()实际分配并初始化 rcu_node 树和 rcu_state 结构体。

如果启动参数开启了
dump_tree，rcu_dump_rcu_node_tree()会把树状结构打印出来，用于调试 CPU
分组。

3.  事件处理机制

如果 use_softirq 为真（默认情况），open_softirq()注册 RCU_SOFTIRQ。RCU
依赖软中断来处理宽限期结束后的回调函数（如触发kfree_rcu_work执行内核内存释放）。

4.  激活当前 CPU

在内核启动的这个阶段，虽然只有 Boot CPU
在运行，但逻辑上需要完成“热插拔”的初始化步骤。for_each_online_cpu()遍历当前在线的
CPU（此时通常只有 BSP）。rcutree_prepare_cpu()为每个CPU分配私有的
rcu_data。rcu_cpu_starting()标记 CPU 开始接受 RCU
检查。rcutree_online_cpu()正式将 CPU 状态设置为
Online，允许其参与宽限期投票。

5.  为加速宽限期（expedited grace periods）以及 Tree SRCU 创建工作队列

alloc_workqueue()用于创建
名为rcu_gp的加速宽限期队列和名为rcu_par_gp的并行处理宽限期。srcu_init()初始化
可休眠的 RCU 子系统。qovld_calc为计算过载阈值。如果 RCU
队列中的回调函数数量超过这个值，内核会采取更激进的回收策略。

在RCU初始化阶段，内核处于单核运行状态，中断尚未开启，调度器也未完全接管。因此，rcu_init()
可以不依靠互斥锁而安全地修改全局拓扑结构，不需要担心并发竞争。
