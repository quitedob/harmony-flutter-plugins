本模块提供设备安全管理的能力，包括查询安全补丁状态、查询文件加密状态等。

说明

本模块首批接口从API version 12开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

本模块接口仅对设备管理应用开放，且调用接口前需激活设备管理应用，具体请参考[MDM Kit开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-guide)。

## 导入模块

PhonePC/2in1Tablet



```
1. import { securityManager } from '@kit.MDMKit';
```

## securityManager.uninstallUserCertificate

PhonePC/2in1Tablet

uninstallUserCertificate(admin: Want, certUri: string): Promise<void>

卸载用户证书，使用Promise异步回调。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_CERTIFICATE

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| certUri | string | 是 | 证书uri，由安装用户证书接口[installUserCertificate](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#securitymanagerinstallusercertificate)设置返回。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | 无返回结果的Promise对象。当卸载用户证书失败时会抛出错误对象。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9201001 | Failed to manage the certificate. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';
3. import { BusinessError } from '@kit.BasicServicesKit';

5. let wantTemp: Want = {
6. // 需根据实际情况进行替换
7. bundleName: 'com.example.myapplication',
8. abilityName: 'EnterpriseAdminAbility'
9. };
10. // 需根据实际情况进行替换
11. let aliasStr = "certName";
12. securityManager.uninstallUserCertificate(wantTemp, aliasStr).then(() => {
13. console.info(`Succeeded in uninstalling user certificate.`);
14. }).catch((err: BusinessError) => {
15. console.error(`Failed to uninstall user certificate. Code is ${err.code}, message is ${err.message}`);
16. });
```

## securityManager.installUserCertificate

PhonePC/2in1Tablet

installUserCertificate(admin: Want, certificate: CertBlob): Promise<string>

安装用户证书，使用Promise异步回调。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_CERTIFICATE

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| certificate | [CertBlob](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#certblob) | 是 | 证书信息。证书文件应放在应用沙箱路径(应用沙箱路径和真实路径的对应关系可参见：[应用沙箱路径和真实物理路径的对应关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory#应用沙箱路径和真实物理路径的对应关系))等应用有权限访问的路径下。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<string> | Promise对象，返回当前证书安装后的uri，用于卸载证书。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9201001 | Failed to manage the certificate. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { common, Want } from '@kit.AbilityKit';
3. import { BusinessError } from '@kit.BasicServicesKit';

5. let wantTemp: Want = {
6. // 需根据实际情况进行替换
7. bundleName: 'com.example.myapplication',
8. abilityName: 'EnterpriseAdminAbility'
9. };
10. let certFileArray: Uint8Array = new Uint8Array();
11. // 变量context需要在MainAbility的onCreate回调函数中进行初始化
12. // test.cer需要放置在rawfile目录下
13. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
14. const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
15. context.resourceManager.getRawFileContent("test.cer").then((value) => {
16. certFileArray = value;
17. securityManager.installUserCertificate(wantTemp, { inData: certFileArray, alias: "cert_alias_xts" })
18. .then((result) => {
19. console.info(`Succeeded in installing user certificate, result : ${JSON.stringify(result)}`);
20. }).catch((err: BusinessError) => {
21. console.error(`Failed to install user certificate. Code: ${err.code}, message: ${err.message}`);
22. })
23. }).catch((err: BusinessError) => {
24. console.error(`Failed to get raw file content. message: ${err.message}`);
25. return;
26. });
```

## securityManager.installUserCertificate18+

PhonePC/2in1Tablet

installUserCertificate(admin: Want, certificate: CertBlob, accountId: number): string

支持按系统账户安装用户证书。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_CERTIFICATE

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| certificate | [CertBlob](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#certblob) | 是 | 证书信息。证书文件应放在应用沙箱路径(应用沙箱路径和真实路径的对应关系可参见：[应用沙箱路径和真实物理路径的对应关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory#应用沙箱路径和真实物理路径的对应关系))等应用有权限访问的路径下。 |
| accountId | number | 是 | 用户ID，指定具体用户，取值范围：大于等于0。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回当前证书安装后的uri，用于卸载证书。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9201001 | Failed to manage the certificate. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { common, Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. let certFileArray: Uint8Array = new Uint8Array();
10. let accountId: number = 100;
11. // 变量context需要在MainAbility的onCreate回调函数中进行初始化
12. // test.cer需要放置在rawfile目录下
13. // 请在组件内获取context，确保this.getUIContext().getHostContext()返回结果为UIAbilityContext
14. const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
15. context.resourceManager.getRawFileContent("test.cer").then((value) => {
16. certFileArray = value;
17. try {
18. let result: string = securityManager.installUserCertificate(wantTemp, { inData: certFileArray, alias: "cert_alias_xts" }, accountId);
19. console.info(`Succeeded in installing user certificate. result: ${result}`);
20. } catch (err) {
21. console.error(`Failed to install user certificate. Code: ${err.code}, message: ${err.message}`);
22. }
23. });
```

## securityManager.getUserCertificates18+

PhonePC/2in1Tablet

getUserCertificates(admin: Want, accountId: number): Array<string>

获取指定系统账户下的用户证书信息。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_CERTIFICATE

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| accountId | number | 是 | 用户ID，指定具体用户，取值范围：大于等于0。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Array<string> | 返回在指定用户ID下安装的所有用户证书。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let accountId: number = 100;
11. try {
12. let result: Array<string> = securityManager.getUserCertificates(wantTemp, accountId);
13. console.info(`Succeeded in getting the uri list of user Certificates. result: ${JSON.stringify(result)}`);
14. } catch (err) {
15. console.error(`Failed to get the uri list of user Certificates. Code: ${err.code}, message: ${err.message}`);
16. }
```

## securityManager.getSecurityStatus

PhonePC/2in1Tablet

getSecurityStatus(admin: Want, item: string): string

获取当前设备安全策略信息。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| item | string | 是 | 安全策略名称。  - patch：设备安全补丁。  - encryption：设备文件系统加密。  - root：设备ROOT状态。  - fastboot24+：设备fastboot模式锁定状态。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回安全策略状态值。 |

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
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. let result: string = securityManager.getSecurityStatus(wantTemp, 'patch');
12. console.info(`Succeeded in getting security patch tag. tag: ${result}`);
13. } catch (err) {
14. console.error(`Failed to get security patch tag. Code: ${err.code}, message: ${err.message}`);
15. }
```

## securityManager.setPasswordPolicy

PhonePC/2in1Tablet

setPasswordPolicy(admin: Want, policy: PasswordPolicy): void

设置设备锁屏口令策略。当用户设置锁屏口令时，如果设置的锁屏口令不符合要求，会有安全提示重新设置锁屏口令。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则3配置)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| policy | [PasswordPolicy](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#passwordpolicy) | 是 | 设备锁屏口令策略。 |

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
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. let policy: securityManager.PasswordPolicy = {
11. complexityRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,}$',
12. validityPeriod: 1,
13. additionalDescription: '至少八个字符，至少一个大写字母，一个小写字母，一个数字和一个特殊字符',
14. };
15. try {
16. securityManager.setPasswordPolicy(wantTemp, policy);
17. console.info(`Succeeded in setting password policy.`);
18. } catch(err) {
19. console.error(`Failed to set password policy. Code: ${err.code}, message: ${err.message}`);
20. }
```

## securityManager.getPasswordPolicy

PhonePC/2in1Tablet

getPasswordPolicy(admin: Want): PasswordPolicy

获取设备锁屏口令策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [PasswordPolicy](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#passwordpolicy) | 设备锁屏口令策略。 |

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
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. let result: securityManager.PasswordPolicy = securityManager.getPasswordPolicy(wantTemp);
12. console.info(`Succeeded in getting password policy, result : ${JSON.stringify(result)}`);
13. } catch(err) {
14. console.error(`Failed to get password policy. Code: ${err.code}, message: ${err.message}`);
15. }
```

## securityManager.setAppClipboardPolicy

PhonePC/2in1Tablet

setAppClipboardPolicy(admin: Want, tokenId: number, policy: ClipboardPolicy): void

设置设备剪贴板策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [从严管控](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则1从严管控)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| tokenId | number | 是 | 目标应用的身份标识。可通过[bundleManager.getApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)获取accessTokenId。当前只支持最多100个tokenId被保存策略。 |
| policy | [ClipboardPolicy](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#clipboardpolicy) | 是 | 剪贴板策略。 |

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
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let tokenId: number = 586874394;
11. try {
12. securityManager.setAppClipboardPolicy(wantTemp, tokenId, securityManager.ClipboardPolicy.IN_APP);
13. console.info(`Succeeded in setting clipboard policy.`);
14. } catch(err) {
15. console.error(`Failed to set clipboard policy. Code: ${err.code}, message: ${err.message}`);
16. }
```

## securityManager.getAppClipboardPolicy

PhonePC/2in1Tablet

getAppClipboardPolicy(admin: Want, tokenId?: number): string

获取设备剪贴板策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| tokenId | number | 否 | 目标应用的身份标识。可通过[bundleManager.getApplicationInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-applicationinfo)获取accessTokenId。当前只支持最多100个tokenId被保存策略。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回JSON字符串形式的设备剪贴板策略。 |

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
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let tokenId: number = 586874394;
11. try {
12. let result: string = securityManager.getAppClipboardPolicy(wantTemp, tokenId);
13. console.info(`Succeeded in getting password policy, result : ${result}`);
14. } catch(err) {
15. console.error(`Failed to set clipboard policy. Code: ${err.code}, message: ${err.message}`);
16. }
```

## securityManager.setAppClipboardPolicy18+

PhonePC/2in1Tablet

setAppClipboardPolicy(admin: Want, bundleName: string, accountId: number, policy: ClipboardPolicy): void

设置指定用户下指定应用的设备剪贴板策略。当前只支持最多保存100个策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [从严管控](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则1从严管控)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| bundleName | string | 是 | 被设置剪贴板策略的应用包名。 |
| accountId | number | 是 | 用户ID，指定具体用户，取值范围：大于等于0。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |
| policy | [ClipboardPolicy](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#clipboardpolicy) | 是 | 剪贴板策略。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let bundleName: string = 'com.example.myapplication';
11. let accountId: number = 100;
12. try {
13. securityManager.setAppClipboardPolicy(wantTemp, bundleName, accountId, securityManager.ClipboardPolicy.IN_APP);
14. console.info(`Succeeded in setting clipboard policy.`);
15. } catch(err) {
16. console.error(`Failed to set clipboard policy. Code: ${err.code}, message: ${err.message}`);
17. }
```

## securityManager.getAppClipboardPolicy18+

PhonePC/2in1Tablet

getAppClipboardPolicy(admin: Want, bundleName: string, accountId: number): string

获取指定用户下指定应用的设备剪贴板策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| bundleName | string | 是 | 被设置剪贴板策略的应用包名。 |
| accountId | number | 是 | 用户ID，指定具体用户，取值范围：大于等于0。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回JSON字符串形式的设备剪贴板策略。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let bundleName: string = 'com.example.myapplication';
11. let accountId: number = 100;
12. try {
13. let result: string = securityManager.getAppClipboardPolicy(wantTemp, bundleName, accountId);
14. console.info(`Succeeded in getting password policy, result : ${result}`);
15. } catch(err) {
16. console.error(`Failed to set clipboard policy. Code: ${err.code}, message: ${err.message}`);
17. }
```

## securityManager.setWatermarkImage14+

PhonePC/2in1Tablet

setWatermarkImage(admin: Want, bundleName: string, source: string | image.PixelMap, accountId: number): void

为指定用户的指定应用设置水印策略。当前只支持最多保存100个策略。

说明

本接口适用于企业场景下为三方应用设置水印，降低企业信息泄露风险。不建议为系统应用设置水印（如：桌面应用），可能存在未知异常。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [独占](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则2独占), 同一个用户下的同一个应用的水印独占。不同用户、不同应用的水印[合并](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则4合并)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| bundleName | string | 是 | 被设置水印的应用包名。 |
| source | string | [image.PixelMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap) | 是 | string表示图像路径，图像路径为应用沙箱路径(应用沙箱路径和真实路径的对应关系可参见：[应用沙箱路径和真实物理路径的对应关系](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory#应用沙箱路径和真实物理路径的对应关系))等应用有权限访问的路径。  image.PixelMap表示图像对象，图像像素占用大小不得超过500KB。  图像像素占用大小计算公式：图像宽度(像素)×图像高度 (像素)×每个像素占用的字节数（通常为4）。例如：一张 100x100 的图片，图像像素占用大小为100×100×4=40000字节。 |
| accountId | number | 是 | 用户ID。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |

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
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let bundleName: string = 'com.example.myapplication';
11. let source: string = '/data/storage/el1/base/test.png';
12. let accountId: number = 100;
13. try {
14. securityManager.setWatermarkImage(wantTemp, bundleName, source, accountId);
15. console.info(`Succeeded in setting set watermarkImage policy.`);
16. } catch(err) {
17. console.error(`Failed to set watermarkImage policy. Code: ${err.code}, message: ${err.message}`);
18. }
```

## securityManager.cancelWatermarkImage14+

PhonePC/2in1Tablet

cancelWatermarkImage(admin: Want, bundleName: string, accountId: number): void

取消指定用户的水印策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| bundleName | string | 是 | 被取消水印的应用包名。 |
| accountId | number | 是 | 用户ID。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |

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
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let bundleName: string = 'com.example.myapplication';
11. let accountId: number = 100;
12. try {
13. securityManager.cancelWatermarkImage(wantTemp, bundleName, accountId);
14. console.info(`Succeeded in setting cancel watermarkImage policy.`);
15. } catch(err) {
16. console.error(`Failed to cancel watermarkImage policy. Code: ${err.code}, message: ${err.message}`);
17. }
```

## securityManager.setPermissionManagedState20+

PhonePC/2in1Tablet

setPermissionManagedState(admin: Want, applicationInstance: ApplicationInstance, permissions: Array<string>, managedState: PermissionManagedState): void

设置指定应用的[user\_grant权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user)的管理策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_USER\_GRANT\_PERMISSION

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** 同一个应用实例的同一个权限[独占](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则2独占)，不同应用实例不同权限[合并](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则4合并)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| applicationInstance | [ApplicationInstance](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#applicationinstance20) | 是 | 指定应用实例。 |
| permissions | Array<string> | 是 | 需要管理的权限名称列表，仅支持[user\_grant权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user)。权限名称列表以[应用权限组](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-permission-group-list)为单位。列表中应包含应用在[module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file)中声明的同一权限组内的所有权限。例如：应用如果在module.json5中声明需要ohos.permission.READ\_CALENDAR和ohos.permission.WRITE\_CALENDAR权限，则传入的权限名称列表必须同时包含ohos.permission.READ\_CALENDAR和ohos.permission.WRITE\_CALENDAR两个权限。 |
| managedState | [PermissionManagedState](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#permissionmanagedstate20) | 是 | 应用权限的管理策略。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200010 | A conflict policy has been configured. |
| 9200012 | Parameter verification failed. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { Want } from '@kit.AbilityKit';
2. import { securityManager } from '@kit.MDMKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. let appInstanceTemp: securityManager.ApplicationInstance = {
10. // 需根据实际情况进行替换
11. appIdentifier: '736498586',
12. appIndex: 0,
13. accountId: 100
14. };
15. let permissionsTemp: Array<string> = ['ohos.permission.CAMERA', 'ohos.permission.LOCATION'];
16. try {
17. securityManager.setPermissionManagedState(wantTemp, appInstanceTemp, permissionsTemp, securityManager.PermissionManagedState.GRANTED);
18. console.info('Succeeded in setting permission managed state.');
19. } catch(err) {
20. console.error(`Failed to set permission managed state.  Code: ${err.code}, message: ${err.message}`);
21. }
```

## securityManager.getPermissionManagedState20+

PhonePC/2in1Tablet

getPermissionManagedState(admin: Want, applicationInstance: ApplicationInstance, permission: string): PermissionManagedState

获取指定应用的指定[user\_grant权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-all-user)的管理策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_USER\_GRANT\_PERMISSION

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| applicationInstance | [ApplicationInstance](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#applicationinstance20) | 是 | 指定应用实例。 |
| permission | string | 是 | 需要获取管理策略的权限名称，仅支持user\_grant权限。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [PermissionManagedState](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#permissionmanagedstate20) | 应用权限的管理策略。 |

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
1. import { Want } from '@kit.AbilityKit';
2. import { securityManager } from '@kit.MDMKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. let appInstanceTemp: securityManager.ApplicationInstance = {
10. // 需根据实际情况进行替换
11. appIdentifier: '736498586',
12. appIndex: 0,
13. accountId: 100
14. };
15. let permissionTemp: string = 'ohos.permission.ENTERPRISE_MANAGE_USER_GRANT_PERMISSION';
16. try {
17. let result: securityManager.PermissionManagedState = securityManager.getPermissionManagedState(wantTemp, appInstanceTemp, permissionTemp);
18. console.info(`Succeeded in getting permission managed state, result : ${result}`);
19. } catch(err) {
20. console.error(`Failed to get permission managed state. Code: ${err.code}, message: ${err.message}`);
21. }
```

## securityManager.setExternalSourceExtensionsPolicy22+

PhonePC/2in1Tablet

setExternalSourceExtensionsPolicy(admin: Want, policy: common.ManagedPolicy): void

设置外部来源扩展程序的管控策略。

* DEFAULT：

  默认，表示无管控策略，用户可以通过“设置-隐私与安全-高级”中的“运行外部来源的扩展程序”开关来设置是否允许扩展程序运行。
* DISALLOW：

  禁用。设置此策略后，禁止运行外部来源的扩展程序，运行中的扩展程序可继续运行，扩展程序关闭后无法启动运行。用户无法开启“设置-隐私和安全-高级”中的“运行外部来源的扩展程序”开关。
* FORCE\_OPEN：

  强制开启。设置此策略后，允许运行外部来源的扩展程序，用户无法关闭“设置-隐私和安全-高级”中的“运行外部来源的扩展程序”开关。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**设备行为差异：** 该接口在PC/2in1设备中可正常调用，在其他设备中返回801错误码。

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [独占](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则2独占)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want#want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| policy | [common.ManagedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common#managedpolicy) | 是 | 管控策略。 |

**错误码：**

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200010 | A conflict policy has been configured. |
| 9200012 | Parameter verification failed. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { common, securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. try {
10. securityManager.setExternalSourceExtensionsPolicy(wantTemp, common.ManagedPolicy.FORCE_OPEN);
11. console.info(`Succeeded in setting managed policy.`);
12. } catch(err) {
13. console.error(`Failed to set managed policy. Code: ${err.code}, message: ${err.message}`);
14. }
```

## securityManager.getExternalSourceExtensionsPolicy22+

PhonePC/2in1Tablet

getExternalSourceExtensionsPolicy(admin: Want): common.ManagedPolicy

获取外部来源扩展程序的管控策略。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**设备行为差异：** 该接口在PC/2in1设备中可正常调用，在其他设备中返回801错误码。

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want#want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [common.ManagedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-common#managedpolicy) | 返回ManagedPolicy枚举类型的管控策略。 |

**错误码：**

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { common, securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. let result: common.ManagedPolicy = securityManager.getExternalSourceExtensionsPolicy(wantTemp);
12. console.info(`Succeeded in getting managed policy, result : ${result}`);
13. } catch(err) {
14. console.error(`Failed to get managed policy. Code: ${err.code}, message: ${err.message}`);
15. }
```

## securityManager.installEnterpriseReSignatureCertificate24+

PhonePC/2in1Tablet

installEnterpriseReSignatureCertificate(admin: Want, certificateAlias: string, fd: number, accountId: number): void

安装企业应用重签名证书。

同一用户下最多可下发10本不同证书。证书别名作为证书的唯一标识，不支持重复下发相同别名的证书。如需更新同一别名的证书，需先调用[uninstallEnterpriseReSignatureCertificate](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager#securitymanageruninstallenterpriseresignaturecertificate24)进行卸载。

在MDM应用卸载或admin取消激活场景下，已安装的证书会保留在设备上，不会被移除。

在企业应用分发场景下，由开发者到[华为AGC](https://developer.huawei.com/consumer/cn/agconnect)申请企业应用重签名证书，开发者可以使用重签名证书对企业应用进行二次签名，签名完成后将应用包提供给企业管理员。企业管理员可以将重签名后的应用安装在已部署重签名证书的企业设备上。

企业应用重签名证书使用流程：

首先，由开发者到[华为AGC](https://developer.huawei.com/consumer/cn/agconnect)申请企业应用重签名证书，然后依照以下步骤。

1.通过MDM应用安装企业应用重签名证书；

2.开发者利用签名工具（如ohos-signer或DevEco Studio签名插件），对原始HAP包进行二次签名；

3.安装重签名应用（可以通过企业私有应用市场安装）；

4.运行应用。

规格约束：

1.安装新的签名证书之后，使用旧签名证书的应用可以继续运行；

2.已经安装的企业应用，安装了新的企业签名证书后，已安装的应用如需更新，可以直接覆盖安装，无需先卸载原应用；

3.企业场景下，特别是在涉及信息安全的场景中，企业需要确保员工使用的移动设备中仅安装并运行特定的内部软件和工具。企业应用重签名证书通过统一的应用身份标识，与系统的应用管理与权限控制机制配合使用，可支持企业应用的静默安装、受控的系统能力调用及运行范围限制，从而实现企业软件在受控终端上的准入控制与安全管理。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则3配置)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| certificateAlias | string | 是 | 证书别名，必须以'.cer'结尾。 |
| fd | number | 是 | 表示已存在的重签名证书文件描述符，证书文件需要放置于[应用沙箱目录](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/app-sandbox-directory)。 |
| accountId | number | 是 | 用户ID，指定具体用户，取值范围：大于等于0。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200012 | Parameter verification failed. |
| 9201006 | The number of certificates has reached the limit. |
| 9201007 | The certificate is invalid. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';
3. import { fileIo as fs } from '@kit.CoreFileKit';

5. let wantTemp: Want = {
6. // 需根据实际情况进行替换
7. bundleName: 'com.example.myapplication',
8. abilityName: 'EnterpriseAdminAbility'
9. };
10. // test.cer证书文件需要放置在应用沙箱目录下，并确保是有效的企业应用重签名证书
11. // 需根据实际情况进行替换
12. const filePath = '/test.cer';
13. // 需根据实际情况进行替换
14. let certificateAlias: string = 'test.cer';
15. let fd: number = fs.openSync(filePath, fs.OpenMode.READ_ONLY).fd;
16. // 需根据实际情况进行替换
17. let accountId: number = 100;
18. try {
19. securityManager.installEnterpriseReSignatureCertificate(
20. wantTemp, certificateAlias, fd, accountId);
21. console.info('Success to install enterprise re signature certificate.');
22. } catch (err) {
23. console.error(`Failed to install enterprise re signature certificate.
24. Code: ${err.code}, message: ${err.message}`);
25. };
```

## securityManager.uninstallEnterpriseReSignatureCertificate24+

PhonePC/2in1Tablet

uninstallEnterpriseReSignatureCertificate(admin: Want, certificateAlias: string, accountId: number): void

卸载企业应用重签名证书。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_SECURITY

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| certificateAlias | string | 是 | 证书别名，必须以'.cer'结尾。 |
| accountId | number | 是 | 用户ID，指定具体用户，取值范围：大于等于0。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200012 | Parameter verification failed. |
| 9201008 | The certificate does not exist. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { securityManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. // 需根据实际情况进行替换
10. let certificateAlias: string = 'test.cer';
11. // 需根据实际情况进行替换
12. let accountId: number = 100;
13. try {
14. securityManager.uninstallEnterpriseReSignatureCertificate(
15. wantTemp, certificateAlias, accountId);
16. console.info('Success to uninstall enterprise re signature certificate.');
17. } catch (err) {
18. console.error(`Failed to uninstall enterprise re signature certificate.
19. Code: ${err.code}, message: ${err.message}`);
20. };
```

## CertBlob

PhonePC/2in1Tablet

证书信息。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| inData | Uint8Array | 否 | 否 | 证书的二进制内容。 |
| alias | string | 否 | 否 | 证书别名，别名长度小于40个字符。 |

## PasswordPolicy

PhonePC/2in1Tablet

设备锁屏口令策略。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| complexityRegex | string | 否 | 是 | 口令复杂度正则表达式。 |
| validityPeriod | number | 否 | 是 | 密码有效期（单位：毫秒）。 |
| additionalDescription | string | 否 | 是 | 口令复杂度描述文本，例如：密码中必须包含字母、数字、特殊字符，至少8个字符，最多30个字符。 |

## ClipboardPolicy

PhonePC/2in1Tablet

设备剪贴板策略。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| DEFAULT | 0 | 默认，表示无策略。 |
| IN\_APP | 1 | 剪贴板可在同一应用使用。 |
| LOCAL\_DEVICE | 2 | 剪贴板可在同一设备使用。 |
| CROSS\_DEVICE | 3 | 剪贴板可跨设备使用。 |

## ApplicationInstance20+

PhonePC/2in1Tablet

应用实例。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| appIdentifier | string | 否 | 否 | 应用[唯一标识符](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager-bundleinfo#signatureinfo)，如果应用没有appIdentifier可使用appId代替，可以通过接口[bundleManager.getBundleInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-bundlemanager#bundlemanagergetbundleinfo14-2)获取bundleInfo.signatureInfo.appIdentifier和bundleInfo.signatureInfo.appId。 |
| accountId | number | 否 | 否 | 用户ID，指定具体用户，取值范围：大于等于0。accountId可以通过@ohos.account.osAccount中的[getOsAccountLocalId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-osaccount#getosaccountlocalid9-1)等接口来获取。 |
| appIndex | number | 否 | 否 | 表示分身应用的索引，默认值为0。  appIndex为0时，表示主应用。appIndex大于0时，表示指定的分身应用。 |

## PermissionManagedState20+

PhonePC/2in1Tablet

应用权限的管理状态。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| DEFAULT | 1 | 默认由用户授予。 |
| GRANTED | 0 | 已静默授予。 |
| DENIED | -1 | 已静默拒绝。 |