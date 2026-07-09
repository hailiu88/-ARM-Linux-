# 基于 ARM 的 Linux 操作系统启动详解：从电信号到 init 进程
![SoC](https://img.shields.io/badge/SoC-NXP%20i.MX6Solo-green?style=for-the-badge)
![CPU](https://img.shields.io/badge/CPU-ARM%20Cortex--A9-orange?style=for-the-badge&logo=arm)
![Linux](https://img.shields.io/badge/Linux-5.10-blue?style=for-the-badge&logo=linux)
![Yocto](https://img.shields.io/badge/Yocto-4.0-purple?style=for-the-badge)
![Qt](https://img.shields.io/badge/Qt-6.6-green?style=for-the-badge&logo=qt)

![Wireless](https://img.shields.io/badge/Wireless-IEEE802.15.4-blue?style=for-the-badge)
![WiFi](https://img.shields.io/badge/WiFi-802.11-blue?style=for-the-badge&logo=wifi)
![Bluetooth](https://img.shields.io/badge/Bluetooth-5.0-blue?style=for-the-badge&logo=bluetooth)
![IoT](https://img.shields.io/badge/IoT-Platform-green?style=for-the-badge)

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-blue?style=for-the-badge)](https://creativecommons.org/licenses/by-sa/4.0/)

[![Powered by mdBook](https://img.shields.io/badge/Powered%20by-mdBook-orange?style=for-the-badge&logo=rust)](https://github.com/rust-lang/mdBook)

本开源书籍专注于 **ARM 架构下的 Linux 操作系统启动全流程**。我们不谈抽象的概念，而是从硬件上电的第一秒开始，逐行代码、逐个阶段剖析，直击内核底层，直到用户态第一个进程 `init` 成功运行。

---

## 🌐 快速阅读与下载

*   **📖 在线阅读（最新）：**
* [点击这里进入 GitHub Pages 在线阅读](https://hailiu88.github.io/-ARM-Linux-/)
* [国内快速阅读](https://arm-linux.vercel.app)
* [离线下载PDF文档](https://github.com/hailiu88/-ARM-Linux-/releases/tag/v1.0.0)
* [通过网盘分享](https://pan.baidu.com/s/1zKdX0Lhnn50xL-TVpOj76g?pwd=6mku) (提取码: 6mku)

---

## 🗺️ 本书核心知识地图

本书带您系统梳理从引导程序到内核启动的完整脉络，包含以下四大硬核部分：

1. **🛠️ 环境构建与预备（第1-3章）**：详解 ARM Linux 体系结构、U-BOOT 引导及设备树。
2. **🌅 内核引导破晓（第4-14章）**：深入 CPU 模式、页表初始化、SMP 及命令行参数。
3. **🧠 核心子系统构建（第15-25章）**：剖析内存管理、CFS 任务调度、RCU、中断及内核安全。
4. **🏁 系统运行与闭环（第26-31章）**：探索多任务状态、命名空间、容器能力及 init 进程生命周期。

---

## 🎯 适合谁读？

*   **嵌入式 Linux 开发人员**：需要解决系统启动优化、裁剪及板级移植的工程师。
*   **Linux 内核爱好者**：对操作系统底层原理、内存管理、进程创建感兴趣的学生或研究者。
*   **ARM 架构研究员**：想探究 ARM 汇编、异常级别（EL）切换及软硬件交互的硬核玩家。

---

## 🛠️ 本书项目结构

本项目基于 `mdBook` 构建，源码结构如下：

*   `src/`：存放书籍的 Markdown 源码章节。
*   `book.toml`：mdBook 的配置文件。
*   `book/`：编译后生成的静态 HTML 网页（用于在线发布）。
*   `artifacts/`：本书的最新版静态 PDF 文档（提供离线下载）。

---

## 🤝 如何参与贡献与反馈

本书完全开源，如果您在阅读过程中发现：
*   代码解析有误或不够精准
*   存在错别字或排版问题
*   有更优雅的图解或表述方式

欢迎直接提交 **Issue** 或发起 **Pull Request**！让我们一起完善这本 ARM Linux 启动指南。

---

## 📄 开源许可证

本项目文字与代码内容采用 **[CC BY-SA 4.0 (知识共享署名-相同方式共享 4.0 国际许可协议)](https://creativecommons.orgdeed.zh)** 进行许可。这意味着您可以自由地分享、修改本书，但必须署名原作者，且修改后的作品必须采用相同的许可协议发布。
