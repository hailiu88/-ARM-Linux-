// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="introduction.html">前言</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_1.html"><strong aria-hidden="true">1.</strong> 第一章 Linux简介</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux发展历程.html"><strong aria-hidden="true">1.1.</strong> Linux发展历程</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux体系结构.html"><strong aria-hidden="true">1.2.</strong> Linux体系结构</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux的优势与缺陷.html"><strong aria-hidden="true">1.3.</strong> Linux的优势与缺陷</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="esmart.html"><strong aria-hidden="true">1.4.</strong> 基于i.Mx 6 solo的多功能Linux开发系统</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux 命令结构.html"><strong aria-hidden="true">1.5.</strong> Linux命令结构</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="命令帮助与查询.html"><strong aria-hidden="true">1.6.</strong> 命令帮助与查询</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="文件与目录操作命令.html"><strong aria-hidden="true">1.7.</strong> 文件与目录操作命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="文件查看命令.html"><strong aria-hidden="true">1.8.</strong> 文件查看命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="权限与属性管理.html"><strong aria-hidden="true">1.9.</strong> 权限与属性管理</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="查找与搜索.html"><strong aria-hidden="true">1.10.</strong> 查找与搜索</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="压缩与解压.html"><strong aria-hidden="true">1.11.</strong> 压缩与解压</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="进程管理.html"><strong aria-hidden="true">1.12.</strong> 进程管理</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="磁盘与系统信息.html"><strong aria-hidden="true">1.13.</strong> 磁盘与系统信息</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="管道与重定向.html"><strong aria-hidden="true">1.14.</strong> 管道与重定向</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="其它常用命令.html"><strong aria-hidden="true">1.15.</strong> 其它常用命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="通配符.html"><strong aria-hidden="true">1.16.</strong> 通配符</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux目录结构.html"><strong aria-hidden="true">1.17.</strong> Linux目录结构</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_2.html"><strong aria-hidden="true">2.</strong> 第二章 U-BOOT引导程序</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="U-BOOT命令.html"><strong aria-hidden="true">2.1.</strong> u-boot命令</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="环境变量.html"><strong aria-hidden="true">2.2.</strong> 环境变量</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="U-BOOT脚本编写.html"><strong aria-hidden="true">2.3.</strong> u-boot脚本编写</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_3.html"><strong aria-hidden="true">3.</strong> 第三章 设备树</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设备树结构.html"><strong aria-hidden="true">3.1.</strong> 设备树结构</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="标准属性.html"><strong aria-hidden="true">3.2.</strong> 标准属性</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设备树节点.html"><strong aria-hidden="true">3.3.</strong> 设备树节点</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="属性绑定（bindings）.html"><strong aria-hidden="true">3.4.</strong> 属性绑定（bindings）</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="扁平化设备树（DTB）格式.html"><strong aria-hidden="true">3.5.</strong> 扁平化设备树格式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设备树源文件(.dts)格式.html"><strong aria-hidden="true">3.6.</strong> 设备树源文件格式</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_4.html"><strong aria-hidden="true">4.</strong> 第四章 操作系统的引导过程</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="操作系统引导过程.html"><strong aria-hidden="true">4.1.</strong> 操作系统引导过程</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="台式机与笔记本电脑操作系统与硬件接口.html"><strong aria-hidden="true">4.2.</strong> 台式机与笔记本电脑操作系统与硬件接口</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="嵌入式系统硬件与操作系统接口.html"><strong aria-hidden="true">4.3.</strong> 嵌入式系统硬件与操作系统接口</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="引导程序.html"><strong aria-hidden="true">4.4.</strong> 引导程序</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_5.html"><strong aria-hidden="true">5.</strong> 第五章 U-BOOT引导</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="U-BOOT引导流程.html"><strong aria-hidden="true">5.1.</strong> U-BOOT引导流程</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="系统启动.html"><strong aria-hidden="true">5.2.</strong> 系统启动</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化c语言运行环境.html"><strong aria-hidden="true">5.3.</strong> 初始化c语言运行环境</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="系统硬件初始化.html"><strong aria-hidden="true">5.4.</strong> 系统硬件初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="U-BOOT运行.html"><strong aria-hidden="true">5.5.</strong> U-BOOT运行</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="引导Linux内核.html"><strong aria-hidden="true">5.6.</strong> 引导Linux内核</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_6.html"><strong aria-hidden="true">6.</strong> 第六章 Linux初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设置CPU模式.html"><strong aria-hidden="true">6.1.</strong> 设置CPU模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="修改地址转换程序.html"><strong aria-hidden="true">6.2.</strong> 修改地址转换程序</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化地址转换页表.html"><strong aria-hidden="true">6.3.</strong> 初始化地址转换页表</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_7.html"><strong aria-hidden="true">7.</strong> 第七章 内核启动-启动准备</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设置初始化任务堆栈结尾魔术字.html"><strong aria-hidden="true">7.1.</strong> 设置初始化任务堆栈结尾魔术字</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化对称多核系统核ID表.html"><strong aria-hidden="true">7.2.</strong> 初始化对称多核系统核ID表</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="调试对象基础结构早期初始化.html"><strong aria-hidden="true">7.3.</strong> 调式对象基础结构早期初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="控制组早期初始化.html"><strong aria-hidden="true">7.4.</strong> 控制组早期初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="停用中断.html"><strong aria-hidden="true">7.5.</strong> 停用中断</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化引导CPU.html"><strong aria-hidden="true">7.6.</strong> 初始化引导CPU</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="页表地址初始化.html"><strong aria-hidden="true">7.7.</strong> 页表地址初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="安全模块（lsm）初期初始化.html"><strong aria-hidden="true">7.8.</strong> 安全模块早期初始化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_8.html"><strong aria-hidden="true">8.</strong> 第八章 内核启动-基于框架的硬件设置</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="基本概念8.html"><strong aria-hidden="true">8.1.</strong> 基本概念</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="基于架构的初始化函数.html"><strong aria-hidden="true">8.2.</strong> 基于框架的初始化函数</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_9.html"><strong aria-hidden="true">9.</strong> 第九章 内核启动-引导配置</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Bootconfig文件.html"><strong aria-hidden="true">9.1.</strong> Bootconfig文件</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Bootconfig文件解析.html"><strong aria-hidden="true">9.2.</strong> Bootconfig文件解析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="命令行参数合并.html"><strong aria-hidden="true">9.3.</strong> 命令行参数合并</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_10.html"><strong aria-hidden="true">10.</strong> 第十章 对称多核启动模式下CPU设置</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设置CPU核芯数目.html"><strong aria-hidden="true">10.1.</strong> 设置CPU核芯数目</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="为每个内核指定一块专用内存.html"><strong aria-hidden="true">10.2.</strong> 为每个内核指定一块专用内存</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="准备引导cpu.html"><strong aria-hidden="true">10.3.</strong> 准备引导CPU</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="热插拔状态初始化.html"><strong aria-hidden="true">10.4.</strong> 热插拔状态初始化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_11.html"><strong aria-hidden="true">11.</strong> 第十一章 内存节点和区域初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="节点和区域.html"><strong aria-hidden="true">11.1.</strong> 节点和区域</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="区域结构体初始化.html"><strong aria-hidden="true">11.2.</strong> 区域结构体初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="热插拔内存管理初始化.html"><strong aria-hidden="true">11.3.</strong> 热插拔内存管理初始化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_12.html"><strong aria-hidden="true">12.</strong> 第十二章 跳转标号初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="跳转标号修改.html"><strong aria-hidden="true">12.1.</strong> 跳转标号修改</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="通过标号修改优化程序性能的基本原理.html"><strong aria-hidden="true">12.2.</strong> 通过标号修改优化程序性能的原理</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Jump_entry的生成.html"><strong aria-hidden="true">12.3.</strong> jump_entry的生成</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="静态关键字的使用方法.html"><strong aria-hidden="true">12.4.</strong> 静态关键字的使用方法</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化跳转表.html"><strong aria-hidden="true">12.5.</strong> 初始化跳转表</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_13.html"><strong aria-hidden="true">13.</strong> 第十三章 命令行参数解析</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内核命令行参数.html"><strong aria-hidden="true">13.1.</strong> 内核命令行参数</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="前期选项解析.html"><strong aria-hidden="true">13.2.</strong> 前期选项解析</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="命令行选项和环境变量分离.html"><strong aria-hidden="true">13.3.</strong> 命令行选项和环境变量分离</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Init进程选项处理.html"><strong aria-hidden="true">13.4.</strong> init进程选项处理</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_14.html"><strong aria-hidden="true">14.</strong> 第十四章 缓存区及异常处理程序初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="日志缓存区设置.html"><strong aria-hidden="true">14.1.</strong> 日志缓存区设置</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="虚拟文件系统缓冲区初始化.html"><strong aria-hidden="true">14.2.</strong> 虚拟文件系统缓存区初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="异常处理程序排队.html"><strong aria-hidden="true">14.3.</strong> 异常处理程序排队</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="陷阱初始化.html"><strong aria-hidden="true">14.4.</strong> 陷阱初始化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_15.html"><strong aria-hidden="true">15.</strong> 第十五章 Linux内存初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="基本概念.html"><strong aria-hidden="true">15.1.</strong> 基本概念</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存分配算法.html"><strong aria-hidden="true">15.2.</strong> 内存分配算法</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="红黑树.html"><strong aria-hidden="true">15.3.</strong> 红黑树</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="页面交换与虚拟内存映射.html"><strong aria-hidden="true">15.4.</strong> 页面交换与虚拟内存映射</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存迁移.html"><strong aria-hidden="true">15.5.</strong> 内存迁移</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存回收.html"><strong aria-hidden="true">15.6.</strong> 内存回收</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存规整.html"><strong aria-hidden="true">15.7.</strong> 内存规整</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="相同页合并.html"><strong aria-hidden="true">15.8.</strong> 相同页合并</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存泄漏检测子系统.html"><strong aria-hidden="true">15.9.</strong> 内存泄漏检测子系统</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="调试对象子系统.html"><strong aria-hidden="true">15.10.</strong> 调试对象子系统</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存资源管理器.html"><strong aria-hidden="true">15.11.</strong> 内存资源管理器</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存初始化函数.html"><strong aria-hidden="true">15.12.</strong> 内存初始化函数</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_16.html"><strong aria-hidden="true">16.</strong> 第十六章 内核函数运行跟踪模块初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="函数运行跟踪子系统简介.html"><strong aria-hidden="true">16.1.</strong> 函数运行跟踪子系统简介</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="函数跟踪模块初始化.html"><strong aria-hidden="true">16.2.</strong> 函数跟踪模块初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="早期跟踪框架设置.html"><strong aria-hidden="true">16.3.</strong> 早期跟踪框架设置</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_17.html"><strong aria-hidden="true">17.</strong> 第十七章 任务调度模块初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="任务调度器简介.html"><strong aria-hidden="true">17.1.</strong> 任务调度器简介</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="等待队列初始化.html"><strong aria-hidden="true">17.2.</strong> 等待队列初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="不同类别调度组初始化.html"><strong aria-hidden="true">17.3.</strong> 不同类别调度组初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="运行队列初始化.html"><strong aria-hidden="true">17.4.</strong> 运行队列初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="任务权重及上下文切换机制设置.html"><strong aria-hidden="true">17.5.</strong> 任务权重及上下文切换机制设置</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="空闲进程设置.html"><strong aria-hidden="true">17.6.</strong> 空闲进程设置</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="公平调度策略基础设置.html"><strong aria-hidden="true">17.7.</strong> 公平调度策略基础设置</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="时钟节拍机制设置.html"><strong aria-hidden="true">17.8.</strong> 时钟节拍机制设置</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="调度任务统计及资源压力信息功能设置.html"><strong aria-hidden="true">17.9.</strong> 调度任务统计及资源压力信息功能设置</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="利用率钳制功能设置.html"><strong aria-hidden="true">17.10.</strong> 利用率钳制功能设置</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_18.html"><strong aria-hidden="true">18.</strong> 第十八章 基数树、内核隔离及任务队列初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="基数树简介.html"><strong aria-hidden="true">18.1.</strong> 基数树简介</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="基数树初始化.html"><strong aria-hidden="true">18.2.</strong> 基数树初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内核隔离.html"><strong aria-hidden="true">18.3.</strong> 内核隔离</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="工作队列早期初始化.html"><strong aria-hidden="true">18.4.</strong> 工作队列早期初始化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_19.html"><strong aria-hidden="true">19.</strong> 第十九章 RCU机制初始化及事件跟踪初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="RCU简介.html"><strong aria-hidden="true">19.1.</strong> RCU简介</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="RCU初始化.html"><strong aria-hidden="true">19.2.</strong> RCU初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="事件跟踪.html"><strong aria-hidden="true">19.3.</strong> 事件跟踪</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="事件跟踪子系统初始化.html"><strong aria-hidden="true">19.4.</strong> 事件跟踪子系统初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="开启初始化调用事件跟踪功能.html"><strong aria-hidden="true">19.5.</strong> 开启初始化调用事件跟踪功能</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="上下文跟踪初始化.html"><strong aria-hidden="true">19.6.</strong> 上下文跟踪初始化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_20.html"><strong aria-hidden="true">20.</strong> 第二十章 中断系统初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="通用中断子系统.html"><strong aria-hidden="true">20.1.</strong> 通用中断子系统</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="重要数据结构.html"><strong aria-hidden="true">20.2.</strong> 重要数据结构</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="中断注册.html"><strong aria-hidden="true">20.3.</strong> 中断注册</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="满足框架的中断特殊需求.html"><strong aria-hidden="true">20.4.</strong> 满足框架的中断特殊需求</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="针对框架的中断初始化.html"><strong aria-hidden="true">20.5.</strong> 针对框架的中断特殊需求</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_21.html"><strong aria-hidden="true">21.</strong> 第二十一章 时间子系统内核框架层初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="时钟子系统简介.html"><strong aria-hidden="true">21.1.</strong> 时钟子系统简介</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="搭建时钟节拍和广播框架.html"><strong aria-hidden="true">21.2.</strong> 搭建时钟节拍和广播框架</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立定时器框架.html"><strong aria-hidden="true">21.3.</strong> 建立定时器框架</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="搭建高精度定时器子系统.html"><strong aria-hidden="true">21.4.</strong> 搭建高精度定时器子系统</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立软中断框架.html"><strong aria-hidden="true">21.5.</strong> 建立软中断框架</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内核计时体系建立.html"><strong aria-hidden="true">21.6.</strong> 内核计时体系建立</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_22.html"><strong aria-hidden="true">22.</strong> 第二十二章 加固保险箱</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="计算机安全的重要性.html"><strong aria-hidden="true">22.1.</strong> 计算机安全的重要性</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化随机数生成器的源.html"><strong aria-hidden="true">22.2.</strong> 初始化随机数生成器的源</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="获取“潜伏熵”.html"><strong aria-hidden="true">22.3.</strong> 获取潜伏熵</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="利用设备微调.html"><strong aria-hidden="true">22.4.</strong> 利用设备微调</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化栈金丝雀.html"><strong aria-hidden="true">22.5.</strong> 初始化栈金丝雀</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_23.html"><strong aria-hidden="true">23.</strong> 第二十三章 时间基准与多核通信</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="时间基准初始化.html"><strong aria-hidden="true">23.1.</strong> 时间基准初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="性能监控初始化.html"><strong aria-hidden="true">23.2.</strong> 性能监控初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="剖析工具初始化.html"><strong aria-hidden="true">23.3.</strong> 剖析工具初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="创建多核通信机制.html"><strong aria-hidden="true">23.4.</strong> 创建多核通信机制</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_24.html"><strong aria-hidden="true">24.</strong> 第二十四章 控制台开启与锁自测</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux控制台.html"><strong aria-hidden="true">24.1.</strong> Linux控制台</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="进入交互阶段.html"><strong aria-hidden="true">24.2.</strong> 进入交互阶段</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内存池收尾.html"><strong aria-hidden="true">24.3.</strong> 内存池收尾</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="创建控制台.html"><strong aria-hidden="true">24.4.</strong> 创建控制台</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="创建死锁检测机制.html"><strong aria-hidden="true">24.5.</strong> 创建死锁检测机制</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_25.html"><strong aria-hidden="true">25.</strong> 第二十五章 内存和时间初始化收尾</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立内存加密机制.html"><strong aria-hidden="true">25.1.</strong> 建立内存加密机制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="initrd安全检查.html"><strong aria-hidden="true">25.2.</strong> initrd安全检查</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设置内存页集合.html"><strong aria-hidden="true">25.3.</strong> 设置内存页集合</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化 NUMA策略.html"><strong aria-hidden="true">25.4.</strong> 初始化NUMA策略</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化高级配置与电源接口.html"><strong aria-hidden="true">25.5.</strong> 初始化高级配置与电源接口</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="定时器初始化收尾.html"><strong aria-hidden="true">25.6.</strong> 定时器初始化收尾</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="初始化调度器时钟.html"><strong aria-hidden="true">25.7.</strong> 初始化调度器时钟</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="延迟校准.html"><strong aria-hidden="true">25.8.</strong> 延迟校准</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_26.html"><strong aria-hidden="true">26.</strong> 第二十六章 建立进程创建基础</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="进程 ID（PID）管理机制初始化.html"><strong aria-hidden="true">26.1.</strong> 进程ID（PID）管理机制初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立匿名内存管理机制.html"><strong aria-hidden="true">26.2.</strong> 建立匿名内存管理机制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="切换EFI固件到虚拟地址.html"><strong aria-hidden="true">26.3.</strong> 切换EFI固件到虚拟地址</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设置线程栈的缓存池.html"><strong aria-hidden="true">26.4.</strong> 设置线程栈的缓存池</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="创建凭证管理机制.html"><strong aria-hidden="true">26.5.</strong> 创建凭证管理机制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="为进程派生准备资源.html"><strong aria-hidden="true">26.6.</strong> 为进程派生准备资源</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="准备进程运行资源.html"><strong aria-hidden="true">26.7.</strong> 准备进程运行资源</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_27.html"><strong aria-hidden="true">27.</strong> 第二十七章 核心内核功能子系统初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="创建UTS命名空间子系统.html"><strong aria-hidden="true">27.1.</strong> 创建UTS命名空间子系统</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立文件系统缓冲区管理机制.html"><strong aria-hidden="true">27.2.</strong> 建立文件系统缓冲区管理机制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="设立密钥管理保留区.html"><strong aria-hidden="true">27.3.</strong> 设立密钥管理保留区</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立安全子系统架构.html"><strong aria-hidden="true">27.4.</strong> 建立安全子系统架构</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="调试模式切换.html"><strong aria-hidden="true">27.5.</strong> 调试模式切换</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立文件系统缓存.html"><strong aria-hidden="true">27.6.</strong> 建立文件系统缓存</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立页面缓存机制.html"><strong aria-hidden="true">27.7.</strong> 建立页面缓存机制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立信号处理机制.html"><strong aria-hidden="true">27.8.</strong> 建立信号处理机制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="序列文件初始化.html"><strong aria-hidden="true">27.9.</strong> 序列文件初始化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_28.html"><strong aria-hidden="true">28.</strong> 第二十八章 用户接口和容器能力建立</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="进程信息根目录建立.html"><strong aria-hidden="true">28.1.</strong> 进程信息根目录建立</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="cpuset机制初始化.html"><strong aria-hidden="true">28.2.</strong> cpuset机制初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="构造完整系统资源管控框架.html"><strong aria-hidden="true">28.3.</strong> 构造完整系统资源管控框架</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_29.html"><strong aria-hidden="true">29.</strong> 第二十九章 平台与体系结构后置初始化</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="内核代码热修补机制初始化.html"><strong aria-hidden="true">29.1.</strong> 内核代码热修补机制初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="处理CPU已知缺陷.html"><strong aria-hidden="true">29.2.</strong> 处理CPU已知缺陷</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="启用ACPI模式.html"><strong aria-hidden="true">29.3.</strong> 启用ACPI模式</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="ACPI底层硬件配置.html"><strong aria-hidden="true">29.4.</strong> ACPI底层硬件配置</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="补充平台设备或硬件描述信息.html"><strong aria-hidden="true">29.5.</strong> 补充平台设备或硬件描述信息</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="建立数据并发错误检测机制.html"><strong aria-hidden="true">29.6.</strong> 建立数据并发错误检测机制</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_30.html"><strong aria-hidden="true">30.</strong> 第三十章 迈入内核正常运行阶段</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="开启多任务运行机制.html"><strong aria-hidden="true">30.1.</strong> 开启多任务运行机制</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="进入用户空间.html"><strong aria-hidden="true">30.2.</strong> 进入用户空间</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="执行可释放的后续初始化.html"><strong aria-hidden="true">30.3.</strong> 执行可释放的后续初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="initcall机制简介.html"><strong aria-hidden="true">30.4.</strong> initcall机制简介</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="外设及子系统初始化.html"><strong aria-hidden="true">30.5.</strong> 外设及子系统初始化</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="回收启动期专用资源并完成内核映射收尾.html"><strong aria-hidden="true">30.6.</strong> 回收启动期专用资源并完成内核映射收尾</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="标记系统正式进入运行状态.html"><strong aria-hidden="true">30.7.</strong> 标记系统正式进入运行状态</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="启动用户空间 init 程序.html"><strong aria-hidden="true">30.8.</strong> 启动用户空间init程序</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="阻止编译器优化.html"><strong aria-hidden="true">30.9.</strong> 阻止编译器优化</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="chapter_31.html"><strong aria-hidden="true">31.</strong> 第三十一章 Linux操作系统移植</a></span><ol class="section"><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux移植的意义.html"><strong aria-hidden="true">31.1.</strong> Linux移植的意义</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="构建开发环境.html"><strong aria-hidden="true">31.2.</strong> 构建开发环境</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="构建Yocto开发环境.html"><strong aria-hidden="true">31.3.</strong> 构建Yocto开发环境</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="U-BOOT引导程序移植.html"><strong aria-hidden="true">31.4.</strong> U-BOOT引导程序移植</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="Linux操作系统移植.html"><strong aria-hidden="true">31.5.</strong> Linux操作系统移植</a></span></li></ol><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="end.html"><strong aria-hidden="true">32.</strong> 结束语</a></span></li><li class="chapter-item expanded "><span class="chapter-link-wrapper"><a href="声明.html"><strong aria-hidden="true">33.</strong> 版权声明</a></span></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split('#')[0].split('?')[0];
        if (current_page.endsWith('/')) {
            current_page += 'index.html';
        }
        const links = Array.prototype.slice.call(this.querySelectorAll('a'));
        const l = links.length;
        for (let i = 0; i < l; ++i) {
            const link = links[i];
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The 'index' page is supposed to alias the first chapter in the book.
            // Check both with and without the '.html' suffix to be robust against pretty URLs
            if (link.href.replace(/\.html$/, '') === current_page.replace(/\.html$/, '')
                || i === 0
                && path_to_root === ''
                && current_page.endsWith('/index.html')) {
                link.classList.add('active');
                let parent = link.parentElement;
                while (parent) {
                    if (parent.tagName === 'LI' && parent.classList.contains('chapter-item')) {
                        parent.classList.add('expanded');
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                const clientRect = e.target.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                sessionStorage.setItem('sidebar-scroll-offset', clientRect.top - sidebarRect.top);
            }
        }, { passive: true });
        const sidebarScrollOffset = sessionStorage.getItem('sidebar-scroll-offset');
        sessionStorage.removeItem('sidebar-scroll-offset');
        if (sidebarScrollOffset !== null) {
            // preserve sidebar scroll position when navigating via links within sidebar
            const activeSection = this.querySelector('.active');
            if (activeSection) {
                const clientRect = activeSection.getBoundingClientRect();
                const sidebarRect = this.getBoundingClientRect();
                const currentOffset = clientRect.top - sidebarRect.top;
                this.scrollTop += currentOffset - parseFloat(sidebarScrollOffset);
            }
        } else {
            // scroll sidebar to current active section when navigating via
            // 'next/previous chapter' buttons
            const activeSection = document.querySelector('#mdbook-sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        const sidebarAnchorToggles = document.querySelectorAll('.chapter-fold-toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(el => {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define('mdbook-sidebar-scrollbox', MDBookSidebarScrollbox);


// ---------------------------------------------------------------------------
// Support for dynamically adding headers to the sidebar.

(function() {
    // This is used to detect which direction the page has scrolled since the
    // last scroll event.
    let lastKnownScrollPosition = 0;
    // This is the threshold in px from the top of the screen where it will
    // consider a header the "current" header when scrolling down.
    const defaultDownThreshold = 150;
    // Same as defaultDownThreshold, except when scrolling up.
    const defaultUpThreshold = 300;
    // The threshold is a virtual horizontal line on the screen where it
    // considers the "current" header to be above the line. The threshold is
    // modified dynamically to handle headers that are near the bottom of the
    // screen, and to slightly offset the behavior when scrolling up vs down.
    let threshold = defaultDownThreshold;
    // This is used to disable updates while scrolling. This is needed when
    // clicking the header in the sidebar, which triggers a scroll event. It
    // is somewhat finicky to detect when the scroll has finished, so this
    // uses a relatively dumb system of disabling scroll updates for a short
    // time after the click.
    let disableScroll = false;
    // Array of header elements on the page.
    let headers;
    // Array of li elements that are initially collapsed headers in the sidebar.
    // I'm not sure why eslint seems to have a false positive here.
    // eslint-disable-next-line prefer-const
    let headerToggles = [];
    // This is a debugging tool for the threshold which you can enable in the console.
    let thresholdDebug = false;

    // Updates the threshold based on the scroll position.
    function updateThreshold() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // The number of pixels below the viewport, at most documentHeight.
        // This is used to push the threshold down to the bottom of the page
        // as the user scrolls towards the bottom.
        const pixelsBelow = Math.max(0, documentHeight - (scrollTop + windowHeight));
        // The number of pixels above the viewport, at least defaultDownThreshold.
        // Similar to pixelsBelow, this is used to push the threshold back towards
        // the top when reaching the top of the page.
        const pixelsAbove = Math.max(0, defaultDownThreshold - scrollTop);
        // How much the threshold should be offset once it gets close to the
        // bottom of the page.
        const bottomAdd = Math.max(0, windowHeight - pixelsBelow - defaultDownThreshold);
        let adjustedBottomAdd = bottomAdd;

        // Adjusts bottomAdd for a small document. The calculation above
        // assumes the document is at least twice the windowheight in size. If
        // it is less than that, then bottomAdd needs to be shrunk
        // proportional to the difference in size.
        if (documentHeight < windowHeight * 2) {
            const maxPixelsBelow = documentHeight - windowHeight;
            const t = 1 - pixelsBelow / Math.max(1, maxPixelsBelow);
            const clamp = Math.max(0, Math.min(1, t));
            adjustedBottomAdd *= clamp;
        }

        let scrollingDown = true;
        if (scrollTop < lastKnownScrollPosition) {
            scrollingDown = false;
        }

        if (scrollingDown) {
            // When scrolling down, move the threshold up towards the default
            // downwards threshold position. If near the bottom of the page,
            // adjustedBottomAdd will offset the threshold towards the bottom
            // of the page.
            const amountScrolledDown = scrollTop - lastKnownScrollPosition;
            const adjustedDefault = defaultDownThreshold + adjustedBottomAdd;
            threshold = Math.max(adjustedDefault, threshold - amountScrolledDown);
        } else {
            // When scrolling up, move the threshold down towards the default
            // upwards threshold position. If near the bottom of the page,
            // quickly transition the threshold back up where it normally
            // belongs.
            const amountScrolledUp = lastKnownScrollPosition - scrollTop;
            const adjustedDefault = defaultUpThreshold - pixelsAbove
                + Math.max(0, adjustedBottomAdd - defaultDownThreshold);
            threshold = Math.min(adjustedDefault, threshold + amountScrolledUp);
        }

        if (documentHeight <= windowHeight) {
            threshold = 0;
        }

        if (thresholdDebug) {
            const id = 'mdbook-threshold-debug-data';
            let data = document.getElementById(id);
            if (data === null) {
                data = document.createElement('div');
                data.id = id;
                data.style.cssText = `
                    position: fixed;
                    top: 50px;
                    right: 10px;
                    background-color: 0xeeeeee;
                    z-index: 9999;
                    pointer-events: none;
                `;
                document.body.appendChild(data);
            }
            data.innerHTML = `
                <table>
                  <tr><td>documentHeight</td><td>${documentHeight.toFixed(1)}</td></tr>
                  <tr><td>windowHeight</td><td>${windowHeight.toFixed(1)}</td></tr>
                  <tr><td>scrollTop</td><td>${scrollTop.toFixed(1)}</td></tr>
                  <tr><td>pixelsAbove</td><td>${pixelsAbove.toFixed(1)}</td></tr>
                  <tr><td>pixelsBelow</td><td>${pixelsBelow.toFixed(1)}</td></tr>
                  <tr><td>bottomAdd</td><td>${bottomAdd.toFixed(1)}</td></tr>
                  <tr><td>adjustedBottomAdd</td><td>${adjustedBottomAdd.toFixed(1)}</td></tr>
                  <tr><td>scrollingDown</td><td>${scrollingDown}</td></tr>
                  <tr><td>threshold</td><td>${threshold.toFixed(1)}</td></tr>
                </table>
            `;
            drawDebugLine();
        }

        lastKnownScrollPosition = scrollTop;
    }

    function drawDebugLine() {
        if (!document.body) {
            return;
        }
        const id = 'mdbook-threshold-debug-line';
        const existingLine = document.getElementById(id);
        if (existingLine) {
            existingLine.remove();
        }
        const line = document.createElement('div');
        line.id = id;
        line.style.cssText = `
            position: fixed;
            top: ${threshold}px;
            left: 0;
            width: 100vw;
            height: 2px;
            background-color: red;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(line);
    }

    function mdbookEnableThresholdDebug() {
        thresholdDebug = true;
        updateThreshold();
        drawDebugLine();
    }

    window.mdbookEnableThresholdDebug = mdbookEnableThresholdDebug;

    // Updates which headers in the sidebar should be expanded. If the current
    // header is inside a collapsed group, then it, and all its parents should
    // be expanded.
    function updateHeaderExpanded(currentA) {
        // Add expanded to all header-item li ancestors.
        let current = currentA.parentElement;
        while (current) {
            if (current.tagName === 'LI' && current.classList.contains('header-item')) {
                current.classList.add('expanded');
            }
            current = current.parentElement;
        }
    }

    // Updates which header is marked as the "current" header in the sidebar.
    // This is done with a virtual Y threshold, where headers at or below
    // that line will be considered the current one.
    function updateCurrentHeader() {
        if (!headers || !headers.length) {
            return;
        }

        // Reset the classes, which will be rebuilt below.
        const els = document.getElementsByClassName('current-header');
        for (const el of els) {
            el.classList.remove('current-header');
        }
        for (const toggle of headerToggles) {
            toggle.classList.remove('expanded');
        }

        // Find the last header that is above the threshold.
        let lastHeader = null;
        for (const header of headers) {
            const rect = header.getBoundingClientRect();
            if (rect.top <= threshold) {
                lastHeader = header;
            } else {
                break;
            }
        }
        if (lastHeader === null) {
            lastHeader = headers[0];
            const rect = lastHeader.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top >= windowHeight) {
                return;
            }
        }

        // Get the anchor in the summary.
        const href = '#' + lastHeader.id;
        const a = [...document.querySelectorAll('.header-in-summary')]
            .find(element => element.getAttribute('href') === href);
        if (!a) {
            return;
        }

        a.classList.add('current-header');

        updateHeaderExpanded(a);
    }

    // Updates which header is "current" based on the threshold line.
    function reloadCurrentHeader() {
        if (disableScroll) {
            return;
        }
        updateThreshold();
        updateCurrentHeader();
    }


    // When clicking on a header in the sidebar, this adjusts the threshold so
    // that it is located next to the header. This is so that header becomes
    // "current".
    function headerThresholdClick(event) {
        // See disableScroll description why this is done.
        disableScroll = true;
        setTimeout(() => {
            disableScroll = false;
        }, 100);
        // requestAnimationFrame is used to delay the update of the "current"
        // header until after the scroll is done, and the header is in the new
        // position.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Closest is needed because if it has child elements like <code>.
                const a = event.target.closest('a');
                const href = a.getAttribute('href');
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    threshold = targetElement.getBoundingClientRect().bottom;
                    updateCurrentHeader();
                }
            });
        });
    }

    // Takes the nodes from the given head and copies them over to the
    // destination, along with some filtering.
    function filterHeader(source, dest) {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('mark').forEach(mark => {
            mark.replaceWith(...mark.childNodes);
        });
        dest.append(...clone.childNodes);
    }

    // Scans page for headers and adds them to the sidebar.
    document.addEventListener('DOMContentLoaded', function() {
        const activeSection = document.querySelector('#mdbook-sidebar .active');
        if (activeSection === null) {
            return;
        }

        const main = document.getElementsByTagName('main')[0];
        headers = Array.from(main.querySelectorAll('h2, h3, h4, h5, h6'))
            .filter(h => h.id !== '' && h.children.length && h.children[0].tagName === 'A');

        if (headers.length === 0) {
            return;
        }

        // Build a tree of headers in the sidebar.

        const stack = [];

        const firstLevel = parseInt(headers[0].tagName.charAt(1));
        for (let i = 1; i < firstLevel; i++) {
            const ol = document.createElement('ol');
            ol.classList.add('section');
            if (stack.length > 0) {
                stack[stack.length - 1].ol.appendChild(ol);
            }
            stack.push({level: i + 1, ol: ol});
        }

        // The level where it will start folding deeply nested headers.
        const foldLevel = 3;

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const level = parseInt(header.tagName.charAt(1));

            const currentLevel = stack[stack.length - 1].level;
            if (level > currentLevel) {
                // Begin nesting to this level.
                for (let nextLevel = currentLevel + 1; nextLevel <= level; nextLevel++) {
                    const ol = document.createElement('ol');
                    ol.classList.add('section');
                    const last = stack[stack.length - 1];
                    const lastChild = last.ol.lastChild;
                    // Handle the case where jumping more than one nesting
                    // level, which doesn't have a list item to place this new
                    // list inside of.
                    if (lastChild) {
                        lastChild.appendChild(ol);
                    } else {
                        last.ol.appendChild(ol);
                    }
                    stack.push({level: nextLevel, ol: ol});
                }
            } else if (level < currentLevel) {
                while (stack.length > 1 && stack[stack.length - 1].level > level) {
                    stack.pop();
                }
            }

            const li = document.createElement('li');
            li.classList.add('header-item');
            li.classList.add('expanded');
            if (level < foldLevel) {
                li.classList.add('expanded');
            }
            const span = document.createElement('span');
            span.classList.add('chapter-link-wrapper');
            const a = document.createElement('a');
            span.appendChild(a);
            a.href = '#' + header.id;
            a.classList.add('header-in-summary');
            filterHeader(header.children[0], a);
            a.addEventListener('click', headerThresholdClick);
            const nextHeader = headers[i + 1];
            if (nextHeader !== undefined) {
                const nextLevel = parseInt(nextHeader.tagName.charAt(1));
                if (nextLevel > level && level >= foldLevel) {
                    const toggle = document.createElement('a');
                    toggle.classList.add('chapter-fold-toggle');
                    toggle.classList.add('header-toggle');
                    toggle.addEventListener('click', () => {
                        li.classList.toggle('expanded');
                    });
                    const toggleDiv = document.createElement('div');
                    toggleDiv.textContent = '❱';
                    toggle.appendChild(toggleDiv);
                    span.appendChild(toggle);
                    headerToggles.push(li);
                }
            }
            li.appendChild(span);

            const currentParent = stack[stack.length - 1];
            currentParent.ol.appendChild(li);
        }

        const onThisPage = document.createElement('div');
        onThisPage.classList.add('on-this-page');
        onThisPage.append(stack[0].ol);
        const activeItemSpan = activeSection.parentElement;
        activeItemSpan.after(onThisPage);
    });

    document.addEventListener('DOMContentLoaded', reloadCurrentHeader);
    document.addEventListener('scroll', reloadCurrentHeader, { passive: true });
})();

