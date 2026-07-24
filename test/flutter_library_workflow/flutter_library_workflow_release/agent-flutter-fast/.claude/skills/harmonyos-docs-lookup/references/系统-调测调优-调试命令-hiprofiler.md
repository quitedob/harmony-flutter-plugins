## Hiprofiler简介

HiProfiler调优组件旨在为开发者提供一系列调优能力，可以用来帮助分析内存、性能等问题。

整体架构包括PC端和设备端。主体部分是PC端的数据展示页面和设备端的性能调优服务。PC端和设备端服务采用C/S模型，PC端的调优数据在[DevEco Studio](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-software-install)和[Smartperf](https://gitcode.com/openharmony/developtools_smartperf_host/releases)网页中展示。设备端程序运行在系统环境中，包含多个部分，其中hiprofilerd进程负责与DevEco通信，作为调优服务。设备端还包括命令行工具hiprofiler\_cmd和数据采集进程hiprofiler\_plugins。调优服务控制数据采集进程获取调优数据，数据最终流向DevEco Studio，整个过程可抽象为生产者-消费者模型。目前已完成多个插件，包括nativehook、CPU、ftrace、GPU、hiperf、xpower和memory数据采集，实现了CPU、GPU、内存和能耗等多维度调优。

Hiprofiler工具对标业界调优工具，并提供更多能力，比如[跨语言回栈、能耗数据获取、长时间堆内存抓栈功能](/consumer/cn/doc/harmonyos-guides/hiprofiler#插件参数说明)等。

## 环境要求

* 根据hdc命令行工具指导，完成[环境准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc#环境准备)。
* 确保设备已正常连接，并执行hdc shell。

## 架构简介

1. PC端通过DevEco或Smartperf调用hiprofiler\_cmd命令行工具；
2. hiprofiler\_cmd进程启动hiprofilerd调优服务和hiprofiler\_plugins插件进程；
3. hiprofiler\_plugins开启对应插件，将获取到的调优数据汇总至hiprofilerd进程；
4. hiprofilerd进程将调优数据以proto格式存储到文件，或者实时返回给PC端；
5. PC端解析数据，生成泳道，展示获取到的调优数据。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1a/v3/TrnOSnbDSwabjKlcRKew1g/zh-cn_image_0000002571171989.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=DDB1A615B4C08D9756A0AF5521DEE52A71C3F263BBDFCADEE4380A23ABE0B46F)

## 命令行说明

使用hiprofiler\_cmd命令行工具可以调用不同插件并输入不同参数，以满足不同的调优需求。示范命令如下：

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 30 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "ftrace-plugin"
16. sample_interval: 1000
17. config_data {
18. hitrace_categories: "binder"
19. buffer_size_kb: 204800
20. flush_interval_ms: 1000
21. flush_threshold_kb: 4096
22. trace_period_ms: 200
23. }
24. }
25. CONFIG
```

展开

| 命令 | 命令说明 |
| --- | --- |
| -c | 设置该选项后，需要将配置文件放入/data/local/tmp目录下，将路径作为参数输入。 |
| -o | 自定义文件保存路径（需要以/data/local/tmp开头）。若不设置路径，则调优数据自动保存至/data/local/tmp/hiprofiler\_data.htrace。重复调优会覆盖原来路径的文件。 |
| -k | 杀掉已存在的调优服务进程。 |
| -s | 拉起调优服务进程。 |
| -t | 设置调优持续时间，单位：s。 |

输入完hiprofiler\_cmd参数后，需要输入插件配置信息，以<<CONFIG开头，CONFIG结尾，中间内容以json格式输入。

以下是session config字段介绍：

展开

| 字段 | 字段说明 |
| --- | --- |
| buffers | 共享内存页的数量。 |
| split\_file | 是否拆分文件。true代表拆分文件；false代表不拆分文件。 |
| split\_file\_max\_size\_mb | 设置split\_file为true的情况下，定义每个拆分文件的最大大小。 |

plugin\_configs字段介绍：

展开

| 字段 | 字段说明 |
| --- | --- |
| plugin\_name | 开启插件的名字。 |
| sample\_interval | 插件获取调优数据的间隔，单位：ms。 |
| config\_data | 插件具体参数。每个插件需要的参数不同，参考各插件proto定义。  （代码路径：developtools/profiler/protos）。 |

生成的trace文件通过hdc file recv命令导到本地，然后上传到smartperf网站或者DevEco Studio进行解析。

## 支持插件列表

展开

| 插件名字 | 简介 | 规格说明 |
| --- | --- | --- |
| [native hook](/consumer/cn/doc/harmonyos-guides/hiprofiler#native-hook插件) | 获取堆内存分配的调用栈信息。 | 采集的进程仅支持[使用调试证书签名的应用](/consumer/cn/doc/harmonyos-guides/hiprofiler#使用调试证书签名的应用)。 |
| [ftrace plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#ftrace-plugin插件) | 获取内核打点的trace事件，以及hitrace打点的数据。 | - |
| [cpu plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#cpu-plugin插件) | 获取进程CPU使用率信息，包括进程级和线程级的使用率。 | - |
| [gpu plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#gpu-plugin插件) | 获取进程GPU使用率信息。 | - |
| [xpower plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#xpower-plugin插件) | 获取进程能耗使用情况的数据。 | - |
| [memory plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#memory-plugin插件) | 获取进程内存占用情况，主要是获取进程smaps节点的数据。 | - |
| [diskio plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#diskio-plugin插件) | 获取进程磁盘空间占用情况。 | - |
| [network profiler](/consumer/cn/doc/harmonyos-guides/hiprofiler#network-profiler插件) | 通过进程内打点，获取进程HTTP/HTTPS请求的详细信息。 | 采集的进程仅支持[使用调试证书签名的应用](/consumer/cn/doc/harmonyos-guides/hiprofiler#使用调试证书签名的应用)。 |
| [network plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#network-plugin插件) | 获取进程网络流量统计信息。 | - |
| [hisysevent plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#hisysevent-plugin插件) | 通过hisysevent命令，获取hisysevent的事件记录数据。 | - |
| [hidump plugin](/consumer/cn/doc/harmonyos-guides/hiprofiler#hidump-plugin插件) | 通过SP\_daemon命令获取相关数据。 | - |

## 使用调试证书签名的应用

注意

确认命令指定的应用是否为可调试应用，可执行hdc shell "bm dump -n bundlename | grep appProvisionType"查询，预期返回信息为"appProvisionType": "debug"。

以包名com.example.myapplication为例，可执行如下命令查询：

收起

自动换行

深色代码主题

复制

```
1. hdc shell "bm dump -n com.example.myapplication | grep appProvisionType"
```

如果包名对应的应用是可调试应用，预期返回信息如下：

收起

自动换行

深色代码主题

复制

```
1. "appProvisionType": "debug",
```

构建可调试应用需要使用调试证书进行签名，申请调试证书及签名可参考：[申请调试证书](https://developer.huawei.com/consumer/cn/doc/app/agc-help-add-debugcert-0000001914263178)。

## 插件参数说明

### native hook插件

获取堆内存分配的调用栈信息（通过malloc、mmap、calloc或realloc等基础库函数分配堆内存的调用栈），包括跨语言堆内存分配信息（如在ArkTS语言中调用napi分配native堆内存），还能展示内存泄漏未释放堆内存调用栈信息。

注意

[应用加密](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/code-protect)后只能回native栈，不能回JS栈。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| fp\_unwind | bool | true表示使用fp回栈方式进行回栈；  false表示使用dwarf回栈方式进行回栈。 | fp回栈是利用了x29寄存器保存的fp指针，函数的fp指针始终指向父函数（调用方）的fp指针，调优服务根据这一特点进行回栈，根据ip计算相对PC，然后查找maps对应区间来进行符号化。  由于现在编译期越来越优化，出现寄存器重用或者编译禁用fp，会导致fp方式回不出相应的栈；混合栈情况下，fp不会记录多重混合，于是便需要dwarf回栈方式做更精确的回栈。  dwarf回栈是根据pc寄存器在map表中查找对应的map信息，由于dwarf是逐级解析调用栈，所以其性能会比fp有劣化。  注意：fp回栈暂不支持调优非aarch64架构的设备。 |
| statistics\_interval | int | 统计间隔，表示将一个统计周期内的栈进行汇总，单位：s。 | 为实现长时间轻量化采集，提供统计模式抓栈。如果更关注调优时的性能，只需要知道每个调用栈出现的次数和总大小，不需要知道每一次具体时间，可以使用统计模式。 |
| process\_name | string | 需要进行内存调优的进程名 | 和/proc/节点下的进程名一致。 |
| startup\_mode | bool | 是否抓取进程启动阶段内存。默认不抓取启动阶段内存。 | 记录进程孵化启动到调优结束这个期间内堆内存分配的信息。 |
| js\_stack\_report | int | 是否开启跨语言回栈。  0：不抓取js栈。  1：开启抓取js栈。 | 为方舟环境提供跨语言回栈功能。 |
| malloc\_free\_matching\_interval | int | 匹配间隔，单位：s，指在相应时间间隔内，将malloc和free进行匹配。匹配到的就不进行落盘。 | 在匹配间隔内，分配并释放了的调用栈不被记录，减少了抓栈服务进程的开销。此参数设置的值大于0时，需同步将statistics\_interval参数设置为0。 |
| offline\_symbolization | bool | 是否开启离线符号化。  true：使用离线符号化。  false：使用在线符号化。 | 使用离线符号化时，根据IP匹配符号的操作在网页端（smartperf）完成，优化了native daemon的性能，减少了调优时的进程卡顿。但离线符号化会将符号表写入trace文件，导致文件大小比在线符号化时更大。 |
| sample\_interval | int | 采样大小。 | 设置此参数时开启采样模式。采样模式下对于malloc size小于采样大小进行概率性统计。调用栈分配内存大小越大，出现次数越高，被统计的几率越大。 |
| restrace\_tag | string | 需要抓取的GPU图形内存的类型 | 可重复添加。当前仅支持设置为"RES\_GPU\_VK"、"RES\_GPU\_GLES\_BUFFER"、"RES\_GPU\_GLES\_IMAGE"、"RES\_GPU\_CL\_BUFFER"和"RES\_GPU\_CL\_IMAGE"，用于指定抓取vulkan、OpenGLES、OpenCL、image和buffer类型的GPU内存分配栈。  **说明**：从API version 21开始，支持该参数。 |

**结果分析**

开启fp回栈+跨语言回栈（其中绿色部分为js栈）：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9f/v3/NbrWU66oS6GAcTNmBfSwJA/zh-cn_image_0000002540771648.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=34234AA0A460267207A0F78DB7F5250A87F81D8662CA7D95B9EDD02D89AB3DB1)

开启dwarf回栈和跨语言回栈（可以展示出native -> js ->native的栈）：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/37/v3/uUeRS-nBRiOZwsYgXZ8Rcw/zh-cn_image_0000002571291943.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=DD2AEE756ED76C711F7E40EDD05C92E1A7843C061CB1FB524E87EE052E9FFF63)

开启统计模式，在此模式下，栈数据会周期性展示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/qwG-POawSduSbITKb8dyGg/zh-cn_image_0000002540611996.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=62C386076C77D76C00B9E7A793A486D69F213370601BE4535DE7D16F2C388630)

开启非统计模式，在此模式下，栈数据不会周期性展示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/-lB_6HBXRr60C30jmsZEWw/zh-cn_image_0000002571171991.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=49DFD1B1F2B580926571F1E00D00FB83B819A58C76970E996183FE757E1DC0CF)

### ftrace plugin插件

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| ftrace\_events | string | 抓取的trace event。 | 记录内核打点的trace event。 |
| hitrace\_categories | string | 抓取的hitrace打点信息。 | 调用hitrace能力，获取数据以proto格式写入文件。 |
| hitrace\_apps | string | 抓取的hitrace信息的进程。 | 设置此参数时，只有对应进程的trace信息会被记录。添加此参数时， hitrace\_categories不支持添加binder，否则会导致trace数据解析异常。 |
| buffer\_size\_kb | int | buffer缓存大小，单位：kB。 | hiprofiler\_plugins进程读取内核事件所需要的缓存大小。推荐使用默认数值：204800。 |
| flush\_interval\_ms | int | 采集数据频率，单位：ms。 | 推荐使用默认数值：1000。 |
| flush\_threshold\_kb | int | 刷新数据大小。 | 超过threshold刷新一次数据至文件。用smartperf默认数值即可。 |
| parse\_ksyms | bool | 是否获取内核数据。 | true：获取内核数据；false：不获取内核数据。 |
| trace\_period\_ms | int | 读取内核数据的频率。 | 用smartperf默认数值即可。 |

**结果分析**

示例命令：

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 10 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "ftrace-plugin"
16. sample_interval: 1000
17. config_data {
18. ftrace_events: "binder/binder_transaction"
19. ftrace_events: "binder/binder_transaction_received"
20. buffer_size_kb: 204800
21. flush_interval_ms: 1000
22. flush_threshold_kb: 4096
23. parse_ksyms: true
24. clock: "boot"
25. trace_period_ms: 200
26. debug_on: false
27. }
28. }
29. CONFIG
```

此命令读取的内核binder\_transaction和binder\_transaction\_received数据，这两个字段同时使用，才能完整展示binder两端数据。执行命令后，通过hdc file recv /data/local/tmp/hiprofiler\_data.htrace命令将文件导出到当前目录，然后用smartperf将该文件打开并解析。结果示例如下图：

点击binder transaction右边的箭头，可以跳转到binder对端的进程或线程。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b9/v3/-zM6usvjShuwZijyLkTzpg/zh-cn_image_0000002540771650.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=26D48A81AE3F5A9CEEAEB0657AE8A8E1BAA8D0B738ED82A6E86F86DE369DECE2)

