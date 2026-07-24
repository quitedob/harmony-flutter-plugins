IFAA提供移动端免密身份认证能力，实现接入IIFAA（互联网可信认证联盟）的业务免密登录，免密支付等业务场景（注：IFAA在本文中指HarmonyOS系统免密认证模块，IIFAA在本文中指联盟及相关技术规范）。

支持的设备类型为：Phone, PC/2in1, Tablet

**起始版本：** 4.1.0(11)

## 导入模块

PhonePC/2in1Tablet



```
1. import { ifaa } from '@kit.OnlineAuthenticationKit';
```

## getVersionSync

PhonePC/2in1Tablet

getVersionSync(): number

该接口用于获取IFAA免密认证接口的版本号，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 返回IFAA免密认证的接口版本号。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Device type error. |

**示例：**



```
1. let res: number = ifaa.getVersionSync();
2. console.info('Succeeded in doing getVersionSync. version:', result);
3. // 开发者处理res
```

## getAnonymousIdSync

PhonePC/2in1Tablet

getAnonymousIdSync(userToken: Uint8Array): Uint8Array

该接口用于获取IFAA免密认证的匿名化ID，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| userToken | Uint8Array | 是 | 唯一标识用户的id。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Uint8Array | 返回IFAA免密认证的匿名化ID。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；此处arg需要开发者替换为真实入参。
2. let arg = new Uint8Array([0]);
3. let getAnonIdResult: Uint8Array = ifaa.getAnonymousIdSync(arg);
4. console.info('Succeeded in doing getAnonymousIdSync. anonymousId:', result);
5. // 开发者处理getAnonIdResult ....
```

## getAnonymousId

PhonePC/2in1Tablet

getAnonymousId(userToken: Uint8Array): Promise<Uint8Array>

该接口用于获取IFAA免密认证的匿名化ID，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| userToken | Uint8Array | 是 | 唯一标识用户的id。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Uint8Array> | Promise对象，返回匿名化ID。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；此处arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. let getAnonIdPromise: Promise<Uint8Array> = ifaa.getAnonymousId(arg);
6. getAnonIdPromise.then(result => {
7. console.info('Succeeded in doing getAnonymousId. anonymousId:', result);
8. // 开发者处理result
9. }).catch((err: BusinessError) => {
10. console.error(`Failed to call getAnonymousId. Code: ${err.code}, message: ${err.message}`);
11. });
```

## getAnonymousId

PhonePC/2in1Tablet

getAnonymousId(userToken: Uint8Array, callback: AsyncCallback<Uint8Array>): void

该接口用于获取IFAA免密认证的匿名化ID，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| userToken | Uint8Array | 是 | 唯一标识用户的id。 |
| callback | AsyncCallback<Uint8Array> | 是 | 回调函数，用于获取返回数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；此处arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. ifaa.getAnonymousId(arg,
6. (err: BusinessError, result: Uint8Array) => {
7. if (err) {
8. console.error(`Failed to call getAnonymousId. Code: ${err.code}, message: ${err.message}`);
9. } else {
10. console.info('Succeeded in doing getAnonymousId. anonymousId:', result);
11. // 开发者处理result
12. }
13. });
```

## queryStatusSync

PhonePC/2in1Tablet

queryStatusSync(userToken: Uint8Array): boolean

该接口用于查询IFAA免密认证的开通状态，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| userToken | Uint8Array | 是 | 唯一标识用户的id。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| boolean | 返回IFAA免密认证的开通状态。true代表已开通，false代表未开通。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；此处arg需要开发者替换为真实入参。
2. let arg = new Uint8Array([0]);
3. let status: boolean = ifaa.queryStatusSync(arg);
4. if (status) {
5. console.info('ifaa registered');
6. } else {
7. console.info('ifaa deregistered');
8. }
```

## queryStatus

PhonePC/2in1Tablet

queryStatus(userToken: Uint8Array): Promise<boolean>

