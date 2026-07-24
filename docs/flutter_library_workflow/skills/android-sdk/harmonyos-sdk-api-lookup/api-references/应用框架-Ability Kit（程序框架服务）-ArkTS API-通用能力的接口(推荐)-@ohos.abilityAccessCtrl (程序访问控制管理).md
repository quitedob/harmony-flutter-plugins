程序访问控制提供应用程序的权限校验和管理能力。

说明

本模块首批接口从API version 8开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { abilityAccessCtrl } from '@kit.AbilityKit';
```

## abilityAccessCtrl.createAtManager

PhonePC/2in1TabletTVWearable

createAtManager(): AtManager

访问控制管理：创建程序访问控制管理的实例对象。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [AtManager](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#atmanager) | 获取程序访问控制模块的实例。 |

**示例：**



```
1. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
```

## AtManager

PhonePC/2in1TabletTVWearable

管理访问控制模块的实例。

AtManager接口调用依赖于tokenID，应用可通过[bundleManager.getBundleInfoForSelf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager#bundlemanagergetbundleinfoforself)获取tokenID。

### checkAccessToken9+

PhonePC/2in1TabletTVWearable

checkAccessToken(tokenID: number, permissionName: Permissions): Promise<GrantStatus>

校验应用是否被授予权限。使用Promise异步回调。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| tokenID | number | 是 | 要校验的目标应用的身份标识，可通过应用的[ApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)的accessTokenId字段获得。 |
| permissionName | [Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions) | 是 | 需要校验的权限名称，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[GrantStatus](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#grantstatus)> | Promise对象，返回授权状态结果。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types. |
| 12100001 | Invalid parameter. The tokenID is 0, or the permissionName exceeds 256 characters. |

**示例：**



```
1. import { abilityAccessCtrl } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. let tokenID: number = 0; // 获取tokenID的方式可参考AtManager章节的描述。
6. atManager.checkAccessToken(tokenID, 'ohos.permission.GRANT_SENSITIVE_PERMISSIONS').then((data: abilityAccessCtrl.GrantStatus) => {
7. console.info(`checkAccessToken success, result: ${data}`);
8. }).catch((err: BusinessError) => {
9. console.error(`checkAccessToken fail, code: ${err.code}, message: ${err.message}`);
10. });
```

### checkAccessTokenSync10+

PhonePC/2in1TabletTVWearable

checkAccessTokenSync(tokenID: number, permissionName: Permissions): GrantStatus

校验应用是否被授予权限，同步返回结果。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| tokenID | number | 是 | 要校验的目标应用的身份标识，可通过应用的[ApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)的accessTokenId字段获得。 |
| permissionName | [Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions) | 是 | 需要校验的权限名称，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [GrantStatus](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#grantstatus) | 枚举实例，返回授权状态。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types. |
| 12100001 | Invalid parameter. The tokenID is 0, or the permissionName exceeds 256 characters. |

**示例：**



```
1. import { abilityAccessCtrl, Permissions } from '@kit.AbilityKit';

3. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
4. let tokenID: number = 0; // 获取tokenID的方式可参考AtManager章节的描述。
5. let permissionName: Permissions = 'ohos.permission.GRANT_SENSITIVE_PERMISSIONS';
6. let data: abilityAccessCtrl.GrantStatus = atManager.checkAccessTokenSync(tokenID, permissionName);
7. console.info(`Result: ${data}`);
```

### on18+

PhonePC/2in1TabletTVWearable

on(type: 'selfPermissionStateChange', permissionList: Array<Permissions>, callback: Callback<PermissionStateChangeInfo>): void

订阅本应用的指定权限列表的权限授权状态变化事件。当本应用对应权限的授权状态发生变化时，触发对应回调函数的执行。使用callback异步回调。

* 多次调用本订阅接口时，如果订阅的权限列表相同，callback不同，允许订阅成功。
* 多次调用本订阅接口时，如果订阅的权限列表间有相同的子集，callback相同时，订阅失败。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 订阅事件类型，固定为'selfPermissionStateChange'，自身权限状态变更事件。 |
| permissionList | Array<[Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)> | 是 | 订阅的权限名列表，如果为空，则表示订阅所有的权限状态变化，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |
| callback | Callback<[PermissionStateChangeInfo](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#permissionstatechangeinfo18)> | 是 | 回调函数，返回订阅指定权限名状态变更事件的结果。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types. |
| 12100001 | Invalid parameter. Possible causes: 1. The permissionList exceeds the size limit; 2. The permissionNames in the list are all invalid. |
| 12100004 | The API is used repeatedly with the same input. |
| 12100005 | The registration time has exceeded the limit. |
| 12100007 | The service is abnormal. |

**示例：**



```
1. import { abilityAccessCtrl, Permissions } from '@kit.AbilityKit';

3. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
4. let permissionList: Array<Permissions> = ['ohos.permission.APPROXIMATELY_LOCATION'];
5. try {
6. atManager.on('selfPermissionStateChange', permissionList, (data: abilityAccessCtrl.PermissionStateChangeInfo) => {
7. console.info(`receive permission state change, result: ${data}`);
8. });
9. } catch(err) {
10. console.error(`Code: ${err.code}, message: ${err.message}`);
11. }
```

### off18+

PhonePC/2in1TabletTVWearable

off(type: 'selfPermissionStateChange', permissionList: Array<Permissions>, callback?: Callback<PermissionStateChangeInfo>): void

取消订阅自身指定权限列表的权限状态变更事件。使用callback异步回调。

取消订阅不传callback时，批量删除permissionList下面的所有callback。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | string | 是 | 订阅事件类型，固定为'selfPermissionStateChange'，权限状态变更事件。 |
| permissionList | Array<[Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)> | 是 | 取消订阅的权限名列表，为空时表示取消订阅所有的权限状态变化，必须与[on](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#on18)的输入一致，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |
| callback | Callback<[PermissionStateChangeInfo](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#permissionstatechangeinfo18)> | 否 | 回调函数，返回取消订阅指定tokenID与指定权限名状态变更事件的结果。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types. |
| 12100004 | The API is not used in pair with "on". |
| 12100007 | The service is abnormal. |

**示例：**



```
1. import { abilityAccessCtrl, Permissions } from '@kit.AbilityKit';

3. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
4. let permissionList: Array<Permissions> = ['ohos.permission.APPROXIMATELY_LOCATION'];
5. try {
6. atManager.off('selfPermissionStateChange', permissionList);
7. } catch(err) {
8. console.error(`Code: ${err.code}, message: ${err.message}`);
9. }
```

### requestPermissionsFromUser9+

PhonePC/2in1TabletTVWearable

requestPermissionsFromUser(context: Context, permissionList: Array<Permissions>, requestCallback: AsyncCallback<PermissionRequestResult>): void

用于UIAbility/UIExtensionAbility拉起弹框请求[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。使用callback异步回调。

如果用户拒绝授权，将无法再次拉起弹框，需要用户在系统应用“设置”的界面中，手动授予权限，或是调用[requestPermissionOnSetting](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#requestpermissiononsetting12)，拉起权限设置弹框，引导用户授权。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/_O1EuCn9Q5OCbi8Zu-BgVg/zh-cn_image_0000002599478231.png?HW-CC-KV=V1&HW-CC-Date=20260511T032025Z&HW-CC-Expire=86400&HW-CC-Sign=A6720A6B4EA6191E43FA7FCE5C7F11B10FCBF0368F2DD1DACD4BEF6241D108BB)

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 请求权限的UIAbility/UIExtensionAbility的Context。 |
| permissionList | Array<[Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)> | 是 | 权限名列表，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |
| requestCallback | AsyncCallback<[PermissionRequestResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-permissionrequestresult)> | 是 | 回调函数。当拉起权限请求弹框成功，err为undefined，data为获取到的PermissionRequestResult；否则err为错误对象。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types. |
| 12100001 | (Deprecated in 12) Invalid parameter. The context is invalid when it does not belong to the application itself. |
| 12100009 | Common inner error. An error occurs when creating the pop-up window or obtaining user operation results. |

**示例：**

下述示例中context的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。

关于向用户申请授权的完整流程及示例，请参见[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。



```
1. import { abilityAccessCtrl, Context, PermissionRequestResult, common } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. // 请在组件内获取context
6. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. atManager.requestPermissionsFromUser(context, ['ohos.permission.CAMERA'], (err: BusinessError, data: PermissionRequestResult) => {
8. if (err) {
9. console.error(`requestPermissionsFromUser fail, code: ${err.code}, message: ${err.message}`);
10. } else {
11. console.info(`requestPermissionsFromUser success, result: ${data}`);
12. console.info('requestPermissionsFromUser data permissions:' + data.permissions);
13. console.info('requestPermissionsFromUser data authResults:' + data.authResults);
14. console.info('requestPermissionsFromUser data dialogShownResults:' + data.dialogShownResults);
15. console.info('requestPermissionsFromUser data errorReasons:' + data.errorReasons);
16. }
17. });
```

### requestPermissionsFromUser9+

PhonePC/2in1TabletTVWearable

requestPermissionsFromUser(context: Context, permissionList: Array<Permissions>): Promise<PermissionRequestResult>

用于UIAbility/UIExtensionAbility拉起弹框请求[用户授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。使用Promise异步回调。

如果用户拒绝授权，将无法再次拉起弹框，需要用户在系统应用“设置”的界面中，手动授予权限，或是调用[requestPermissionOnSetting](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#requestpermissiononsetting12)，拉起权限设置弹框，引导用户授权。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 请求权限的UIAbility/UIExtensionAbility的Context。 |
| permissionList | Array<[Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)> | 是 | 权限名列表，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[PermissionRequestResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-permissionrequestresult)> | Promise对象，返回接口的结果。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types. |
| 12100001 | (Deprecated in 12) Invalid parameter. The context is invalid when it does not belong to the application itself. |
| 12100009 | Common inner error. An error occurs when creating the pop-up window or obtaining user operation results. |

**示例：**

下述示例中context的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。

关于向用户申请授权的完整流程及示例，请参见[向用户申请授权](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/request-user-authorization)。



```
1. import { abilityAccessCtrl, Context, PermissionRequestResult, common } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. // 请在组件内获取context
6. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. atManager.requestPermissionsFromUser(context, ['ohos.permission.CAMERA']).then((data: PermissionRequestResult) => {
8. console.info(`requestPermissionsFromUser success, result: ${data}`);
9. console.info('requestPermissionsFromUser data permissions:' + data.permissions);
10. console.info('requestPermissionsFromUser data authResults:' + data.authResults);
11. console.info('requestPermissionsFromUser data dialogShownResults:' + data.dialogShownResults);
12. console.info('requestPermissionsFromUser data errorReasons:' + data.errorReasons);
13. }).catch((err: BusinessError) => {
14. console.error(`requestPermissionsFromUser fail, code: ${err.code}, message: ${err.message}`);
15. });
```

### requestPermissionOnSetting12+

PhonePC/2in1TabletTVWearable

requestPermissionOnSetting(context: Context, permissionList: Array<Permissions>): Promise<Array<GrantStatus>>

用于[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#uiability)/[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability#uiextensionability)二次拉起权限设置弹框。使用Promise异步回调。

在调用此接口前，应用需要先调用[requestPermissionsFromUser](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#requestpermissionsfromuser9)，如果用户在首次弹窗授权时已授权，调用当前接口将无法拉起弹窗。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c/v3/dzW3W7SASbOWGYdeQwhXuA/zh-cn_image_0000002568759042.png?HW-CC-KV=V1&HW-CC-Date=20260511T032025Z&HW-CC-Expire=86400&HW-CC-Sign=04C14BEEF6364E0D3AC2756651214E50EE49B0791C25841B9A296C435296B859)

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 请求权限的UIAbility/UIExtensionAbility的Context。 |
| permissionList | Array<[Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)> | 是 | 权限名列表，合法的权限名取值可在[应用权限组列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Array<[GrantStatus](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#grantstatus)>> | Promise对象，返回授权状态结果。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 12100001 | Invalid parameter. Possible causes:  1. The context is invalid because it does not belong to the application itself;  2. The permission list contains the permission that is not declared in the module.json file;  3. The permission list is invalid because the permissions in it do not belong to the same permission group;  4. The permission list contains one or more system\_grant permissions. |
| 12100009 | Common inner error. An error occurs when creating the pop-up window or obtaining user operation result. |
| 12100011 | All permissions in the permission list have been granted. |
| 12100012 | The permission list contains the permission that has not been revoked by the user. |
| 12100014 | Unexpected permission. You cannot request this type of permission from users via a pop-up window. |

**示例：**

示例中context的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。



```
1. import { abilityAccessCtrl, Context, common } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. // 请在组件内获取context
6. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. atManager.requestPermissionOnSetting(context, ['ohos.permission.CAMERA']).then((data: Array<abilityAccessCtrl.GrantStatus>) => {
8. console.info(`requestPermissionOnSetting success, result: ${data}`);
9. }).catch((err: BusinessError) => {
10. console.error(`requestPermissionOnSetting fail, code: ${err.code}, message: ${err.message}`);
11. });
```

### requestGlobalSwitch12+

PhonePC/2in1TabletTVWearable

requestGlobalSwitch(context: Context, type: SwitchType): Promise<boolean>

用于UIAbility/UIExtensionAbility拉起全局开关设置弹框。使用Promise异步回调。

在某些情况下，如果录音、拍照等功能被禁用，应用可拉起此弹框请求用户同意开启对应功能。如果当前全局开关的状态为开启，则不拉起弹框。

![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/52/v3/oftSIUm5Tm-v6v66YcB03A/zh-cn_image_0000002599358285.png?HW-CC-KV=V1&HW-CC-Date=20260511T032025Z&HW-CC-Expire=86400&HW-CC-Sign=A0DC0943E0F50A1793F9DA3BAD0CB228E35A3782513163F48E22CD3E5EA12169)

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 请求权限的UIAbility/UIExtensionAbility的Context。 |
| type | [SwitchType](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#switchtype12) | 是 | 全局开关类型。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<boolean> | Promise对象。返回true，表示全局开关状态为开启。返回false，表示全局开关状态为关闭。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types. |
| 12100001 | Invalid parameter. Possible causes: 1. The context is invalid because it does not belong to the application itself; 2. The type of global switch is not support. |
| 12100009 | Common inner error. An error occurs when creating the pop-up window or obtaining user operation result. |
| 12100013 | The specific global switch is already open. |

**示例：**

示例中context的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。



```
1. import { abilityAccessCtrl, Context, common } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. // 请在组件内获取context
6. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. atManager.requestGlobalSwitch(context, abilityAccessCtrl.SwitchType.CAMERA).then((data: Boolean) => {
8. console.info(`requestGlobalSwitch success, result: ${data}`);
9. }).catch((err: BusinessError) => {
10. console.error(`requestGlobalSwitch fail, code: ${err.code}, message: ${err.message}`);
11. });
```

### getSelfPermissionStatus20+

PhonePC/2in1TabletTVWearable

getSelfPermissionStatus(permissionName: Permissions): PermissionStatus

查询应用权限状态，同步返回结果。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| permissionName | [Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions) | 是 | 需要校验的权限名称，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [PermissionStatus](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#permissionstatus20) | 枚举实例，返回权限状态。 |

**错误码：**

以下错误码的详细介绍请参见[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 12100001 | Invalid parameter. The permissionName is empty or exceeds 256 characters. |
| 12100007 | The service is abnormal. |

**示例：**



```
1. import { abilityAccessCtrl } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. try {
6. let data: abilityAccessCtrl.PermissionStatus = atManager.getSelfPermissionStatus('ohos.permission.CAMERA');
7. console.info(`getSelfPermissionStatus success, result: ${data}`);
8. } catch(err) {
9. console.error(`getSelfPermissionStatus fail, code: ${err.code}, message: ${err.message}`);
10. }
```

### openPermissionOnSetting22+

PhonePC/2in1TabletTVWearable

openPermissionOnSetting(context: Context, permission: Permissions): Promise<SelectedResult>

用于[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#uiability)/[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability#uiextensionability)拉起跳转设置页的弹窗。使用Promise异步回调。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| context | [Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 是 | 请求权限的UIAbility/UIExtensionAbility的Context。 |
| permission | [Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions) | 是 | 权限名，只支持授权方式为[manual\_settings](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-mgmt-overview#manual_settings手动设置授权)类型的权限。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[SelectedResult](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#selectedresult22)> | Promise对象，返回跳转设置页弹窗结果。 |

**错误码：**

以下错误码的详细介绍请参见[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 12100001 | Invalid parameter. Possible causes:  1. The context is invalid because it does not belong to the application itself;  2. The permission is invalid or not declared in the module.json file. |
| 12100009 | Common inner error. An error occurs when creating the pop-up window or obtaining user operation result. |
| 12100014 | Unexpected permission. The permission is not a manual\_settings permission. |

**示例：**

示例中context的获取方式请参见[获取UIAbility的上下文信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability-usage#获取uiability的上下文信息)。



```
1. import { abilityAccessCtrl, Context, common } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. // 请在组件内获取context
6. let context: Context = this.getUIContext().getHostContext() as common.UIAbilityContext;
7. atManager.openPermissionOnSetting(context, 'ohos.permission.HOOK_KEY_EVENT').then((data: abilityAccessCtrl.SelectedResult) => {
8. console.info(`openPermissionOnSetting success, result: ${data}`);
9. }).catch((err: BusinessError) => {
10. console.error(`openPermissionOnSetting fail, code: ${err.code}, message: ${err.message}`);
11. });
```

### verifyAccessTokenSync9+

PhonePC/2in1TabletTVWearable

verifyAccessTokenSync(tokenID: number, permissionName: Permissions): GrantStatus

校验应用是否被授予权限，同步返回结果。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| tokenID | number | 是 | 要校验的目标应用的身份标识，可通过应用的[ApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)的accessTokenId字段获得。 |
| permissionName | [Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions) | 是 | 需要校验的权限名称，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [GrantStatus](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#grantstatus) | 枚举实例，返回授权状态。 |

**错误码：**

以下错误码的详细介绍请参见[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)和[访问控制错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-access-token)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types. |
| 12100001 | Invalid parameter. The tokenID is 0, or the permissionName exceeds 256 characters. |

**示例：**



```
1. import { abilityAccessCtrl } from '@kit.AbilityKit';

3. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
4. let tokenID: number = 0; // 获取tokenID的方式可参考AtManager章节的描述。
5. try {
6. let data: abilityAccessCtrl.GrantStatus = atManager.verifyAccessTokenSync(tokenID, 'ohos.permission.GRANT_SENSITIVE_PERMISSIONS');
7. console.info(`verifyAccessTokenSync success, result: ${data}`);
8. } catch(err) {
9. console.error(`verifyAccessTokenSync fail, code: ${err.code}, message: ${err.message}`);
10. }
```

### verifyAccessToken9+

PhonePC/2in1TabletTVWearable

verifyAccessToken(tokenID: number, permissionName: Permissions): Promise<GrantStatus>

校验应用是否被授予权限。使用Promise异步回调。

说明

建议使用[checkAccessToken](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#checkaccesstoken9)替代。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| tokenID | number | 是 | 要校验的目标应用的身份标识，可通过应用的[ApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)的accessTokenId字段获得。 |
| permissionName | [Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions) | 是 | 需要校验的权限名称，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[GrantStatus](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#grantstatus)> | Promise对象，返回授权状态结果。 |

**示例：**



```
1. import { abilityAccessCtrl, Permissions } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. let tokenID: number = 0; // 获取tokenID的方式可参考AtManager章节的描述。
6. let permissionName: Permissions = 'ohos.permission.GRANT_SENSITIVE_PERMISSIONS';
7. atManager.verifyAccessToken(tokenID, permissionName).then((data: abilityAccessCtrl.GrantStatus) => {
8. console.info(`verifyAccessToken success, result: ${data}`);
9. }).catch((err: BusinessError) => {
10. console.error(`verifyAccessToken fail, code: ${err.code}, message: ${err.message}`);
11. });
```

### verifyAccessToken(deprecated)

PhonePC/2in1TabletTVWearable

verifyAccessToken(tokenID: number, permissionName: string): Promise<GrantStatus>

校验应用是否被授予权限。使用Promise异步回调。

说明

从API version 8 开始支持，从API version 9 开始废弃，建议使用[checkAccessToken](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#checkaccesstoken9)替代。

**系统能力：** SystemCapability.Security.AccessToken

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| tokenID | number | 是 | 要校验的目标应用的身份标识，可通过应用的[ApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)的accessTokenId字段获得。 |
| permissionName | string | 是 | 需要校验的权限名称，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<[GrantStatus](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#grantstatus)> | Promise对象，返回授权状态结果。 |

**示例：**



```
1. import { abilityAccessCtrl } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
5. let tokenID: number = 0; // 获取tokenID的方式可参考AtManager章节的描述。
6. atManager.verifyAccessToken(tokenID, 'ohos.permission.GRANT_SENSITIVE_PERMISSIONS').then((data: abilityAccessCtrl.GrantStatus) => {
7. console.info(`verifyAccessToken success, result: ${data}`);
8. }).catch((err: BusinessError) => {
9. console.error(`verifyAccessToken fail, code: ${err.code}, message: ${err.message}`);
10. });
```

## GrantStatus

PhonePC/2in1TabletTVWearable

表示授权状态的枚举。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| PERMISSION\_DENIED | -1 | 表示未授权。 |
| PERMISSION\_GRANTED | 0 | 表示已授权。 |

## SwitchType12+

PhonePC/2in1TabletTVWearable

表示全局开关类型的枚举。

**元服务API：** 从API version 12开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| CAMERA | 0 | 表示相机全局开关。 |
| MICROPHONE | 1 | 表示麦克风全局开关。 |
| LOCATION | 2 | 表示位置全局开关。 |

## PermissionStateChangeType18+

PhonePC/2in1TabletTVWearable

表示权限授权状态变化操作类型的枚举。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| PERMISSION\_REVOKED\_OPER | 0 | 表示权限取消操作。 |
| PERMISSION\_GRANTED\_OPER | 1 | 表示权限授予操作。 |

## PermissionStateChangeInfo18+

PhonePC/2in1TabletTVWearable

表示某次权限授权状态变化的详情。

**元服务API：** 从API version 18开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| change | [PermissionStateChangeType](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#permissionstatechangetype18) | 否 | 否 | 权限授权状态变化类型。 |
| tokenID | number | 否 | 否 | 被订阅的应用身份标识，可通过应用的[ApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)的accessTokenId字段获得。 |
| permissionName | [Permissions](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions) | 否 | 否 | 当前授权状态发生变化的权限名，合法的权限名取值可在[应用权限列表](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permissions)中查询。 |

## PermissionRequestResult10+

PhonePC/2in1TabletTVWearable

type PermissionRequestResult = \_PermissionRequestResult

权限请求结果对象。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 类型 | 说明 |
| --- | --- |
| [\_PermissionRequestResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-permissionrequestresult) | 权限请求结果对象。 |

## Context10+

PhonePC/2in1TabletTVWearable

type Context = \_Context

提供了ability或application的上下文的能力，包括访问特定应用程序的资源等。

**元服务API：** 从API version 11开始，该接口支持在元服务中使用。

**模型约束：** 此接口仅可在Stage模型下使用。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 类型 | 说明 |
| --- | --- |
| [\_Context](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | 提供了ability或application的上下文的能力，包括访问特定应用程序的资源等。 |

## PermissionStatus20+

PhonePC/2in1TabletTVWearable

表示权限状态的枚举。

**元服务API：** 从API version 20开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| DENIED | -1 | 表示用户未授权。 |
| GRANTED | 0 | 表示已授权。 |
| NOT\_DETERMINED | 1 | 表示未操作。应用声明[用户授权权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user)，暂未调用[requestPermissionsFromUser](/consumer/cn/doc/harmonyos-references/js-apis-abilityaccessctrl#requestpermissionsfromuser9)接口请求用户授权时，或用户在设置中将权限状态修改为每次询问时，查询权限状态将返回此值。 |
| INVALID | 2 | 表示无效。应用未[声明权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/declare-permissions)或当前无法处理。例如：当模糊位置权限的状态为NOT\_DETERMINED时，查询精确位置权限状态，返回此值。 |
| RESTRICTED | 3 | 表示受限。用户未同意隐私声明（仅系统应用会返回此状态）。 |

## SelectedResult22+

PhonePC/2in1TabletTVWearable

表示跳转设置页弹窗结果的枚举。

**系统能力：** SystemCapability.Security.AccessToken

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| REJECTED | -1 | 表示用户选择不允许前往设置。 |
| OPENED | 0 | 表示用户选择前往设置。 |
| GRANTED | 1 | 表示权限已授权，无需弹窗。 |