### memory plugin插件

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| report\_sysmem\_vmem\_info | bool | 是否读取虚拟内存数据。 | 从/proc/vmstat节点读取内存数据。 |
| report\_process\_mem\_info | bool | 是否获取进程详细内存数据，如rss\_shmem，rss\_file，vm\_swap等。 | 从/proc/${pid}/stat节点读取内存数据。 |
| report\_smaps\_mem\_info | bool | 是否获取进程smaps内存信息。 | 从/proc/${pid}/smaps节点获取进程smaps内存数据。 |
| report\_gpu\_mem\_info | bool | 是否获取进程GPU使用情况。 | 读取/proc/gpu\_memory节点数据。 |
| parse\_smaps\_rollup | bool | 是否从smaps\_rollup节点读取smaps统计数据。 | 读取/proc/{pid}/smaps\_rollup节点的smaps统计数据，相比使用report\_smaps\_mem\_info参数调优服务性能会更好（如CPU，内存使用优化）。 |

内存信息包含如下：

* MemTotal：总内存大小。
* MemFree：空闲内存大小。
* Buffers：文件的缓冲大小。
* Cached：缓存的大小。
* Shmem：已被分配的共享内存大小。
* Slab：内核数据缓存大小。
* SUnreclaim：不可回收的Slab大小。
* SwapTotal：交换空间的总大小。
* SwapFree：未被使用交换空间的大小。
* Mapped：设备和文件等映射的大小。
* VmallocUsed：已被使用的虚拟内存大小。
* PageTables：管理内存分页的索引表大小。
* KernelStack：Kernel消耗的内存。
* Active： 在经常使用中的缓冲或高速缓冲存储器页面文件的大小。
* Inactive：在不经常使用中的缓冲或高速缓冲存储器页面文件的大小。
* Unevictable：不能被释放的内存页。
* VmallocTotal：vmalloc虚拟内存总大小。
* CmaTotal：总的连续可用内存。
* CmaFree：空闲的可用内存。
* Zram：Zram的使用大小。
* ZramTotal：Zram的总大小。