该接口用于查询IFAA免密认证的开通状态，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| userToken | Uint8Array | 是 | 唯一标识用户的id。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<boolean> | Promise对象，true代表已开通，false代表未开通。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. let promise: Promise<boolean> = ifaa.queryStatus(arg);
6. promise.then(result => {
7. console.info('Succeeded in doing queryStatus. status:', result);
8. // 开发者处理result
9. }).catch((err: BusinessError) => {
10. console.error(`Failed to call queryStatus. Code: ${err.code}, message: ${err.message}`);
11. });
```

## queryStatus

PhonePC/2in1Tablet

queryStatus(userToken: Uint8Array, callback: AsyncCallback<boolean>): void

该接口用于查询IFAA免密认证的开通状态，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| userToken | Uint8Array | 是 | 唯一标识用户的id。 |
| callback | AsyncCallback<boolean> | 是 | 回调函数，用于获取开通状态，true代表已开通，false代表未开通。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；此处arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. ifaa.queryStatus(arg,
6. (err: BusinessError, result: boolean) => {
7. if (err) {
8. console.error(`Failed to call queryStatus. Code: ${err.code}, message: ${err.message}`);
9. } else {
10. console.info('Succeeded in doing queryStatus. status:', result);
11. // 开发者处理result
12. }
13. });
```

## register

PhonePC/2in1Tablet

register(registerData: Uint8Array): Promise<Uint8Array>

该接口用于开通IFAA免密认证，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| registerData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的开通数据。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Uint8Array> | Promise对象，返回开通数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. let registerPromise: Promise<Uint8Array> = ifaa.register(arg);
6. registerPromise.then(registerResult => {
7. console.info('Succeeded in doing register. registerResult:', registerResult);
8. // 开发者处理registerResult
9. }).catch((err: BusinessError) =>{
10. console.error(`Failed to call register. Code: ${err.code}, message: ${err.message}`);
11. });
```

## register

PhonePC/2in1Tablet

register(registerData: Uint8Array, callback: AsyncCallback<Uint8Array>): void

该接口用于开通IFAA免密认证，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| registerData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的开通数据。 |
| callback | AsyncCallback<Uint8Array> | 是 | 回调函数，用于获取返回数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；此处arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. ifaa.register(arg, (err: BusinessError, registerResult: Uint8Array) => {
6. if (err) {
7. console.error(`Failed to call register. Code: ${err.code}, message: ${err.message}`);
8. } else {
9. console.info('Succeeded in doing register. registerResult:', registerResult);
10. // 开发者处理registerResult ....
11. }
12. });
```

## preAuthSync

PhonePC/2in1Tablet

preAuthSync(): Uint8Array

该接口用于获取IFAA免密认证的预认证参数，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Uint8Array | 返回IFAA免密认证的预认证参数，其中存在用于后续进行生物认证时所需的挑战值（challenge）。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. let preAuthResult: Uint8Array = ifaa.preAuthSync();
2. console.info('Succeeded in doing preAuthSync. preAuthResult:', preAuthResult);
3. // 开发者处理preAuthResult
```

## preAuth

PhonePC/2in1Tablet

preAuth(): Promise<Uint8Array>

该接口用于获取IFAA免密认证的预认证参数，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Uint8Array> | Promise对象，返回预认证数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. let preAuthPromise: Promise<Uint8Array> = ifaa.preAuth();
4. preAuthPromise.then(preAuthResult => {
5. console.info('Succeeded in doing preAuth. preAuthResult:', preAuthResult);
6. // 开发者处理preAuthResult ....
7. }).catch((err: BusinessError) =>{
8. console.error(`Failed to call preAuth. Code: ${err.code}, message: ${err.message}`);
9. });
```

## preAuth

PhonePC/2in1Tablet

preAuth(callback: AsyncCallback<Uint8Array>): void

该接口用于获取IFAA免密认证的预认证参数，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | AsyncCallback<Uint8Array> | 是 | 回调函数，用于获取返回预认证数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. ifaa.preAuth(
4. (err: BusinessError, preAuthResult:Uint8Array) => {
5. if (err) {
6. console.error(`Failed to call preAuth. Code: ${err.code}, message: ${err.message}`);
7. } else {
8. console.info('Succeeded in doing preAuth. preAuthResult:', preAuthResult);
9. // 开发者处理preAuthResult..
10. }
11. });
```

## authSync

PhonePC/2in1Tablet

authSync(authToken: Uint8Array, authData: Uint8Array): Uint8Array

该接口用于IFAA免密认证，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| authToken | Uint8Array | 是 | 用户身份认证通过的凭证（通过用户认证模块可获取，调用@ohos.userIAM.userAuth的getUserAuthInstance）。 |
| authData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的认证数据。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Uint8Array | 返回TLV格式的认证结果。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. // 开发者调用@ohos.userIAM.userAuth的getUserAuthInstance获取token；token需要开发者替换为真实入参。
2. let token = new Uint8Array([0]);
3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. let authResult: Uint8Array = ifaa.authSync(token, arg);
6. console.info('Succeeded in doing authSync. authResult:', authResult);
7. // 开发者处理authResult ....
```

