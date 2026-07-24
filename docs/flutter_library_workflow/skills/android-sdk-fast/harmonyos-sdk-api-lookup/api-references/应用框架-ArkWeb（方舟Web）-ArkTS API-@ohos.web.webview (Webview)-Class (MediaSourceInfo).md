表示媒体源的信息。

说明

* 本模块首批接口从API version 9开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 本Class首批接口从API version 12开始支持。
* 示例效果请以真机运行为准。

## 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.Web.Webview.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| type12+ | [SourceType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-e#sourcetype12) | 否 | 否 | 媒体源的类型。 |
| source12+ | string | 否 | 否 | 媒体源地址。 |
| format12+ | string | 否 | 否 | 媒体源格式，可能为空，需要开发者自行判断格式。 |

**示例：**



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';

4. const mediaInfo: webview.MediaSourceInfo = {
5. type: webview.SourceType.URL,
6. source: 'https://example.com/video.mp4',
7. format: 'mp4'
8. };
```