本模块提供企业设备Wi-Fi管理能力，包括查询Wi-Fi开启状态等。

说明

本模块首批接口从API version 12开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

本模块接口仅可在Stage模型下使用。

本模块接口仅对设备管理应用开放，且调用接口前需激活设备管理应用，具体请参考[MDM Kit开发指南](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-guide)。

全局通用限制类策略由restrictions统一提供，若要全局禁用Wi-Fi，请参考[@ohos.enterprise.restrictions（限制类策略）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions)。

## 导入模块

PhonePC/2in1Tablet



```
1. import { wifiManager } from '@kit.MDMKit';
```

## wifiManager.isWifiActiveSync

PhonePC/2in1Tablet

isWifiActiveSync(admin: Want): boolean

查询当前设备Wi-Fi开启状态。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

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
| boolean | 返回Wi-Fi开启状态，true表示Wi-Fi开启，false表示Wi-Fi关闭。 |

**错误码**：

以下的错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. bundleName: 'com.example.myapplication',
6. abilityName: 'EnterpriseAdminAbility',
7. };

9. try {
10. let result: boolean = wifiManager.isWifiActiveSync(wantTemp);
11. console.info(`Succeeded in querying whether the Wi-Fi is active or not, result : ${result}`);
12. } catch (err) {
13. console.error(`Failed to query whether the Wi-Fi is active or not. Code: ${err.code}, message: ${err.message}`);
14. }
```

## wifiManager.setWifiProfileSync

PhonePC/2in1Tablet

setWifiProfileSync(admin: Want, profile: WifiProfile): void

为当前设备配置Wi-Fi，连接到指定网络。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [配置](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则3配置)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| profile | [WifiProfile](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifiprofile) | 是 | Wi-Fi配置信息。 |

**错误码**：

以下的错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**

**适用于公共开发Wi-Fi**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. let profile: wifiManager.WifiProfile = {
11. // 需根据实际情况进行替换
12. 'ssid': 'guest-Wi-Fi',
13. 'preSharedKey': '',
14. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_OPEN
15. };

17. try {
18. wifiManager.setWifiProfileSync(wantTemp, profile);
19. console.info(`Succeeded in setting Wi-Fi profile.`);
20. } catch (err) {
21. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
22. }
```

**适用于多个同名Wi-Fi但不同BSSID的场景**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. let profile: wifiManager.WifiProfile = {
11. // 需根据实际情况进行替换
12. 'ssid': 'guest-Wi-Fi',
13. 'bssid': 'AA:BB:CC:DD:EE:FF',
14. 'preSharedKey': '',
15. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_OPEN
16. };

18. try {
19. wifiManager.setWifiProfileSync(wantTemp, profile);
20. console.info(`Succeeded in setting Wi-Fi profile.`);
21. } catch (err) {
22. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
23. }
```

**适用于老旧的工业设备等场景、安全性低**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. let profile: wifiManager.WifiProfile = {
11. // 需根据实际情况进行替换
12. 'ssid': 'Legacy-Office-Wi-Fi',
13. 'bssid': 'AA:BB:CC:DD:EE:FF',
14. 'preSharedKey': '',
15. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_WEP
16. };

18. try {
19. wifiManager.setWifiProfileSync(wantTemp, profile);
20. console.info(`Succeeded in setting Wi-Fi profile.`);
21. } catch (err) {
22. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
23. }
```

**适用于家庭网络、小型办公室、消费级路由器等场景**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. let profile: wifiManager.WifiProfile = {
11. // 需根据实际情况进行替换
12. 'ssid': 'home_Wi-Fi',
13. 'preSharedKey': 'passwd',
14. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_PSK
15. };

17. try {
18. wifiManager.setWifiProfileSync(wantTemp, profile);
19. console.info(`Succeeded in setting Wi-Fi profile.`);
20. } catch (err) {
21. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
22. }
```

**适用于现代化IoT设备网络**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. let profile: wifiManager.WifiProfile = {
11. // 需根据实际情况进行替换
12. 'ssid': 'iot_Wi-Fi',
13. 'preSharedKey': 'passwd',
14. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_SAE
15. };

17. try {
18. wifiManager.setWifiProfileSync(wantTemp, profile);
19. console.info(`Succeeded in setting Wi-Fi profile.`);
20. } catch (err) {
21. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
22. }
```

