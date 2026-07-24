insightIntent是Intents Kit的子模块，提供意图开放能力，包括共享和删除InsightIntent。应用/元服务可以通过调用本模块接口，向系统共享数据。意图框架根据共享的数据学习规律，在合适的时机在系统入口将对应的InsightIntent推荐给用户，用户点击后，根据应用/元服务声明的insightIntent API，跳转到对应页面。

举例说明：视频类应用通过insightIntent提供共享数据（如用户每天看视频的时间点、视频信息）和对应的开放API。意图框架将在用户每天看视频的时间点通过卡片推荐视频，用户点击卡片后，意图框架将调用该开放API打开视频。

**起始版本：** 4.0.0(10)

## 导入模块

PhonePC/2in1Tablet



```
1. import { insightIntent } from '@kit.IntentsKit';
```

## InsightIntent

PhonePC/2in1Tablet

InsightIntent，包括意图名称、意图版本号、标识、Action信息、Entity信息。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| intentName | string | 否 | 否 | 表示意图名称，例如：'PlayMusic'。 |
| intentVersion | string | 否 | 否 | 表示意图版本，当前为初始版本'1.0'。 |
| identifier | string | 否 | 否 | 表示意图的标识符，开发者按照自身业务需要生成，作为单条共享记录的唯一标识符。该字段的生成方式可参考UUID生成方式，或基于时间戳生成随机字符串。例如：'52dac3b0-6520-4974-81e5-25f0879449b5'。 |
| intentActionInfo | [IntentActionInfo](/consumer/cn/doc/harmonyos-references/intents-arkts-api-insightintent#intentactioninfo) | 否 | 否 | 表示意图的执行信息，例如：已执行或预测将要执行意图的时间。示例请参考[shareIntent](/consumer/cn/doc/harmonyos-references/intents-arkts-api-insightintent#shareintent)的示例代码。  **说明：**  - 在5.0.0(12)版本之前，参数类型为{[key: string]: Object}。  - 从5.0.0(12)版本开始，参数类型为IntentActionInfo。该类型定义与5.0.0(12)之前版本兼容。 |
| intentEntityInfo | [IntentEntityInfo](/consumer/cn/doc/harmonyos-references/intents-arkts-api-insightintent#intententityinfo) | 否 | 否 | 表示意图的实体信息，包含行为和事件。示例请参考[shareIntent](/consumer/cn/doc/harmonyos-references/intents-arkts-api-insightintent#shareintent)的示例代码。  **说明：**  在5.0.0(12)版本之前，参数类型为{entityId: string; entityName: string; [key: string]: Object}。  从5.0.0(12)版本开始，参数类型为IntentEntityInfo。该类型定义与5.0.0(12)之前版本兼容。 |

## IntentActionInfo

PhonePC/2in1Tablet

IntentActionInfo，表示意图的执行信息。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.AI.InsightIntent

**起始版本：** 5.0.0(12)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| [key: string] | Object | 否 | 否 | 表示值的类型为包含一个或多个键值对的对象。其中键的类型为字符，值的类型为Object，键和值的取值范围因意图名称而异，具体请参考[各垂域意图Schema](https://developer.huawei.com/consumer/cn/doc/service/intents-schema-0000001901962713)。 |

## IntentEntityInfo

PhonePC/2in1Tablet

IntentEntityInfo，表示意图的实体信息。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.AI.InsightIntent

**起始版本：** 5.0.0(12)

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| entityId | string | 否 | 否 | 表示意图实体的标识符，开发者按照自身业务需要生成，作为单条实体的唯一标识符。该字段的生成方式可参考UUID生成方式，或基于时间戳生成随机字符串。例如：'C10194368'。 |
| entityName | string | 否 | 否 | 表示意图实体的名称。取值请参考[各垂域意图Schema](https://developer.huawei.com/consumer/cn/doc/service/intents-schema-0000001901962713)。 |
| [key: string] | Object | 否 | 否 | 意图实体的其他信息，表示为一个或多个键值对。其中键的类型为字符，值的类型为Object，键和值的取值范围因意图名称而异，具体请参考[各垂域意图Schema](https://developer.huawei.com/consumer/cn/doc/service/intents-schema-0000001901962713)。 |

## shareIntent

PhonePC/2in1Tablet

shareIntent(context: common.BaseContext, intents: InsightIntent[], callback: AsyncCallback<void>): void

共享已执行或预期的InsightIntent ，使用callback异步回调。

为避免共享能力滥用，默认每个应用每天最多共享20次，超出限制后会返回错误码：1000101104。每次共享的数据条数不限，但是每次最多50KB数据量，单次数据量超出限制后会返回错误码：1000101105。所有接入方每天共享总次数上限为3000次，超出总次数限制会返回错误码：1000101106。建议积攒一定量的数据后一次全部共享并控制共享次数。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| intents | [InsightIntent](/consumer/cn/doc/harmonyos-references/intents-arkts-api-insightintent#insightintent-1)[] | 是 | 表示共享的InsightIntent。 |
| callback | AsyncCallback<void> | 是 | 回调函数，返回接口调用是否成功的结果。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101104 | The number of sharing times exceeds the limit. |
| 1000101105 | The size of a single shared data exceeds the limit. |
| 1000101106 | Exceeded the maximum number of sharing times of all applications. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('shareIntent')
10. .onClick(() => {
11. let playMusicIntent: insightIntent.InsightIntent = {
12. intentName: 'PlayMusic',
13. intentVersion: '1.0.1',
14. identifier: '52dac3b0-6520-4974-81e5-25f0879449b5',
15. intentActionInfo: {
16. actionMode: 'EXECUTED',
17. executedTimeSlots: {
18. executedStartTime: 1637393112000,
19. executedEndTime: 1637393212000
20. },
21. currentPercentage: 50
22. },
23. intentEntityInfo: {
24. entityName: 'Music',
25. entityId: 'C10194368',
26. entityGroupId: 'C10194321312',
27. displayName: '测试歌曲1',
28. description: 'NA',
29. logoURL: 'https://www-file.abc.com/-/media/corporate/images/home/logo/abc_logo.png',
30. keywords: ['华为音乐', '化妆'],
31. rankingHint: 99,
32. expirationTime: 1637393212000,
33. metadataModificationTime: 1637393212000,
34. activityType: ['1', '2', '3'],
35. artist: ['测试歌手1', '测试歌手2'],
36. lyricist: ['测试词作者1', '测试词作者2'],
37. composer: ['测试曲作者1', '测试曲作者2'],
38. albumName: '测试专辑',
39. duration: 244000,
40. playCount: 100000,
41. musicalGenre: ['流行', '华语', '金曲', '00后'],
42. isPublicData: false
43. }
44. };
45. // 共享数据接口  意图数组可以是更多的实体
46. // 根据实际代码上下文自行传入合适的context
47. insightIntent.shareIntent(this.getUIContext().getHostContext(), [playMusicIntent], (error) => {
48. if (error?.code) {
49. // 处理业务逻辑错误
50. console.error(`shareIntent failed, Code: ${error?.code}, message: ${error?.message}`);
51. return;
52. }
53. // 执行正常业务
54. console.info('shareIntent succeed');
55. });
56. })
57. }
58. .justifyContent(FlexAlign.Center)
59. .alignItems(VerticalAlign.Center)
60. .width('100%')
61. }
62. .height('100%')
63. .width('100%')
64. }
65. }
```

## shareIntent

PhonePC/2in1Tablet

shareIntent(context: common.BaseContext, intents: InsightIntent[]): Promise<void>

共享已执行或预期的InsightIntent 。使用Promise异步回调。

为避免共享能力滥用，默认每个应用每天最多共享20次，超出限制后会返回错误码：1000101104。每次共享的数据条数不限，但是每次最多50KB数据量，单次数据量超出限制后会返回错误码：1000101105。所有接入方每天共享总次数上限为3000次，超出总次数限制会返回错误码：1000101106。建议积攒一定量的数据后一次全部共享并控制共享次数。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| intents | [InsightIntent](/consumer/cn/doc/harmonyos-references/intents-arkts-api-insightintent#insightintent-1)[] | 是 | 表示共享的InsightIntent 。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果的Promise对象。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101104 | The number of sharing times exceeds the limit. |
| 1000101105 | The size of a single shared data exceeds the limit. |
| 1000101106 | Exceeded the maximum number of sharing times of all applications. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('shareIntent')
10. .onClick(() => {
11. let playMusicIntent: insightIntent.InsightIntent = {
12. intentName: 'PlayMusic',
13. intentVersion: '1.0.1',
14. identifier: '52dac3b0-6520-4974-81e5-25f0879449b5',
15. intentActionInfo: {
16. actionMode: 'EXECUTED',
17. currentPercentage: 50,
18. executedTimeSlots: {
19. executedEndTime: 1637393112000,
20. executedStartTime: 1637393212000
21. }
22. },
23. intentEntityInfo: {
24. entityName: 'Music',
25. entityId: 'C10194368',
26. entityGroupId: '热门',
27. displayName: '歌曲名称',
28. description: '歌曲解释',
29. logoURL: 'https://www-file.abc.com/-/media/corporate/images/home/logo/abc_logo.png',
30. keywords: ['华为音乐','化妆'],
31. rankingHint: 99,
32. expirationDate: 1637393212000,
33. metadataModificationDate: 1637393212000,
34. activityType: ['1', '2', '3'],
35. artist: ['张三','李四'],
36. lyricist: ['李四','张三'],
37. composer: ['张三','李四'],
38. albumName: '专辑名称',
39. duration: 123456789,
40. playCount: 456213123,
41. musicalGenre: ['民族风','摇滚'],
42. isPublicData: false
43. }
44. }

46. // 共享数据
47. // 此处仅为示例，请根据实际代码上下文自行传入合适的context
48. insightIntent.shareIntent(this.getUIContext().getHostContext(), [playMusicIntent]).then(() => {
49. console.info('shareIntent succeed');
50. });
51. })
52. }
53. .justifyContent(FlexAlign.Center)
54. .alignItems(VerticalAlign.Center)
55. .width('100%')
56. }
57. .height('100%')
58. .width('100%')
59. }
60. }
```

## deleteIntent

PhonePC/2in1Tablet

deleteIntent(context: common.BaseContext, intentName: string, identifiers: string[], callback: AsyncCallback<void>): void

删除InsightIntent。如果设置了identifiers参数，则删除intent名称下的identifiers对应的记录。否则，删除意图名称下的所有记录。使用callback异步回调。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| intentName | string | 是 | 表示意图的名称。 |
| identifiers | string[] | 是 | 表示意图的标识符。 |
| callback | AsyncCallback<void> | 是 | 回调函数。当删除操作成功，err为undefined，否则为错误对象。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('deleteIntent')
10. .onClick(() => {
11. // 删除意图下的某些记录
12. // 此处仅为示例，请根据实际代码上下文自行传入合适的context和意图标识符
13. insightIntent.deleteIntent(this.getUIContext().getHostContext(), 'PlayMusic', ['52dac3b0-6520-4974-81e5-25f0879449b5'], (error) => {
14. if (error?.code) {
15. // 处理业务逻辑错误
16. console.error(`deleteIntent failed, Code: ${error?.code}, message: ${error?.message}`);
17. return;
18. }
19. // 执行正常业务
20. console.info('deleteIntent succeed');
21. });
22. })
23. }
24. .justifyContent(FlexAlign.Center)
25. .alignItems(VerticalAlign.Center)
26. .width('100%')
27. }
28. .height('100%')
29. .width('100%')
30. }
31. }
```

## deleteIntent

PhonePC/2in1Tablet

deleteIntent(context: common.BaseContext, intentName: string, callback: AsyncCallback<void>): void

删除InsightIntent。清空指定意图名称下的所有记录。使用callback异步回调。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| intentName | string | 是 | 表示意图的名称。 |
| callback | AsyncCallback<void> | 是 | 回调函数。当删除操作成功，err为undefined，否则为错误对象。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('deleteIntent')
10. .onClick(() => {
11. // 删除意图下的某些记录
12. // 此处仅为示例，请根据实际代码上下文自行传入合适的context和意图标识符
13. insightIntent.deleteIntent(this.getUIContext().getHostContext(), 'PlayMusic', (error) => {
14. if (error?.code) {
15. // 处理业务逻辑错误
16. console.error(`deleteIntent failed, Code: ${error?.code}, message: ${error?.message}`);
17. return;
18. }
19. // 执行正常业务
20. console.info('deleteIntent succeed');
21. });
22. })
23. }
24. .justifyContent(FlexAlign.Center)
25. .alignItems(VerticalAlign.Center)
26. .width('100%')
27. }
28. .height('100%')
29. .width('100%')
30. }
31. }
```

