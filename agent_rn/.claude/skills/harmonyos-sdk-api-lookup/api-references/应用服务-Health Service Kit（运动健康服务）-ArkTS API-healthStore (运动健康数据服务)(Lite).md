本模块提供运动健康数据服务。

**起始版本：** 6.1.1(24)

## 导入模块

Lite Wearable



```
1. import healthStore from '@hms.health.store';
```

## AuthorizationBase

Lite Wearable

授权信息基类。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| readDataTypes | [DataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype)[] | 否 | 否 | 读数据类型。 |
| writeDataTypes | [DataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype)[] | 否 | 否 | 写数据类型。 |

## AuthorizationRequest

Lite Wearable

授权请求参数类型，继承[AuthorizationBase](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#authorizationbase)。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| readDataTypes | [DataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype)[] | 否 | 否 | 读数据类型。 |
| writeDataTypes | [DataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype)[] | 否 | 否 | 写数据类型。 |
| scopes | string[] | 否 | 是 | 非数据类型权限，使用scope授权，请参见[OAuth权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-cloudsync#oauth权限)，若未填写，默认为空。 |

## AuthorizationResponse

Lite Wearable

授权响应返回类型，继承[AuthorizationBase](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#authorizationbase)。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| readDataTypes | [DataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype)[] | 否 | 否 | 授权成功的读数据类型，其对应权限在[应用申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)和用户授权权限的交集中。 |
| writeDataTypes | [DataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype)[] | 否 | 否 | 授权成功的写数据类型，其对应权限在[应用申请权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-apply)和用户授权权限的交集中。 |
| scopes | string[] | 否 | 是 | 非数据类型权限，使用scope授权，请参见[OAuth权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/health-cloudsync#oauth权限)，若未填写，默认为空。 |

## DataReadRequest

Lite Wearable

读取请求参数基类，继承[DataRequest](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datarequest)。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| count | number | 否 | 是 | 读取数据的条数，若未填写，默认为无条数限制。  取值范围：[1, ∞) |
| offset | number | 否 | 是 | 相对于当前位置的偏移，若未填写，默认为0，无偏移。 |
| sortOrder | [SortOrder](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sortorder) | 否 | 是 | 排序顺序，若未填写，默认为升序。 |

## DataRequest

Lite Wearable

请求参数基类。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| startLocalDate | string | 否 | 否 | 数据的开始本地日期，格式'MM/DD/YYYY'。 |
| endLocalDate | string | 否 | 否 | 数据的结束本地日期，格式'MM/DD/YYYY'。 |
| startTime | number | 否 | 否 | 请求的开始时间，Unix时间戳，以毫秒为单位。  取值范围：(0, ∞) |
| endTime | number | 否 | 否 | 请求的结束时间，Unix时间戳，以毫秒为单位。  取值范围：(0, ∞) |
| dataSourceOptions | [DataSourceOptions](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datasourceoptions) | 否 | 是 | 请求关联的数据源信息，若未填写，默认为无数据源限制。 |

## DataSourceOptions

Lite Wearable

数据源选项类，用于查询和删除。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| dataSourceId | string | 否 | 是 | 数据源的标识，由平台生成，无法更改，若未填写，默认为空。 |
| deviceUniqueId | string | 否 | 是 | 设备的UniqueId，若未填写，默认为空。 |
| appBundleName | string | 否 | 是 | 应用包名，若未填写，默认为空。 |
| appId | string | 否 | 是 | 应用的OAuth 2.0客户端ID(client\_id)，若未填写，默认为空。 |

## DataType

Lite Wearable

定义数据类型的类，每个数据类型字段都有唯一的id来标识。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| id | number | 是 | 否 | 数据类型唯一标识值。 |
| name | string | 是 | 是 | 数据类型的名称，若未填写，默认匹配id对应的名称。 |

## ExerciseSequence

Lite Wearable

ExerciseSequence<K extends Record<string, [ExerciseSummary](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#exercisesummary)> = Record<string, [ExerciseSummary](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#exercisesummary)>,DK extends Record<string, [SequencePoint](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sequencepoint)[]> = Record<string, [SequencePoint](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sequencepoint)[]>>

锻炼记录数据类，继承[SampleDataBase](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sampledatabase)。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| exerciseType | [SubDataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#subdatatype) | 否 | 否 | 锻炼记录子数据类型。 |
| duration | number | 否 | 是 | 锻炼时长，单位毫秒，若未填写，默认为结束时间减去开始时间。  取值范围：(0, ∞) |
| summaries | Pick<K, keyof K> | 否 | 否 | 统计数据，锻炼记录关联的统计数据类型参考[exerciseSequenceHelper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper)定义的模型。 |
| details | Pick<DK, keyof DK> | 否 | 是 | 详情数据，锻炼记录关联的详情数据类型参考[exerciseSequenceHelper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper)定义的模型，若未填写，默认为空。 |

## ExerciseSequenceReadRequest

Lite Wearable

ExerciseSequenceReadRequest<DK extends Record<string, [SequencePoint](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sequencepoint)[]> = Record<string, [SequencePoint](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sequencepoint)[]>>

读取锻炼记录请求类，继承Omit<[DataReadRequest](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datareadrequest), 'startLocalDate' | 'endLocalDate'>。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| exerciseType | [SubDataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#subdatatype) | [SubDataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#subdatatype)[] | null | 否 | 否 | 锻炼记录子数据类型，为空时查询所有类型。 |
| readOptions | [SequenceReadOptions](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sequencereadoptions)<DK> | 否 | 是 | 详情数据选项，若未填写，默认为不查询详情数据。 |

## ExerciseSummary

Lite Wearable

锻炼记录统计数据类。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| [P: string] | [HealthValueType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#healthvaluetype) | [PaceValueType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#pacevaluetype) | 否 | 否 | 统计数据字段。 |

## HealthValueType

Lite Wearable

type HealthValueType = number | string | boolean | undefined

运动健康数据值类型。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| number | 表示值类型为数字，可取任意值。 |
| string | 表示值类型为字符串，可取任意值。 |
| boolean | 表示值类型为布尔类型，可取true或false，具体含义以实际使用场景为准。 |
| undefined | 表示值类型为undefined，取值为空。 |

## PaceValueType

Lite Wearable

type PaceValueType = Record<string, number>

配速数据类型。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| Record<string, number> | 配速数据字段。 |

## SampleDataBase

Lite Wearable

健康数据基类。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| dataType | [DataType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype) | 否 | 否 | 数据类型。 |
| dataSourceId | string | 否 | 否 | 数据源唯一标识值。LiteWearable设备开发，无需填写dataSourceId。 |
| localDate | string | 否 | 否 | 数据的本地日期，格式'MM/DD/YYYY'。 |
| startTime | number | 否 | 否 | 数据开始时间，Unix时间戳，以毫秒为单位。  取值范围：(0, ∞) |
| endTime | number | 否 | 否 | 数据结束时间，Unix时间戳，以毫秒为单位。  取值范围：(0, ∞) |
| timeZone | string | 否 | 否 | 数据所在的时区，格式为+0800。 |
| modifiedTime | number | 否 | 否 | 创建或修改时间，Unix时间戳，以毫秒为单位。  取值范围：(0, ∞) |

## SequencePoint

Lite Wearable

运动健康数据详情点。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| startTime | number | 否 | 否 | 数据开始时间，Unix时间戳，以毫秒为单位。  取值范围：(0, ∞) |
| [P: string] | [HealthValueType](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#healthvaluetype) | 否 | 否 | 详情数据点字段。 |

## SequenceReadOptions

Lite Wearable

SequenceReadOptions<DK extends Record<string, [SequencePoint](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sequencepoint)[]> = Record<string, [SequencePoint](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#sequencepoint)[]>>

读取运动健康记录详情数据选项类。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| withDetails | boolean | 否 | 是 | 是否读取全部详情。true为读取全部详情，false为不读取详情，若未填写，则withPartialDetails参数生效。 |
| withPartialDetails | (keyof DK)[] | 否 | 是 | 读取部分详情数据类型（若需要读取部分详情，withDetails参数不能填写），锻炼记录与健康记录关联的详情数据类型分别参考[exerciseSequenceHelper](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper-lite)。 |

## SortOrder

Lite Wearable

结果排序类型枚举对象。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| ASC | 0 | 升序。 |
| DESC | 1 | 降序。 |

## SubDataType

Lite Wearable

type SubDataType = DataType

子数据类型。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| DataType | 数据类型。 |

## healthStore.saveData

Lite Wearable

saveData(exerciseSequence: ExerciseSequence): void

保存锻炼记录数据。

说明

上述接口调用前，需先使用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutstart)方法确保运动联动已经开启。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| exerciseSequence | [ExerciseSequence](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#exercisesequence) | 是 | 单个锻炼记录。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types; 3.Parameter verification failed. |
| [1002700001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002700001-系统内部错误) | Internal system error. |
| [1002700002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002700002-数据库异常) | Database processing error. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout in sporting, paused or stoped state. |
| [1002701001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002701001-网络错误) | Network error. The network is unavailable. |
| [1002702001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002702001-账号未登录) | Account error. The user has not logged in with HUAWEI ID. |
| [1002702002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002702002-账号异常) | Account error. Failed to obtain account information with HUAWEI ID. |
| [1002703001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002703001-用户隐私未同意) | User privacy is not agreed. |

**示例：**



```
1. import healthStore from '@hms.health.store'

3. let healthSequence = {
4. dataType: healthStore.healthDataTypes.WORKOUT_REALTIME.id,
5. // insertDataSource插入数据源接口返回的DataSourceId
6. dataSourceId: 'xxx',
7. localDate: '09/26/2023',
8. startTime: 1695740400000,  // 2023-10-23 14:00:00
9. endTime: 1695769200000,   // 2023-10-23 14:30:00
10. timeZone: '+0800',
11. modifiedTime: 1695769200000,
12. exerciseType: healthStore.exerciseSequenceHelper.badminton.EXERCISE_TYPE.id,
13. duration: 1800000,
14. summaries: {
15. avgShotSpeed: 25.5,
16. maxShotSpeed: 32.8,
17. avgSpeed: 18.7,
18. bestSpeed: 28.3,
19. speed: 22.1,
20. totalDistance: 1500,
21. shots: 125,
22. maxContinuousRally: 7,
23. forehandStroke: 45,
24. backhandStroke: 32,
25. overhandStroke: 18,
26. underhandStroke: 10,
27. smash: 23,
28. highClear: 15
29. }
30. }
31. try {
32. healthStore.saveData(healthSequence);
33. } catch (err) {
34. // 异常处理流程
35. }
```

## healthStore.readData

Lite Wearable

readData<T extends ExerciseSequence>(request: ExerciseSequenceReadRequest, callback: Callback<T[]>): void

读取锻炼记录数据。使用callback异步回调。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| request | [ExerciseSequenceReadRequest](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#exercisesequencereadrequest) | 是 | 读取锻炼记录请求，查询时间跨度范围为31天。在Lite Wearable设备上仅支持返回最新一条记录。 |
| callback | Callback<T[]> | 是 | 回调函数，返回锻炼记录数据。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types; 3.Parameter verification failed. |
| [1002700001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002700001-系统内部错误) | Internal system error. |
| [1002700002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002700002-数据库异常) | Database processing error. |
| [1002701001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002701001-网络错误) | Network error. The network is unavailable. |
| [1002702001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002702001-账号未登录) | Account error. The user has not logged in with HUAWEI ID. |
| [1002702002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002702002-账号异常) | Account error. Failed to obtain account information with HUAWEI ID. |
| [1002703001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1002703001-用户隐私未同意) | User privacy is not agreed. |

**示例：**



```
1. import healthStore from '@hms.health.store'

3. // 查询跑步记录
4. const startTime = 1698040800000; // 2023-10-23 14:00:00
5. const endTime = 1698042600000; // 2023-10-23 14:30:00

7. const sequenceReadRequest = {
8. startTime: startTime,
9. endTime: endTime,
10. exerciseType: healthStore.exerciseSequenceHelper.badminton.EXERCISE_TYPE.id,
11. count: 1,
12. sortOrder: healthStore.SortOrder.DESC,
13. readOptions: {
14. withPartialDetails: ['exerciseHeartRate']
15. };

17. const callback = (samplePoints) => {
18. // 锻炼记录数据回调处理流程
19. };
20. };

22. try {
23. healthStore.readData(this.exerciseSequenceReadRequest, this.callback);
24. } catch (err) {
25. // 异常
26. }
```

## healthStore.requestAuthorizations

Lite Wearable

requestAuthorizations(request: AuthorizationRequest): AuthorizationResponse

用户授权。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| request | [AuthorizationRequest](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#authorizationrequest) | 是 | 授权请求参数，确保授权参数中的权限已在申请运动健康服务时勾选。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [AuthorizationResponse](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#authorizationresponse) | 返回授权响应结果。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)，其他错误码请参见[华为账号服务ArkTS错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/account-server-error-code)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types; 3.Parameter verification failed. |

**示例：**



```
1. import healthStore from '@hms.health.store'

3. let authorizationParameter = {
4. readDataTypes: [healthStore.healthDataTypes.WORKOUT_SUMMARY],
5. writeDataTypes: [healthStore.healthDataTypes.WORKOUT_SUMMARY],
6. scopes: ['https://www.huawei.com/healthkit/workout']
7. }

9. try {
10. let authorizationResponse = healthStore.requestAuthorizations(authorizationParameter);
11. // 授权响应结果处理
12. } catch (err) {
13. // 异常处理流程
14. }
```

## healthStore.getAuthorizations

Lite Wearable

getAuthorizations(request: AuthorizationRequest): AuthorizationResponse

查询已授权权限。

**系统能力：** SystemCapability.Health.HealthStore.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| request | [AuthorizationRequest](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#authorizationrequest) | 是 | 查询权限请求参数。 |

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [AuthorizationRequest](/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#authorizationrequest) | 返回查询权限结果。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types; 3.Parameter verification failed. |

**示例：**



```
1. import healthStore from '@hms.health.store'

3. let queryAuthorizationRequest = {
4. readDataTypes: [healthStore.healthDataTypes.WORKOUT_SUMMARY],
5. writeDataTypes: [healthStore.healthDataTypes.WORKOUT_SUMMARY],
6. scopes: ['https://www.huawei.com/healthkit/workout']
7. }

9. try {
10. let queryAuthorizationResponse = healthStore.getAuthorizations(queryAuthorizationRequest);
11. // 查询权限结果处理
12. } catch (err) {
13. // 异常处理流程
14. }
```