**适用于公司网络和大学校园网络**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. // EAP-PEAP 配置示例
11. let profile: wifiManager.WifiProfile = {
12. // 需根据实际情况进行替换
13. 'ssid': 'company_Wi-Fi',
14. 'preSharedKey': '',
15. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_EAP,
16. 'eapProfile': {
17. eapMethod: wifiManager.EapMethod.EAP_PEAP,
18. phase2Method: wifiManager.Phase2Method.PHASE2_MSCHAPV2,
19. identity: 'zhangsan@company.com',
20. password: 'passwd',
21. anonymousIdentity: '',
22. caPath: '/system/etc/security/caCerts/company-ca.pem',
23. caCertAliases:  '',
24. clientCertAliases: '',
25. certEntry: new Uint8Array(),
26. certPassword: '',
27. altSubjectMatch: 'CN=radius.company.com,OU=IT Department,O=Company Inc.,C=US',
28. domainSuffixMatch: 'company.com',
29. realm: '',
30. eapSubId: 0,
31. plmn: ''
32. }
33. };

35. try {
36. wifiManager.setWifiProfileSync(wantTemp, profile);
37. console.info(`Succeeded in setting Wi-Fi profile.`);
38. } catch (err) {
39. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
40. }
```



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. // EAP-TLS 配置示例
11. let profile: wifiManager.WifiProfile = {
12. // 需根据实际情况进行替换
13. 'ssid': 'tls_Wi-Fi',
14. 'preSharedKey': '',
15. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_EAP,
16. 'eapProfile': {
17. eapMethod: wifiManager.EapMethod.EAP_TLS,
18. phase2Method: wifiManager.Phase2Method.PHASE2_NONE,
19. identity: 'zhangsan@company.com',
20. password: '',
21. anonymousIdentity: '',
22. caPath: '/system/etc/security/caCerts/company-ca.pem',
23. caCertAliases: '',
24. clientCertAliases: 'zhangsan-auth-cert',
25. certEntry: new Uint8Array(),
26. certPassword: '',
27. altSubjectMatch: 'CN=radius.company.com,OU=IT Department,O=Company Inc.,C=US',
28. domainSuffixMatch: 'company.com',
29. realm: '',
30. eapSubId: 0,
31. plmn: ''
32. }
33. };

35. try {
36. wifiManager.setWifiProfileSync(wantTemp, profile);
37. console.info(`Succeeded in setting Wi-Fi profile.`);
38. } catch (err) {
39. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
40. }
```



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. // EAP-TTLS 配置示例
11. let profile: wifiManager.WifiProfile = {
12. // 需根据实际情况进行替换
13. 'ssid': 'ttls_Wi-Fi',
14. 'preSharedKey': '',
15. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_EAP,
16. 'eapProfile': {
17. eapMethod: wifiManager.EapMethod.EAP_TTLS,
18. phase2Method: wifiManager.Phase2Method.PHASE2_GTC,
19. identity: 'zhangsan@company.com',
20. password: '123456', // 根据令牌生成的动态密码
21. anonymousIdentity: '',
22. caPath: '',
23. caCertAliases: 'company-ca',
24. clientCertAliases: '',
25. certEntry: new Uint8Array(),
26. certPassword: '',
27. altSubjectMatch: 'CN=radius.company.com,OU=IT Department,O=Company Inc.,C=US',
28. domainSuffixMatch: 'company.com',
29. realm: 'company.com',
30. plmn: '',
31. eapSubId: 0,
32. }
33. };

35. try {
36. wifiManager.setWifiProfileSync(wantTemp, profile);
37. console.info(`Succeeded in setting Wi-Fi profile.`);
38. } catch (err) {
39. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
40. }
```



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. // EAP-SIM 配置示例
11. let profile: wifiManager.WifiProfile = {
12. // 需根据实际情况进行替换
13. 'ssid': 'eap_sim_Wi-Fi',
14. 'preSharedKey': '',
15. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_EAP,
16. 'eapProfile': {
17. eapMethod: wifiManager.EapMethod.EAP_SIM,
18. phase2Method: wifiManager.Phase2Method.PHASE2_NONE,
19. identity: '',
20. password:'',
21. anonymousIdentity: '',
22. caPath: '',
23. caCertAliases:  'carrier-root-ca',
24. clientCertAliases: '',
25. certEntry: new Uint8Array(),
26. certPassword: '',
27. altSubjectMatch: 'CN=radius.company.com,OU=IT Department,O=Company Inc.,C=US',
28. domainSuffixMatch: 'company.com',
29. realm: 'waln.mnc000.mcc460.3gppnetwork.org',
30. eapSubId: 0,
31. plmn: '46000'
32. }
33. };

35. try {
36. wifiManager.setWifiProfileSync(wantTemp, profile);
37. console.info(`Succeeded in setting Wi-Fi profile.`);
38. } catch (err) {
39. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
40. }
```

