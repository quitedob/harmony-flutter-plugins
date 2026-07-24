资源管理导入sendableResourceManager模块，通过调用[resourceToSendableResource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#sendableresourcemanagerresourcetosendableresource)和[sendableResourceToResource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#sendableresourcemanagersendableresourcetoresource)方法可以将[Resource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#resource)对象和[SendableResource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#sendableresource)对象进行互转。

Resource对象通过转换为SendableResource对象后，可以被[Sendable类](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-sendable)持有。Sendable类在跨线程传输后，取出持有的SendableResource对象转为Resource对象，作为参数获取资源。

说明

本模块首批接口从API version 12开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { sendableResourceManager } from '@kit.LocalizationKit';
```

## sendableResourceManager.resourceToSendableResource

PhonePC/2in1TabletTVWearable

resourceToSendableResource(resource: Resource): SendableResource

将Resource对象转换为SendableResource对象。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Global.ResourceManager

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| resource | [Resource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#resource) | 是 | Resource对象。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [SendableResource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#sendableresource) | 转换后的SendableResource对象。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | If the input parameter invalid. Possible causes: 1.Incorrect parameter types; 2.Parameter verification failed. |

**示例：**



```
1. // 资源文件路径: src/main/resources/base/element/string.json
2. {
3. "string": [
4. {
5. "name": "test",
6. "value": "I'm a test string resource."
7. }
8. ]
9. }
```



```
1. import { sendableResourceManager } from '@kit.LocalizationKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. try {
5. let sendableResource: sendableResourceManager.SendableResource = sendableResourceManager.resourceToSendableResource($r('app.string.test'));
6. } catch (error) {
7. let code = (error as BusinessError).code;
8. let message = (error as BusinessError).message;
9. console.error(`resourceToSendableResource failed, error code: ${code}, message: ${message}.`);
10. }
```

## sendableResourceManager.sendableResourceToResource

PhonePC/2in1TabletTVWearable

sendableResourceToResource(resource: SendableResource): Resource

将SendableResource对象转换为Resource对象。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Global.ResourceManager

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| resource | [SendableResource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#sendableresource) | 是 | SendableResource对象。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [Resource](/consumer/cn/doc/harmonyos-references/js-apis-sendable-resource-manager#resource) | 转换后的Resource对象。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | If the input parameter invalid. Possible causes: 1.Incorrect parameter types; 2.Parameter verification failed. |

**示例：**



```
1. // 资源文件路径: src/main/resources/base/element/string.json
2. {
3. "string": [
4. {
5. "name": "test",
6. "value": "I'm a test string resource."
7. }
8. ]
9. }
```



```
1. import { sendableResourceManager } from '@kit.LocalizationKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. try {
5. let resource: sendableResourceManager.Resource = sendableResourceManager.sendableResourceToResource(sendableResourceManager.resourceToSendableResource($r('app.string.test')));
6. } catch (error) {
7. let code = (error as BusinessError).code;
8. let message = (error as BusinessError).message;
9. console.error(`sendableResourceToResource failed, error code: ${code}, message: ${message}.`);
10. }
```

## Resource

PhonePC/2in1TabletTVWearable

type Resource = \_Resource

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Global.ResourceManager

展开

| 类型 | 说明 |
| --- | --- |
| [\_Resource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-resource#resource-1) | 表示Resource资源信息。 |

## SendableResource

PhonePC/2in1TabletTVWearable

type SendableResource = \_SendableResource

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Global.ResourceManager

展开

| 类型 | 说明 |
| --- | --- |
| [\_SendableResource](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-sendableresource#sendableresource-1) | 表示SendableResource资源信息。 |