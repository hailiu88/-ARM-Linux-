## 创建UTS命名空间子系统

在计算机科学中，命名空间（Namespace）是一个广泛的概念，核心作用是提供一个独立的标识符范围，以防止重名（命名冲突）并实现逻辑隔离。

Linux
命名空间是一种内核级别的资源隔离机制。它能将原本全局的系统资源（如进程
ID、网络设备等）进行抽象，使得在不同命名空间中的进程拥有独立的资源操作空间。
就像在同一台电脑上分出了多个“平行宇宙”，每个宇宙里的进程都以为自己拥有整套操作系统资源。

目前 Linux 内核主要支持以下七种命名空间，每种隔离不同的资源：

| 命名空间 | 类型 | 隔离的资源典型应用 |
|----|----|----|
| Mount | 挂载点、文件系统视图 | 让容器拥有自己独立的根文件系统 (/) |
| UTS | 主机名与 NIS 域名 | 让每个容器可以设置自己的主机名 |
| IPC | 信号量、消息队列、共享内存 | 防止不同容器间的进程通过共享内存通信 |
| PID | 进程 ID 数字范围 | 容器内的初始进程 PID 为 1，且看不到宿主机的进程 |
| Network | 网络设备、IP、路由表、端口 | 让每个容器拥有独立的虚拟网卡和 IP 地址 |
| User | 用户 UID 和组 GID | 实现“容器内是 root，宿主机是普通用户”的安全机制 |
| Cgroup | cgroup 层级视图 | 隔离进程对系统资源（如 CPU、内存）限制的视图 |

使用命名空间，其优点主要表现在：

- 容器化基础

> 如果没有命名空间，所有的进程都会看到相同的主机名、网卡和进程列表，无法实现真正的“轻量化虚拟机”。

- 安全性

> 进程被限制在特定的空间内，无法直接访问或干扰空间外的资源。

- 环境一致性

> 允许在同一台宿主机上运行多个版本冲突的服务（如两个都需要占用 80 端口的
> Web 服务器）。

UTS（UNIX Timesharing System）命名空间是 Linux
内核提供的一种资源隔离机制，主要用于隔离系统的主机名和 NIS 域名。
该命名空间允许每个容器或进程拥有独立的主机名和域名。它是容器技术（如
Docker、Podman）实现独立虚拟系统感的核心组件之一。

在一个 UTS 命名空间中修改主机名，不会影响宿主机或其他命名空间。使用
clone() 或 unshare()
创建新命名空间时，新空间会拷贝父空间的当前主机名和域名。创建 UTS
命名空间通常需要root
权限，以防止非特权用户通过修改主机名干扰依赖该名称的系统锁或安全验证。

在 Linux 内核启动流程中，uts_ns_init()
是一个关键的初始化函数，主要负责初始化 UTS
命名空间。其核心任务是初始化内核中的 UTS
命名空间子系统，为UTS命名空间使用的uts_namespace结构体分配一个名为uts_namespace的缓存区。函数位于git/kernel/utsname.c，定义为：

```
void __init uts_ns_init(void)
{
	uts_ns_cache = kmem_cache_create_usercopy(
		"uts_namespace", sizeof(struct uts_namespace), 0,
		SLAB_PANIC|SLAB_ACCOUNT,
		offsetof(struct uts_namespace, name),
		sizeof_field(struct uts_namespace, name), NULL);
}
```

uts_ns_init() 函数通过调用kmem_cache_create_usercopy()为 UTS
命名空间创建一个名为uts_namespace的专用slab 缓存，用于高效分配 struct
uts_namespace 对象。通过name字段起始位置和name
字段大小，该函数额外定义了一个可以安全与用户态进行数据拷贝的白名单区域，限制了可被用户空间访问的内存范围为uts_namespace
结构体的整个name字段。带 usercopy 安全限制的 slab
缓存创建函数，相比普通的 kmem_cache_create，多了用户拷贝控制能力。

在编译阶段，内核通过静态声明（在文件git/init/version.c）：

```
struct uts_namespace init_uts_ns = {
	.kref = KREF_INIT(2),
	.name = {
		.sysname	= UTS_SYSNAME,
		.nodename	= UTS_NODENAME,
		.release	= UTS_RELEASE,
		.version	= UTS_VERSION,
		.machine	= UTS_MACHINE,
		.domainname	= UTS_DOMAINNAME,
	},
	.user_ns = &init_user_ns,
	.ns.inum = PROC_UTS_INIT_INO,
#ifdef CONFIG_UTS_NS
	.ns.ops = &utsns_operations,
#endif
}
```

初始化 init_uts_ns
结构体变量，为0号进程和1号进程（init进程）创建了默认的uts命名空间。该结构体变量包含了系统默认的内核版本、操作系统名称、节点名称等信息。
