# 第七章	内核启动-启动准备

start_kernel()是Linux的0号进程，主要作用是准备Linux内核的运行环境，是Linux启动任务的主要承担者，也是第一个以c语言编写的Linux函数。start_kernel()函数位于git/init/main.c文件里。我们按函数调用的顺序介绍start_kernel()的各个函数功能，函数较长，这里不列出函数的具体定义。
下面依次介绍各个模块的作用及工作流程。
