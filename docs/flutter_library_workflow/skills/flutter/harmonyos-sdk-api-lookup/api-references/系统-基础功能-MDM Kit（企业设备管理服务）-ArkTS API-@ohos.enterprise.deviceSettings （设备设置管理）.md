本模块提供企业设备设置能力，包括设置、获取设备息屏时间等。

说明

本模块首批接口从API version 12开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

本模块接口仅对设备管理应用开放，且调用接口前需激活设备管理应用，具体请参考[MDM Kit开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-guide)。

## 导入模块

PhonePC/2in1Tablet



```
1. import { deviceSettings } from '@kit.MDMKit';
```

## deviceSettings.setValue

PhonePC/2in1Tablet

setValue(admin: Want, item: string, value: string): void

设置设备策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SETTINGS

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则3配置)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| item | string | 是 | 设备设置策略类型。  - screenOff：设备息屏策略，对于PC/2in1设备，支持设置电池和电源供电下的息屏策略。  - dateTime：设置系统时间。  - powerPolicy：设备电源策略，对于PC/2in1设备，仅支持设置电池供电下的电源策略。  - eyeComfort：从API version 23开始支持，设置护眼模式开关状态，仅支持全天开启和关闭护眼模式。  - defaultInputMethod：从API version 23开始支持，设置默认输入法。 |
| value | string | 是 | 策略类型值。  当item为screenOff时，value为设备息屏时间（单位：毫秒）。  当item为dateTime时，value为要设置的系统时间（单位：毫秒）。  当item为powerPolicy时，value为JSON字符串，格式：{"powerScene":xx,"powerPolicy":{"powerPolicyAction":xx,"delayTime":xx}}。powerScene为电源策略场景；delayTime为延迟时间（单位：毫秒），不支持设置为30000毫秒，其余数值均在允许范围内；powerPolicyAction为休眠策略。  电源策略场景：  - 0：超时场景。  休眠策略：  - 0：不执行动作。  - 1：自动进入睡眠。  - 2：强制进入睡眠。  - 3：进入休眠，该策略暂不生效。  - 4：关机。  当item为eyeComfort时，value为护眼模式开关状态的字符串。  - on：全天开启护眼模式。  - off：关闭护眼模式。  当item为defaultInputMethod时，value为输入法应用包名字符串。  - 可以通过[getCurrentInputMethod](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inputmethod#inputmethodgetcurrentinputmethod9)获取当前输入法应用包名。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { deviceSettings } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. // 需根据实际情况进行替换
12. deviceSettings.setValue(wantTemp, 'screenOff', '3000');
13. console.info(`Succeeded in setting screen off time.`);
14. } catch (err) {
15. console.error(`Failed to set screen off time. Code: ${err.code}, message: ${err.message}`);
16. }
```

## deviceSettings.getValue

PhonePC/2in1Tablet

getValue(admin: Want, item: string): string

获取设备设置策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SETTINGS

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| item | string | 是 | 设备设置策略类型。  - screenOff：设备息屏策略，对于PC/2in1设备，支持查询电池和电源供电下的息屏策略。  - powerPolicy：设备电源策略，对于PC/2in1设备，仅支持查询电池供电下的电源策略。  - eyeComfort：从API version 23开始支持，护眼模式开关状态。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 策略类型值。  当item为screenOff时，返回设备息屏时间（单位：毫秒），对于PC/2in1设备，返回设备电池供电下的息屏时间（单位：毫秒）。  当item为powerPolicy时，返回电源策略，对于PC/2in1设备，返回设备电池供电下的电源策略，格式为JSON字符串:{"powerScene":xx,"powerPolicy":{"powerPolicyAction":xx,"delayTime":xx}}。powerScene为电源策略场景；delayTime为延迟时间（单位：毫秒）；powerPolicyAction为休眠策略。  电源策略场景：  - 0：超时场景。  休眠策略：  - 0：不执行动作。  - 1：自动进入睡眠。  - 2：强制进入睡眠。  - 3：进入休眠，该策略暂不生效。  - 4：关机。  当item为eyeComfort时，value为护眼模式开关状态的字符串。  - on：全天开启护眼模式。  - off：关闭护眼模式。  - unknown：其他模式。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { deviceSettings } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. // 参数需根据实际情况进行替换
12. let result: string = deviceSettings.getValue(wantTemp, 'screenOff');
13. console.info(`Succeeded in getting screen off time, result : ${result}`);
14. } catch (err) {
15. console.error(`Failed to get screen off time. Code: ${err.code}, message: ${err.message}`);
16. }
```

