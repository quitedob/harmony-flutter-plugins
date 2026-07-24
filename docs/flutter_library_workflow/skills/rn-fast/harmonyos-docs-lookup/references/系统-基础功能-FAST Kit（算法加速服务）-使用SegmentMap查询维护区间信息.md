FAST Kit提供Segment Map用于查询维护区间信息，实现数据序列区间段的快速更新和快速查询。线段表（Segment Map）是一种用于高效处理区间段信息的数据结构，适用于需要频繁对数据序列的某个区间段进行统计或修改的场景。其典型操作包括单点修改、区间修改、区间查询等。

线段表有多种实现方式，其中最常见的是使用二分树的方案，也被称为线段树（Segment Tree）。与直接遍历区间相比，线段表能将许多区间操作的时间复杂度从 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/83/v3/mZPPN4R9R-2yWbeIJQxeMQ/zh-cn_formulaimage_0000002497557050.png?HW-CC-KV=V1&HW-CC-Date=20260414T045508Z&HW-CC-Expire=86400&HW-CC-Sign=0AE73DD9A5CD9033DC5E07B4C4770796E6C06626E453290B2A1732BDBE82EF20) 优化至![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/4TJegXMfQWCbtRq6ex7kOg/zh-cn_formulaimage_0000002529117051.png?HW-CC-KV=V1&HW-CC-Date=20260414T045508Z&HW-CC-Expire=86400&HW-CC-Sign=AE2C1B130660478DD5017092AD461D56F4E3BB97A819930F40BB08A784540C3D)，在处理大规模数据时优势显著，为构建高性能、响应迅速的应用程序提供数据结构基础。

## 接口说明

具体API说明详见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast)。

展开