注意

Active和Inactive的区别在于内存空间中是否包含最近被使用过的数据。当物理内存不足，需要释放正在使用的内存空间时，会优先释放Inactive的内存空间。

**结果分析**

通过hiprofiler\_cmd 命令获取memory数据。

示例命令：

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 30 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "memory-plugin"
16. sample_interval: 5000
17. config_data {
18. report_process_tree: true
19. report_sysmem_mem_info: true
20. sys_meminfo_counters: PMEM_MEM_TOTAL
21. sys_meminfo_counters: PMEM_MEM_FREE
22. sys_meminfo_counters: PMEM_BUFFERS
23. sys_meminfo_counters: PMEM_CACHED
24. sys_meminfo_counters: PMEM_SHMEM
25. sys_meminfo_counters: PMEM_SLAB
26. sys_meminfo_counters: PMEM_SWAP_TOTAL
27. sys_meminfo_counters: PMEM_SWAP_FREE
28. sys_meminfo_counters: PMEM_MAPPED
29. sys_meminfo_counters: PMEM_VMALLOC_USED
30. sys_meminfo_counters: PMEM_PAGE_TABLES
31. sys_meminfo_counters: PMEM_KERNEL_STACK
32. sys_meminfo_counters: PMEM_ACTIVE
33. sys_meminfo_counters: PMEM_INACTIVE
34. sys_meminfo_counters: PMEM_UNEVICTABLE
35. sys_meminfo_counters: PMEM_VMALLOC_TOTAL
36. sys_meminfo_counters: PMEM_SLAB_UNRECLAIMABLE
37. sys_meminfo_counters: PMEM_CMA_TOTAL
38. sys_meminfo_counters: PMEM_CMA_FREE
39. sys_meminfo_counters: PMEM_KERNEL_RECLAIMABLE
40. sys_meminfo_counters: PMEM_ACTIVE_PURG
41. sys_meminfo_counters: PMEM_INACTIVE_PURG
42. sys_meminfo_counters: PMEM_PINED_PURG
43. report_sysmem_vmem_info: true
44. report_process_mem_info: true
45. report_app_mem_info: false
46. report_app_mem_by_memory_service: false
47. report_purgeable_ashmem_info: true
48. report_dma_mem_info: true
49. report_gpu_mem_info: true
50. }
51. }
52. CONFIG
```

此命令读取系统的内存的基本统计信息。执行命令后，通过hdc file recv /data/local/tmp/hiprofiler\_data.htrace命令将文件导出到当前目录，然后通过smartperf打开并解析。结果示例如下图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1c/v3/7_tct5DwTB-KLE8_812rEQ/zh-cn_image_0000002571291945.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=45ED4284C9571AC07416B36608AC0A31104698EBC4AA95BA1FA058CE8C9E7090)

通过DevEco Studio 的工具获得内存的数据：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bb/v3/cApXSP9gTcmYC_4adK9Gfw/zh-cn_image_0000002540611998.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=C7B04D6297D90981E2E5EA1E2BF40DDEE676014321F9587F0767E94668E88D06)

通过DevEco->profiler->Allocation工具，选择Memory泳道，可以使用profiler的memory plugin功能。上图展示了框选时间段的进程smaps内存信息。

### xpower plugin插件

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| bundle\_name | string | 需要进行能耗调优的进程名。 | 和/proc/节点下的进程名一致。 |
| message\_type | XpowerMessageType | 需要获取能耗数据的类型。 | 数据类型包括：REAL\_BATTERY、APP\_STATISTIC、APP\_DETAIL、COMPONENT\_TOP、ABNORMAL\_EVENTS和THERMAL\_REPORT。 |

**结果分析**

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ad/v3/EQ2Z6EjiSCS753uAUBfBCg/zh-cn_image_0000002571171993.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=BDE7B61E9E94719B7DE67BE7CEE14FABFD5F3EFA0EEF98A2D597A31E517C38F8)

通过DevEco->profiler->real time monitor工具，可以获取相关进程能耗数据。

### GPU plugin插件

获取GPU使用率相关信息的数据。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| pid | int | 需要进行调优的进程ID，与/proc/节点下的进程ID一致。 | - |
| report\_gpu\_info | bool | 是否展示指定进程的GPU使用率信息。 | true: 展示指定进程的GPU数据，需要设置pid。false: 不展示指定进程的GPU数据。 |

### CPU plugin插件

获取CPU使用率的相关信息。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| pid | int | 需要进行调优的进程ID。 | 和/proc/节点下的进程ID一致。 |
| report\_process\_info | bool | 是否展示指定进程的CPU使用率信息。 | true：展示指定进程的数据，需要设置pid参数；  false：不展示指定进程的数据，仅展示系统级CPU使用率数据。 |
| skip\_thread\_cpu\_info | bool | 是否跳过线程CPU使用率数据。 | true：不展示每个线程CPU使用率的信息，开启此参数时可以降低调优服务的开销；  false：展示每个线程CPU使用率的信息。 |

CPU 基本信息包含如下：

* Start Time：采集时间的时间戳。
* Duration：前一次采集到本次采集的时间差。
* TotalLoad%：总的CPU使用率。
* UserLoad%：CPU在用户态空间运行的使用率。
* SystemLoad%：CPU在内核空间运行的使用率。
* Process：进程号。

**结果分析**

示例命令：

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 30 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "cpu-plugin"
16. sample_interval: 1000
17. config_data {
18. report_process_info: true
19. }
20. }
21. CONFIG
```

