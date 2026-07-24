本模块提供运动健康联动服务。

**起始版本：** 6.1.1(24)

## 导入模块

Lite Wearable



```
1. import healthService from '@hms.health.service';
```

## SampleReal

Lite Wearable

SampleReal<K extends Record<string, [healthStore.HealthValueType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#healthvaluetype)> = Record<string, [healthStore.HealthValueType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#healthvaluetype)>>

联动实时运动数据。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| dataType | [healthStore.DataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthstore-lite#datatype) | 否 | 否 | 实时融合数据类型。 |
| time | number | 否 | 否 | 实时融合数据产生时间，Unix时间戳，以毫秒为单位。 |
| fields | Pick<K, keyof K> | 否 | 否 | 实时融合数据字段。 |
| deviceUniqueId | string | 否 | 是 | 实时融合数据来源，若未填写，默认为空。 |

## workout

Lite Wearable

提供运动健康实时数据。

**系统能力：** SystemCapability.Health.HealthService.lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

### ConfigType

Lite Wearable

type ConfigType = number | string | boolean

联动配置项类型。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 类型 | **说明** |
| --- | --- |
| number | 表示值类型为数字，可取任意值。 |
| string | 表示值类型为字符串，可取任意值。 |
| boolean | 表示值类型为布尔类型，可取true或false，具体含义以实际使用场景为准。 |

### DeviceState

Lite Wearable

联动设备状态。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| deviceId | string | 否 | 否 | 设备ID。 |
| state | number | 否 | 否 | 设备状态。 |
| deviceName | string | 否 | 是 | 设备名称，若未填写，默认为空。 |

### Goal

Lite Wearable

联动运动目标。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| type | number | 否 | 否 | 目标类型，取值参考：[TargetType](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#targettype)。 |
| value | number | 否 | 否 | 目标值。 |

### LinkageType

Lite Wearable

联动类型。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| COURSE\_LINK | 0 | 课程联动。 |
| ACTIVITY\_LINK | 1 | 运动联动。 |

### StartCode

Lite Wearable

联动开启结果码。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| SUCCESS | 0 | 联动开启成功。 |
| WORKOUT\_WORKING | 1 | 联动已开始。 |
| NO\_SUPPORTED\_DEVICE | 2 | 无可支持联动的设备。 |
| DEVICE\_BUSY | 3 | 联动设备忙碌。 |

### StartResult

Lite Wearable

联动开启结果。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| startCode | [StartCode](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#startcode) | 否 | 否 | 联动开启结果码。 |
| deviceState | [DeviceState](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#devicestate)[] | 否 | 否 | 联动设备状态。 |

### TargetType

Lite Wearable

联动目标类型。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| NONE | 0 | 无目标。 |
| DISTANCE | 1 | 距离。 |
| CALORIE | 2 | 卡路里。 |
| TIME | 3 | 时长。 |
| SKIPPING\_TIMES | 4 | 跳绳次数。 |

### WorkoutConfig

Lite Wearable

联动配置项。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| linkageType | [LinkageType](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#linkagetype) | 否 | 否 | 联动类型。 |
| sportType | number | 否 | 否 | 运动类型，参见[锻炼记录类型常量](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-exercisedequencehelper-lite)子数据类型id。 |
| activityGoals | [Goal](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#goal)[] | 否 | 是 | 联动运动目标，若未填写，默认为空。 |
| extensionConfig | Record<string, [ConfigType](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#configtype)> | 否 | 是 | 扩展配置项，若未填写，默认为空。 |

### DynamicLibResult

Lite Wearable

加载算法库操作结果类型。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| **名称** | **类型** | 只读 | 可选 | **说明** |
| --- | --- | --- | --- | --- |
| operationCode | [DynamicLibErrorCode](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#dynamicliberrorcode) | 否 | 否 | 加载算法库操作结果码。 |

### DynamicLibErrorCode

Lite Wearable

加载或卸载算法库文件操作结果码。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

展开

| 名称 | 值 | 说明 |
| --- | --- | --- |
| OPERATION\_SUCCESS | 0 | 操作成功。 |
| FILE\_NOT\_FOUND | 1 | 算法库文件未找到。 |
| SERVICE\_BUSY | 2 | 算法库文件已被加载。 |
| OPERATION\_FAILED | 3 | 操作失败。 |
| SYSTEM\_INTERNAL\_ERROR | 4 | 未知错误。 |

### workout.config

Lite Wearable

config(workoutConfig: WorkoutConfig): void

运动联动配置。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| workoutConfig | [WorkoutConfig](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutconfig) | 是 | 联动配置项。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout not in stoped or idle state. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

**示例：**



```
1. import healthService from '@hms.health.service'
2. import healthStore from '@hms.health.store'

4. try {
5. let workoutOptions = {
6. linkageType: healthService.workout.LinkageType.ACTIVITY_LINK,
7. sportType: healthStore.exerciseSequenceHelper.running.EXERCISE_TYPE.id
8. };
9. healthService.workout.config(workoutOptions);
10. } catch (err) {
11. // 异常处理流程
12. }
```

### workout.start

Lite Wearable

start(): StartResult

开启运动联动。

说明

上述接口调用前，需先使用[config](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutconfig)方法进行联动配置。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**返回值：**

展开

| 类型 | 说明 |
| --- | --- |
| [StartResult](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#startresult) | 返回联动开启结果。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104002](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104002-不支持运动类型) | Unsupported sport type. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout in sporting, paused or stoped state. |
| [1009104004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104004-权限校验异常) | Permission verification error. Application has no permission, such as Motion Permission. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

**示例：**



```
1. import healthService from '@hms.health.service'
2. import healthStore from '@hms.health.store'

4. try {
5. healthService.workout.start();
6. } catch (err) {
7. // 异常处理流程
8. }
```

### workout.pause

Lite Wearable

pause(): void

暂停运动联动。

说明

上述接口调用前，需先使用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutstart)方法确保运动联动已经开启。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout in ready, paused or stoped state. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. healthService.workout.pause();
5. } catch (err) {
6. //
7. }
```

### workout.resume

Lite Wearable

resume(): void

恢复运动联动。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout in ready, sporting or stoped state. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

说明

上述接口调用前，需先使用[pause](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutpause)方法暂停运动联动。

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. healthService.workout.resume();
5. } catch (err) {
6. // 异常处理流程
7. }
```

### workout.stop

Lite Wearable

stop(): void

停止联动。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout is not started. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

说明

上述接口调用前，需先使用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutstart)方法确保联动已经开启，上述接口调用后，当前运动联动被停止，其他运动可开启联动。

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. healthService.workout.stop();
5. } catch (err) {
6. // 异常处理流程
7. }
```

### workout.onData

Lite Wearable

onData(dataType: undefined, listener: Callback<SampleReal[]>): void

注册所有联动运动数据监听，使用callback异步回调。

**系统能力：** SystemCapability.Health.HealthService.Lite

**模型约束：** 此接口仅可在FA模型下使用。

**起始版本：** 6.1.1(24)

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| dataType | undefined | 是 | 监听所有联动运动数据类型。 |
| listener | Callback<[SampleReal](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#samplereal)[]> | 是 | 回调函数，返回联动运动数据。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

说明

上述接口调用前，需先使用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutstart)方法确保联动已经开启。

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. const callback = (sampleReals) => {
5. // 运动数据回调处理流程
6. };
7. healthService.workout.onData(undefined, callback);
8. } catch (err) {
9. // 异常处理流程
10. }
```

### workout.offData

Lite Wearable

offData(dataType: undefined, listener?: Callback<SampleReal[]>): void

取消所有联动运动数据的监听，使用callback异步回调。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| dataType | undefined | 是 | 监听所有联动运动数据类型。 |
| listener | Callback<[SampleReal](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#samplereal)[]> | 否 | 回调函数，返回联动运动数据。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Parameter verification failed. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

说明

上述接口调用前，需先使用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutstart)方法确保联动已经开启。

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. const callback = (sampleReals) => {
5. // 数据回调处理流程
6. };
7. healthService.workout.offData(undefined, callback);
8. } catch (err) {
9. // 异常处理流程
10. }
```

### workout.sendData

Lite Wearable

sendData(sampleReal: SampleReal[]): void

下发融合运动数据到联动设备。

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**系统能力：** SystemCapability.Health.HealthService.Lite

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| sampleReal | [SampleReal](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#samplereal)[] | 是 | 融合运动数据。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

说明

上述接口调用前，需先使用[start](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#workoutstart)方法确保联动已经开启。

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. const sampleReal: healthService.SampleReal = {
5. dataType: { id: healthStore.healthDataTypes.WORKOUT_REALTIME.id },
6. time: 1695740400000, // 2023-09-26 23:00:00,
7. fields: {
8. hr: 90
9. }
10. };
11. healthService.workout.sendData([sampleReal]);
12. } catch (err) {
13. // 异常处理流程
14. }
```

### workout.load

Lite Wearable

load(path: String): void

加载算法库文件，加载后可使用算法库算法。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| path | String | 是 | 算法库文件在代码工程中存放的路径，例如：common/dynamic\_example.so。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. Require workout management permission.Refer to the development documentation for permission request. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. The API is called when workout is not started. |
| [1009104004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104004-权限校验异常) | Permission verification error. Application has no permission, such as Motion Permission. |
| [1009104005](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104005-动态库加载异常) | Failed to load the dynamic library. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. const path = "common/dynamic_example.so";
5. healthService.workout.load(path);
6. } catch (err) {
7. // 异常处理流程
8. }
```

### workout.load

Lite Wearable

load(path: String, callback: Callback<[DynamicLibResult](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#dynamiclibresult)>): void

加载算法库文件，加载后可使用算法库算法，使用callback异步回调。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| path | String | 是 | 算法库文件在代码工程中存放的路径，例如：common/dynamic\_example.so。 |
| callback | Callback<[DynamicLibResult](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#dynamiclibresult)> | 是 | 回调函数，返回算法库加载结果。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. Require workout management permission.Refer to the development documentation for permission request. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout is not started. |
| [1009104004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104004-权限校验异常) | Permission verification error. Application has no permission, such as Motion Permission. |
| [1009104005](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104005-动态库加载异常) | Failed to load the dynamic library. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. const path = "common/dynamic_example.so";
5. healthService.workout.load(path, (result) => {
6. switch (result.operationCode) {
7. case healthService.workout.DynamicLibErrorCode.OPERATION_SUCCESS:
8. // 加载成功处理流程
9. break;
10. case healthService.DynamicLibErrorCode.FILE_NOT_FOUND:
11. // so文件未找到处理流程
12. break;
13. case healthService.workout.DynamicLibErrorCode.SERVICE_BUSY:
14. // so文件已加载处理流程
15. break;
16. case healthService.workout.DynamicLibErrorCode.OPERATION_FAILED:
17. // 操作失败处理流程
18. break;
19. default :
20. // 未知错误处理流程
21. }
22. });
23. } catch (err) {
24. // 异常处理流程
25. }
```

### workout.unload

Lite Wearable

unload(path: String): void

卸载算法库文件，卸载后无法使用算法库算法。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| path | String | 是 | 算法库文件在代码工程中存放的路径，例如：common/dynamic\_example.so。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. Require workout management permission.Refer to the development documentation for permission request. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. The API is called when workout is not started. |
| [1009104004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104004-权限校验异常) | Permission verification error. Application has no permission, such as Motion Permission. |
| [1009104006](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104006-动态库卸载异常) | Failed to unload the dynamic library. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. const path = "common/dynamic_example.so";
5. healthService.workout.unload(path);
6. } catch (err) {
7. // 异常处理流程
8. }
```

### workout.unload

Lite Wearable

unload(path: String, callback: Callback<[DynamicLibResult](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#dynamiclibresult)>): void

卸载算法库文件，卸载后无法使用算法库算法，使用callback异步回调。

**系统能力：** SystemCapability.Health.HealthService.Lite

**起始版本：** 6.1.1(24)

**模型约束：** 此接口仅可在FA模型下使用。

**参数：**

展开

| **参数名** | **类型** | 必填 | **说明** |
| --- | --- | --- | --- |
| path | String | 是 | 算法库文件在代码工程中存放的路径，例如：common/dynamic\_example.so。 |
| callback | Callback<[DynamicLibResult](/consumer/cn/doc/harmonyos-references/health-api-healthservice-lite#dynamiclibresult)> | 是 | 回调函数，返回算法库卸载结果。 |

**错误码：**

以下错误码的详细介绍请参见[运动健康服务ArkTS API错误码](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice)。

展开

| 错误码ID | 错误信息 |
| --- | --- |
| [201](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section201-鉴权失败) | Permission verification failed. Require workout management permission.Refer to the development documentation for permission request. |
| [401](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section401-参数不合法) | Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;2. Incorrect parameter types. |
| [1009104001](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104001-联动已开启) | Sport service busy. Workout is already started by other application. |
| [1009104003](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104003-非法指令) | Illegal command. Called when workout is not started. |
| [1009104004](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104004-权限校验异常) | Permission verification error. Application has no permission, such as Motion Permission. |
| [1009104006](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104006-动态库卸载异常) | Failed to unload the dynamic library. |
| [1009104999](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/errorcode-healthservice#section1009104999-通用错误码) | System internal error. |

**示例：**



```
1. import healthService from '@hms.health.service'

3. try {
4. const path = "common/dynamic_example.so";
5. healthService.workout.unload(path, (result) => {
6. switch (result.operationCode) {
7. case healthService.workout.DynamicLibErrorCode.OPERATION_SUCCESS:
8. // 加载成功处理流程
9. break;
10. case healthService.DynamicLibErrorCode.FILE_NOT_FOUND:
11. // so文件未找到处理流程
12. break;
13. case healthService.workout.DynamicLibErrorCode.OPERATION_FAILED:
14. // 操作失败处理流程
15. break;
16. default :
17. // 未知错误处理流程
18. }
19. });
20. } catch (err) {
21. // 异常处理流程
22. }
```