**适用于需要固定IP地址供客户端访问等场景**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility',
8. };

10. let profile: wifiManager.WifiProfile = {
11. // 需根据实际情况进行替换
12. 'ssid': 'static_ip_Wi-Fi',
13. 'preSharedKey': 'passwd',
14. 'securityType': wifiManager.WifiSecurityType.WIFI_SEC_TYPE_PSK,
15. 'ipType': wifiManager.IpType.STATIC,
16. 'staticIp': {
17. ipAddress: 3232235778, // 192.168.1.2
18. gateway: 3232235777, // 192.168.1.1
19. prefixLength: 24,
20. dnsServers: [3232235777, 3232235777],
21. domains: []
22. }
23. };

25. try {
26. wifiManager.setWifiProfileSync(wantTemp, profile);
27. console.info(`Succeeded in setting Wi-Fi profile.`);
28. } catch (err) {
29. console.error(`Failed to set Wi-Fi profile. Code: ${err.code}, message: ${err.message}`);
30. }
```

## wifiManager.addAllowedWifiList19+

PhonePC/2in1Tablet

addAllowedWifiList(admin: Want, list: Array<WifiAccessInfo>): void

添加Wi-Fi允许名单。添加允许名单后当前设备仅允许连接该名单下的Wi-Fi。

以下情况下，调用本接口会报策略冲突：

1. 已经通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口禁用了设备Wi-Fi能力。通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)解除Wi-Fi禁用后，可解除冲突。
2. 已经通过[addDisallowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanageradddisallowedwifilist19)接口添加了Wi-Fi禁用名单。通过[removeDisallowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanagerremovedisallowedwifilist19)移除Wi-Fi禁用名单后，可解除冲突。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [合并](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则4合并)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| list | Array<[WifiAccessInfo](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifiaccessinfo19)> | 是 | Wi-Fi允许名单数组。数组总长度不能超过200。例如，若当前允许名单数组中已有100个Wi-Fi，则最多支持通过该接口再添加100个。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200010 | A conflict policy has been configured. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.edmtest',
7. abilityName: 'com.example.edmtest.EnterpriseAdminAbility'
8. };
9. try {
10. let wifiIds: Array<wifiManager.WifiAccessInfo> = [{
11. // 需根据实际情况进行替换
12. ssid: "wifi_name",
13. bssid: "68:77:24:77:A6:D8"
14. }];
15. wifiManager.addAllowedWifiList(wantTemp, wifiIds);
16. console.info(`Succeeded in adding allowed Wi-Fi list.`);
17. } catch (err) {
18. console.error(`Failed to add allowed Wi-Fi list. Code: ${err.code}, message: ${err.message}`);
19. }
```

## wifiManager.removeAllowedWifiList19+

PhonePC/2in1Tablet

removeAllowedWifiList(admin: Want, list: Array<WifiAccessInfo>): void

移除Wi-Fi允许名单。若移除允许名单中的部分Wi-Fi，则当前设备仅允许连接剩下未移除的Wi-Fi。若移除允许名单中的所有Wi-Fi，则当前设备可以连接任意Wi-Fi。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [合并](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则4合并)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| list | Array<[WifiAccessInfo](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifiaccessinfo19)> | 是 | 待移除的Wi-Fi允许名单数组。数组总长度不能超过200。 |

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
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.edmtest',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. try {
10. let wifiIds: Array<wifiManager.WifiAccessInfo> = [{
11. // 需根据实际情况进行替换
12. ssid: "wifi_name",
13. bssid: "68:77:24:77:A6:D8"
14. }];
15. wifiManager.removeAllowedWifiList(wantTemp, wifiIds);
16. console.info(`Succeeded in removing allowed Wi-Fi list.`);
17. } catch (err) {
18. console.error(`Failed to remove allowed Wi-Fi list. Code: ${err.code}, message: ${err.message}`);
19. }
```

## wifiManager.getAllowedWifiList19+

PhonePC/2in1Tablet

getAllowedWifiList(admin: Want): Array<WifiAccessInfo>

获取Wi-Fi允许名单。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

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
| Array<[WifiAccessInfo](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifiaccessinfo19)> | Wi-Fi允许名单数组。 |

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
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.edmtest',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. try {
10. let result: Array<wifiManager.WifiAccessInfo> = wifiManager.getAllowedWifiList(wantTemp);
11. console.info(`Succeeded in getting allowed Wi-Fi list. Result: ${JSON.stringify(result)}`);
12. } catch (err) {
13. console.error(`Failed to get allowed Wi-Fi list. Code: ${err.code}, message: ${err.message}`);
14. }
```

