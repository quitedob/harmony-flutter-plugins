矩形划分求解器（Rectangular Partition Solver）用于解决矩形划分问题。其接收若干个彼此不相交的矩形作为输入（主要关注这些矩形共同定义的区域的并集），计算出覆盖相同区域的矩形划分方案，并使输出的矩形数量尽可能少（但不保证最优）。形如下方示意图。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/0KRRWtq0Q1itOFqH5Bx6CQ/zh-cn_image_0000002525433057.png?HW-CC-KV=V1&HW-CC-Date=20260414T045511Z&HW-CC-Expire=86400&HW-CC-Sign=9AEC9E421C1B525CAD0CC5703B757A47FCEB2A75C397479870342B53A44C0BA1 "点击放大")

其相关定义如下：一个矩形![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0e/v3/JGon_R8XRu2Yj_raAT44SQ/zh-cn_formulaimage_0000002485707398.png?HW-CC-KV=V1&HW-CC-Date=20260414T045511Z&HW-CC-Expire=86400&HW-CC-Sign=694F5635A54A6E20C3EB7574410BA97498D431727D195924D6DFC3479C7B6E3C)为二维网格内横纵坐标满足![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/Mdp-ug9bR46MaYgOix3WEw/zh-cn_formulaimage_0000002517707611.png?HW-CC-KV=V1&HW-CC-Date=20260414T045511Z&HW-CC-Expire=86400&HW-CC-Sign=004900BEC0DA0CF72243A58E7638C5E3C9338E29A82E36DBD0D6EC8C8DA1FCE8 "点击放大")的所有单元矩形构成的集合（坐标系说明：X轴从左到右递增，Y轴从上到下递增）。两个矩形相交，当且仅当它们共享至少一个公共的单元矩形。

在矩形划分问题（Rectangular Partition Problem）中，给定N个彼此不相交的矩形，要求输出M个矩形，使其满足如下几点：

* 输出的M个矩形彼此不相交。
* 输出的M个矩形的并集与输入的N个矩形的并集完全相同。
* 输出的矩形数量M尽可能少。

矩形划分求解器运行的时间复杂度为 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/70/v3/6eUxjGGqTeuZvjAxM2RbpQ/zh-cn_formulaimage_0000002480520950.png?HW-CC-KV=V1&HW-CC-Date=20260414T045511Z&HW-CC-Expire=86400&HW-CC-Sign=60BA058C072A2D55E9AFB34AAFD9A4EA916E972391166339337ED1246D31BE0B)，可以高效处理大规模输入数据。在网格数据处理和空间几何计算等优化场景中，可以使用矩形划分求解器提升区域处理效率，减少冗余空间。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast)。

展开

| 名称 | 描述 |
| --- | --- |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_RectPartition\_CreateConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga051634633006a8f12665a412dc96687e) ([FAST\_RectPartitionConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gabd3bea5600684d0638b6221f3d0eb23e) \*\*config) | 创建矩形划分求解器的不透明配置。 |
| FAST\_EXPORT void [HMS\_FAST\_RectPartition\_DestroyConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gae515ef39072676065cef8b9af446f2ac) ([FAST\_RectPartitionConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gabd3bea5600684d0638b6221f3d0eb23e) \*config) | 销毁矩形划分求解器的不透明配置。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_RectPartition\_SetAlgo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gaec5519d0974e98f6fe99ab2fa50411cc) ([FAST\_RectPartitionConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gabd3bea5600684d0638b6221f3d0eb23e) \*config, const char \*name) | 设置矩形划分求解器使用的算法。目前仅支持扫描线算法“SweepLineAlgo”，输出数量尽可能少（不保证最优性）的不相交矩形集合，复杂度为。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_RectPartition\_Solve](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga9329484302723a20438eadc9e4b71609) ([FAST\_RectPartitionConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gabd3bea5600684d0638b6221f3d0eb23e) \*config, size\_t size, const [FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect) \*origin, [FAST\_Rect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit--fast-rect) \*result, size\_t \*resultSize) | 在指定不透明配置下解决矩形划分问题。函数接收若干个彼此不相交的矩形作为输入，计算出覆盖相同区域的矩形划分方案，并使输出的矩形数量尽可能少。  **说明**：  1. 输入须保证矩形两两不相交（即任意两个矩形满足： 或 或或 ），否则函数返回FAST\_ERROR\_CODE\_ILLEGAL\_INPUT。  2. 函数能保证输出矩形的数量小于等于输入矩形的数量。 |

## 开发步骤

1. 首先在CMake脚本中链接相关动态库。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. target_link_libraries(entry PUBLIC libfast_ads.so)
   ```
2. 调用HMS\_FAST\_RectPartition\_CreateConfig生成矩形划分求解器配置实例（FAST\_RectPartitionConfig）。
3. 调用HMS\_FAST\_RectPartition\_SetAlgo设置求解算法为“SweepLineAlgo”（扫描线算法）。
4. 调用HMS\_FAST\_RectPartition\_Solve计算矩形划分方案。
5. 调用HMS\_FAST\_RectPartition\_DestroyConfig销毁矩形划分求解器配置实例。

收起

自动换行

深色代码主题

复制

```
1. #include <cstdio>
2. #include <cstdlib>
3. #include "FASTKit/fast_solver_rect_partition.h"

5. // 定义一个函数来打印矩形
6. void print_rect(const FAST_Rect* rect) {
7. printf("Rect: left=%d, top=%d, right=%d, bottom=%d\n",
8. rect->left, rect->top, rect->right, rect->bottom);
9. }

11. FAST_ErrorCode rect_partition_demo() {
12. // 定义输入矩形
13. FAST_Rect origin[] = {
14. {1, 4, 1, 6},
15. {2, 1, 2, 6},
16. {3, 1, 3, 3}
17. };
18. size_t size = sizeof(origin) / sizeof(FAST_Rect);

20. // 定义输出矩形
21. FAST_Rect* result = (FAST_Rect*)malloc(size * sizeof(FAST_Rect));
22. size_t result_size = 0;

24. FAST_RectPartitionConfig* config = nullptr;
25. FAST_ErrorCode ret;

27. do {
28. // 创建配置
29. ret = HMS_FAST_RectPartition_CreateConfig(&config);
30. if (ret != FAST_ERROR_CODE_SUCCESS) {
31. printf("Failed to create config: %d\n", ret);
32. break;
33. }

35. // 设置算法
36. ret = HMS_FAST_RectPartition_SetAlgo(config, "SweepLineAlgo");
37. if (ret != FAST_ERROR_CODE_SUCCESS) {
38. printf("Failed to set algorithm: %d\n", ret);
39. break;
40. }

42. // 计算矩形划分方案
43. ret = HMS_FAST_RectPartition_Solve(config, size, origin, result, &result_size);
44. if (ret != FAST_ERROR_CODE_SUCCESS) {
45. printf("Failed to solve: %d\n", ret);
46. break;
47. }

49. // 打印结果
50. printf("Resulting rectangles(result_size=%ld):\n", result_size);
51. for (size_t i = 0; i < result_size; ++i) {
52. print_rect(&result[i]);
53. }
54. /*
55. Resulting rectangles(result_size=2):
56. Rect: left=1, top=4, right=2, bottom=6
57. Rect: left=2, top=1, right=3, bottom=3
58. */

60. } while (0);


63. // 销毁配置
64. HMS_FAST_RectPartition_DestroyConfig(config);

66. // 释放数组
67. free(result);

69. return ret;
70. }
```