## deviceSettings.setHomeWallpaper20+

PhonePC/2in1Tablet

setHomeWallpaper(admin: Want, fd: number): Promise<void>

设置桌面壁纸，使用Promise异步回调。

**需要权限：** ohos.permission.ENTERPRISE\_SET\_WALLPAPER

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**冲突规则：** [配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则3配置)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| fd | number | 是 | 需要设置为桌面壁纸图片的文件描述符，可以通过file.fs的[openSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fs#fileioopensync)接口获取应用沙箱目录下的图片文件描述符。壁纸图片大小不能超过100MB。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | 无返回结果的Promise对象。当设置桌面壁纸失败后会抛出错误对象。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200012 | Parameter verification failed. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { deviceSettings } from '@kit.MDMKit';
2. import { common, Want } from '@kit.AbilityKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. import { fileIo as fs }  from '@kit.CoreFileKit';

6. let wantTemp: Want = {
7. // 请根据实际情况修改
8. bundleName: 'com.example.myapplication',
9. abilityName: 'EnterpriseAdminAbility'
10. };

12. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
13. const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
14. // 参数根据实际情况进行替换
15. let filename: string = "homewallpaper.jpg";
16. let filePath: string = context.filesDir + '/' + filename;
17. let fd: number = fs.openSync(filePath, fs.OpenMode.READ_WRITE).fd;
18. deviceSettings.setHomeWallpaper(wantTemp, fd).then(() => {
19. console.info('Succeeded in setting home wallpaper');
20. }).catch((err: BusinessError) => {
21. console.error(`Failed to set home wallpaper. Code: ${err.code}, message: ${err.message}`);
22. }).finally(() => {
23. fs.closeSync(fd);
24. });
```

## deviceSettings.setUnlockWallpaper20+

PhonePC/2in1Tablet

setUnlockWallpaper(admin: Want, fd: number): Promise<void>

设置锁屏壁纸，使用Promise异步回调。

**需要权限：** ohos.permission.ENTERPRISE\_SET\_WALLPAPER

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**冲突规则：** [配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则3配置)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| fd | number | 是 | 需要设置为锁屏壁纸图片的文件描述符，可以通过file.fs的[openSync](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-file-fs#fileioopensync)接口获取应用沙箱目录下的图片文件描述符。壁纸图片大小不能超过100MB。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | 无返回结果的Promise对象。当设置锁屏壁纸失败后会抛出错误对象。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200012 | Parameter verification failed. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { deviceSettings } from '@kit.MDMKit';
2. import { common, Want } from '@kit.AbilityKit';
3. import { BusinessError } from '@kit.BasicServicesKit';
4. import { fileIo as fs }  from '@kit.CoreFileKit';

6. let wantTemp: Want = {
7. // 需根据实际情况进行替换
8. bundleName: 'com.example.myapplication',
9. abilityName: 'EnterpriseAdminAbility'
10. };

12. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
13. const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
14. // 参数根据实际情况进行替换
15. let filename: string = "lockwallpaper.jpg";
16. let filePath: string = context.filesDir + '/' + filename;
17. let fd: number = fs.openSync(filePath, fs.OpenMode.READ_WRITE).fd;
18. deviceSettings.setUnlockWallpaper(wantTemp, fd).then(() => {
19. console.info('Succeeded in setting lock wallpaper');
20. }).catch((err: BusinessError) => {
21. console.error(`Failed to set lock wallpaper. Code: ${err.code}, message: ${err.message}`);
22. });
```

## deviceSettings.setValueForAccount24+

PhonePC/2in1Tablet

setValueForAccount(admin: Want, item: SettingsItem, accountId: number, value: string): void

设置指定用户的设备设置策略。该接口可以设置指定用户在设置应用中的某个参数，比如设置用户100的设备名称等。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SETTINGS

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| item | [SettingsItem](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24) | 是 | 设备设置策略类型。 |
| accountId | number | 是 | 用户ID，取值范围：大于等于0。  accountId可以通过[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9)等接口来获取。 |
| value | string | 是 | 策略类型值。  当item为[SettingsItem.DEVICE\_NAME](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24)时，value为设备名称的字符串。 字符串长度范围：大于等于1，小于等于100。只允许设置当前用户的设备名称，设置其他用户的设备名称返回9200012错误码。  当item为[SettingsItem.FLOATING\_NAVIGATION](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24)时，value为三键导航的开关状态，'0'表示三键导航已开启（在[Kiosk模式](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-kioskmanager#kioskmanagerenterkioskmode)下，三键导航显示依赖底部手势开启；即三键导航开关和底部手势开关同时开启时，三键导航才会显示。底部手势可通过接口[applicationManager.setKioskFeatures](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-applicationmanager#applicationmanagersetkioskfeatures20)设置开启或关闭），'1'表示三键导航已关闭。  当item为[SettingsItem.FLOATING\_NAVIGATION](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24)时，该接口在Phone和Tablet设备中可正常调用，在其他设备中返回801错误码。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200012 | Parameter verification failed. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 801 | Capability not supported. Failed to call the API due to limited device capabilities. |

**示例：**



```
1. import { deviceSettings } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. // 需根据实际情况进行替换
12. let accountId = 100;
13. let floatingNavigationStatus: string = "0"
14. deviceSettings.setValueForAccount(wantTemp, deviceSettings.SettingsItem.FLOATING_NAVIGATION, accountId, floatingNavigationStatus);
15. console.info('Succeeded in setting floating navigation status.');
16. } catch (err) {
17. console.error(`Failed to set floating navigation status. Code: ${err.code}, message: ${err.message}`);
18. }
```

## deviceSettings.getValueForAccount24+

PhonePC/2in1Tablet

getValueForAccount(admin: Want, item: SettingsItem, accountId: number): string

获取指定用户的设备设置策略。该接口可以获取指定用户在设置应用中的某个参数，比如获取用户100的设备名称等。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SETTINGS

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| item | [SettingsItem](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24) | 是 | 设备设置策略类型。 |
| accountId | number | 是 | 用户ID，取值范围：大于等于0。  accountId可以通过[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9)等接口来获取。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 策略类型值。  当item为[SettingsItem.DEVICE\_NAME](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24)时，返回当前用户的设备名称，查询非当前用户的设备名称返回9200012错误码。  当item为[SettingsItem.FLOATING\_NAVIGATION](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24)时，返回指定用户的三键导航的开关状态。  当item为[SettingsItem.FLOATING\_NAVIGATION](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-devicesettings#settingsitem24)时，该接口在该接口在Phone和Tablet设备中可正常调用，在其他设备中返回801错误码。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200012 | Parameter verification failed. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 801 | Capability not supported. Failed to call the API due to limited device capabilities. |

**示例：**



```
1. import { deviceSettings } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. // 需根据实际情况进行替换
12. let accountId = 100;
13. let result: string = deviceSettings.getValueForAccount(wantTemp, deviceSettings.SettingsItem.FLOATING_NAVIGATION, accountId);
14. console.info(`Succeeded in getting floating navigation status., result : ${result}`);
15. } catch (err) {
16. console.error(`Failed to get floating navigation status. Code: ${err.code}, message: ${err.message}`);
17. }
```

## SettingsItem24+

PhonePC/2in1Tablet

设置的策略类型。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| DEVICE\_NAME | 0 | 设备名称。 |
| FLOATING\_NAVIGATION24+ | 1 | 三键导航。 |