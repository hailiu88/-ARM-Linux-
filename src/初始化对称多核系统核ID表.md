## 初始化对称多核系统核ID表

Linux为对称多核系统的每个核均分配一个名为\_\_cpu_logical_map的数组，该数组用于建立核的逻辑编号与物理编号间映射关系。Linux使用编号连续的逻辑编号，而核的物理编号有时通过寄存器的相应位置1表示，为不连续的。\_\_cpu_logical_map\[0\]保存核自身的编号，数组中第i个元素保存逻辑编号为i的CPU的物理编号，如\_\_cpu_logical_map\[1\]=1，\_\_cpu_logical_map\[2\]=2，若核自身的编号为N，则\_\_cpu_logical_map\[N\] = 0。下面函数的作用就是建立这样一张表格

```
u32 __cpu_logical_map[NR_CPUS] = { [0 ... NR_CPUS-1] =
MPIDR_INVALID };

void __init smp_setup_processor_id(void)

{

int i;

u32 mpidr = is_smp() ? read_cpuid_mpidr() & MPIDR_HWID_BITMASK : 0;

u32 cpu = MPIDR_AFFINITY_LEVEL(mpidr, 0);

cpu_logical_map(0) = cpu; //\_\_cpu_logical_map\[0\] = cpu

for (i = 1; i \< nr_cpu_ids; ++i)

cpu_logical_map(i) = i == cpu ? 0 : i;

set_my_cpu_offset(0);

pr_info("Booting Linux on physical CPU 0x%x\n", mpidr);

}
```

如果系统为对称多核处理器，mpidr的值为MPIDR寄存器的值，否则，mpidr的值为0。代码`cpu = MPIDR_AFFINITY_LEVEL(mpidr, 0)`用于获取正在运行该段代码的核的编号。后续代码建立\_\_cpu_logical_map数组并设定用于存储线程编号的内存地址。