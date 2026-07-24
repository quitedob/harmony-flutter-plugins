## 场景介绍

提供正地理编码、逆地理编码的能力：

* 正地理编码：根据地址获取地点的经纬度。
* 逆地理编码：获取经纬度对应的地点信息。

## 接口说明

以下是地理编码相关接口，主要由[site](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site)命名空间下的方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site)。

展开

| 接口名 | 描述 |
| --- | --- |
| [geocode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section8164175012335)(geocodeParams: [GeocodeParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1694092873712)): Promise<[GeocodeResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section6240139114011)> | 正地理编码。 |
| [geocode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section115620617362)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), geocodeParams: [GeocodeParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1694092873712)): Promise<[GeocodeResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section6240139114011)> | 正地理编码。支持上传Context上下文。 |
| [reverseGeocode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section18528174963917)(reverseGeocodeParams: [ReverseGeocodeParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1170341119303)): Promise<[ReverseGeocodeResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section6201636113110)> | 逆地理编码。 |
| [reverseGeocode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section52110883915)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), reverseGeocodeParams: [ReverseGeocodeParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1170341119303)): Promise<[ReverseGeocodeResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section6201636113110)> | 逆地理编码。支持上传Context上下文。 |
| [GeocodeParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1694092873712) | 正地理编码的参数。 |
| [GeocodeResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section6240139114011) | 正地理编码的结果。 |
| [ReverseGeocodeParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1170341119303) | 逆地理编码的参数。 |
| [ReverseGeocodeResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section6201636113110) | 逆地理编码的结果。 |

## 开发步骤

导入相关模块。

收起

自动换行

深色代码主题

复制

```
1. import { site } from '@kit.MapKit';
2. import { BusinessError } from '@kit.BasicServicesKit';
```

### 正地理编码

说明

根据地址获取地点的空间坐标，如经纬度，最多返回10条记录。

收起

自动换行

深色代码主题

复制

```
1. let params: site.GeocodeParams = {
2. // 地址信息
3. query: 'Piazzale Dante, 41, 55049 Viareggio',
4. language: 'en'
5. };
6. try {
7. // 调用正地理编码接口进行地址查询
8. const result = await site.geocode(params);
9. console.info(`Succeeded in geocoding. result is ${JSON.stringify(result)}`);
10. } catch (error) {
11. const err: BusinessError = error as BusinessError;
12. console.error(`Failed in geocoding. Code is ${err.code}, message is ${err.message}`);
13. }
```

### 逆地理编码

收起

自动换行

深色代码主题

复制

```
1. let params: site.ReverseGeocodeParams = {
2. // 位置经纬度
3. location: {
4. latitude: 31.984410259206815,
5. longitude: 118.76625379397866
6. },
7. language: "en",
8. radius: 0,
9. isExtension: true,
10. isNearbyAoi: true
11. };
12. try {
13. // 调用逆地理编码接口进行坐标地址查询
14. const result = await site.reverseGeocode(params);
15. console.info(`Succeeded in reversing. result is ${JSON.stringify(result)}`);
16. } catch (error) {
17. const err: BusinessError = error as BusinessError;
18. console.error(`Failed in reversing. Code is ${err.code}, message is ${err.message}`);
19. }
```