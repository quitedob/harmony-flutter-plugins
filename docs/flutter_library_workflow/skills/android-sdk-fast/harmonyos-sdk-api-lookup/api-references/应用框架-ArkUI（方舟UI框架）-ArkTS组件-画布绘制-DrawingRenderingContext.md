DrawingRenderingContext对象与Canvas组件绑定后，可在Canvas组件上进行绘制，绘制对象可以是形状、文本、图片等。

说明

从API version 12开始支持。后续版本如有新增内容，则采用上角标单独标记该内容的起始版本。

## constructor

PhonePC/2in1TabletTVWearable

constructor(unit?: LengthMetricsUnit)

构造使用drawing接口进行绘制的Canvas画布对象，支持配置DrawingRenderingContext对象的单位模式。

**卡片能力：** 从API version 12开始，该接口支持在ArkTS卡片中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| unit | [LengthMetricsUnit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-graphics#lengthmetricsunit12) | 否 | 用来配置DrawingRenderingContext对象的单位模式，配置后无法更改，配置方法同[CanvasRenderingContext2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-canvasrenderingcontext2d)。  异常值undefined、NaN和Infinity按默认值处理。  默认值：DEFAULT |

## size

PhonePC/2in1TabletTVWearable

get size(): Size

获取DrawingRenderingContext的大小。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [Size](/consumer/cn/doc/harmonyos-references/ts-drawingrenderingcontext#size-1) | DrawingRenderingContext的尺寸信息。 |

## canvas

PhonePC/2in1TabletTVWearable

get canvas(): DrawingCanvas

获取绘制内容的画布对象。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [DrawingCanvas](/consumer/cn/doc/harmonyos-references/ts-drawingrenderingcontext#drawingcanvas12对象说明) | 绘制内容的画布对象。 |

## invalidate

PhonePC/2in1TabletTVWearable

invalidate(): void

使组件无效，触发组件的重新渲染。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

## DrawingCanvas12+对象说明

PhonePC/2in1TabletTVWearable

type DrawingCanvas = Canvas

可用于向DrawingRenderingContext上绘制内容的画布对象。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 类型 | 说明 |
| --- | --- |
| [Canvas](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-graphics-drawing-canvas) | 返回一个Canvas对象。 |

## Size

PhonePC/2in1TabletTVWearable

DrawingRenderingContext的尺寸信息。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| width | number | 否 | 否 | 获取DrawingRenderingContext的宽度，其值为关联的Canvas组件的宽度。  支持单位：vp、px。  默认单位为vp。 |
| height | number | 否 | 否 | 获取DrawingRenderingContext的高度，其值为关联的Canvas组件的高度。  支持单位：vp、px。  默认单位为vp。 |

## 示例

PhonePC/2in1TabletTVWearable

### 示例1（绘制图形）

该示例实现了如何使用DrawingRenderingContext中的方法绘制图形。



```
1. import { common2D, drawing } from '@kit.ArkGraphics2D';

3. // xxx.ets
4. @Entry
5. @Component
6. struct CanvasExample {
7. private context: DrawingRenderingContext = new DrawingRenderingContext();

9. build() {
10. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
11. Canvas(this.context)
12. .width('100%')
13. .height('50%')
14. .backgroundColor('#D5D5D5')
15. .onReady(() => {
16. let brush = new drawing.Brush();
17. // 使用RGBA(39, 135, 217, 255)填充圆心为(200, 200)，半径为100的圆
18. brush.setColor({
19. alpha: 255,
20. red: 39,
21. green: 135,
22. blue: 217
23. });
24. this.context.canvas.attachBrush(brush);
25. this.context.canvas.drawCircle(200, 200, 100);
26. this.context.canvas.detachBrush();
27. this.context.invalidate();
28. })
29. Button("Clear")
30. .width('120')
31. .height('50')
32. .onClick(() => {
33. let color: common2D.Color = {
34. alpha: 0,
35. red: 0,
36. green: 0,
37. blue: 0
38. };
39. // 使用RGBA(0, 0, 0, 0)填充画布
40. this.context.canvas.clear(color);
41. this.context.invalidate();
42. })
43. }
44. .width('100%')
45. .height('100%')
46. }
47. }
```

图1 绘制圆心为(200, 200)，半径为100的圆，填充色为RGBA(39, 135, 217, 255)

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/33/v3/uaR3rERGTVyrapo4FYJvGw/zh-cn_image_0000002599478811.png?HW-CC-KV=V1&HW-CC-Date=20260511T035409Z&HW-CC-Expire=86400&HW-CC-Sign=560040996E99A08C05E1F9CBC39040B66596ECC2AAE8796EA7575204B2614E0E)

图2 点击Clear按钮清空画布

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3d/v3/SGqLNAOgRgCADv0oMLB98A/zh-cn_image_0000002568759620.png?HW-CC-KV=V1&HW-CC-Date=20260511T035409Z&HW-CC-Expire=86400&HW-CC-Sign=98EDC0351FE59FA7490D3E6196482339623F6F7EFD852A5D55ED1901334DC61E)

### 示例2（绘制文本）

该示例实现了通过[makeFromRawFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-graphics-drawing-typeface#makefromrawfile18)（从API version 18开始）加载自定义字体。并使用[drawTextBlob](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-graphics-drawing-canvas#drawtextblob)绘制文本，drawing接口绘制自定义文字时，不需要调用this.uiContext.getFont().[registerFont](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-font#registerfont)或者fontCollection.[loadFontSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-graphics-text#loadfontsync)提前注册字体，而是通过drawing.Typeface.[makeFromRawFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-graphics-drawing-typeface#makefromrawfile18)（从API version 18开始）传入rawfile目录下的自定义字体文件。



```
1. import { drawing } from '@kit.ArkGraphics2D';

3. // xxx.ets
4. @Entry
5. @Component
6. struct CanvasExample {
7. private context: DrawingRenderingContext = new DrawingRenderingContext();

9. build() {
10. Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
11. Canvas(this.context)
12. .width('100%')
13. .height('50%')
14. .backgroundColor('#D5D5D5')
15. .onReady(() => {
16. let font = new drawing.Font();
17. font.setSize(50);
18. // 加载rawfile目录下的自定义字体文件HarmonyOS_Sans_Bold.ttf
19. const myTypeFace = drawing.Typeface.makeFromRawFile($rawfile('HarmonyOS_Sans_Bold.ttf'));
20. font.setTypeface(myTypeFace);
21. const textBlob =
22. drawing.TextBlob.makeFromString("Hello World", font, drawing.TextEncoding.TEXT_ENCODING_UTF8);
23. this.context.canvas.drawTextBlob(textBlob, 60, 100);
24. this.context.invalidate();
25. })
26. }
27. .width('100%')
28. .height('100%')
29. }
30. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/NQyJv_ZWSXiTtInWWc6Rfg/zh-cn_image_0000002599358863.png?HW-CC-KV=V1&HW-CC-Date=20260511T035409Z&HW-CC-Expire=86400&HW-CC-Sign=F6076473B46B2F855876626CC200FFAE5FD262649E00E1A4AFE48D9203E46BED)