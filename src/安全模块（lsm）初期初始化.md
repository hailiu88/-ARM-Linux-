## 安全模块（lsm）初期初始化

Linux维护一个名为security_hook_heads的数组，用以存储哈希表头。每个表头对应一个挂接函数，通过该表头可以查找到所使用的挂接函数。Linux所支持的安全模块挂接函数定义在include/linux/lsm_hook_defs.h文件中。Security_hook_heads的定义为：

```
struct security_hook_heads {

struct hlist_head binder_set_context_mgr;

int (*binder_set_context_mgr)( struct task_struct *mgr);

struct hlist_head binder_transaction;

int (*binder_transaction)( struct task_struct *from, struct
task_struct *to);

······

struct hlist_head perf_event_write;

int (*perf_event_write)( struct perf_event \*event);

} __randomize_layout;
```

函数early_security_init(void)的第一项任务就是初始化结构体security_hook_heads中的各个哈希表头（struct
hlist_head）。

Linux可以支持多个安全模块，每个模块用结构体

```
struct lsm_info {

const char *name; /* Required. */

enum lsm_order order; /* Optional: default is LSM_ORDER_MUTABLE */

unsigned long flags; /* Optional: flags describing LSM */

int *enabled; /* Optional: controlled by CONFIG_LSM */

int (*init)(void); /* Required. */

struct lsm_blob_sizes \*blobs; /\* Optional: for blob sharing. \*/

};
```

描述。在链接过程中，链接程序把所有的lsm_info结构体放在\_\_start_early_lsm_info与\_\_end_early_lsm_info之间。

函数early_security_init()的第二项任务是初始化各个安全模块。该函数首先判断lsm模块是否提供了启用（enabled）标识字，然后通过函数prepare_lsm()判别能否启用当前模块。若没有提供启用标识字，则使用硬编码标识（lsm_enabled_true和lsm_enabled_false）。如果当前模块的标识为禁用，或当前模块为排他性的，同时已经初始化了另一个排他性的模块，则不能启用该模块。若判别可以启用当前模块，则调用该模块提供的初始化函数对模块进行初始化。判别能否启用模块的函数为：

```
static void __init prepare_lsm(struct lsm_info *lsm)

{

    int enabled = lsm_allowed(lsm);

    set_enabled(lsm, enabled);

    if (enabled) {

        if ((lsm->flags & LSM_FLAG_EXCLUSIVE) && !exclusive) {

            exclusive = lsm;

            init_debug("exclusive chosen: %s\n", lsm->name);

        }

        lsm_set_blob_sizes(lsm->blobs);

    }

}
```

调用模块提供的初始化函数的函数为：

```
static void __init initialize_lsm(struct lsm_info *lsm)

{

    if (is_enabled(lsm)) {

        int ret;

        init_debug("initializing %s\n", lsm->name);

        ret = lsm->init();

        WARN(ret, "%s failed to initialize: %d\n", lsm->name, ret);

    }

}