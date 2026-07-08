## 启用ACPI模式

在 Linux 内核启动流程中，acpi_subsystem_init() 是完成
ACPI核心子系统初始化的关键函数。它在 acpi_early_init()
之后执行，职责更偏向于运行时环境的建立。

前面运行的acpi_early_init()函数主要功能是解析表数据，定位 RSDP、加载
FADT/DSDT 等静态表格，初步建立 ACPI
命名空间。acpi_subsystem_init()主要功能是启动运行时逻辑，开启ACPI模式。函数位于git/drivers/acpi/bus.c，定义为：

```
void __init acpi_subsystem_init(void)
{
	acpi_status status;
	if (acpi_disabled)
		return;
	status = acpi_enable_subsystem(~ACPI_NO_ACPI_ENABLE);
	if (ACPI_FAILURE(status)) {
		printk(KERN_ERR PREFIX "Unable to enable ACPI\n");
		disable_acpi();
	} else {
		regulator_has_full_constraints();
	}
}
```

它首先检查系统是否启用acpi功能，如果没有启用则直接退出。如果启用了ACPI模式，则通过调用acpi_enable_subsystem()启动
ACPI 核心子系统，使 ACPI 进入可工作的状态，并初始化 ACPI
所需的运行环境。acpi_enable_subsystem()完成从静态数据读取到动态硬件接管的转换。它完成了以下核心任务：

- 将 acpi_gbl_early_initialization 置为 FALSE

> 告诉内核命名空间已经加载完毕，现在可以处理除了内存、I/O 和 PCI
> 配置空间之外的其他更复杂的地址空间了。

- 调用 acpi_enable()

> 向硬件写入 ACPI_ENABLE 命令（通常是往 SMI
> 命令端口写值），使硬件从传统模式正式切换到 ACPI 模式。

- 通过 acpi_tb_initialize_facs() 获取固件 ACPI
  控制结构（FACS）的永久映射

> 这对处理全局锁和系统唤醒至关重要。

- 准备好固定事件（Fixed Events）和通用目的事件（GPE）处理机制

> 包括初始化数据结构、清除硬件寄存器中的旧状态等。

- 安装系统控制中断（SCI）处理程序

> SCI 是 ACPI
> 的心脏，所有电源按钮按下、热插拔、温度报警等异步事件都靠它通知内核。

在完成模式切换后，调用regulator_has_full_constraints()把全局变量has_full_constraints置为1，告诉电压调节器框架，平台电源约束信息已经完整，它可以关闭哪些没有使用的电压调节器。
