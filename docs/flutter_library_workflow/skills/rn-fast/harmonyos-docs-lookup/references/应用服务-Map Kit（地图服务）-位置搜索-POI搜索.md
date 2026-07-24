## 场景介绍

提供多种查询POI信息的能力：

* 关键字搜索：通过用户输入的关键字，返回地点列表。
* 周边搜索：基于用户设备位置进行地点查找。
* 自动补全：根据输入的关键字返回预测的输入关键字和地点查询建议。
* 地点详情：查询某个地点更详细的信息。

## 接口说明

以下是POI搜索相关接口，主要由[site](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site)命名空间下的方法提供，更多接口及使用方法请参见[接口文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site)。

展开

| 接口名 | 描述 |
| --- | --- |
| [searchByText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1117619561413)(searchByTextParams: [SearchByTextParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section186305710274)): Promise<[SearchByTextResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section55651334123013)> | 关键字搜索。 |
| [searchByText](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section142981754612)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), searchByTextParams: [SearchByTextParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section186305710274)): Promise<[SearchByTextResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section55651334123013)> | 关键字搜索。支持上传Context上下文。 |
| [nearbySearch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section6315894393)(nearbySearchParams: [NearbySearchParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1963813341280)): Promise<[NearbySearchResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section15617144513016)> | 周边搜索。 |
| [nearbySearch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section4478173620711)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), nearbySearchParams: [NearbySearchParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1963813341280)): Promise<[NearbySearchResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section15617144513016)> | 周边搜索。支持上传Context上下文。 |
| [queryAutoComplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section20324320183912)(queryAutoCompleteParams: [QueryAutoCompleteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section18371146292)): Promise<[QueryAutoCompleteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section81901456163020)> | 自动补全。 |
| [queryAutoComplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section1095410462267)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), queryAutoCompleteParams: [QueryAutoCompleteParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section18371146292)): Promise<[QueryAutoCompleteResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section81901456163020)> | 自动补全。支持上传Context上下文。 |
| [searchById](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section17490031173910)(searchByIdParams: [SearchByIdParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section756019297292)): Promise<[SearchByIdResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section9671461314)> | 地点详情。 |
| [searchById](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section192881428123313)(context: [common.Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context), searchByIdParams: [SearchByIdParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section756019297292)): Promise<[SearchByIdResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/map-site#section9671461314)> | 地点详情。支持上传Context上下文。 |

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

### 关键字搜索

通过指定的关键字和可选的地理范围，查询诸如旅游景点、企业和学校之类的地点。

收起

自动换行

深色代码主题

复制

```
1. let params: site.SearchByTextParams = {
2. // 根据自定义关键字进行搜索，例如：“故宫”、“夫子庙”
3. query: "Piazzale Dante, 41, 55049 Viareggio, Tuscany, Italy",
4. // 经纬度坐标
5. location: {
6. latitude: 31.984,
7. longitude: 118.76625
8. },
9. // 指定地理位置的范围半径
10. radius: 10000,
11. // 搜索结果的语言类型
12. language: "en"
13. };
14. // 返回关键字搜索结果
15. try {
16. const result = await site.searchByText(params);
17. console.info(`Succeeded in searching by text. result is ${JSON.stringify(result)}`);
18. } catch (error) {
19. const err: BusinessError = error as BusinessError;
20. console.error(`Failed in searching by text. Code is ${err.code}, message is ${err.message}`);
21. }
```

### 周边搜索

通过用户传入自己的位置，可以返回周边地点列表。您可以通过提供关键字或指定要搜索的地点的类型来优化搜索结果。

收起

自动换行

深色代码主题

复制

```
1. let params: site.NearbySearchParams = {
2. location: {
3. latitude:51.50811219132287,
4. longitude:-0.07594896472392065
5. },
6. poiTypes: [
7. "Watch_Store",
8. "SUBWAY",
9. "PRIMARY_SCHOOL",
10. "GENERAL_AUTO_REPAIR_SERVICE_CENTER"
11. ]
12. }
13. // 返回周边搜索结果
14. try {
15. const result = await site.nearbySearch(params);
16. console.info(`Succeeded in searching nearby. result is ${JSON.stringify(result)}`);
17. } catch (error) {
18. const err: BusinessError = error as BusinessError;
19. console.error(`Failed in searching nearby. Code is ${err.code}, message is ${err.message}`);
20. }
```

### 自动补全

根据输入的关键字，将最有可能的搜索词呈现给用户，以减少用户输入信息，提升用户体验。如：输入“北京”，提示“北京市”、“北京站”、“北京西站”等。

收起

自动换行

深色代码主题

复制

```
1. let params: site.QueryAutoCompleteParams = {
2. // 自定义关键字
3. query: "hotel",
4. // 经纬度坐标
5. location: {
6. latitude: 31.984410259206815,
7. longitude: 118.76625379397866
8. },
9. language: "en",
10. // 返回子节点
11. isChildren: true
12. };
13. // 返回自动补全结果
14. try {
15. const result = await site.queryAutoComplete(params);
16. console.info(`Succeeded in querying. result is ${JSON.stringify(result)}`);
17. } catch (error) {
18. const err: BusinessError = error as BusinessError;
19. console.error(`Failed in querying. Code is ${err.code}, message is ${err.message}`);
20. }
```

### 地点详情

根据地点的唯一主键地点ID（siteId）获取地点详情。地点详细信息请求返回有关指定地点的更全面的信息，如地点名称、地址详细信息、经纬度等。siteId可通过其他接口（关键字搜索、周边搜索、地点详情、自动补全、正地理编码）的返回结果中获取。

收起

自动换行

深色代码主题

复制

```
1. let params: site.SearchByIdParams = {
2. // 指定主键地点ID
3. siteId: "144129739873977856",
4. language: "en",
5. // 返回子节点
6. isChildren: true
7. };
8. // 返回地点详情结果
9. try {
10. const result = await site.searchById(params);
11. console.info(`Succeeded in searching. result is ${JSON.stringify(result)}`);
12. } catch (error) {
13. const err: BusinessError = error as BusinessError;
14. console.error(`Failed in searching. Code is ${err.code}, message is ${err.message}`);
15. }
```