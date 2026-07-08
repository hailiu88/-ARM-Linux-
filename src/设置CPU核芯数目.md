## 设置CPU核芯数目

对于多核系统，CPU核芯个数与后续参数设置紧密相关，因此需要确定硬件架构所包含的cpu个数。确定内核个数比较简单，通过前面硬件设置时确定的变量cpu_possible_mask中最后一位值为1的位所在的位置即可确定cpu的个数。确定cpu个数的函数定义在文件git/kernel/smp,c中，其定义为：

```
void __init setup_nr_cpu_ids(void)

{

nr_cpu_ids = find_last_bit(cpumask_bits(cpu_possible_mask), NR_CPUS) + 1;

}
```
