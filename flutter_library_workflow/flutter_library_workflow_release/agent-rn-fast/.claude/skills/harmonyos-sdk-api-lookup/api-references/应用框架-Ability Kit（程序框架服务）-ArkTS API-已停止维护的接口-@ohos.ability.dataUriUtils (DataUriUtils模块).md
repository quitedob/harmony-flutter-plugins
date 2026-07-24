DataUriUtils模块提供用于处理uri对象的能力，包括获取、绑定、删除和更新指定uri对象的路径末尾的ID。

说明

本模块首批接口从API version 7开始支持，从API version 9废弃，替换模块为[@ohos.app.ability.dataUriUtils](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-datauriutils)。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import dataUriUtils from '@ohos.ability.dataUriUtils';
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

**示例：**



```
1. import dataUriUtils from '@ohos.ability.dataUriUtils';

3. let id = dataUriUtils.getId('com.example.dataUriUtils/1221');
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

**示例：**



```
1. import dataUriUtils from '@ohos.ability.dataUriUtils';

3. let id = 1122;
4. let uri = dataUriUtils.attachId(
5. 'com.example.dataUriUtils',
6. id,
7. );
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

**示例：**



```
1. import dataUriUtils from '@ohos.ability.dataUriUtils';

3. let uri = dataUriUtils.deleteId('com.example.dataUriUtils/1221');
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
| uri | string | 是 | 表示uri对象。 |
| id | number | 是 | 表示要更新的ID。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| string | 返回更新ID之后的uri对象。 |

**示例：**



```
1. import dataUriUtils from '@ohos.ability.dataUriUtils';

3. let id = 1122;
4. let uri = dataUriUtils.updateId(
5. 'com.example.dataUriUtils/1221',
6. id
7. );
```