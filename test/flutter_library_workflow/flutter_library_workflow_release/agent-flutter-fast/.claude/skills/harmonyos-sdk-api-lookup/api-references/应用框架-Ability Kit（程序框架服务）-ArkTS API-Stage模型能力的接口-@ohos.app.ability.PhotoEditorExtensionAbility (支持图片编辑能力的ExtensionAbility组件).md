PhotoEditorExtensionAbility继承自[ExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-extensionability)，开发者可通过PhotoEditorExtensionAbility实现图片编辑扩展页面。应用通过[startAbilityByType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startability)拉起图片编辑类应用扩展面板后，由用户在面板上选择实现了PhotoEditorExtensionAbility的图片编辑扩展页面并拉起该页面。

说明

本模块首批接口从API version 12 开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

## 实现效果

PhonePC/2in1TabletTVWearable

下图为通过PhotoEditorExtensionAbility实现的图片编辑扩展页面示意图，页面的布局与功能可以根据实际需要开发。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c0/v3/SoDB1SHFTNCCQ26DCTiSOQ/zh-cn_image_0000002568759040.png?HW-CC-KV=V1&HW-CC-Date=20260511T031842Z&HW-CC-Expire=86400&HW-CC-Sign=902911438F7DEBC94D479C743B7F9FE1E2296DA839E452FF9F2446726DEDD961)

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { PhotoEditorExtensionAbility } from '@kit.AbilityKit';
```

## PhotoEditorExtensionAbility

PhonePC/2in1TabletTVWearable

### 属性

PhonePC/2in1TabletTV

**系统能力：** SystemCapability.Ability.AppExtension.PhotoEditorExtension

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| context | [PhotoEditorExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-photoeditorextensioncontext) | 否 | 否 | PhotoEditorExtensionAbility的上下文，提供保存图片能力。 |

### onCreate

PhonePC/2in1TabletTV

onCreate(): void

当PhotoEditorExtensionAbility创建时，系统会触发该回调，开发者可以在该回调内执行初始化业务逻辑操作。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Ability.AppExtension.PhotoEditorExtension

**示例：**



```
1. import { PhotoEditorExtensionAbility } from '@kit.AbilityKit';

3. const TAG: string = '[testTag] ExamplePhotoEditorAbility';

5. export default class ExamplePhotoEditorAbility extends PhotoEditorExtensionAbility {
6. onCreate() {
7. console.info(TAG, `onCreate`);
8. }
9. }
```

### onStartContentEditing

PhonePC/2in1TabletTV

onStartContentEditing(uri: string, want: Want, session: UIExtensionContentSession): void

当实现PhotoEditorExtensionAbility的图片编辑扩展界面内容对象创建时，系统会触发该回调，开发者可以在该回调内执行读取原始图片、加载页面等操作。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Ability.AppExtension.PhotoEditorExtension

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| uri | string | 是 | 待编辑的原始图片[uri](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fileuri)，格式为file://<bundleName>/<sandboxPath>。 |
| want | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 当前PhotoEditorExtensionAbility的Want类型信息，包括ability名称、bundle名称等。 |
| session | [UIExtensionContentSession](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensioncontentsession) | 是 | PhotoEditorExtensionAbility界面内容相关信息。 |

**示例：**



```
1. import { PhotoEditorExtensionAbility, Want, UIExtensionContentSession } from '@kit.AbilityKit';

3. const TAG: string = '[testTag] ExamplePhotoEditorAbility';

5. export default class ExamplePhotoEditorAbility extends PhotoEditorExtensionAbility {
6. onStartContentEditing(uri: string, want: Want, session: UIExtensionContentSession) {
7. console.info(TAG, `onStartContentEditing want: ${JSON.stringify(want)}, uri: ${uri}`);
8. }
9. }
```

### onForeground

PhonePC/2in1TabletTVWearable

onForeground(): void

当PhotoEditorExtensionAbility从后台转到前台时，系统会触发该回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Ability.AbilityRuntime.AbilityCore

**示例：**



```
1. import { PhotoEditorExtensionAbility } from '@kit.AbilityKit';

3. const TAG: string = '[testTag] ExamplePhotoEditorAbility';

5. export default class ExamplePhotoEditorAbility extends PhotoEditorExtensionAbility {
6. onForeground() {
7. console.info(TAG, `onForeground`);
8. }
9. }
```

### onBackground

PhonePC/2in1TabletTVWearable

onBackground(): void

当PhotoEditorExtensionAbility从前台转到后台时，系统会触发该回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Ability.AbilityRuntime.AbilityCore

**示例：**



```
1. import { PhotoEditorExtensionAbility } from '@kit.AbilityKit';

3. const TAG: string = '[testTag] ExamplePhotoEditorAbility';

5. export default class ExamplePhotoEditorAbility extends PhotoEditorExtensionAbility {
6. onBackground() {
7. console.info(TAG, `onBackground`);
8. }
9. }
```

### onDestroy

PhonePC/2in1TabletTV

onDestroy(): void | Promise<void>

当PhotoEditorExtensionAbility被销毁时，系统会触发该回调。开发者可以在该生命周期中执行资源清理等相关操作。使用同步回调或Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Ability.AppExtension.PhotoEditorExtension

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| void | Promise<void> | 无返回结果或者无返回结果的Promise对象。 |

**示例：**

* 同步回调示例如下：

  

  ```
  1. import { PhotoEditorExtensionAbility } from '@kit.AbilityKit';

  3. const TAG: string = '[testTag] ExamplePhotoEditorAbility';

  5. export default class ExamplePhotoEditorAbility extends PhotoEditorExtensionAbility {
  6. onDestroy() {
  7. console.info(TAG, `onDestroy`);
  8. // 调用同步函数...
  9. }
  10. }
  ```
* Promise异步回调示例如下：

  

  ```
  1. import { PhotoEditorExtensionAbility } from '@kit.AbilityKit';

  3. const TAG: string = '[testTag] ExamplePhotoEditorAbility';

  5. export default class ExamplePhotoEditorAbility extends PhotoEditorExtensionAbility {
  6. async onDestroy() {
  7. console.info(TAG, `onDestroy`);
  8. // 调用异步函数...
  9. }
  10. }
  ```