此命令读取cpu的基本统计信息。执行命令后，通过hdc file recv /data/local/tmp/hiprofiler\_data.htrace命令将文件导出到当前目录，然后通过smartperf打开并解析。结果示例如下图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9d/v3/IEVMHAfgS2e8ddbnu7TanQ/zh-cn_image_0000002540771652.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=F7453731F80D8A3B0E591EEEE848AA62C4FBFCB543AD799541723207ADA571C9)

### diskio plugin插件

获取整机磁盘I/O使用率的相关信息。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| report\_io\_stats | IoReportType | 磁盘I/O统计类型。 | 该类型为枚举类型，目前支持：IO\_REPORT。 |

当设置成IO\_REPORT时，会获得如下磁盘IO信息：

* Data Read：从磁盘读取到内存的总字节数。
* Data Read/sec：每秒从磁盘读取到内存的字节数。
* Data Write：从内存写入磁盘的总字节数。
* Data Write/sec：每秒从内存写入磁盘的字节数。
* Reads In：读入的字节数。
* Reads In/sec：每秒读取的字节数。
* Write Out：写入的字节数。
* Write Out/sec：每秒写入的字节数。

**结果分析**

示例命令：

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 30 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "diskio-plugin"
16. sample_interval: 1000
17. config_data {
18. report_io_stats: IO_REPORT
19. }
20. }
21. CONFIG
```

此命令读取disk io的基本统计信息。执行命令后，通过hdc file recv /data/local/tmp/hiprofiler\_data.htrace将文件导出到当前目录，然后通过smartperf打开并解析。结果示例如下图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0a/v3/VUXNxVWSQMGJxA-D0OAIbw/zh-cn_image_0000002571291947.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=3454BD4442A6A4D29755029FD73083E7274429C47631BEB47609B39B6E7BF8EB)

### hidump plugin插件

获取应用进程的fps帧率的数据。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| report\_fps | bool | 是否报告帧率数据。 | true：报告应用进程的帧率数据；  false：不报告帧率数据。 |
| sections | uint32 | 每1秒上报多少次帧率数据。 | 默认值为10，即每隔100毫秒上报一次帧率数据。 |

**结果分析**

该插件暂时不支持smartperf工具方式的trace数据解析，只支持DevEco Studio模式下的trace数据解析。如下图所示：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c0/v3/XUBUjb8FSOWvQfJKlAsm-w/zh-cn_image_0000002540612000.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=F6C69398F5DDC479537A82D27F13F7FDFAD5B85B46197531D5E4C1F66C03066B)

### hisysevent plugin插件

获取系统事件记录的数据。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 详细介绍 |
| --- | --- | --- | --- |
| msg | string | 自定义的字符串。 | 该字符串作为保留字段，并未实际使用。使用时可传入空字符串 |
| subscribe\_domain | string | 订阅的domain。 | 该字段用来订阅具体的domain下的所有事件。如果为空串，则订阅所有domain下的所有事件。 |
| subscribe\_event | string | 订阅的event。 | 该字段用来订阅具体的event。如果为空串，则订阅所有event。 |

**结果分析**

示例命令：

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 30 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "hisysevent-plugin"
16. config_data {
17. msg: "hisysevent-plugin"
18. subscribe_domain: ""
19. subscribe_event: ""
20. }
21. }
22. CONFIG
```

