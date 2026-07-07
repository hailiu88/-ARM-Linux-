## Init进程选项处理

在处理完“--”之前的参数后，start_kernel()函数通过宏定义IS_ERR_OR_NULL()确定指针after_dashes是否为空或after_dashes介于-1与-4095之间。如果答案是否定的，则再一次调用函数parse_args()解析after_dashes对应的参数，即解析static_command_line中位于“--”之后的各个参数。如果参数合格，则把参数存于argv_init数组。函数的调用方式为：

parse_args("Setting init args", after_dashes, NULL, 0, -1, -1, NULL,
set_init_arg);

同样，由于传递给parse_args参数的关系，parse_args()函数直接把after_dashes指向的变量交由set_init_arg()函数解析。函数位于git/init/main.c文件中，定义为：

```
static int __init set_init_arg(char *param, char *val, const char *unused, void *arg)
{
	unsigned int i;
	if (panic_later)
		return 0;
	repair_env_string(param, val);
	for (i = 0; argv_init[i]; i++) {
		if (i == MAX_INIT_ARGS) {
			panic_later = "init";
			panic_param = param;
			return 0;
		}
	}
	argv_init[i] = param;
	return 0;
}
```

在调用函数repair_env_string(param, val)把格式为param=val和param="val"的参数统一恢复为param=val格式后，如果数组argv_init还有足够空间，则把其中的各个参数存入argv_init数组。如果没有足够的空间，则设置panic_later和panic_param变量的值。

如果还包含额外的init进程变量extra_init_args，start_kernel再一次调用parse_args，通过函数set_init_arg()把extra_init_args指向的各个变量存于argv_init数组。
