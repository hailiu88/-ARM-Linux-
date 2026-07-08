## 属性绑定（bindings）

属性绑定是指设备制造商或驱动程序编写人员在定义一个新的属性时规定的属性使用语法或使用方法，也包括标准属性和广泛使用的属性的使用语法，通常以文本方式或以yaml程序方式提供。在Linux系统中，属性绑定文件存储在git/Documentation/devicetree/binging下的目录中，这里git是下载的Linux源代码的根目录。对于NXP用于i.MX系列处理器的Linux，如果使用Yocto构建项目（后面会介绍），Linux源代码位于当前工作目录下的build/tmp/work/板名-poky-linux-gnueabi/linux-imx/版本号/git，U-BOOT源代码位于build/tmp/work/板名-poky-linux-gnueabi/U-BOOT-imx/版本号/git，build为构建目录，在创建项目时指定。