## auth

PhonePC/2in1Tablet

auth(authToken: Uint8Array, authData: Uint8Array): Promise<Uint8Array>

该接口用于IFAA免密认证，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| authToken | Uint8Array | 是 | 用户身份认证通过的凭证（通过用户认证模块可获取，调用@ohos.userIAM.userAuth的getUserAuthInstance）。 |
| authData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的认证数据。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Uint8Array> | Promise对象，返回TLV格式的认证结果。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者调用@ohos.userIAM.userAuth的getUserAuthInstance获取token；token需要开发者替换为真实入参。
4. let token = new Uint8Array([0]);
5. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；arg需要开发者替换为真实入参。
6. let arg = new Uint8Array([0]);
7. let authPromise: Promise<Uint8Array> = ifaa.auth(token, arg);
8. authPromise.then(authResult => {
9. console.info('Succeeded in doing auth. authResult:', authResult);
10. // 开发者处理authResult ....
11. }).catch((err: BusinessError) =>{
12. console.error(`Failed to call auth. Code: ${err.code}, message: ${err.message}`);
13. });
```

## auth

PhonePC/2in1Tablet

auth(authToken: Uint8Array, authData: Uint8Array, callback: AsyncCallback<Uint8Array>): void

该接口用于IFAA免密认证，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| authToken | Uint8Array | 是 | 用户身份认证通过的凭证（通过用户认证模块可获取，调用@ohos.userIAM.userAuth的getUserAuthInstance）。 |
| authData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的认证数据。 |
| callback | AsyncCallback<Uint8Array> | 是 | 回调函数，用于获取返回数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者调用@ohos.userIAM.userAuth的getUserAuthInstance获取token；token需要开发者替换为真实入参。
4. let token = new Uint8Array([0]);
5. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；arg需要开发者替换为真实入参。
6. let arg = new Uint8Array([0]);
7. ifaa.auth(token, arg,
8. (err: BusinessError, authResult: Uint8Array) => {
9. if (err) {
10. console.error(`Failed to call auth. Code: ${err.code}, message: ${err.message}`);
11. } else {
12. console.info('Succeeded in doing auth. authResult:', authResult);
13. // 开发者处理authResult ....
14. }
15. });
```

## deregisterSync

PhonePC/2in1Tablet

deregisterSync(deregisterData: Uint8Array): void

该接口用于关闭IFAA免密认证，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| deregisterData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的关闭数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；arg需要开发者替换为真实入参。
2. let arg = new Uint8Array([0]);
3. ifaa.deregisterSync(arg);
```

## deregister

PhonePC/2in1Tablet

deregister(deregisterData: Uint8Array): Promise<void>

该接口用于关闭IFAA免密认证，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| deregisterData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的关闭数据。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<void> | Promise对象，无返回结果的Promise对象。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. let promise: Promise<void> = ifaa.deregister(arg);
6. promise.then(()=> {
7. console.info('Succeeded in doing deregister.');
8. }).catch((err: BusinessError) => {
9. console.error(`Failed to call deregister. Code: ${err.code}, message: ${err.message}`);
10. });
```

## deregister

PhonePC/2in1Tablet

deregister(deregisterData: Uint8Array, callback: AsyncCallback<void>): void

