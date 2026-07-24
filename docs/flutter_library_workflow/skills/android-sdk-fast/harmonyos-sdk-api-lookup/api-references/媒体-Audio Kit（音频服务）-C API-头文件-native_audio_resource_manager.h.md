## 概述

PhonePC/2in1TabletTVWearable

声明音频资源管理相关的接口。

**引用文件：** <ohaudio/native\_audio\_resource\_manager.h>

**库：** libohaudio.so

**系统能力：** SystemCapability.Multimedia.Audio.Core

**起始版本：** 20

**相关模块：** [OHAudio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_AudioResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioresourcemanager) | OH\_AudioResourceManager | 声明音频资源管理器。用于管理音频资源相关功能。 |
| [OH\_AudioWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioworkgroup) | OH\_AudioWorkgroup | 声明音频工作组。将音频关键线程进行分组管理。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_AudioCommon\_Result OH\_AudioManager\_GetAudioResourceManager(OH\_AudioResourceManager \*\*resourceManager)](/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audiomanager_getaudioresourcemanager) | 获取音频资源管理器。  使用音频资源管理器相关功能，首先需要获取音频资源管理器实例。 |
| [OH\_AudioCommon\_Result OH\_AudioResourceManager\_CreateWorkgroup(OH\_AudioResourceManager \*resourceManager, const char \*name, OH\_AudioWorkgroup \*\*group)](/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_createworkgroup) | 创建音频工作组。 |
| [OH\_AudioCommon\_Result OH\_AudioResourceManager\_ReleaseWorkgroup(OH\_AudioResourceManager \*resourceManager, OH\_AudioWorkgroup \*group)](/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_releaseworkgroup) | 释放音频工作组。 |
| [OH\_AudioCommon\_Result OH\_AudioWorkgroup\_AddCurrentThread(OH\_AudioWorkgroup \*group, int32\_t \*tokenId)](/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioworkgroup_addcurrentthread) | 将当前线程加入group指向的音频工作组。 |
| [OH\_AudioCommon\_Result OH\_AudioWorkgroup\_RemoveThread(OH\_AudioWorkgroup \*group, int32\_t tokenId)](/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioworkgroup_removethread) | 将tokenId对应的线程从group音频工作组中移除。 |
| [OH\_AudioCommon\_Result OH\_AudioWorkgroup\_Start(OH\_AudioWorkgroup \*group, uint64\_t startTime, uint64\_t deadlineTime)](/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioworkgroup_start) | 通知系统group指向的音频工作组开始工作，并告知系统当前工作组预期完成时间。 |
| [OH\_AudioCommon\_Result OH\_AudioWorkgroup\_Stop(OH\_AudioWorkgroup \*group)](/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioworkgroup_stop) | 通知系统group指向的音频工作组任务已完成。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AudioManager\_GetAudioResourceManager()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioManager_GetAudioResourceManager(OH_AudioResourceManager **resourceManager)
```

**描述**

获取音频资源管理器。

使用音频资源管理器相关功能，首先需要获取音频资源管理器实例。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioresourcemanager) \*\*resourceManager | 指向OH\_AudioResourceManager用于接收创建的音频资源管理器实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM：参数resourceManager为nullptr。 |

### OH\_AudioResourceManager\_CreateWorkgroup()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioResourceManager_CreateWorkgroup(OH_AudioResourceManager *resourceManager,const char *name, OH_AudioWorkgroup **group)
```

**描述**

创建音频工作组。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioresourcemanager) \*resourceManager | 指向[OH\_AudioManager\_GetAudioResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audiomanager_getaudioresourcemanager)创建的音频资源管理器实例OH\_AudioResourceManager。 |
| const char \*name | 要创建的音频工作组的名称。 |
| [OH\_AudioWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioworkgroup) \*\*group | 指向OH\_AudioWorkgroup用于接收返回的音频工作组实例的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM：  1. 参数resourceManager为nullptr；  2. 参数name为nullptr；  3. 参数group为nullptr。  AUDIOCOMMON\_RESULT\_ERROR\_NO\_MEMORY：内存不足。  AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM：系统处理错误。 |