## deleteIntent

PhonePC/2in1Tablet

deleteIntent(context: common.BaseContext, intentName: string, identifiers?: string[]): Promise<void>

删除InsightIntent。如果设置了identifiers参数，则删除intent名称下的identifiers对应的记录。否则，删除意图名称下的所有记录。使用Promise异步回调。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| intentName | string | 是 | 表示意图的名称。 |
| identifiers | string[] | 否 | 表示意图的标识符。如果填写该字段，则删除指定标识符的意图；如果未填写该字段，则删除意图名称下的所有记录。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果的Promise对象。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('deleteIntent')
10. .onClick(() => {
11. // 删除意图下的某些记录
12. // 此处仅为示例，请根据实际代码上下文自行传入合适的context和意图标识符
13. insightIntent.deleteIntent(this.getUIContext().getHostContext(), 'PlayMusic', ['52dac3b0-6520-4974-81e5-25f0879449b5']).then(() => {
14. console.info('deleteIntent succeed');
15. })
16. })
17. }
18. .justifyContent(FlexAlign.Center)
19. .alignItems(VerticalAlign.Center)
20. .width('100%')
21. }
22. .height('100%')
23. .width('100%')
24. }
25. }
```

## deleteEntity

PhonePC/2in1Tablet

deleteEntity(context: common.BaseContext, entityName: string, entityIds: string[], callback: AsyncCallback<void>): void

根据实体ID删除InsightIntent实体。使用callback异步回调。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| entityName | string | 是 | 表示实体的名称。 |
| entityIds | string[] | 是 | 表示实体的id。 |
| callback | AsyncCallback<void> | 是 | 回调函数。当删除操作成功，err为undefined，否则为错误对象。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('deleteEntity')
10. .onClick(() => {
11. // 删除Entity数据
12. // 此处仅为示例，请根据实际代码上下文自行传入合适的context
13. insightIntent.deleteEntity(this.getUIContext().getHostContext(), 'PlayMusic', ['a5c9e9e3-3d0a-4e6a-9f3d-6b7c6b8d6b9f'], (error) => {
14. if (error?.code) {
15. // 处理业务逻辑错误
16. console.error(`deleteEntity failed, Code: ${error?.code}, message: ${error?.message}`);
17. return;
18. }
19. // 执行正常业务
20. console.info('deleteEntity succeed');
21. });
22. })
23. }
24. .justifyContent(FlexAlign.Center)
25. .alignItems(VerticalAlign.Center)
26. .width('100%')
27. }
28. .height('100%')
29. .width('100%')
30. }
31. }
```