## wifiManager.addDisallowedWifiList19+

PhonePC/2in1Tablet

addDisallowedWifiList(admin: Want, list: Array<WifiAccessInfo>): void

添加Wi-Fi禁用名单。添加禁用名单后当前设备不允许连接该名单下的Wi-Fi。

以下情况下，调用本接口会报策略冲突：

1. 已经通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口禁用了设备Wi-Fi能力。通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)解除Wi-Fi禁用后，可解除冲突。
2. 已经通过[addAllowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanageraddallowedwifilist19)接口添加了Wi-Fi允许名单。通过[removeAllowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanagerremoveallowedwifilist19)移除Wi-Fi允许名单后，可解除冲突。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [合并](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则4合并)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| list | Array<[WifiAccessInfo](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifiaccessinfo19)> | 是 | Wi-Fi禁用名单数组。数组总长度不能超过200。例如，若当前禁用名单数组中已有100个Wi-Fi，则最多支持通过该接口再添加100个。 |

**错误码**：

以下错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 9200010 | A conflict policy has been configured. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |

**示例：**



```
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.edmtest',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. try {
10. let wifiIds: Array<wifiManager.WifiAccessInfo> = [{
11. // 需根据实际情况进行替换
12. ssid: "wifi_name",
13. bssid: "68:77:24:77:A6:D8"
14. }];
15. wifiManager.addDisallowedWifiList(wantTemp, wifiIds);
16. console.info(`Succeeded in adding disallowed Wi-Fi list.`);
17. } catch (err) {
18. console.error(`Failed to add disallowed Wi-Fi list. Code: ${err.code}, message: ${err.message}`);
19. }
```

## wifiManager.removeDisallowedWifiList19+

PhonePC/2in1Tablet

removeDisallowedWifiList(admin: Want, list: Array<WifiAccessInfo>): void

移除Wi-Fi禁用名单。若移除禁用名单中的部分Wi-Fi，则当前设备不允许连接禁用名单内剩余的Wi-Fi。若移除禁用名单中的所有Wi-Fi，则当前设备可以连接任意的Wi-Fi。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**模型约束：** 此接口仅可在Stage模型下使用。

**冲突规则：** [合并](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/mdm-kit-multi-mdm#规则4合并)。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| list | Array<[WifiAccessInfo](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifiaccessinfo19)> | 是 | 待移除的Wi-Fi禁用名单数组。数组总长度不能超过200。 |

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
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.edmtest',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. try {
10. let wifiIds: Array<wifiManager.WifiAccessInfo> = [{
11. // 需根据实际情况进行替换
12. ssid: "wifi_name",
13. bssid: "68:77:24:77:A6:D8"
14. }];
15. wifiManager.removeDisallowedWifiList(wantTemp, wifiIds);
16. console.info(`Succeeded in removing disallowed Wi-Fi list.`);
17. } catch (err) {
18. console.error(`Failed to remove disallowed Wi-Fi list. Code: ${err.code}, message: ${err.message}`);
19. }
```

## wifiManager.getDisallowedWifiList19+

PhonePC/2in1Tablet

getDisallowedWifiList(admin: Want): Array<WifiAccessInfo>

获取Wi-Fi禁用名单。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

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
| Array<[WifiAccessInfo](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifiaccessinfo19)> | Wi-Fi禁用名单数组。 |

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
1. import { wifiManager } from '@kit.MDMKit';
2. import { Want } from '@kit.AbilityKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.edmtest',
7. abilityName: 'EnterpriseAdminAbility'
8. };
9. try {
10. let result: Array<wifiManager.WifiAccessInfo> = wifiManager.getDisallowedWifiList(wantTemp);
11. console.info(`Succeeded in getting disallowed Wi-Fi list. Result: ${JSON.stringify(result)}`);
12. } catch (err) {
13. console.error(`Failed to get disallowed Wi-Fi list. Code: ${err.code}, message: ${err.message}`);
14. }
```

