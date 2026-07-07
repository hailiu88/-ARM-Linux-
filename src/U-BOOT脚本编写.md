## U-BOOT脚本编写

脚本由一序列变量和递归变量构成，每个递归变量是一组U-BOOT命令，U-BOOT命令之间用“;”分隔。当利用run命令运行脚本时，依序执行这些命令。

U-BOOT有两种命令解释程序，简单命令行接口提供简单的命令解释功能，按顺序执行U-BOOT命令，U-BOOT命令之间用“;”或新行符分隔。简单命令行接口不提供依条件执行的运行控制功能。

HUSH接口提供Bourne风格的命令解释接口。它提供测试语句、条件执行语句和循环控制语句。HUSH解释程序可以依据测试结果，动态地选择执行U-BOOT命令。”if….then….else….fi”格式的条件执行语句及”for….do….done”、”while….do….done”、”for….in….do….done”及”until….do….done”循环控制命令，提供类似于Linux命令行的&&和\|\|运算符，可以运行复杂的U-BOOT脚本，因此，U-BOOT脚本是在HUSH环境下运行。

### U-BOOT变量

U-BOOT变量有局部环境变量和全局变量，局部环境变量用于存储临时变量，不会永久保存在非易失记忆体内，其定义格式为：

var=value

符号=前后不能够有空格，变量值必须为单字。当变量值包含空格时，必须把整个变量值用单引号或双引号括起来。当使用单引号时，阻止变量展开，而当使用双引号时，允许展开变量。下面例子定义了一个名为localVar的局部变量，其值为I
am a local varible。

    LocalVar=”I am a local varible”

全局变量的定义格式为：

    setenv varName varValue

三者之间用空格隔开。当变量值需要包含\$或;等特殊字符时，需要在其前面添加”\\字符。全局变量的值可以包含由”;”隔开的一系列命令，每一条命令的第一个字为U-BOOT命令，其后以空格隔开的各项为该命令的参数。如果全局变量值为多条以”;”隔开的命令，需要将所有命令包含在单引号内。

由setenv定义的全局变量可以作为由run命令执行的命令，下面的例子定义了名为infoDisp1的全局变量：

    =>setenv infoDisp1 echo This is to show how to use global varible.

infoDisp1命令可以由run命令执行。

    =>run infoDisp1

运行结果为：

    This is to show how to use global varible.

下面的例子说明如何用setenv定义一个包含多条命令的全局变量。

    =>setenv infoDisp2 ‘echo Hello world,; echo I am a robot.’

    =>run infoDisp2

    Hello world,

    I am a robot.

### 测试命令

测试命令用于测试表达式、字符串或数字之间逻辑关系的真伪。与条件语句或循环语句配合，可以动态实现多种命令组合。常用的逻辑关系表达方式有：

- （表达式）

> 表达式为真

- ！表达式

> 表达式为伪

- -n string

> 字符串长度不为零

- -z string

> 字符串长度为零

- string

> 字符串长度不为零

- string1 = string2

> 两字符串相等

- string1 != string2

> 两字符串不等

对于整数，逻辑关系可以用相等（-eq）、小于（-lt）、大于（-gt）、大于等于（-ge）、小于等于（-le）和不等于（-ne）表示。integer1
-eq integer2表示integer1等于integer2，而integer1 -lt
integer2表示integer1小于integer2。

test -n string或\[-n string\]命令在string字符串长度不为0时结果为1，否则结果为0。而\[ var1 -le var2\]在整数var1小于var2时结果为1，否则，结果为0。

### 条件语句

条件语句的形式为:

    if (condition);

    then

    command list

    elif (condition);

    then

    command list

    else

    command list

    fi

在下面的例子中，利用条件语句和测试语句，依据net_boot的值，采用不同的系统引导方法。当没有设置变量net_boot时，系统从SD卡引导，而当net_boot等于1时，系统从TFTP服务器引导。itest用以进行整数比较。

    if test -n \$net_boot;

    then

    if itest \$net_boot == 1;

    then

    echo !!!!!!!!!!!!!!!!!!!!!!!!!!;

    echo ! Booting from TFTP !;

    echo !!!!!!!!!!!!!!!!!!!!!!!!!!;

    tftp \$fpgadata soc_system.rbf;

    else

    echo !!!!!!!!!!!!!!!!!!!!!!!!!!;

    echo ! Booting from SD !;

    echo !!!!!!!!!!!!!!!!!!!!!!!!!!;

    fatload mmc 0:1 \$fpgadata soc_system.rbf;

    fi

    else

    echo !!!!!!!!!!!!!!!!!!!!!!!!!!;

    echo Booting from SD !;

    echo !!!!!!!!!!!!!!!!!!!!!!!!!!;

    fatload mmc 0:1 \$fpgadata soc_system.rbf;

    fi

### 循环语句

循环语句共有三种类型，分别为for-in-do
done，while-do-done，until-do-done。与c语言for循环不同，HUSH命令解释程序的for循环变量只能在变量值列表中取值。下面给出了三种循环语句的使用方法为：

    for var in a b c d;

    do echo \$var;

    done

    setenv var 1

    while test var -eq 0;

    do echo \$var;

    setenv var 1;

    done

    setenv var begin;

    until test var != finished;

    do echo I am doing something meaningless!;

    echo Just to show how to use until loop.

    setenv var finished;

    done

### U-BOOT脚本实例

下面给出的是一个最简单的U-BOOT引导脚本实例，其中以#开头的为注释行。

```
# Address in RAM where the Linux device tree will be loaded.
fdtaddr=0x88000000
# Address in RAM where the Linux kernel image will be loaded.
kerneladdr=0x82000000
# Command to reset the board (TODO).
boardreset=echo “Resetting all images to factory defaults”
# Arguments for the Linux command line, this will be read by the bootz command.
bootargs=console=ttyS0,115200n8 root=/dev/mmcblk0p1 rootfstype=ext4 rootwait
# Command to load the Linux device tree from MMC
loadfdt=load mmc 0:1 ${fdtaddr} /boot/dev.dtb
# Command to load the Linux kernel image from MMC
loadlinux=load mmc 0:1 ${kerneladdr} /boot/uimage
# Command to boot Linux.  Load the required images into RAM, then begin
# running the kernel.  This is the last command that U-BOOT will run.
bootlinux=run loadlinux; run loadfdt; bootz ${kerneladdr} – ${fdtaddr}
# Read a GPIO to see if the reset button is pressed for 2 seconds.  Return
# true if it is.  The ‘exit’ command stops the current command, execution will
# go back to the caller.
resetrequested=if gpio i 27; then sleep 2; if gpio i 27; then true; exit; fi; false;fi
# Entry point, this is the first command U-BOOT will run on boot.
# Do a board reset if needed, then boot Linux.  In this command, bootlinux will
# always run.
bootcmd=if run resetrequested; then run boardreset; fi; run bootlinux 

```

