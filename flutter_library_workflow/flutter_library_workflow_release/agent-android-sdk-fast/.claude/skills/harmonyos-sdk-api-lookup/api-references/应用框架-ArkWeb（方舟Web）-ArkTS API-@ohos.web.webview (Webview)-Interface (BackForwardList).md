当前Webview的历史信息列表。

说明

* 本模块首批接口从API version 9开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。
* 本Interface首批接口从API version 9开始支持。
* 示例效果请以真机运行为准。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { webview } from '@kit.ArkWeb';
```

## 属性

PhonePC/2in1TabletTVWearable

**系统能力：** SystemCapability.Web.Webview.Core

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| currentIndex | number | 否 | 否 | 当前在页面历史列表中的索引。 |
| size | number | 否 | 否 | 历史列表中索引的数量，最多保存50条，超过时起始记录会被覆盖。 |

## getItemAtIndex

PhonePC/2in1TabletTVWearable

getItemAtIndex(index: number): HistoryItem

获取历史列表中指定索引的历史记录项信息。

**系统能力：** SystemCapability.Web.Webview.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| index | number | 是 | 指定历史列表中的索引。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [HistoryItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-i#historyitem) | 历史记录项。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. 2. Incorrect parameter types. 3.Parameter verification failed. |

**示例：**



```
1. // xxx.ets
2. import { webview } from '@kit.ArkWeb';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. import { image } from '@kit.ImageKit';

6. @Entry
7. @Component
8. struct WebComponent {
9. controller: webview.WebviewController = new webview.WebviewController();
10. @State icon: image.PixelMap | undefined = undefined;

12. build() {
13. Column() {
14. Button('getBackForwardEntries')
15. .onClick(() => {
16. try {
17. let list = this.controller.getBackForwardEntries();
18. let historyItem = list.getItemAtIndex(list.currentIndex);
19. console.info("HistoryItem: " + JSON.stringify(historyItem));
20. this.icon = historyItem.icon;
21. } catch (error) {
22. console.error(`ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
23. }
24. })
25. Web({ src: 'www.example.com', controller: this.controller })
26. }
27. }
28. }
```