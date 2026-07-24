## 场景介绍

根据给定的坐标点捕捉道路，将用户的轨迹纠正到道路上，从而返回用户实际驾车经过的道路坐标。

## 接口说明

以下是路径规划功能相关接口，主要由[navi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api)命名空间下的方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [SnapToRoadsParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section37411438132) | 轨迹绑路的参数。 |
| [snapToRoads](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section36176371320)(params: [SnapToRoadsParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section37411438132)): Promise<[SnapToRoadsResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section318832513518)> | 轨迹绑路。 |
| [snapToRoads](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section119221856164916)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [SnapToRoadsParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section37411438132)): Promise<[SnapToRoadsResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section318832513518)> | 轨迹绑路。支持传入Context上下文。 |
| [SnapToRoadsResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section318832513518) | 轨迹绑路的结果。 |

## 开发步骤

导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { navi } from '@kit.MapKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
```

### 轨迹绑路

根据给定的坐标点捕捉道路，将用户的轨迹纠正到道路上，从而返回用户实际驾车经过的道路坐标。

收起

自动换行

深色代码主题

复制

```
1. async testSnapToRoads() {
2. let params: navi.SnapToRoadsParams = {
3. // 道路贴合点集合，不能超过100个，且相邻两个点距离需小于等于500米
4. points: [{
5. latitude: 31.984410259206815,
6. longitude: 118.76625379397866
7. }]
8. };
9. try {
10. const result = await navi.snapToRoads(params);
11. console.info(`Succeeded in snapping to roads. result is ${JSON.stringify(result)}`);
12. } catch (error) {
13. const err: BusinessError = error as BusinessError;
14. console.error(`Failed in snapping to roads. Code is ${err.code}, message is ${err.message}`);
15. }
16. }
```