### OH\_AudioResourceManager\_ReleaseWorkgroup()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioResourceManager_ReleaseWorkgroup(OH_AudioResourceManager *resourceManager,OH_AudioWorkgroup *group)
```

**描述**

释放音频工作组。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioresourcemanager) \*resourceManager | 指向[OH\_AudioManager\_GetAudioResourceManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audiomanager_getaudioresourcemanager)创建的音频资源管理器实例OH\_AudioResourceManager。 |
| [OH\_AudioWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioworkgroup) \*group | 指向[OH\_AudioResourceManager\_CreateWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_createworkgroup)创建的音频工作组实例OH\_AudioWorkgroup。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM：  1. 参数resourceManager为nullptr；  2. 参数group为nullptr。  AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM：系统处理错误。 |

### OH\_AudioWorkgroup\_AddCurrentThread()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioWorkgroup_AddCurrentThread(OH_AudioWorkgroup *group, int32_t *tokenId)
```

**描述**

将当前线程加入group指向的音频工作组。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioworkgroup) \*group | 指向[OH\_AudioResourceManager\_CreateWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_createworkgroup)创建的音频工作组实例OH\_AudioWorkgroup。 |
| int32\_t \*tokenId | 用于接收加入音频工作组的线程号。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM：  1. 参数group为nullptr；  2. 参数tokenId为nullptr。  AUDIOCOMMON\_RESULT\_ERROR\_NO\_MEMORY：内存不足。  AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM：系统处理错误。 |

### OH\_AudioWorkgroup\_RemoveThread()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioWorkgroup_RemoveThread(OH_AudioWorkgroup *group, int32_t tokenId)
```

**描述**

将tokenId对应的线程从group音频工作组中移除。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioworkgroup) \*group | 指向[OH\_AudioResourceManager\_CreateWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_createworkgroup)创建的音频工作组实例OH\_AudioWorkgroup。 |
| int32\_t tokenId | 要从音频工作组中移除的线程号。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM：  1. 参数group为nullptr；  2. 参数tokenId无效。  AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM：系统处理错误。 |

### OH\_AudioWorkgroup\_Start()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioWorkgroup_Start(OH_AudioWorkgroup *group, uint64_t startTime, uint64_t deadlineTime)
```

**描述**

通知系统group指向的音频工作组开始工作，并告知系统当前工作组预期完成时间。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioworkgroup) \*group | 指向[OH\_AudioResourceManager\_CreateWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_createworkgroup)创建的音频工作组实例OH\_AudioWorkgroup。 |
| uint64\_t startTime | 当前音频工作组启动的时间点。 |
| uint64\_t deadlineTime | 当前音频工作组预期完成的时间。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM：  1. 参数group为nullptr；  2. 参数startTime无效；  3. 参数deadlineTime无效。  AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM：系统处理错误。 |

### OH\_AudioWorkgroup\_Stop()

PhonePC/2in1TabletTVWearable



```
1. OH_AudioCommon_Result OH_AudioWorkgroup_Stop(OH_AudioWorkgroup *group)
```

**描述**

通知系统group指向的音频工作组任务已完成。

**起始版本：** 20

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_AudioWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-ohaudio-oh-audioworkgroup) \*group | 指向[OH\_AudioResourceManager\_CreateWorkgroup](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-resource-manager-h#oh_audioresourcemanager_createworkgroup)创建的音频工作组实例OH\_AudioWorkgroup。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_AudioCommon\_Result](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-audio-common-h#oh_audiocommon_result) | AUDIOCOMMON\_RESULT\_SUCCESS：函数执行成功。  AUDIOCOMMON\_RESULT\_ERROR\_INVALID\_PARAM：参数group为nullptr。  AUDIOCOMMON\_RESULT\_ERROR\_SYSTEM：系统处理错误。 |