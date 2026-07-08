## 准备引导cpu

引导cpu的准备与硬件架构有关。arm架构下准备引导cpu的函数定义在文件git/arch/arm/kernel/smp.c文件里，其定义为：

```
void __init smp_prepare_boot_cpu(void)

{

set_my_cpu_offset(per_cpu_offset(smp_processor_id()));

}
```

其中，smp_processor_id()返回值为0，即第一个cpu作为引导cpu。函数per_cpu_offset()为宏定义，其定义为`#defineper_cpu_offset(x) (__per_cpu_offset[x])`，用来获取某一cpu的per_cpu变量在专用 内存的偏移地址。函数set_my_cpu_offset把per_cpu变量的偏移地址写入cp15协处理器的TPIDRPRW寄存器，所以函数smp_prepare_boot_cpu(void)的作用是把第一个cpu专用内存地址偏移量写入cp15的TPIDRPRW寄存器。TPIDRWRP寄存器保存用于存储线程信息的内存地址。

