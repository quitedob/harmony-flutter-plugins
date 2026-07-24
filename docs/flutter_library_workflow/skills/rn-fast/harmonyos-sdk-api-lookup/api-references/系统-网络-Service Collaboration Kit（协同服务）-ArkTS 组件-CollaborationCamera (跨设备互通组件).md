该模块提供了组件[createCollaborationCameraMenuItems](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationcamera#createcollaborationcameramenuitemsdeprecated)和[CollaborationCameraStateDialog](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationcamera#collaborationcamerastatedialogdeprecated)，两者需要配合使用，完成分布式跨端能力，如在2in1端跨端调用手机端拍照。

通过[createCollaborationCameraMenuItems](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationcamera#createcollaborationcameramenuitemsdeprecated)组件，可以获取组网内具有对应能力的设备列表。用户选择对应的设备后，拉起应用。调用[CollaborationCameraStateDialog](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationcamera#collaborationcamerastatedialogdeprecated)，应用将弹出提示框，提示对端应用状态。

**废弃说明：** 从5.0.0(12)开始废弃，建议使用[CollaborationService](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationservice)替代。

**起始版本：** 4.0.0(10)

## 导入模块

PhonePC/2in1TabletTV



```
1. import { CollaborationCameraStateDialog, createCollaborationCameraMenuItems, CollaborationCameraBusinessFilter} from '@kit.ServiceCollaborationKit';
```

## createCollaborationCameraMenuItems(deprecated)

PhonePC/2in1TabletTV

createCollaborationCameraMenuItems(businessFilter?: Array<CollaborationCameraBusinessFilter>): void

设备列表选择器，需要在[Menu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-menu)组件内调用。用于显示组网内具有对应能力的设备列表。

该方法为自定义构建函数，开发者在使用前需要先了解[@Builder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-builder)。

**废弃说明：** 从5.0.0(12) 开始废弃，建议使用[createCollaborationServiceMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationservice#createcollaborationservicemenuitems)替代。

**装饰器类型：** @Builder

**系统能力：** SystemCapability.Collaboration.Camera

**设备行为差异：** 该接口在PC/2in1、Tablet可正常调用，在其他设备类型上无法展示设备列表，无法使用跨设备互通能力。

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| businessFilter | Array<[CollaborationCameraBusinessFilter](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationcamera#collaborationcamerabusinessfilterdeprecated)> | 否 | 传入能力类型，支持匹配跨端拍照、扫描、图库。  默认值为ALL，匹配所有业务。 |

**示例：**



```
1. @Builder
2. MyTestMenu() {
3. Menu() {
4. createCollaborationCameraMenuItems([CollaborationCameraBusinessFilter.ALL])
5. }
6. }
```

## CollaborationCameraBusinessFilter(deprecated)

PhonePC/2in1TabletTV

能力类型枚举值。

**废弃说明：** 从5.0.0(12) 开始废弃，建议使用[CollaborationServiceFilter](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationservice#collaborationservicefilter)替代。

**系统能力：** SystemCapability.Collaboration.Camera

**设备行为差异：** 该接口在PC/2in1、Tablet可正常调用，在其他设备类型上无法展示设备列表，无法使用跨设备互通能力。

**起始版本：** 4.0.0(10)

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| ALL | 0 | 匹配所有业务。 |
| TAKE\_PHOTO | 1 | 匹配跨端拍照。 |
| SCAN\_DOCUMENT | 2 | 匹配文档扫描。  **起始版本：** 4.1.0(11) |
| IMAGE\_PICKER | 3 | 匹配图库选择器。  **起始版本：** 4.1.0(11) |

**示例：**



```
1. @Builder
2. MyTestMenu() {
3. Menu() {
4. createCollaborationCameraMenuItems([CollaborationCameraBusinessFilter.ALL])
5. }
6. }
```

## CollaborationCameraStateDialog(deprecated)

PhonePC/2in1TabletTV

弹窗组件，用于提示对端应用状态。

您需要实现[onState](/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationcamera#onstatedeprecated)方法，并且在页面中定义这个组件，在业务开始后，此方法将被协同框架调用。

该组件为自定义组件，开发者在使用前需要先了解[@Component](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#component)。

**废弃说明：** 从5.0.0(12) 开始废弃，建议使用[CollaborationServiceStateDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationservice#collaborationservicestatedialog)替代。

**装饰器类型：** @Component

**系统能力：** SystemCapability.Collaboration.Camera

**设备行为差异：** 该接口在PC/2in1、Tablet可正常调用，在其他设备类型上无法展示设备列表，无法使用跨设备互通能力。

**起始版本：** 4.0.0(10)

### onState(deprecated)

PhonePC/2in1TabletTV

onState: (stateCode: number, buffer: ArrayBuffer) => void

接收数据的回调函数，其中传入的stateCode是完成状态，buffer是回传的图片数据，开发者可通过状态和图片数据结合自身的业务逻辑实现onState方法。

**废弃说明：** 从5.0.0(12) 开始废弃，建议使用[onState](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationservice#onstate)替代。

**系统能力：** SystemCapability.Collaboration.Camera

**设备行为差异：** 该接口在PC/2in1、Tablet可正常调用，在其他设备类型上无法展示设备列表，无法使用跨设备互通能力。

**起始版本：** 4.0.0(10)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| stateCode | number | 是 | 标识业务完成状态，含义详见下面错误码。 |
| buffer | ArrayBuffer | 是 | 成功则返回对应数据，失败则返回空。 |

**错误码：**

以下错误码的详细介绍请参见[ArkTS 错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 0 | Success. |
| 1001202001 | The peer end cancels the operation. |
| 1001202002 | An error occurred within the collaborative framework. |
| 1001202003 | The local end cancels the operation. |
| 1001202004 | The device interconnectivity has been established. |
| 1001202005 | All images have been successfully sent back. |
| 1001202006 | Multiple images are being sent back. |

### build(deprecated)

PhonePC/2in1TabletTV

build(): void

struct的默认构造函数，开发者无法直接调用此方法。

**废弃说明：** 从5.0.0(12) 开始废弃，建议使用[build](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/servicecollaboration-collaborationservice#build)替代。

**系统能力：** SystemCapability.Collaboration.Camera

**设备行为差异：** 该接口在PC/2in1、Tablet可被组件正常调用，在其他设备类型上无法展示设备列表，无法使用跨设备互通能力。

**起始版本：** 4.0.0(10)

**示例：**

参考以下示例，可以完成一次调用对端应用的操作。

跨设备互通详细介绍可参考[跨设备互通特性简介](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/servicecollaboration-service-overview)。



```
1. import {
2. createCollaborationCameraMenuItems,
3. CollaborationCameraStateDialog,
4. CollaborationCameraBusinessFilter
5. } from '@kit.ServiceCollaborationKit';
6. import { image } from '@kit.ImageKit';
7. import { hilog } from '@kit.PerformanceAnalysisKit';

9. @Entry
10. @Component
11. struct Index {
12. @State picture: PixelMap | undefined = undefined;

14. @Builder
15. MyTestMenu() {
16. Menu() {
17. createCollaborationCameraMenuItems([CollaborationCameraBusinessFilter.ALL]);
18. }
19. }

21. build() {
22. Column({ space: 20 }) {
23. CollaborationCameraStateDialog({
24. onState: (stateCode: number, buffer: ArrayBuffer): void => this.doInsertPicture(stateCode, buffer)
25. })
26. Button('使用远端设备插入图片')
27. .type(ButtonType.Normal)
28. .borderRadius(10)
29. .bindMenu(this.MyTestMenu)

31. if (this.picture) {
32. Image(this.picture)
33. .borderStyle(BorderStyle.Dotted)
34. .borderWidth(1)
35. .objectFit(ImageFit.Contain)
36. .height('80%')
37. .onComplete((event) => {
38. if (event != undefined) {
39. hilog.info(0, "MEMOMOCK", "onComplete " + event.loadingStatus)
40. }
41. })
42. }
43. }
44. .padding(20)
45. .width('100%')
46. .alignItems(HorizontalAlign.Center)
47. }

49. doInsertPicture(stateCode: number, buffer: ArrayBuffer): void {
50. if (stateCode != 0) {
51. return
52. }
53. let imageSource = image.createImageSource(buffer)
54. imageSource.createPixelMap().then((pixelMap) => {
55. this.picture = pixelMap;
56. })
57. }
58. }
```