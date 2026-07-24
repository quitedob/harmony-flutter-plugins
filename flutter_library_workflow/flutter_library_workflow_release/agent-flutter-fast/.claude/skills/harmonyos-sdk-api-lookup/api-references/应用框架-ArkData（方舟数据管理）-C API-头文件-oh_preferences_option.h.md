## 概述

PhonePC/2in1TabletTVWearable

提供访问Preferences配置选项（PreferencesOption）的接口与数据结构。

**引用文件：** <database/preferences/oh\_preferences\_option.h>

**库：** libohpreferences.so

**系统能力：** SystemCapability.DistributedDataManager.Preferences.Core

**起始版本：** 13

**相关模块：** [Preferences](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption) | OH\_PreferencesOption | 定义Preferences配置选项的数据结构。 |

### 枚举

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [Preferences\_StorageType](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#preferences_storagetype) | Preferences\_StorageType | 首选项配置选项的存储模式枚举。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [OH\_PreferencesOption \*OH\_PreferencesOption\_Create(void)](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_create) | 创建一个Preferences配置选项的[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象以及指向它的指针。  当不再需要使用指针时，请使用[OH\_PreferencesOption\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_destroy)销毁实例对象，否则会导致内存泄漏。 |
| [int OH\_PreferencesOption\_SetFileName(OH\_PreferencesOption \*option, const char \*fileName)](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_setfilename) | 设置Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的文件名称。 |
| [int OH\_PreferencesOption\_SetBundleName(OH\_PreferencesOption \*option, const char \*bundleName)](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_setbundlename) | 设置Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的包名称。 |
| [int OH\_PreferencesOption\_SetDataGroupId(OH\_PreferencesOption \*option, const char \*dataGroupId)](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_setdatagroupid) | 设置Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的应用组ID。  设置应用组ID后，会指定在此应用组ID对应的沙箱路径下创建Preferences实例。应用组ID需要向应用市场获取，暂不支持。  当传入的应用组ID为空字符串时，默认在本应用沙箱目录下创建Preferences实例。 |
| [int OH\_PreferencesOption\_SetStorageType(OH\_PreferencesOption \*option, Preferences\_StorageType type)](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_setstoragetype) | 设置Preferences实例对象的存储模式。 |
| [int OH\_PreferencesOption\_Destroy(OH\_PreferencesOption \*option)](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_destroy) | 销毁Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例。 |

## 枚举类型说明

PhonePC/2in1TabletTVWearable

### Preferences\_StorageType

PhonePC/2in1TabletTVWearable



```
1. enum Preferences_StorageType
```

**描述**

首选项配置选项的存储模式枚举。

**起始版本：** 18

展开

| 枚举项 | 描述 |
| --- | --- |
| PREFERENCES\_STORAGE\_XML = 0 | XML存储模式，对数据的操作发生在内存中，调用[OH\_Preferences\_Close](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-preferences-h#oh_preferences_close)时落盘，不支持多进程。 |
| PREFERENCES\_STORAGE\_GSKV | GSKV存储模式，对数据的操作实时落盘，可支持多进程 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_PreferencesOption\_Create()

PhonePC/2in1TabletTVWearable



```
1. OH_PreferencesOption *OH_PreferencesOption_Create(void)
```

**描述**

创建一个Preferences配置选项的[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象以及指向它的指针。

当不再需要使用指针时，请使用[OH\_PreferencesOption\_Destroy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#oh_preferencesoption_destroy)销毁实例对象，否则会导致内存泄漏。

**起始版本：** 13

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption) | 如果操作成功，返回指向Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的指针。失败返回空指针。 |

### OH\_PreferencesOption\_SetFileName()

PhonePC/2in1TabletTVWearable



```
1. int OH_PreferencesOption_SetFileName(OH_PreferencesOption *option, const char *fileName)
```

**描述**

设置Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的文件名称。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption) \*option | 指向Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的指针。 |
| const char \*fileName | 需要设置的文件名称。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。  若错误码为PREFERENCES\_OK，表示操作成功。  若错误码为PREFERENCES\_ERROR\_INVALID\_PARAM，表示参数不合法。 |

**参考：**

OH\_Preferences\_ErrCode

### OH\_PreferencesOption\_SetBundleName()

PhonePC/2in1TabletTVWearable



```
1. int OH_PreferencesOption_SetBundleName(OH_PreferencesOption *option, const char *bundleName)
```

**描述**

设置Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的包名称。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption) \*option | 配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的指针。 |
| const char \*bundleName | 需要设置的包名称。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。  若错误码为PREFERENCES\_OK，表示操作成功。  若错误码为PREFERENCES\_ERROR\_INVALID\_PARAM，表示参数不合法。 |

### OH\_PreferencesOption\_SetDataGroupId()

PhonePC/2in1TabletTVWearable



```
1. int OH_PreferencesOption_SetDataGroupId(OH_PreferencesOption *option, const char *dataGroupId)
```

**描述**

设置Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的应用组ID。

设置应用组ID后，会指定在此应用组ID对应的沙箱路径下创建Preferences实例。应用组ID需要向应用市场获取，暂不支持。

当传入的应用组ID为空字符串时，默认在本应用沙箱目录下创建Preferences实例。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption) \*option | 配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的指针。 |
| const char \*dataGroupId | 需要设置的应用组ID。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。  若错误码为PREFERENCES\_OK，表示操作成功。  若错误码为PREFERENCES\_ERROR\_INVALID\_PARAM，表示参数不合法。 |

### OH\_PreferencesOption\_SetStorageType()

PhonePC/2in1TabletTVWearable



```
1. int OH_PreferencesOption_SetStorageType(OH_PreferencesOption *option, Preferences_StorageType type)
```

**描述**

设置Preferences实例对象的存储模式。

**起始版本：** 18

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption) \*option | 指向要设置存储模式的配置项的指针。 |
| [Preferences\_StorageType](/consumer/cn/doc/harmonyos-references/capi-oh-preferences-option-h#preferences_storagetype) type | 需要设置的存储模式。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回执行的错误码。  若错误码为PREFERENCES\_OK，表示操作成功。  若错误码为PREFERENCES\_ERROR\_INVALID\_PARAM，表示参数不合法。 |

### OH\_PreferencesOption\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. int OH_PreferencesOption_Destroy(OH_PreferencesOption *option)
```

**描述**

销毁Preferences配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例。

**起始版本：** 13

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption) \*option | 配置选项[OH\_PreferencesOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-preferences-oh-preferencesoption)实例对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int | 返回接口操作执行的状态码。  PREFERENCES\_OK，表示操作成功。  PREFERENCES\_ERROR\_INVALID\_PARAM，表示参数不合法。 |