此命令示例抓取所有hisystem event订阅事件信息。执行命令后，通过hdc file recv /data/local/tmp/hiprofiler\_data.htrace将文件导出到当前目录，然后通过smartperf打开并解析。结果示例如下图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/_vHiyRquSrOzWGbpIDUnSA/zh-cn_image_0000002571171995.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=F34A4109A2374B691AF7ECC69F7D66A63E15BE67EBBA343F515E1367E232516A)

### network plugin插件

获取网络上行下载相关的数据。统计网络管理模块提供的网络流量、连接状态等。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 必选 | 详细介绍 |
| --- | --- | --- | --- | --- |
| pid | int32 | 进程ID。 | 否 | 获取指定进程的网络数据。可以传入多个参数。参数缺省时，则抓取整机的网络数据。 |
| startup\_process\_name | string | 启动的进程名。 | 否 | 如果需要抓取指定进程启动的网络数据，则需要指定此参数。 |
| restart\_process\_name | string | 重启的进程名。 | 否 | 如果需要抓取指定进程重启的网络数据，则需要指定此参数。 |

注意

startup\_process\_name和restart\_process\_name不能同时为空。

网络信息数据包含如下：

* StartTime：采集时间的时间戳。
* Duration：前一次采集到本次采集的时间差。
* Data Received：接收的网络数据总字节数。
* Data Received/sec：每秒接收的网络数据字节数。
* Data Send：发送的网络数据总字节数。
* Data Send/sec：每秒发送的网络数据字节数。
* Packets In：接收的网络总数据包数。
* Packets In/sec：每秒接收的网络数据包数。
* Packets Out：发送的网络总数据包数。
* Packets Out/sec：每秒发送的网络数据包数。