## deleteEntity

PhonePC/2in1Tablet

deleteEntity(context: common.BaseContext, entityName: string, entityIds: string[]): Promise<void>

根据实体ID删除InsightIntent实体。使用Promise异步回调。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| entityName | string | 是 | 表示实体的名称。 |
| entityIds | string[] | 是 | 表示实体的id。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果的Promise对象。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('deleteEntity')
10. .onClick(() => {
11. // 删除Entity数据
12. // 此处仅为示例，请根据实际代码上下文自行传入合适的context
13. insightIntent.deleteEntity(this.getUIContext().getHostContext(), 'PlayMusic', ['a5c9e9e3-3d0a-4e6a-9f3d-6b7c6b8d6b9f']).then(() => {
14. console.info('deleteEntity succeed');
15. })
16. })
17. }
18. .justifyContent(FlexAlign.Center)
19. .alignItems(VerticalAlign.Center)
20. .width('100%')
21. }
22. .height('100%')
23. .width('100%')
24. }
25. }
```

## getSid

PhonePC/2in1Tablet

getSid(context: common.BaseContext, renew: boolean): Promise<string>

获取Service Open ID。使用Promise异步回调。

**元服务API**： 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.AI.InsightIntent

**起始版本：** 5.0.0(12)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | common.[BaseContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 是 | 表示应用上下文。 |
| renew | boolean | 是 | 是否强制从云端获取新的服务开放ID。如果为true，从云端获取新的服务开放ID；如果为false，则优先获取本地存储的服务开放ID。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<string> | Promise对象，返回获取到的Service Open ID。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/intents-arkts-api-errorcodes-insightintent)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | The parameter check failed. |
| 1000101101 | The application has not been registered with the InsightIntent. |
| 1000101102 | HUAWEI Assistant has stopped providing services. |
| 1000101107 | Too many Service Open ID renew requests. |
| 1000101201 | The service is abnormal. |

**示例：**



```
1. import { insightIntent } from '@kit.IntentsKit';

3. @Entry
4. @Component
5. struct Index {
6. build() {
7. Column() {
8. Row() {
9. Button('获取Sid')
10. .onClick(() => {
11. // 获取SID
12. // 此处仅为示例，请根据实际代码上下文自行传入合适的context
13. insightIntent.getSid(this.getUIContext().getHostContext(), false).then((sid: string) => {
14. console.info(`getSid succeed!, sid: ${sid}`);
15. })
16. })
17. }
18. .justifyContent(FlexAlign.Center)
19. .alignItems(VerticalAlign.Center)
20. .width('100%')
21. }
22. .height('100%')
23. .width('100%')
24. }
25. }
```