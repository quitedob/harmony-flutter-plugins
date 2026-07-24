从5.1.0(18)版本开始，新增支持系统送显模式。

系统送显模式是相较于游戏送显模式，能减少开发者集成复杂度的方案。在游戏送显模式下，系统完成预测后需要游戏应用主动调用图形API来完成预测帧的送显。 系统送显模式下游戏虽仍需要触发插帧任务，但不再需要负责预测帧送显，系统会完成送显。当前系统送显模式仅支持内插模式。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/XAmCf3SARk-gKnN_PIR1RQ/zh-cn_image_0000002418917117.png?HW-CC-KV=V1&HW-CC-Date=20260414T054310Z&HW-CC-Expire=86400&HW-CC-Sign=F77879C7A68A79FF0B39A0678334B5296F4DE753894C0A639411C2329F39B04F)