**结果分析**

示例命令：

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 30 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "network-plugin"
16. sample_interval: 1000
17. config_data {
18. }
19. }
20. CONFIG
```

此命令示例抓取整机网络数据信息。执行命令后，通过hdc file recv /data/local/tmp/hiprofiler\_data.htrace将文件导出到当前模板，然后通过smartperf打开并解析。结果示例如下图：

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/28/v3/_94YK_tmQOG8Ed0qreCdXQ/zh-cn_image_0000002540771654.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=D0469A6B54035C56735F06263DF2C893110DFB4B72C767EBD29332FFC9454C5E)

### network profiler插件

获取进程的网络请求信息，会把每次HTTP请求当作一个数据点记录下来。

**参数介绍**

展开

| 参数名字 | 类型 | 参数含义 | 必选 | 详细介绍 |
| --- | --- | --- | --- | --- |
| pid | int32 | 进程ID。 | 否 | 获取指定进程的网络数据。可以传入多个参数。参数缺省时，则抓取整机的网络数据。 |
| startup\_process\_name | string | 启动的进程名。 | 否 | 如果需要抓取指定进程启动的网络数据，则需要指定此参数。 |
| restart\_process\_name | string | 重启的进程名。 | 否 | 如果需要抓取指定进程重启的网络数据，则需要指定此参数。 |
| clock\_id | int | 时间时钟类型 | 是 | 1：BOOTTIME，系统启动后单调递增时间（含NTP调整）。  2：REALTIME，可调整的系统实时时间。  3：REALTIME\_COARSE，低精度实时时间。  4：MONOTONIC，无NTP调整的单调递增时间。  5：MONOTONIC\_COARSE，低精度单调递增时间。  6：MONOTONIC\_RAW，硬件原始单调递增时间。 |
| smb\_pages | int | 共享内存页数 | 是 | hiprofiler\_plugins进程和被调优进程建立的共享内存大小，建议值为16384个页大小，即：16384\*4096=67108864字节（64M）。 |
| flush\_interval | int | 磁盘写入间隔 | 否 | 每flush\_interval次网络请求触发一次磁盘写入，优化IO效率。  默认值为1。 |
| block | bool | 阻塞模式开关 | 否 | true：共享内存满时阻塞采集，可能影响性能。  false：共享内存满时丢弃超出部分的数据。  默认值为false。 |

**结果分析**

smartperf工具暂时不支持该插件的trace数据解析，若需分析network数据，请使用DevEco Studio的Profiler工具下的NetWork功能。可参考：

[网络诊断：NetWork分析](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-profiler-network)

## 常用命令

### 堆内存分配调用栈数据采样记录

对com.example.insight\_test\_stage进程的堆内存分配操作进行抓栈，并开启fp回栈、离线符号化和统计模式。

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -t 30 \
4. -s \
5. -k \
6. <<CONFIG
7. request_id: 1
8. session_config {
9. buffers {
10. pages: 16384
11. }
12. }
13. plugin_configs {
14. plugin_name: "nativehook"
15. sample_interval: 5000
16. config_data {
17. save_file: false
18. smb_pages: 16384
19. max_stack_depth: 20
20. process_name: "com.example.insight_test_stage"
21. string_compressed: true
22. fp_unwind: true
23. blocked: true
24. callframe_compress: true
25. record_accurately: true
26. offline_symbolization: true
27. startup_mode: false
28. statistics_interval: 10
29. sample_interval: 256
30. js_stack_report: 1
31. max_js_stack_depth: 10
32. }
33. }
34. CONFIG
```