| 名称 | 描述 |
| --- | --- |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_SegmentMap\_CreateConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga3c5e1b0e64894e3a8910c06800afe560) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga752c7dc05b0f2d87f8cb4bd8bb04b34e) \*\*config) | 创建线段表的不透明配置。 |
| FAST\_EXPORT void [HMS\_FAST\_SegmentMap\_DestroyConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga54dc92174e74665cd52b96dd0dc99e45) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga752c7dc05b0f2d87f8cb4bd8bb04b34e) \*config) | 销毁线段表的不透明配置。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_SegmentMap\_SetQueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga14043280774888f1d2a34951f27415ae) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga752c7dc05b0f2d87f8cb4bd8bb04b34e) \*config, [FAST\_SegmentMapQueryType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga8ef2e816f027493a63bd4e82876f233f) type) | 设置线段表不透明配置中的查询类型。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_SegmentMap\_SetUpdateType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga1f37b6071a0af42c8e217cc0bf2bda2a) ([FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga752c7dc05b0f2d87f8cb4bd8bb04b34e) \*config, [FAST\_SegmentMapUpdateType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga2747e3df771507eaeff23cc28f17fc76) type) | 设置线段表不透明配置中的更新类型。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_SegmentMap\_Create](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga1e6c63ee4731e04eeac80a64246db037) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga3c42403e7c9306245dd1340f166993d9) \*handle, size\_t size, const int32\_t \*array, [FAST\_SegmentMapConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga752c7dc05b0f2d87f8cb4bd8bb04b34e) \*config) | 创建线段表。 |
| FAST\_EXPORT void [HMS\_FAST\_SegmentMap\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gaf24e3e9e42dbf8e6fd7092762ffdf894) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga3c42403e7c9306245dd1340f166993d9) handle) | 销毁线段表实例，释放内存，再次调用为未定义行为。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_SegmentMap\_Update](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#gae85d6f1561a1c4bab0c9161401db07fe) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga3c42403e7c9306245dd1340f166993d9) handle, size\_t left, size\_t right, int32\_t value) | 更新线段表的区间，根据配置按照赋值、加法、减法等操作更新。 |
| FAST\_EXPORT [FAST\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga0766cadc400f678a061813aedc6938ed) [HMS\_FAST\_SegmentMap\_Query](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga13129191dae4340dccb99132f54d4055) ([FAST\_SegmentMapHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/fast-kit-fast#ga3c42403e7c9306245dd1340f166993d9) handle, size\_t left, size\_t right, int32\_t \*result) | 查询线段表的区间，根据配置返回最大值、最小值、求和等数据。 |

## 开发步骤

1. 首先在CMake脚本中链接相关动态库。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. target_link_libraries(entry PUBLIC libfast_ads.so)
   ```
2. 调用HMS\_FAST\_SegmentMap\_CreateConfig生成线段表配置实例（FAST\_SegmentMapConfig）。
3. 调用HMS\_FAST\_SegmentMap\_SetQueryType设置查询类型。
4. 调用HMS\_FAST\_SegmentMap\_SetUpdateType设置更新类型。
5. 调用HMS\_FAST\_SegmentMap\_Create生成线段表实例 （FAST\_SegmentMapHandle）。生成实例之后，无法再修改查询和更新类型。
6. 调用HMS\_FAST\_SegmentMap\_Query进行高效区间查询操作。
7. 调用HMS\_FAST\_SegmentMap\_Update进行高效区间更新操作。
8. 调用HMS\_FAST\_SegmentMap\_Destroy销毁线段表实例。
9. 调用HMS\_FAST\_SegmentMap\_DestroyConfig销毁线段表配置实例。

收起

自动换行

深色代码主题

复制

```
1. #include <cassert>
2. #include <iostream>
3. #include "FASTKit/fast_ads_segment_map.h"

5. FAST_ErrorCode demoSegmentMapSumSet()
6. {
7. FAST_SegmentMapConfig *config = nullptr;
8. FAST_SegmentMapHandle handle = nullptr;
9. int32_t *array = nullptr;
10. FAST_ErrorCode ret;

12. ret = HMS_FAST_SegmentMap_CreateConfig(&config);
13. if (ret != FAST_ERROR_CODE_SUCCESS) {
14. return ret;
15. }

17. do {
18. // 初始化配置
19. ret = HMS_FAST_SegmentMap_SetQueryType(config, FAST_SEGMENTMAP_QUERY_TYPE_SUM);
20. if (ret != FAST_ERROR_CODE_SUCCESS) {
21. break;
22. }

24. ret = HMS_FAST_SegmentMap_SetUpdateType(config, FAST_SEGMENTMAP_UPDATE_TYPE_SET);
25. if (ret != FAST_ERROR_CODE_SUCCESS) {
26. break;
27. }

29. // 初始化数组
30. size_t size = 10;
31. array = new int32_t[size];
32. for (size_t i = 0; i < size; ++i) {
33. array[i] = i + 1;
34. }
35. // array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

37. // 创建线段表实例
38. ret = HMS_FAST_SegmentMap_Create(&handle, size, array, config);
39. // 线段表初始化为 {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
40. if (ret != FAST_ERROR_CODE_SUCCESS) {
41. break;
42. }

44. int32_t result;

46. // 第一次查询：查询区间[0, 5)的求和值
47. ret = HMS_FAST_SegmentMap_Query(handle, 0, 5, &result);
48. if (ret != FAST_ERROR_CODE_SUCCESS) {
49. break;
50. }
51. assert(result == 15);  // 1 + 2 + 3 + 4 + 5 = 15

53. // 第一次更新：将区间[3, 7)的值设置为-1
54. ret = HMS_FAST_SegmentMap_Update(handle, 3, 7, -1);
55. if (ret != FAST_ERROR_CODE_SUCCESS) {
56. break;
57. }
58. // 线段表更新为 {1, 2, 3, -1, -1, -1, -1, 8, 9, 10}

60. // 第二次查询：查询区间[0, 5)的求和值
61. ret = HMS_FAST_SegmentMap_Query(handle, 0, 5, &result);
62. if (ret != FAST_ERROR_CODE_SUCCESS) {
63. break;
64. }
65. assert(result == 4);  // 1 + 2 + 3 - 1 - 1 = 4

67. // 第二次更新：将区间[5, 9)的值设置为2
68. ret = HMS_FAST_SegmentMap_Update(handle, 5, 9, 2);
69. if (ret != FAST_ERROR_CODE_SUCCESS) {
70. break;
71. }
72. // 线段表更新为 {1, 2, 3, -1, -1, 2, 2, 2, 2, 10}

74. // 第三次查询：查询区间[0, 10)的求和值
75. ret = HMS_FAST_SegmentMap_Query(handle, 0, 10, &result);
76. if (ret != FAST_ERROR_CODE_SUCCESS) {
77. break;
78. }
79. assert(result == 22);  // 1 + 2 + 3 -1 -1 + 2 + 2 + 2 + 2 + 10 = 22

81. // 第三次更新：将区间[0, 3)的值设置为0
82. ret = HMS_FAST_SegmentMap_Update(handle, 0, 3, 0);
83. if (ret != FAST_ERROR_CODE_SUCCESS) {
84. break;
85. }
86. // 线段表更新为 {0, 0, 0, -1, -1, 2, 2, 2, 2, 10}

88. // 第四次查询：查询区间[3, 7)的求和值
89. ret = HMS_FAST_SegmentMap_Query(handle, 3, 7, &result);
90. if (ret != FAST_ERROR_CODE_SUCCESS) {
91. break;
92. }
93. assert(result == 2);  // -1 -1 + 2 + 2 = 2

95. // 第四次更新：将区间[7, 10)的值设置为5
96. ret = HMS_FAST_SegmentMap_Update(handle, 7, 10, 5);
97. if (ret != FAST_ERROR_CODE_SUCCESS) {
98. break;
99. }
100. // 线段表更新为 {0, 0, 0, -1, -1, 2, 2, 5, 5, 5}

102. // 第五次查询：查询区间[0, 10)的求和值
103. ret = HMS_FAST_SegmentMap_Query(handle, 0, 10, &result);
104. if (ret != FAST_ERROR_CODE_SUCCESS) {
105. break;
106. }
107. assert(result == 17);  // 0 + 0 + 0 -1 -1 + 2 + 2 + 5 + 5 + 5 = 17
108. } while (0);

110. // 销毁线段表实例
111. HMS_FAST_SegmentMap_Destroy(handle);

113. // 销毁配置
114. HMS_FAST_SegmentMap_DestroyConfig(config);

116. // 释放数组
117. if (array) {
118. delete[] array;
119. }

121. return ret;
122. }
```