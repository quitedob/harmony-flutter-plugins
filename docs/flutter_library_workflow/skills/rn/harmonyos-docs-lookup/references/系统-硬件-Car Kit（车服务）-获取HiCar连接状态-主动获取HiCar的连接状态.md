## 场景介绍

生态应用可以通过主动获取智慧出行连接状态接口来获取HiCar的连接状态（如：判断应用是否在HiCar上拉起）。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c4/v3/jioo5PVrS-CZLHmU029pGg/zh-cn_image_0000002481508418.png?HW-CC-KV=V1&HW-CC-Date=20260414T045726Z&HW-CC-Expire=86400&HW-CC-Sign=7F02C65E7BAD72C0BC4A814066AE9D13390FD509EDC9FCDF8E22603B2E4FD1C5 "点击放大")

## 接口说明

获取HiCar连接状态的接口如下：

展开

| 接口名 | 描述 |
| --- | --- |
| [getSmartMobilityStatus](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/car-smartmobilitycommon#section98392519331) | 获取智慧出行连接状态。 |

### SmartMobilityInfo说明

SmartMobilityInfo状态（status）取值如下：

展开

| **编号** | **状态** | **描述** |
| --- | --- | --- |
| 0 | IDLE | 空闲态。 |
| 1 | RUNNING | 运行态。 |

SmartMobilityInfo业务类型（type）取值如下：

展开

| **编号** | 业务类型 | **描述** |
| --- | --- | --- |
| 0 | HICAR | HiCar。 |
| 1 | SUPER\_LAUNCHER | 超级桌面。 |
| 2 | CAR\_HOP | 流转。 |

SmartMobilityInfo业务数据（data）参数如下：

展开

| **编号** | 参数 | **描述** |
| --- | --- | --- |
| 0 | DEVICE\_TYPE | 设备类型。 |
| 1 | DISPLAY\_ID | 业务所在的虚拟屏ID。 |
| 2 | IS\_PHONE\_DESKTOP | 当前是否在HiCar上显示手机桌面（仅在HiCar业务中展示）。 |

## 开发步骤

1. 导入相关模块。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. import { smartMobilityCommon } from '@kit.CarKit';
   2. import { UIAbility } from '@kit.AbilityKit';
   3. import { hilog } from '@kit.PerformanceAnalysisKit'
   ```
2. 查询智慧出行连接状态。

   应用在适配HiCar时，可以实时查询接口来获取智慧出行连接状态（如：判断应用是否在HiCar上）。

   收起

   自动换行

   深色代码主题

   复制

   ```
   1. export default class EntryAbility extends UIAbility {
   2. isAppOnHiCar(): boolean {
   3. try {
   4. // 应用所在的屏幕id
   5. const currentDisplayId = this.context.config.displayId;
   6. // 获取SmartMobilityAwareness实例
   7. let awareness: smartMobilityCommon.SmartMobilityAwareness = smartMobilityCommon.getSmartMobilityAwareness();
   8. // 获取当前智慧出行连接状态
   9. let info: smartMobilityCommon.SmartMobilityInfo =
   10. awareness.getSmartMobilityStatus(smartMobilityCommon.SmartMobilityType.HICAR);
   11. const deviceDisplayId = Number(info.data["DISPLAY_ID"]);
   12. if (currentDisplayId === deviceDisplayId) {
   13. // 表示应用在对应的设备屏幕上
   14. hilog.info(0x0000, 'testTag', 'app in on device screen');
   15. return true;
   16. }
   17. } catch (e) {
   18. // 捕获接口调用异常时的错误码并做相应处理
   19. hilog.error(0x0000, 'testTag', `get smart mobility status error, error code: ${e?.code}`);
   20. }
   21. return false;
   22. }
   23. }
   ```