## wifiManager.turnOnWifi20+

PhonePC/2in1Tablet

turnOnWifi(admin: Want, isForce: boolean): void

打开Wi-Fi开关。

以下情况下，通过本接口打开Wi-Fi开关，会打开失败并提示"系统功能被禁用"：

​已经通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口禁用了Wi-Fi。需通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口启用Wi-Fi，解决"系统功能被禁用"报错。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**冲突规则：** 任意MDM应用​通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口禁用了Wi-Fi，则无法通过本接口直接打开Wi-Fi开关。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |
| isForce | boolean | 是 | 是否强制打开Wi-Fi功能。  true表示强制开启Wi-Fi，强制开启后不支持用户在设备上手动关闭Wi-Fi开关，必须采用[turnOffWifi](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanagerturnoffwifi20)接口关闭。false表示非强制开启Wi-Fi，此时用户可以在设备上手动操作关闭Wi-Fi开关。 |

**错误码**：

以下的错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 203 | This function is prohibited by enterprise management policies. |

**示例：**



```
1. import { Want } from '@kit.AbilityKit';
2. import { wifiManager } from '@kit.MDMKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. wifiManager.turnOnWifi(wantTemp, true);
12. console.info(`Succeeded in turning on Wi-Fi.`);
13. } catch (err) {
14. console.error(`Failed to turn on Wi-Fi. Code: ${err.code}, message: ${err.message}`);
15. }
```

## wifiManager.turnOffWifi20+

PhonePC/2in1Tablet

turnOffWifi(admin: Want): void

关闭Wi-Fi开关。

以下情况下，通过本接口关闭Wi-Fi开关，会提示"系统功能被禁用"：

​已经通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口禁用了Wi-Fi。需通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口启用Wi-Fi，解决"系统功能被禁用"报错。

**需要权限：** ohos.permission.ENTERPRISE\_MANAGE\_WIFI

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

