## 场景介绍

多个起点到多个终点的批量算路功能，在驾车、步行、骑行模式下，快速批量计算多个起点分别到多个终点的路线距离和耗时。

## 接口说明

以下是路径规划功能相关接口，主要由[navi](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api)命名空间下的方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api)。

展开

| 接口名 | 描述 |
| --- | --- |
| [getDrivingMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section13344132412116)(params: [DrivingMatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section28063259547)): Promise<[MatrixResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section39821913105112)> | 驾车批量算路。 |
| [getDrivingMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section51124206433)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [DrivingMatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section28063259547)): Promise<[MatrixResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section39821913105112)> | 驾车批量算路。支持传入Context上下文。 |
| [getWalkingMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section99212131124)(params: [MatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section169321223144714)): Promise<[MatrixResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section39821913105112)> | 步行批量算路。 |
| [getWalkingMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section2073332519489)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [MatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section169321223144714)): Promise<[MatrixResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section39821913105112)> | 步行批量算路。支持传入Context上下文。 |
| [getCyclingMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section20522154810218)(params: [MatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section169321223144714)): Promise<[MatrixResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section39821913105112)> | 骑行批量算路。 |
| [getCyclingMatrix](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section20175113834919)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), params: [MatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section169321223144714)): Promise<[MatrixResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section39821913105112)> | 骑行批量算路。支持传入Context上下文。 |
| [DrivingMatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section28063259547) | 驾车批量算路的参数。 |
| [MatrixParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section169321223144714) | 步行、骑行批量算路的参数。 |
| [MatrixResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-navi-api#section39821913105112) | 批量算路的结果。 |

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

### 驾车批量算路

根据多组起终点坐标批量检索符合条件的驾车路径规划方案。支持以下功能：

* 支持未来出行规划。
* 支持根据实时路况进行合理路线规划。
* 支持多种路线偏好选择，如时间最短、避免经过收费的公路、避开高速公路、距离优先等。

说明

限制：为保证性能与准确性，单次请求中的起点数量乘以终点数量应小于100。

收起

自动换行

深色代码主题

复制

```
1. async testDrivingMatrix() {
2. let params: navi.DrivingMatrixParams = {
3. // 起点的经纬度
4. origins: [{
5. latitude: 31.9844,
6. longitude: 118.766253
7. }, {
8. latitude: 31.9644,
9. longitude: 118.746253
10. }],
11. // 终点的经纬度
12. destinations: [{
13. latitude: 31.9344,
14. longitude: 118.706253
15. }],
16. // 时间预估模型
17. trafficMode: 2,
18. language: 'zh_CN'
19. };
20. try {
21. const result = await navi.getDrivingMatrix(params);
22. console.info(`Succeeded in getting driving matrix. result is ${JSON.stringify(result)}`);
23. } catch (error) {
24. const err: BusinessError = error as BusinessError;
25. console.error(`Failed in getting driving matrix. Code is ${err.code}, message is ${err.message}`);
26. }
27. }
```

### 步行批量算路

根据多组起终点坐标批量检索符合条件的步行路径规划方案。支持以下功能：

* 支持150km以内的步行路径规划能力。
* 融入出行策略（时间最短、避免轮渡）。

说明

限制：为保证性能与准确性，单次请求中的起点数量乘以终点数量应小于100。

收起

自动换行

深色代码主题

复制

```
1. async testWalkingMatrix() {
2. let params: navi.MatrixParams = {
3. // 起点的经纬度
4. origins: [
5. {
6. latitude: 31.9844,
7. longitude: 118.766253
8. }, {
9. latitude: 31.9644,
10. longitude: 118.746253
11. }],
12. // 终点的经纬度
13. destinations: [{
14. latitude: 31.9344,
15. longitude: 118.706253
16. }],
17. language: 'zh_CN'
18. };
19. try {
20. const result = await navi.getWalkingMatrix(params);
21. console.info(`Succeeded in getting walking matrix. result is ${JSON.stringify(result)}`);
22. } catch (error) {
23. const err: BusinessError = error as BusinessError;
24. console.error(`Failed in getting walking matrix. Code is ${err.code}, message is ${err.message}`);
25. }
26. }
```

### 骑行批量算路

根据多组起终点坐标批量检索符合条件的骑行路径规划方案。支持以下功能：

* 支持500km以内的骑行路径规划能力。
* 融入出行策略（时间最短、避免轮渡）。

说明

限制：为保证性能与准确性，单次请求中的起点数量乘以终点数量应小于100。

收起

自动换行

深色代码主题

复制

```
1. async testCyclingMatrix() {
2. let params: navi.MatrixParams = {
3. // 起点的经纬度
4. origins: [{
5. latitude: 31.9844,
6. longitude: 118.766253
7. }, {
8. latitude: 31.9644,
9. longitude: 118.746253
10. }],
11. // 终点的经纬度
12. destinations: [{
13. latitude: 31.9344,
14. longitude: 118.706253
15. }],
16. language: 'zh_CN'
17. };
18. try {
19. const result = await navi.getCyclingMatrix(params);
20. console.info(`Succeeded in getting cycling matrix. result is ${JSON.stringify(result)}`);
21. } catch (error) {
22. const err: BusinessError = error as BusinessError;
23. console.error(`Failed in getting cycling matrix. Code is ${err.code}, message is ${err.message}`);
24. }
25. }
```