该接口用于关闭IFAA免密认证，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| deregisterData | Uint8Array | 是 | IIFAA服务器下发的TLV格式的关闭数据。 |
| callback | AsyncCallback<void> | 是 | 回调函数。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. // 开发者需要按照IIFAA的TLV格式构造入参，并转换为Uint8Array参数；此处arg需要开发者替换为真实入参。
4. let arg = new Uint8Array([0]);
5. ifaa.deregister(arg,
6. (err: BusinessError) => {
7. if (err) {
8. console.error(`Failed to call deregister. Code: ${err.code}, message: ${err.message}`);
9. } else {
10. console.info('Succeeded in doing deregister.');
11. }
12. });
```

## getProtocolVersionSync

PhonePC/2in1Tablet

getProtocolVersionSync(): Uint8Array

该接口用于获取IFAA免密认证的协议版本号，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Uint8Array | 返回IFAA免密认证的协议版本号。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. let res: Uint8Array = ifaa.getProtocolVersionSync();
```

## getProtocolVersion

PhonePC/2in1Tablet

getProtocolVersion(): Promise<Uint8Array>

该接口用于获取IFAA免密认证的协议版本号，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Uint8Array> | Promise对象，返回协议版本号。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. let promise: Promise<Uint8Array> = ifaa.getProtocolVersion();
4. promise.then(result => {
5. console.info('Succeeded in doing getProtocolVersion. protocolVersion:', result);
6. // 开发者处理result
7. }).catch((err: BusinessError) => {
8. console.error(`Failed to call getProtocolVersion. Code: ${err.code}, message: ${err.message}`);
9. });
```

## getProtocolVersion

PhonePC/2in1Tablet

getProtocolVersion(callback: AsyncCallback<Uint8Array>): void

该接口用于获取IFAA免密认证的协议版本号，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | AsyncCallback<Uint8Array> | 是 | 回调函数，用于获取返回数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. ifaa.getProtocolVersion(
4. (err: BusinessError, result: Uint8Array) => {
5. if (err) {
6. console.error(`Failed to call getProtocolVersion. Code: ${err.code}, message: ${err.message}`);
7. } else {
8. console.info('Succeeded in doing getProtocolVersion. protocolVersion:', result);
9. // 开发者处理result
10. }
11. });
```

## getSupportedCertTypesSync

PhonePC/2in1Tablet

getSupportedCertTypesSync(): Uint8Array

该接口用于获取IFAA免密认证支持的证书格式，同步返回结果。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Uint8Array | 返回IFAA免密认证支持的证书格式。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. let result: Uint8Array = ifaa.getSupportedCertTypesSync();
2. console.info('Succeeded in doing getSupportedCertTypesSync. supportedCertTypes:', result);
3. // 开发者处理result
```

## getSupportedCertTypes

PhonePC/2in1Tablet

getSupportedCertTypes(): Promise<Uint8Array>

该接口用于获取IFAA免密认证支持的证书格式，使用Promise异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| Promise<Uint8Array> | Promise对象，返回支持的证书格式。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. let promise: Promise<Uint8Array> = ifaa.getSupportedCertTypes();
4. promise.then(result => {
5. console.info('Succeeded in doing getSupportedCertTypes. supportedCertTypes:', result);
6. // 开发者处理result
7. }).catch((err: BusinessError) => {
8. console.error(`Failed to call getSupportedCertTypes. Code: ${err.code}, message: ${err.message}`);
9. });
```

## getSupportedCertTypes

PhonePC/2in1Tablet

getSupportedCertTypes(callback: AsyncCallback<Uint8Array>): void

该接口用于获取IFAA免密认证支持的证书格式，使用Callback异步回调。

**元服务API：** 从版本5.0.0(12)开始，该接口支持在元服务中使用。

**系统能力：** SystemCapability.Security.Ifaa

**起始版本：** 4.1.0(11)

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| callback | AsyncCallback<Uint8Array> | 是 | 回调函数，用于获取返回数据。 |

**错误码：**

以下错误码的详细介绍请参见[IFAA免密认证错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/onlineauthentication-error-code-ifaa)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. |
| 801 | Device type error. |
| 1006100001 | System Interruption. |
| 1006100002 | The service is abnormal. |

**示例：**



```
1. import { BusinessError } from '@kit.BasicServicesKit';

3. ifaa.getSupportedCertTypes(
4. (err: BusinessError, result: Uint8Array) => {
5. if (err) {
6. console.error(`Failed to call getSupportedCertTypes. Code: ${err.code}, message: ${err.message}`);
7. } else {
8. console.info('Succeeded in doing getSupportedCertTypes. supportedCertTypes:', result);
9. // 开发者处理result
10. }
11. });
```