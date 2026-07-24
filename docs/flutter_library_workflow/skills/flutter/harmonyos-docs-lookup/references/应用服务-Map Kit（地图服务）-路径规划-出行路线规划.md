## 场景介绍

从5.1.1(19)开始，支持公共交通规划功能。

提供两点之间驾车、步行、骑行和公共交通的路径规划能力。其中驾车路径规划支持添加途经点。

## 接口说明

以下是路径规划功能相关接口，主要由[navi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api)命名空间下的方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getDrivingRoutes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section15371229153110)(params: [DrivingRouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section1345541155712)): Promise<[RouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section14125152320374)> | 驾车路径规划。 |
| [getDrivingRoutes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section89883616310)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [DrivingRouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section1345541155712)): Promise<[RouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section14125152320374)> | 驾车路径规划。支持传入Context上下文。 |
| [getWalkingRoutes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section18808624125913)(params: [RouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section17987175793914)): Promise<[RouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section14125152320374)> | 步行路径规划。 |
| [getWalkingRoutes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section20859185187)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [RouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section17987175793914)): Promise<[RouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section14125152320374)> | 步行路径规划。支持传入Context上下文。 |
| [getCyclingRoutes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section151981115506)(params: [RouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section17987175793914)): Promise<[RouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section14125152320374)> | 骑行路径规划。 |
| [getCyclingRoutes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section6187385125)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [RouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section17987175793914)): Promise<[RouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section14125152320374)> | 骑行路径规划。支持传入Context上下文。 |
| [getTransitRoutes](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section5970105744912)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [TransitRouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section54957561312)): Promise<[TransitRouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section7752185614207)> | 公共交通规划。支持传入Context上下文。 |
| [DrivingRouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section1345541155712) | 驾车路径规划的参数。 |
| [RouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section17987175793914) | 步行、骑行路径规划的参数。 |
| [TransitRouteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section54957561312) | 公共交通规划的参数。 |
| [RouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section14125152320374) | 路径规划的结果。 |
| [TransitRouteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section7752185614207) | 公共交通规划的结果。 |

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

### 驾车路径规划

根据起终点坐标检索符合条件的驾车路径规划方案。支持以下功能：

* 支持一次请求返回多条路线，最多支持3条路线。
* 最多支持5个途经点。
* 支持未来出行规划。
* 支持根据实时路况进行合理路线规划。
* 支持多种路线偏好选择，如时间最短、避免经过收费的公路、避开高速公路、距离优先等。

收起

自动换行

深色代码主题

复制

```
1. async testDrivingRoutes() {
2. let params: navi.DrivingRouteParams = {
3. // 起点的经纬度
4. origins: [{
5. latitude: 31.982129213545843,
6. longitude: 120.27745557768591
7. }],
8. // 终点的经纬度
9. destination: {
10. latitude: 31.986129213545843,
11. longitude: 120.32745557768591
12. },
13. // 路径的途经点
14. waypoints: [{
15. latitude: 31.967236140819114,
16. longitude: 120.27142088866847
17. }, {
18. latitude: 31.972868002238872,
19. longitude: 120.2943211817165
20. }, {
21. latitude: 31.98469327973332,
22. longitude: 120.29101107384068
23. }],
24. language: 'zh_CN'
25. };
26. try {
27. const result = await navi.getDrivingRoutes(params);
28. console.info(`Succeeded in getting driving routes. result is ${JSON.stringify(result)}`);
29. } catch (error) {
30. const err: BusinessError = error as BusinessError;
31. console.error(`Failed in getting driving routes. Code is ${err.code}, message is ${err.message}`);
32. }
33. }
```

### 步行路径规划

根据起终点坐标检索符合条件的步行路径规划方案。支持以下功能：

* 支持直线距离150km以内的步行路径规划能力。
* 融入出行策略（时间最短、避免轮渡）。

收起

自动换行

深色代码主题

复制

```
1. async testWalkingRoutes() {
2. let params: navi.RouteParams = {
3. // 起点的经纬度
4. origins: [{
5. latitude: 39.992281,
6. longitude: 116.31088
7. }, {
8. latitude: 39.996,
9. longitude: 116.311
10. }],
11. // 终点的经纬度
12. destination: {
13. latitude: 39.94,
14. longitude: 116.311
15. },
16. language: 'zh_CN'
17. };
18. try {
19. const result = await navi.getWalkingRoutes(params);
20. console.info(`Succeeded in getting walking routes. result is ${JSON.stringify(result)}`);
21. } catch (error) {
22. const err: BusinessError = error as BusinessError;
23. console.error(`Failed in getting walking routes. Code is ${err.code}, message is ${err.message}`);
24. }
25. }
```

### 骑行路径规划

根据起终点坐标检索符合条件的骑行路径规划方案。支持以下功能：

* 支持直线距离500km以内的骑行路径规划能力。
* 融入出行策略（时间最短、避免轮渡）。

收起

自动换行

深色代码主题

复制

```
1. async testCyclingRoutes() {
2. let params: navi.RouteParams = {
3. // 起点的经纬度
4. origins: [{
5. latitude: 31.9844102,
6. longitude: 118.7662537
7. }],
8. // 终点的经纬度
9. destination: {
10. latitude: 31.9874102,
11. longitude: 118.7362537
12. },
13. language: 'zh_CN'
14. };
15. try {
16. const result = await navi.getCyclingRoutes(params);
17. console.info(`Succeeded in getting cycling routes. result is ${JSON.stringify(result)}`);
18. } catch (error) {
19. const err: BusinessError = error as BusinessError;
20. console.error(`Failed in getting cycling routes. Code is ${err.code}, message is ${err.message}`);
21. }
22. }
```

### 公共交通规划

根据起点终点坐标规划道路，从而返回两地之间的多种公共交通中转路线，仅支持中国大陆。

收起

自动换行

深色代码主题

复制

```
1. async testGetTransitRoutes() {
2. let params: navi.TransitRouteParams = {
3. // 起点经纬度
4. origin: {
5. latitude: 39.921619,
6. longitude: 116.356587
7. },
8. // 终点经纬度
9. destination: {
10. latitude: 39.94161,
11. longitude: 116.353621
12. },
13. // 设置出发时间为当前时间（单位秒）
14. departureTime: new Date().getTime() / 1000
15. };
16. try {
17. const result = await navi.getTransitRoutes(this.getUIContext().getHostContext(), params);
18. console.info(`Succeeded in getting transit routes. result is ${JSON.stringify(result)}`);
19. } catch (error) {
20. const err: BusinessError = error as BusinessError;
21. console.error(`Failed in getting transit routes. Code is ${err.code}, message is ${err.message}`);
22. }
23. }
```