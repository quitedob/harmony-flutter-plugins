## 场景介绍

无UI界面的基础驱动，适用于不需要通过UI界面设置驱动能力的简单设备，例如鼠标、键盘等，保证设备的即插即用功能即可。开发者可以通过DriverExtensionAbility实现此类应用的开发。

## 基本概念

* DriverExtensionAbility

  [DriverExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-driverextensionability)是Driver类型的ExtensionAbility组件，提供驱动相关扩展框架能力。对于部分设备，支持插入外接的硬件模块来扩展设备能力， 此时可以以应用方式安装该硬件模块的驱动程序。[DriverExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-driverextensionability)可以通过[@ohos.driver.deviceManager (外设管理)](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-driver-devicemanager)提供的接口被应用绑定，并根据应用的请求信息在后台处理相关事务。

  每个类型的ExtensionAbility都有自己的Context，DriverExtensionAbility通过[DriverExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-driverextensioncontext)提供相关能力。

## 环境搭建

请参考[环境准备](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/environmental-preparation)完成开发前的准备工作。

## 开发步骤

开发者在实现一个驱动时，需要在DevEco Studio工程中手动新建一个DriverExtensionAbility，具体步骤如下：

1. 创建新工程，请参考[创建一个新的工程](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-create-new-project)，创建一个HarmonyOS工程。（如果在[开发带UI界面基础驱动](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/externaldevice-guidelines)已经创建，则此处不需要创建。）
2. 在新创建的工程对应的ets目录下，右键选择“New > Directory”，新建一个目录并命名为driverextability。
3. 在driverextability目录，右键选择“New > ArkTS File”，新建一个文件并命名为DriverExtAbility.ets。
4. 在文件中导入相关Kit，并定义请求Code。

收起

自动换行

深色代码主题

复制

```
1. import { DriverExtensionAbility } from '@kit.DriverDevelopmentKit';
2. import { Want } from '@kit.AbilityKit';
3. import { rpc } from '@kit.IPCKit';

5. const REQUEST_CODE = 99; // 与扩展外设客户端约定请求码。
```

1. 打开DriverExtAbility.ets文件，导入[RPC通信模块](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-rpc)，重载onRemoteMessageRequest()方法，接收应用传递过来的消息，并将处理的结果返回给应用。REQUEST\_CODE用于校验应用发送的服务请求码。

收起

自动换行

深色代码主题

复制

```
1. class StubTest extends rpc.RemoteObject {
2. // 接收应用传递过来的消息处理，以及将处理的结果返回给客户端。
3. onRemoteMessageRequest(code: number, data: rpc.MessageSequence, reply: rpc.MessageSequence,
4. option: rpc.MessageOption) {
5. if (code === REQUEST_CODE) {
6. // 接收应用传递过来的数据。
7. // 应用使用多次调用data.writeString()写入多个数据时，驱动可以通过多次调用data.readString()方法接收对应的数据。
8. let optFir: string = data.readString();
9. // 驱动将数据的处理结果返回给应用。
10. // 示例中为接收了"Hello"，并将"Hello World"返回给应用。
11. reply.writeString(optFir + ` World`);
12. }
13. return true;
14. }
15. }
```

1. 在DriverExtAbility.ets文件中，增加导入[DriverExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-driverextensionability)的依赖包，该包提供了onInit()、onRelease()、onConnect()和onDisconnect()生命周期回调，自定义类继承[DriverExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-driverextensionability)并根据需要重写生命周期回调。

收起

自动换行

深色代码主题

复制

```
1. export default class DriverExtAbility extends DriverExtensionAbility {
2. onInit(want: Want) {
3. console.info('testTag', `onInit, want: ${want.abilityName}`);
4. }

6. onRelease() {
7. console.info('testTag', `onRelease`);
8. }

10. onConnect(want: Want) {
11. console.info('testTag', `onConnect, want: ${want.abilityName}`);
12. return new StubTest('test');
13. }

15. onDisconnect(want: Want) {
16. console.info('testTag', `onDisconnect, want: ${want.abilityName}`);
17. }

19. onDump(params: Array<string>) {
20. console.info('testTag', `onDump, params:` + JSON.stringify(params));
21. return ['params'];
22. }
23. }
```

1. 在工程Module对应的[module.json5配置文件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)中注册DriverExtensionAbility，type标签需要设置为“driver”，srcEntry标签表示当前ExtensionAbility组件所对应的代码路径。

