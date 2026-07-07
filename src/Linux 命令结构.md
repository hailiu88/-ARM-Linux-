## Linux 命令结构

Linux命令通用语法格式为：

     command [options] [arguments]

其中command为命令名称，options为命令选项，分为
短选项和长选项，用以控制命令行为，arguments为参数，用以选择操作对象（如文件、目录等）。

短选项以单横线开始，后面紧随代表选项的字母，如：

> ls -l

每条命令可以有多个选项，选项之间以空格隔开，如：

> ls -l -a

多个选项可合并，如：

> ls -l -a

可合并为：

> ls -la

长选项以双横线开始，后面通常为一个有意义的单词或短语，如

> ls --all

在后面的命令介绍过程中，我们以短选项为主进行介绍。在后面的示例中，我们假设Linux的命令提示符为$。

有些Linux命令的 选项可以带参数，还有些Linux命令选项必须带参数，如：

     tar -f file.tar

或：

     tar --file=file.tar

