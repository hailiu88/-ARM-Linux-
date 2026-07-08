## 初始化引导CPU

操作系统引导是通过一个CPU核芯完成的，通常为0号内核，因此需要初始化引导用CPU核芯。引导用CPU的初始化函数为boot_cpu_init(void)，定义在linux/kernel/cpu.c文件中，函数定义为：

```
void __init boot_cpu_init(void)

{

    int cpu = smp_processor_id();

    set_cpu_online(cpu, true);

    set_cpu_active(cpu, true);

    set_cpu_present(cpu, true);

    set_cpu_possible(cpu, true);

#ifdef CONFIG_SMP

    __boot_cpu_id = cpu;

#endif

}
```

其中的各个函数调用分别用来设置掩码\_\_cpu_online_mask，\_\_cpu_active_mask，\_\_cpu_present_mask，\_\_cpu_possible_mask中相应于各cpu核的位，以表示各个cpu是否在线、cpu是否处于活动状态、cpu是否出现在系统中等不同状态。

在函数名前的\_\_init是函数属性字段，它表示函数占用的空间仅在初始化简单使用，系统启动后可以释放函数所占内存。后面将会看到许多类似函数。