收起

自动换行

深色代码主题

复制

```
1. {
2. "module": {
3. "name": "entry",
4. "type": "entry",
5. "description": "$string:module_desc",
6. "mainElement": "EntryAbility",
7. "deviceTypes": [
8. "default",
9. "tablet",
10. "2in1"
11. ],
12. "requestPermissions": [
13. {
14. "name": "ohos.permission.ACCESS_EXTENSIONAL_DEVICE_DRIVER" // 此处为扩展外设相关权限，必须配置。
15. }
16. ],
17. "deliveryWithInstall": true,
18. "installationFree": false,
19. "pages": "$profile:main_pages",
20. "abilities": [
21. {
22. "name": "EntryAbility",
23. "srcEntry": "./ets/entryability/EntryAbility.ets",
24. "description": "$string:EntryAbility_desc",
25. "icon": "$media:layered_image",
26. "label": "$string:EntryAbility_label",
27. "startWindowIcon": "$media:startIcon",
28. "startWindowBackground": "$color:start_window_background",
29. "exported": true,
30. "skills": [
31. {
32. "entities": [
33. "entity.system.home"
34. ],
35. "actions": [
36. "ohos.want.action.home"
37. ]
38. }
39. ]
40. }
41. ],
42. "extensionAbilities": [
43. {
44. "name": "DriverExtAbility",
45. "icon": "$media:startIcon",
46. "description": "driver",
47. "type": "driver",
48. "exported": true,
49. "srcEntry": "./ets/driverextability/DriverExtAbility.ets",
50. "metadata": [
51. {
52. "name": "bus", // 必填项，所属总线。
53. "value": "USB"
54. },
55. {
56. "name": "desc", // 选填项，必要的驱动描述。
57. "value": "the sample of driverExtensionAbility"
58. },
59. {
60. "name": "vendor", // 选填项，驱动厂商名称。
61. "value": "string"
62. },
63. {
64. "name": "vid", // 支持 USB vendor id 列表，填写16进制，此处为4817的16进制。
65. "value": "0x12D1"
66. },
67. {
68. "name": "pid", // 支持的 USB product id 列表，填写16进制，此处为4258的16进制。
69. "value": "0x10A2"
70. },
71. {
72. "name": "launchOnBind", // 选填项，延迟拉起驱动。此处“true”表示延迟拉起，“false”表示即时拉起，配置错误或不配置，默认为“false”。
73. "value": "true"
74. },
75. {
76. "name": "ohos.permission.ACCESS_DDK_ALLOWED", // 选填项，允许应用访问。此处“true”表示允许访问，“false”表示不允许访问，配置错误或不配置，默认为“false”。
77. "value": "true"
78. }
79. ]
80. }
81. ]
82. }
83. }
```

1. 完成客户端和驱动示例代码开发后，请参考[使用本地真机运行应用/元服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-run-device)，将Hap导入设备中，并点击hap中的Hello，查看是否会转变为Hello world，即实现ipc通信功能。

## 扩展设备能力

扩展外设管理目前提供了HID DDK、USB DDK、USB Serial DDK和SCSI Peripheral DDK四种能力，用于扩展外设专项驱动的开发。具体使用方法，请参考：

* [开发适用HID协议的设备驱动](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hid-ddk-guidelines)
* [开发适用USB协议的设备驱动](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/usb-ddk-guidelines)
* [开发适用串口协议的设备驱动](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/usb-serial-ddk-guidelines)
* [开发使用SCSI协议的设备驱动](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scsi-peripheral-ddk-guidelines)

## 应用签名

**注意：** 先配置权限，再自动签名。

应用需要配置签名文件才能在设备上运行，并且扩展外设管理客户端开发，需要配置扩展外设的权限：ohos.permission.ACCESS\_EXTENSIONAL\_DEVICE\_DRIVER。

* ohos.permission.ACCESS\_EXTENSIONAL\_DEVICE\_DRIVER

  在module.json5配置文件的requestPermissions标签中[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)后，即可获得授权。
* ohos.permission.ACCESS\_DDK\_DRIVERS

  1. 在module.json5配置文件的requestPermissions标签中[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)。
  2. HarmonyAppProvision配置文件中，修改acls字段，跨级别申请权限，可参考[申请使用受限权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions-in-acl)。

完成权限配置后，可参考[自动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing)对应用进行签名。