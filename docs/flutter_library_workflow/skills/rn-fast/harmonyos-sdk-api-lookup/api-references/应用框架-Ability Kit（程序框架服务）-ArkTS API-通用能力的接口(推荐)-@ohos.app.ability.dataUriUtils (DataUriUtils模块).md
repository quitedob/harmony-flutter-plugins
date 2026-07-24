DataUriUtils模块提供用于处理uri对象的能力，包括获取、绑定、删除和更新指定uri对象的路径末尾的ID。

说明

本模块首批接口从API version 9开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { dataUriUtils } from '@kit.AbilityKit';
```

## dataUriUtils.getId

PhonePC/2in1TabletTVWearable

getId(uri: string): number

获取指定uri路径末尾的ID。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| uri | string | 是 | 表示uri对象。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| number | 返回uri路径末尾的ID。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { dataUriUtils } from '@kit.AbilityKit';

3. try {
4. let id = dataUriUtils.getId('com.example.dataUriUtils/1221');
5. console.info(`get id: ${id}`);
6. } catch(err) {
7. console.error(`get id err ,check the uri ${err}`);
8. }
```

## dataUriUtils.attachId

PhonePC/2in1TabletTVWearable

attachId(uri: string, id: number): string

将ID附加到uri的路径末尾。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| uri | string | 是 | 表示uri对象。 |
| id | number | 是 | 表示要附加的ID。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回附加ID之后的uri对象。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { dataUriUtils } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. let id = 1122;
5. try {
6. let uri = dataUriUtils.attachId(
7. 'com.example.dataUriUtils',
8. id,
9. );
10. console.info(`attachId the uri is: ${uri}`);
11. } catch (err) {
12. console.error(`get id err, code: ${JSON.stringify((err as BusinessError).code)}, msg: ${JSON.stringify((err as BusinessError).message)}`);
13. }
```

## dataUriUtils.deleteId

PhonePC/2in1TabletTVWearable

deleteId(uri: string): string

删除指定uri路径末尾的ID。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| uri | string | 是 | 表示要从中删除ID的uri对象。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回删除ID之后的uri对象。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { dataUriUtils } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. try {
5. let uri = dataUriUtils.deleteId('com.example.dataUriUtils/1221');
6. console.info(`delete id with the uri is: ${uri}`);
7. } catch(err) {
8. console.error(`delete id err, code: ${JSON.stringify((err as BusinessError).code)}, msg: ${JSON.stringify((err as BusinessError).message)}`);
9. }
```

## dataUriUtils.updateId

PhonePC/2in1TabletTVWearable

updateId(uri: string, id: number): string

更新指定uri中的ID。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**参数：**

展开

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| uri | string | 是 | 表示uri对象 |
| id | number | 是 | 表示要更新的ID |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回更新ID之后的uri对象。 |

**错误码**：

以下错误码详细介绍请参考[通用错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-universal)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| 401 | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types; 3. Parameter verification failed. |

**示例：**



```
1. import { dataUriUtils } from '@kit.AbilityKit';
2. import { BusinessError } from '@kit.BasicServicesKit';

4. try {
5. let id = 1122;
6. let uri = dataUriUtils.updateId(
7. 'com.example.dataUriUtils/1221',
8. id
9. );
10. } catch (err) {
11. console.error(`update id err, code: ${JSON.stringify((err as BusinessError).code)}, msg: ${JSON.stringify((err as BusinessError).message)}`);
12. }
```