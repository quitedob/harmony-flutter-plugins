## 概要

从5.0.0(12)开始，AR Engine支持识别平面语义能力。

对于检测到的平面，开发者可以通过AR Engine识别该平面的语义，语义类型包括墙面、地面、座椅、桌面、天花板、门、窗户、床、平面空间、立方体体积、立方体空间容积和未知类型（平面空间、立方体体积和立方体空间容积仅在高精几何重建模式下支持）。

## 引入AR Engine

开发者可参考管理AR会话章节的[引入AR Engine](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-arsession#section1410827131110)。

## 创建AR会话

创建AR会话并配置为平面语义识别模式。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARSession *arSession = nullptr;
2. // 创建AR会话。
3. HMS_AREngine_ARSession_Create(nullptr, nullptr, &arSession);
4. AREngine_ARConfig *arConfig = nullptr;
5. // 创建AR会话配置器。
6. HMS_AREngine_ARConfig_Create(arSession, &arConfig);
7. // 设置语义识别模式为平面语义识别。
8. HMS_AREngine_ARConfig_SetSemanticMode(arSession, arConfig, ARENGINE_SEMANTIC_MODE_PLANE);
9. // 配置器设置给AR会话。
10. HMS_AREngine_ARSession_Configure(arSession, arConfig);
```

## 检测环境中的平面

进行平面语义识别之前，需要先检测环境中的平面。开发者可以参考[检测环境中的平面](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-get-plane)完成平面检测过程，并获取环境中的平面数量。当存在平面时，就可以继续下面的步骤。

## 初始化平面语义标签

创建并初始化平面语义标签label，用于描述平面的语义。

收起

自动换行

深色代码主题

复制

```
1. AREngine_ARSemanticPlaneLabel label = ARENGINE_PLANE_UNKNOWN;
```

平面语义标签定义为枚举类型，包括12种枚举值（1种未知类型+11种平面类型）。

收起

自动换行

深色代码主题

复制

```
1. typedef enum {
2. /** Unknown type. */
3. ARENGINE_PLANE_UNKNOWN = 0,
4. /** Wall. */
5. ARENGINE_PLANE_WALL = 1,
6. /** Floor. */
7. ARENGINE_PLANE_FLOOR = 2,
8. /** Seat. */
9. ARENGINE_PLANE_SEAT = 3,
10. /** Table. */
11. ARENGINE_PLANE_TABLE = 4,
12. /** Ceiling. */
13. ARENGINE_PLANE_CEILING = 5,
14. /** Door. */
15. ARENGINE_PLANE_DOOR = 6,
16. /** Window. */
17. ARENGINE_PLANE_WINDOW = 7,
18. /** Bed. */
19. ARENGINE_PLANE_BED = 8,
20. /** Plane Space. */
21. ARENGINE_PLANE_SPACE = 9,
22. /** Cube Volume. */
23. ARENGINE_CUBE_VOLUME = 10,
24. /** Cube Space. */
25. ARENGINE_CUBE_SPACE = 11,
26. } AREngine_ARSemanticPlaneLabel;
```

## 识别平面类型

调用[HMS\_AREngine\_ARPlane\_GetLabel](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arengine-capi-arengine#ga913456f9586c82adcdbcae291ec8e17c)函数，获取平面类型，结果存放在label中。平面的获取可以参考[获取平面实例](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arengine-c-get-plane#section4891238142419)。

收起

自动换行

深色代码主题

复制

```
1. HMS_AREngine_ARPlane_GetLabel(arSession, arPlane, &label);
```