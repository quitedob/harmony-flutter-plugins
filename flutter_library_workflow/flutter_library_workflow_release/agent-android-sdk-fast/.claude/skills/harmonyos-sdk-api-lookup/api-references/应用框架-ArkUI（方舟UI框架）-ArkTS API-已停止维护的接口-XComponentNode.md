提供XComponent节点XComponentNode，表示组件树中的[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件，用于[EGL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/egl)/[OpenGL ES](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/opengles)和媒体数据写入，并支持动态修改节点渲染类型。

说明

从API version 12开始废弃，建议使用[类型为XComponent的typeNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#xcomponent12)的方式实现。

本模块首批接口从API version 11开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

当前不支持在预览器中使用XComponentNode。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { XComponentNode } from "@kit.ArkUI";
```

## XComponentNode(deprecated)

PhonePC/2in1TabletTVWearable

### constructor(deprecated)

PhonePC/2in1TabletTVWearable

constructor(uiContext: UIContext, options: RenderOptions, id: string, type: XComponentType, libraryName?: string)

XComponentNode的构造函数。

说明

从API version 11开始支持，从API version 12开始废弃，建议使用[createNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#createnodexcomponent12)替代。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| uiContext | [UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext) | 是 | UI上下文，获取方式可参考[UIContext获取方法](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-node#uicontext获取方法)。 |
| options | [RenderOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#renderoptions) | 是 | XComponentNode的构造可选参数。 |
| id | string | 是 | XComponent的唯一标识，支持最大的字符串长度128。详见[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件。 |
| type | [XComponentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#xcomponenttype10) | 是 | 用于指定XComponent组件类型。详见[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件。 |
| libraryName | string | 否 | Native层编译输出动态库名称。详见[XComponent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent)组件。 |

说明

需要显式指定[RenderOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#renderoptions)中的selfIdealSize，否则XComponentNode内容大小为空，不显示任何内容。

### onCreate(deprecated)

PhonePC/2in1TabletTVWearable

onCreate(event?: Object): void

XComponentNode加载完成时触发该回调。

说明

从API version 11开始支持，从API version 12开始废弃，建议使用[onLoad](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent#onload)替代。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| event | Object | 否 | 获取XComponent实例对象的context，context上挂载的方法由开发者在C++层定义。 |

### onDestroy(deprecated)

PhonePC/2in1TabletTVWearable

onDestroy(): void

XComponentNode销毁时触发该回调。

说明

从API version 11开始支持，从API version 12开始废弃，建议使用[onDestroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-xcomponent#ondestroy)替代。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

### changeRenderType(deprecated)

PhonePC/2in1TabletTVWearable

changeRenderType(type: NodeRenderType): boolean

修改XComponentNode的渲染类型。

说明

从API version 11开始支持，从API version 12开始废弃，建议使用[appendChild](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-framenode#appendchild12)替代。

**系统能力：** SystemCapability.ArkUI.ArkUI.Full

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | [NodeRenderType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-buildernode#noderendertype) | 是 | 需要修改的渲染类型。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 修改渲染类型是否成功。  true：修改渲染类型成功；false：修改渲染类型失败。 |

## 示例

PhonePC/2in1TabletTVWearable



```
1. import { NodeController, FrameNode, XComponentNode, NodeRenderType, UIContext} from '@kit.ArkUI'

3. class XComponentNodeController extends NodeController {
4. private xComponentNode: MyXComponentNode | null = null;
5. private soName: string = "tetrahedron_napi" // 该 so 由开发者通过 NAPI 编写并生成

7. constructor() {
8. super();
9. }

11. makeNode(context: UIContext): FrameNode | null {
12. this.xComponentNode = new MyXComponentNode(context, {
13. selfIdealSize: { width: 200, height: 200 }
14. }, "xComponentId", XComponentType.SURFACE, this.soName);
15. return this.xComponentNode;
16. }

18. changeRenderType(renderType: NodeRenderType): void {
19. if (this.xComponentNode) {
20. this.xComponentNode.changeRenderType(renderType);
21. }
22. }
23. }

25. class MyXComponentNode extends XComponentNode {
26. onCreate(event: Object) {
27. // do something when XComponentNode has created
28. }

30. onDestroy() {
31. // do something when XComponentNode is destroying
32. }
33. }

35. @Entry
36. @Component
37. struct Index {
38. build() {
39. Row() {
40. Column() {
41. NodeContainer(new XComponentNodeController())
42. }
43. .width('100%')
44. .height('100%')
45. }
46. .height('100%')
47. }
48. }
```

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5e/v3/S5tLakm7TE6d8nhXb8HBLg/zh-cn_image_0000002568918756.jpg?HW-CC-KV=V1&HW-CC-Date=20260511T034239Z&HW-CC-Expire=86400&HW-CC-Sign=66E10CB5A0340F2F3D1AF4E808AB9D6E166F6DF9E96B2ED2C2DEAF63E460E8E1)