## Jump_entry的生成

在上一节我们讲到，在生成跳转指令时，需要利用静态关键字确定指令类型、指令跳转地址以及需要修改的指令所在地址。那么，静态关键字是如何产生的呢?这一节我们将介绍静态关键字的生成过程。

当某处的代码需要动态地切换跳转方向时，需要通过宏定义：

DEFINE_STATIC_KEY_TRUE(name)

或

DEFINE_STATIC_KEY_FALSE(name)

为该处的切换定义一个全局静态关键字。用宏DEFINE_STATIC_KEY_TRUE定义的静态关键字初始值为真，而用DEFINE_STATIC_KEY_FALSE(name)定义的静态关键字初始值为假。

宏DEFINE_STATIC_KEY_TRUE和DEFINE_STATIC_KEY_FALSE的定义为：

    #define DEFINE_STATIC_KEY_TRUE(name) struct static_key_true name =
    STATIC_KEY_TRUE_INIT

    #define DEFINE_STATIC_KEY_FALSE(name) struct static_key_false name = STATIC_KEY_FALSE_INIT

这两个宏的最终结果是将变量name分别定义为：

struct static_key name = {.enabled = {1}, {.entries = (void\*) 1UL}}

struct static_key name = {.enabled = {0}, {.entries = (void\*) )0UL}}

函数static_branch_likely(key)和static_branch_unlikely(key)通过key实现跳转方向的切换。由表
2可知，对static_branch_likely()函数而言，如果key静态关键字的enabled为真，则static_branch_likely()返回值为真，编译时生成NOP指令，如果key静态关键字的enabled域为假，则static_branch_likely()返回假值，编译时生成jump指令。函数static_branch_unlikely()与static_branch_likely()类似。

函数static_branch_likely()和static_branch_unlikely()的定义为：

```
#define static_branch_likely(x)									\
({													\
	bool branch;											\
	if (__builtin_types_compatible_p(typeof(*x), struct static_key_true))		\
		branch = !arch_static_branch(&(x)->key, true);				\
	else if (__builtin_types_compatible_p(typeof(*x), struct static_key_false)) 	\
		branch = !arch_static_branch_jump(&(x)->key, true);			\
	else												\
		branch = ____wrong_branch_error();						\
	likely(branch);										\
})

#define static_branch_unlikely(x)								\
({													\
	bool branch;											\
	if (__builtin_types_compatible_p(typeof(*x), struct static_key_true))		\
		branch = arch_static_branch_jump(&(x)->key, false);			\
	else if (__builtin_types_compatible_p(typeof(*x), struct static_key_false)) 	\
		branch = arch_static_branch(&(x)->key, false);				\
	else												\
		branch = ____wrong_branch_error();						\
	unlikely(branch);	
})
```

其中x为控制跳转方向的静态关键字。这两个函数利用arch_static_branch()和arch_static_branch_jump()，通过静态关键字x确定branch的真伪，然后通过likely(branch)和unlikely(branch)告诉编译程序把代码放在何处。在进行编译时，如果使用static_branch_likely()函数，编译程序会把跟随该函数的代码放在顺序执行的一侧，而把跟随else语句的代码放在跳转一侧，同样，如果调用static_branch_unlikely()语句，编译程序会把跟随unlikely函数的代码放在跳转一侧，而把跟随else语句的代码放在顺序执行的一侧。

arch_static_branch()和arch_static_branch_jump()函数与系统的CPU架构有关。对ARM架构而言，这两个函数的定义分别为：

```
static __always_inline bool arch_static_branch(struct static_key *key, bool branch)
{
	asm_volatile_goto("1:\n\t"
		 WASM(nop) "\n\t"
		 ".pushsection __jump_table,  \"aw\"\n\t"
		 ".word 1b, %l[l_yes], %c0\n\t"	
		 ".popsection\n\t"
		 : :  "i" (&((char *)key)[branch]) :  : l_yes);

	return false;
l_yes:
	return true;
}
static __always_inline bool arch_static_branch_jump(struct static_key *key, bool branch)
{
	asm_volatile_goto("1:\n\t"
		 WASM(b) " %l[l_yes]\n\t"
		 ".pushsection __jump_table,  \"aw\"\n\t"
		 ".word 1b, %l[l_yes], %c0\n\t"
		 ".popsection\n\t"
		 : :  "i" (&((char *)key)[branch]) :  : l_yes);
	return false;
l_yes:
	return true;
}
```

这两个函数的编写采用了在c语言中嵌入汇编语言的语法。WASM为宏定义，用来编写汇编语句。WASM(nop)和WASM(b)分别定义了ARM的NOP和b（跳转指令）汇编指令。这两条指令所在的位置就是需要打补丁的指令所在的位置。pushsection和.popsection是GCC编译指令，其作用是把其间的代码按顺序放在\_\_jump_table区段。.word
1b, %l\[l_yes\],%c0同样为ARM
GCC编译指令，其作用是创建一个jump_entry项，并把标号1、l_yes和静态关键字的地址分别赋予该jump_entry的code、target和key域。