采集的数据会被保存至/data/local/tmp/hiprofiler\_data.htrace文件中，该文件包含了内存泄漏分析所需的函数调用信息、线程和动态库维度内存分配情况，以及调用栈次数和分配大小聚类信息。开启离线符号化，fp回栈，统计模式均可以提升调优服务处理数据速率。

抓取指定进程CPU使用率。

对进程号为1234的进程采集CPU数据，采集时长为30s，采样周期为1000ms，调优数据传输的共享内存大小是16384个内存页，采集的数据会被保存至/data/local/tmp/hiprofiler\_data.htrace文件中。

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -o /data/local/tmp/hiprofiler_data.htrace \
4. -t 30 \
5. -s \
6. -k \
7. <<CONFIG
8. request_id: 1
9. session_config {
10. buffers {
11. pages: 16384
12. }
13. }
14. plugin_configs {
15. plugin_name: "cpu-plugin"
16. sample_interval: 1000
17. config_data {
18. pid: 1234
19. report_process_info: true
20. }
21. }
22. CONFIG
```

抓取指定进程的GPU图形内存调用栈（需要使用最新smartperf release版本解析文件，下载链接：[smartperf](https://gitcode.com/openharmony/developtools_smartperf_host/releases))。

收起

自动换行

深色代码主题

复制

```
1. $ hiprofiler_cmd \
2. -c - \
3. -t 30 \
4. -s \
5. -k \
6. <<CONFIG
7. request_id: 1
8. session_config {
9. buffers {
10. pages: 16384
11. }
12. }
13. plugin_configs {
14. plugin_name: "nativehook"
15. sample_interval: 5000
16. config_data {
17. save_file: false
18. smb_pages: 16384
19. max_stack_depth: 20
20. pid: 11237
21. string_compressed: true
22. fp_unwind: true
23. blocked: true
24. callframe_compress: true
25. record_accurately: true
26. offline_symbolization: true
27. startup_mode: false
28. statistics_interval: 10
29. malloc_disable: true
30. memtrace_enable: true
31. restrace_tag: "RES_GPU_VK"
32. restrace_tag: "RES_GPU_GLES_BUFFER"
33. restrace_tag: "RES_GPU_GLES_IMAGE"
34. restrace_tag: "RES_GPU_CL_BUFFER"
35. js_stack_report: 1
36. max_js_stack_depth: 10
37. }
38. }
39. CONFIG
```

命令中使用了malloc\_disable参数用于过滤nativeheap抓栈的数据；添加的restrace\_tag参数中没有"RES\_GPU\_CL\_IMAGE", 则不抓取OpenCL image类型的GPU内存分配栈。

## 常见问题

### 调优出现异常

**现象描述**

使用hiprofiler\_cmd命令时，显示Service not started。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/37/v3/TjHEiQP5QSWiMS3BMAFlsg/zh-cn_image_0000002571291949.png?HW-CC-KV=V1&HW-CC-Date=20260414T051020Z&HW-CC-Expire=86400&HW-CC-Sign=E9900BBB9035CFE443BDC487E207FB5D4464D1163982D66262CDC88AB429511C)

**可能原因&解决方法**

调优服务未能开启，说明正在使用DevEco Studio调优或者上次调优异常退出，需要执行hiprofiler\_cmd -k之后再重新执行调优命令。

### 抓取到的trace文件为空

**现象描述**

抓取到的trace文件是空的

**可能原因&解决方法**

需要检查生成文件的路径是否在/data/local/tmp/目录下。如果目标路径是/data/local/tmp下的一个文件夹，则尝试对文件夹执行chmod 777操作。如果是user版本使用nativehook或者network profiler插件抓取的应用不是[使用调试证书签名的应用](/consumer/cn/doc/harmonyos-guides/hiprofiler#使用调试证书签名的应用)，也抓不到数据。

### 调优数据疑似不准确

**现象描述**

hiprofiler抓取到的native heap和hidumper查看的native heap有差异。

**可能原因&解决方法**

hidumper抓取的是进程维度内存使用情况，hiprofiler抓取到的是进程用户态通过基础库函数（malloc，mmap，realloc等，operator new也是调用的malloc）分配堆内存的数据。两者之间会有差异，差异存在于线程的内存缓存，堆内存延迟释放，加载器使用内存等。

### 调优时目标进程卡顿

**现象描述**

使用hiprofiler\_cmd命令抓取应用进程的内存trace，采用FP回栈或者dwarf回栈时，出现应用进程卡顿。

**可能原因&解决方法**

可以通过hiprofiler\_cmd命令中config参数配置来进行调整。hiprofiler\_cmd命令中config参数的调整方法如下：

* 适当减小max\_stack\_depth和max\_js\_stack\_depth参数的值，减少回栈深度，减少调用栈信息的采集。
* 适当增大smb\_pages参数的值，增大调优数据传输的共享内存大小。默认值为16384个页大小，即：16384\*4096=67108864字节（64M）。可以调整到128M。
* 适当增加sample\_interval参数的值，增大采样线程栈的大小。默认值为256，可以调整到512。