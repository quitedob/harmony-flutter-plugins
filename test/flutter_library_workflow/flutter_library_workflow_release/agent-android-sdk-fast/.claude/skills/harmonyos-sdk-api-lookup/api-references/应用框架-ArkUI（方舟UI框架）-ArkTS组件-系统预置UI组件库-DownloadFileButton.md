下载文件按钮，通过点击该下载按钮，可以获取到当前应用在Download公共目录中所属的存储路径。

说明

该组件从API version 12开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

该组件不支持在Wearable设备上使用。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { DownloadFileButton } from '@kit.ArkUI';
```

## 子组件

PhonePC/2in1TabletTVWearable

无

## 属性

PhonePC/2in1TabletTVWearable

支持[通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes)。

## DownloadFileButton

PhonePC/2in1TabletTVWearable

下载文件按钮组件，默认显示图标和文字。

**装饰器类型：**@Component

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 必填 | 装饰器类型 | 说明 |
| --- | --- | --- | --- | --- |
| contentOptions | [DownloadContentOptions](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-downloadfilebutton#downloadcontentoptions) | 是 | @State | 创建包含指定元素内容的下载按钮。 |
| styleOptions | [DownloadStyleOptions](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-downloadfilebutton#downloadstyleoptions) | 是 | @State | 创建包含指定元素样式的下载按钮。 |

## DownloadContentOptions

PhonePC/2in1TabletTVWearable

下载文件按钮中显示的内容。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| icon | [DownloadIconStyle](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-downloadfilebutton#downloadiconstyle) | 否 | 是 | 设置下载按钮的图标风格。  不传入该参数表示没有图标，icon和text至少存在一个。 |
| text | [DownloadDescription](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-downloadfilebutton#downloaddescription) | 否 | 是 | 设置下载按钮的文本描述。  不传入该参数表示没有文字描述，icon和text至少存在一个。 |

## DownloadStyleOptions

PhonePC/2in1TabletTVWearable

下载文件按钮中图标和文字的样式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| iconSize | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | 否 | 是 | 下载控件上图标的尺寸，不支持百分比。  默认值：16vp |
| layoutDirection | [DownloadLayoutDirection](/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-downloadfilebutton#downloadlayoutdirection) | 否 | 是 | 下载控件上图标和文字分布的方向。  默认值：DownloadLayoutDirection.HORIZONTAL |
| fontSize | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | 否 | 是 | 下载控件上文字的尺寸，不支持百分比。  默认值：16fp |
| fontStyle | [FontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontstyle) | 否 | 是 | 下载控件上文字的样式。  默认值：FontStyle.Normal |
| fontWeight | number|[FontWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontweight)|string | 否 | 是 | 下载控件上文字粗细，number类型取值[100, 900]，取值间隔为100，默认为400，取值越大，字体越粗。string类型仅支持number类型取值的字符串形式，例如"400"，以及"bold"、"bolder"、"lighter"、"regular"、"medium"，分别对应FontWeight中相应的枚举值。  默认值：FontWeight.Medium |
| fontFamily | string|[Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resource) | 否 | 是 | 下载控件上文字的字体。  默认字体：'HarmonyOS Sans' |
| fontColor | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 否 | 是 | 下载控件上文字的颜色。  默认值：#ffffffff |
| iconColor | [ResourceColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#resourcecolor) | 否 | 是 | 下载控件上图标的颜色。  默认值：#ffffffff |
| textIconSpace | [Dimension](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-types#dimension10) | 否 | 是 | 下载控件中图标和文字的间距。  默认值：4vp |

## DownloadIconStyle

PhonePC/2in1TabletTVWearable

下载文件按钮中图标的风格。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| FULL\_FILLED | 1 | 下载按钮展示填充样式图标。 |
| LINES | 2 | 下载按钮展示线条样式图标。 |

## DownloadDescription

PhonePC/2in1TabletTVWearable

下载按钮中文字的内容。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| DOWNLOAD | 1 | 下载按钮的文字描述为“下载”。 |
| DOWNLOAD\_FILE | 2 | 下载按钮的文字描述为“下载文件”。 |
| SAVE | 3 | 下载按钮的文字描述为“保存”。 |
| SAVE\_IMAGE | 4 | 下载按钮的文字描述为“保存图片”。 |
| SAVE\_FILE | 5 | 下载按钮的文字描述为“保存文件”。 |
| DOWNLOAD\_AND\_SHARE | 6 | 下载按钮的文字描述为“下载分享”。 |
| RECEIVE | 7 | 下载按钮的文字描述为“接收”。 |
| CONTINUE\_TO\_RECEIVE | 8 | 下载按钮的文字描述为“继续接收”。 |

## DownloadLayoutDirection

PhonePC/2in1TabletTVWearable

下载文件按钮中图标和文字的排列方式。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**： SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| HORIZONTAL | 0 | 下载控件上图标和文字分布的方向为水平排列。 |
| VERTICAL | 1 | 下载控件上图标和文字分布的方向为垂直排列。 |

## 事件

PhonePC/2in1TabletTVWearable

支持[通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events)。

## 示例

PhonePC/2in1TabletTVWearable



```
1. // xxx.ets

3. import { picker } from '@kit.CoreFileKit';
4. import { BusinessError } from '@kit.BasicServicesKit';
5. import { DownloadFileButton, DownloadLayoutDirection, DownloadIconStyle, DownloadDescription } from '@kit.ArkUI';

7. @Entry
8. @Component
9. struct Index {
10. build() {
11. Column() {
12. DownloadFileButton({
13. contentOptions: {
14. icon: DownloadIconStyle.FULL_FILLED,
15. text: DownloadDescription.DOWNLOAD
16. },
17. styleOptions: {
18. iconSize: '16vp',
19. layoutDirection: DownloadLayoutDirection.HORIZONTAL,
20. fontSize: '16vp',
21. fontStyle: FontStyle.Normal,
22. fontWeight: FontWeight.Medium,
23. fontFamily: 'HarmonyOS Sans',
24. fontColor: '#ffffffff',
25. iconColor: '#ffffffff',
26. textIconSpace: '4vp'
27. }
28. })
29. .backgroundColor('#007dff')
30. .borderStyle(BorderStyle.Dotted)
31. .borderWidth(0)
32. .borderRadius('24vp')
33. .position({ x: 0, y: 0 })
34. .markAnchor({ x: 0, y: 0 })
35. .offset({ x: 0, y: 0 })
36. .constraintSize({})
37. .padding({
38. top: '12vp',
39. bottom: '12vp',
40. left: '24vp',
41. right: '24vp'
42. })
43. .onClick(() => {
44. this.downloadAction();
45. })
46. }
47. }

49. downloadAction() {
50. try {
51. const document = new picker.DocumentSaveOptions();
52. document.pickerMode = picker.DocumentPickerMode.DOWNLOAD;
53. new picker.DocumentViewPicker().save(document, (err: BusinessError, result: Array<string>) => {
54. if (err) {
55. return;
56. }
57. console.info(`downloadAction result:  ${JSON.stringify(result)}`);
58. });
59. } catch (e) {
60. }
61. }
62. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e4/v3/UQJY2m9nSEei0Sb9W5YY6Q/zh-cn_image_0000002568759754.png?HW-CC-KV=V1&HW-CC-Date=20260511T035824Z&HW-CC-Expire=86400&HW-CC-Sign=8249C334A48EF9167BF2698389A5EE35A15D2985B3857874074CDB5E3449754C)