**冲突规则：** 任意MDM应用通过[setDisallowedPolicy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-restrictions#restrictionssetdisallowedpolicy)接口禁用了Wi-Fi，则无法通过本接口直接关闭Wi-Fi开关。

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| admin | [Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-want) | 是 | 企业设备管理扩展组件。Want中必须包含企业设备管理扩展能力的abilityName和所在应用的bundleName。 |

**错误码**：

以下的错误码的详细介绍请参见[企业设备管理错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-enterprisedevicemanager)和[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 9200001 | The application is not an administrator application of the device. |
| 9200002 | The administrator application does not have permission to manage the device. |
| 201 | Permission verification failed. The application does not have the permission required to call the API. |
| 203 | This function is prohibited by enterprise management policies. |

**示例：**



```
1. import { Want } from '@kit.AbilityKit';
2. import { wifiManager } from '@kit.MDMKit';

4. let wantTemp: Want = {
5. // 需根据实际情况进行替换
6. bundleName: 'com.example.myapplication',
7. abilityName: 'EnterpriseAdminAbility'
8. };

10. try {
11. wifiManager.turnOffWifi(wantTemp);
12. console.info(`Succeeded in turning off Wi-Fi.`);
13. } catch (err) {
14. console.error(`Failed to turn off Wi-Fi. Code: ${err.code}, message: ${err.message}`);
15. }
```

## WifiAccessInfo19+

PhonePC/2in1Tablet

Wi-Fi的SSID和BSSID信息。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| ssid | string | 否 | 否 | Wi-Fi热点名称，编码格式为UTF-8，最大长度为32字节（中文字符占3位，英文字符占1位）。 |
| bssid | string | 否 | 是 | Wi-Fi热点的MAC地址，例如：00:11:22:33:44:55。获取方式如下：打开设置应用-点击系统选项-点击开发者选项-开启WLAN详细日志记录开关，然后进入设置应用中的WLAN列表，查看显示的MAC地址。若一个Wi-Fi对应多个MAC地址，需添加所有MAC地址。  作为[addDisallowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanageradddisallowedwifilist19)和[removeDisallowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanagerremovedisallowedwifilist19)接口的入参时，该属性可选，默认值为空字符串。  作为[addAllowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanageraddallowedwifilist19)和[removeAllowedWifiList](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifimanagerremoveallowedwifilist19)接口入参时，从API version 21开始，该属性可选，默认值为空字符串。API version 20及之前的版本，该属性必填。 |

## WifiProfile

PhonePC/2in1Tablet

Wi-Fi配置信息。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| ssid | string | 否 | 否 | Wi-Fi热点名称，最大长度为32字节，编码格式为UTF-8。 |
| bssid | string | 否 | 是 | Wi-Fi热点的MAC地址，长度6个字节，例如：00:11:22:33:44:55。获取方式如下：打开设置应用-点击系统选项-点击开发者选项-开启WLAN详细日志记录开关，然后进入设置应用中的WLAN列表，查看显示的MAC地址。若一个Wi-Fi对应多个MAC地址，需添加所有MAC地址。 |
| preSharedKey | string | 否 | 否 | 热点的密钥，最大长度为64字节。 |
| isHiddenSsid | boolean | 否 | 是 | 是否是隐藏网络。true表示是隐藏网络，false表示不是隐藏网络，默认为false。 |
| securityType | [WifiSecurityType](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifisecuritytype) | 否 | 否 | 安全类型。 |
| creatorUid | number | 否 | 是 | 创建用户的ID，默认值-1。 |
| disableReason | number | 否 | 是 | 禁用原因，默认值0。 |
| netId | number | 否 | 是 | 分配的网络ID，默认值-1。 |
| randomMacType | number | 否 | 是 | 随机MAC类型。0-随机MAC地址， 1-设备MAC地址，默认值0。 |
| randomMacAddr | string | 否 | 是 | MAC地址。randomMacType为设备MAC类型时，该字段必填。 |
| ipType | [IpType](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#iptype) | 否 | 是 | IP地址类型，默认值DHCP。 |
| staticIp | [IpProfile](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#ipprofile) | 否 | 是 | 静态IP配置信息。ipType为STATIC时，该字段必填。 |
| eapProfile | [WifiEapProfile](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#wifieapprofile) | 否 | 是 | 可扩展身份验证协议配置。只有securityType为WIFI\_SEC\_TYPE\_EAP时必填。 |

## WifiSecurityType

PhonePC/2in1Tablet

表示加密类型的枚举。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| WIFI\_SEC\_TYPE\_INVALID | 0 | 无效加密类型。例如机场公共Wi-Fi。 |
| WIFI\_SEC\_TYPE\_OPEN | 1 | 开放加密类型。 |
| WIFI\_SEC\_TYPE\_WEP | 2 | Wired Equivalent Privacy (WEP)加密类型。 |
| WIFI\_SEC\_TYPE\_PSK | 3 | Pre-shared key (PSK)加密类型。 例如家庭、小型办公室Wi-Fi。 |
| WIFI\_SEC\_TYPE\_SAE | 4 | Simultaneous Authentication of Equals (SAE)加密类型。例如智能家居、中小型企业网络。 |
| WIFI\_SEC\_TYPE\_EAP | 5 | EAP加密类型。例如大型企业认证、大学校园网络等。 |
| WIFI\_SEC\_TYPE\_EAP\_SUITE\_B | 6 | Suite-B 192位加密类型。例如政府和高安全机构。 |
| WIFI\_SEC\_TYPE\_OWE | 7 | 机会性无线加密类型。例如咖啡馆的公共Wi-Fi，无需密码为连接提供加密。 |
| WIFI\_SEC\_TYPE\_WAPI\_CERT | 8 | WAPI-Cert加密类型。中国自主的无线安全标准。 |
| WIFI\_SEC\_TYPE\_WAPI\_PSK | 9 | WAPI-PSK加密类型。 |

## IpType

PhonePC/2in1Tablet

表示IP类型的枚举。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| STATIC | 0 | 静态IP，一般用于需要固定IP的场景、例如办公室打印机，固定打印机IP地址，便于大家稳定地添加和使用。 |
| DHCP | 1 | 动态主机配置协议，一种能自动为网络中的设备分配IP地址和其他网络配置信息的服务。 |
| UNKNOWN | 2 | 未指定。 |

## IpProfile

PhonePC/2in1Tablet

IP配置信息。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| ipAddress | number | 否 | 否 | IP地址，十进制表示，正常点分十进制写法为192.168.1.1，对应的十进制为3232235777。地址值范围0.0.0.0到255.255.255.255。 |
| gateway | number | 否 | 否 | 默认网关，十进制表示，通常是路由器的IP地址。地址值范围0.0.0.0到255.255.255.255。 |
| prefixLength | number | 否 | 否 | 子网掩码。地址值范围0.0.0.0到255.255.255.255。 |
| dnsServers | number[] | 否 | 否 | DNS服务器，数组内最多包含首选DNS服务器和备用DNS服务器两个地址。地址值范围0.0.0.0到255.255.255.255。 |
| domains | Array<string> | 否 | 否 | 域信息。 |

## WifiEapProfile

PhonePC/2in1Tablet

可扩展身份验证协议配置信息。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 类型 | 只读 | 可选 | 说明 |
| --- | --- | --- | --- | --- |
| eapMethod | [EapMethod](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#eapmethod) | 否 | 否 | EAP认证方式。 |
| phase2Method | [Phase2Method](/consumer/cn/doc/harmonyos-references/js-apis-enterprise-wifimanager#phase2method) | 否 | 否 | 第二阶段认证方式。只有eapMethod为EAP\_PEAP或EAP\_TTLS时需要填写。 |
| identity | string | 否 | 否 | 身份信息。当eapMethod为TLS时，该字段不能为空。 |
| anonymousIdentity | string | 否 | 否 | 匿名身份。 |
| password | string | 否 | 否 | 密码。当eapMethod为EAP\_PEAP或EAP\_PWD时，该字段不能为空串，最大长度为128字节。 |
| caCertAliases | string | 否 | 否 | CA 证书别名。 |
| caPath | string | 否 | 否 | CA 证书路径。 |
| clientCertAliases | string | 否 | 否 | 客户端证书别名。当客户端证书内容为空时，客户端证书需先调用证书管理接口安装后传入别名。 |
| certEntry | Uint8Array | 否 | 否 | 客户端证书内容。当eapMethod为EAP\_TLS时，如果该字段为空，则客户端证书别名不能为空。 |
| certPassword | string | 否 | 否 | CA证书密码。 |
| altSubjectMatch | string | 否 | 否 | 替代主题匹配。证书验证中，除了检查证书主域名，还检查证书的主题备用名称是否匹配。 |
| domainSuffixMatch | string | 否 | 否 | 域后缀匹配。 |
| realm | string | 否 | 否 | 通行证凭证的领域。 |
| plmn | string | 否 | 否 | 凭证提供商。 |
| eapSubId | number | 否 | 否 | SIM卡的子ID。 |

## EapMethod

PhonePC/2in1Tablet

表示EAP认证方式的枚举。

说明

当前仅支持使用EAP\_PEAP、EAP\_TLS两种认证方式，其他暂不支持。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| EAP\_NONE | 0 | 不指定。 |
| EAP\_PEAP | 1 | PEAP类型，受保护的可扩展认证协议。先建立安全的TLS隧道、然后进行简单认证。 |
| EAP\_TLS | 2 | TLS类型，传输层安全协议。双向证书认证。 |
| EAP\_TTLS | 3 | TTLS类型，隧道传输层安全协议。与PEAP类似，但后续隧道内部认证方法更加丰富。 |
| EAP\_PWD | 4 | PWD类型，密码认证。无需服务器证书。 |
| EAP\_SIM | 5 | SIM类型，使用手机SIM卡中的密钥和算法进行认证。 |
| EAP\_AKA | 6 | AKA类型，使用USIM卡（3G/4G/5G SIM卡）中的增强密钥和算法进行认证。 |
| EAP\_AKA\_PRIME | 7 | AKA Prime类型，EAP-AKA增强版，在密钥派生中绑定网络名称。 |
| EAP\_UNAUTH\_TLS | 8 | UNAUTH TLS类型，单向认证（仅认证客户端）和加密通道。 |

## Phase2Method

PhonePC/2in1Tablet

表示第二阶段认证方式的枚举。

**系统能力：** SystemCapability.Customization.EnterpriseDeviceManager

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| PHASE2\_NONE | 0 | 不指定。 |
| PHASE2\_PAP | 1 | PAP类型。 |
| PHASE2\_MSCHAP | 2 | MSCHAP类型。 |
| PHASE2\_MSCHAPV2 | 3 | MSCHAPV2类型。 |
| PHASE2\_GTC | 4 | GTC类型。 |
| PHASE2\_SIM | 5 | SIM类型。 |
| PHASE2\_AKA | 6 | AKA类型。 |
| PHASE2\_AKA\_PRIME | 7 | AKA Prime类型。 |