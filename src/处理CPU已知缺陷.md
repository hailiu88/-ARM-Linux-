## 处理CPU已知缺陷

不是所有 CPU
都按理想设计工作，处理器会有两类问题。一类是传统硬件缺陷，如历史上经典的Pentium
FDIV bug、某些 cache / TLB / FPU 异常、某些厂商某代 CPU
的特殊缺陷等，这些是CPU
本身就有的缺陷。另一类是现代微架构漏洞，如Spectre、Meltdown、Spec Store
Bypass、TAA、Retbleed、SRSO等，这些不是“算错 1+1”，而是CPU
为了性能做的投机执行 / 微架构行为，导致安全问题。

Linux 启动时必须判断这颗 CPU
有没有这个问题、是否需要缓解、用哪种缓解、缓解是否依赖微码或特性位等，check_bugs()要完成上述工作。它完成的工作通常包括：

- 检测某些 历史硬件缺陷

- 标记 CPU 的 bug capability

- 决定某些 漏洞缓解策略是否启用

- 某些情况下 打开/关闭特性位

- 输出与 CPU 缺陷/缓解有关的信息

- CPU 缺陷与安全缓解总收口

对ARM架构来说，check_bug()只做两件事，检测 CPU 的
写缓冲是否存在硬件缺陷，处理特定 CPU
型号的零散硬件问题。check_bug()函数位于git/arch/arm/kernel/bugs.c，其定义为：

```
void __init check_bugs(void)
{
	check_writebuffer_bugs();
	check_other_bugs();
}
```

函数check_writebuffer_bugs()的作用是检测 CPU 的
写缓冲是否存在硬件缺陷。在早期的 ARM 处理器（如 ARM6/7 或特定的
StrongARM）上，写缓冲在处理连续写入或特定指令序列时可能会丢失数据或乱序。如果检测到
Bug，内核会修改内存页表的属性（比如禁用写缓冲），牺牲一点性能来换取数据的一致性。

函数check_other_bugs()的作用是一个兜底函数，用于处理特定 CPU
型号的零散硬件问题，比如某些旧款 ARM 内核在执行
SWP（原子交换）指令时可能存在的死锁风险，或者特定的协处理器 bug。

ARM
的这个函数是在系统正式跑起来前，先确认这颗芯片的内存读写逻辑是否可靠。如果不可靠，内核就得在软件层面打补丁绕过去。
