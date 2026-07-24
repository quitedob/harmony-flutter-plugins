## 概述

PhonePC/2in1TabletTVWearable

提供输入法绑定选项对象的创建、销毁与读写方法。

**引用文件：** <inputmethod/inputmethod\_attach\_options\_capi.h>

**库：** libohinputmethod.so

**系统能力：** SystemCapability.MiscServices.InputMethodFramework

**起始版本：** 12

**相关模块：** [InputMethod](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod)

## 汇总

PhonePC/2in1TabletTVWearable

### 结构体

PhonePC/2in1TabletTVWearable

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions) | InputMethod\_AttachOptions | 输入法绑定选项。绑定输入法时携带的选项。 |

### 函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [InputMethod\_AttachOptions \*OH\_AttachOptions\_Create(bool showKeyboard)](/consumer/cn/doc/harmonyos-references/capi-inputmethod-attach-options-capi-h#oh_attachoptions_create) | 创建一个新的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。 |
| [InputMethod\_AttachOptions \*OH\_AttachOptions\_CreateWithRequestKeyboardReason(bool showKeyboard, InputMethod\_RequestKeyboardReason requestKeyboardReason)](/consumer/cn/doc/harmonyos-references/capi-inputmethod-attach-options-capi-h#oh_attachoptions_createwithrequestkeyboardreason) | 创建一个新的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。 |
| [void OH\_AttachOptions\_Destroy(InputMethod\_AttachOptions \*options)](/consumer/cn/doc/harmonyos-references/capi-inputmethod-attach-options-capi-h#oh_attachoptions_destroy) | 销毁一个[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。 |
| [InputMethod\_ErrorCode OH\_AttachOptions\_IsShowKeyboard(InputMethod\_AttachOptions \*options, bool \*showKeyboard)](/consumer/cn/doc/harmonyos-references/capi-inputmethod-attach-options-capi-h#oh_attachoptions_isshowkeyboard) | 从[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)中获取是否显示键盘的值。 |
| [InputMethod\_ErrorCode OH\_AttachOptions\_GetRequestKeyboardReason(InputMethod\_AttachOptions \*options, int \*requestKeyboardReason)](/consumer/cn/doc/harmonyos-references/capi-inputmethod-attach-options-capi-h#oh_attachoptions_getrequestkeyboardreason) | 从[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)中获取触发输入法拉起的场景原因。 |

## 函数说明

PhonePC/2in1TabletTVWearable

### OH\_AttachOptions\_Create()

PhonePC/2in1TabletTVWearable



```
1. InputMethod_AttachOptions *OH_AttachOptions_Create(bool showKeyboard)
```

**描述**

创建一个新的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| bool showKeyboard | 表示绑定时是否显示键盘。true - 表示绑定完成时需要显示键盘。false - 表示绑定完成时不需要显示键盘。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions) \* | 如果创建成功，返回一个指向新创建的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例的指针。  如果创建失败，对象返回NULL，可能的失败原因有应用地址空间满。 |

### OH\_AttachOptions\_CreateWithRequestKeyboardReason()

PhonePC/2in1TabletTVWearable



```
1. InputMethod_AttachOptions *OH_AttachOptions_CreateWithRequestKeyboardReason(bool showKeyboard, InputMethod_RequestKeyboardReason requestKeyboardReason)
```

**描述**

创建一个新的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| bool showKeyboard | 表示绑定时是否显示键盘。true - 表示绑定完成时需要显示键盘。false - 表示绑定完成时不需要显示键盘。 |
| [InputMethod\_RequestKeyboardReason](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_requestkeyboardreason) requestKeyboardReason | 表示请求键盘输入的原因。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions) \* | 如果创建成功，返回一个指向新创建的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例的指针。  如果创建失败，对象返回NULL，可能的失败原因有应用地址空间满。 |

### OH\_AttachOptions\_Destroy()

PhonePC/2in1TabletTVWearable



```
1. void OH_AttachOptions_Destroy(InputMethod_AttachOptions *options)
```

**描述**

销毁一个[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions) \*options | 表示即将被销毁的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。 |

### OH\_AttachOptions\_IsShowKeyboard()

PhonePC/2in1TabletTVWearable



```
1. InputMethod_ErrorCode OH_AttachOptions_IsShowKeyboard(InputMethod_AttachOptions *options, bool *showKeyboard)
```

**描述**

从[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)中获取是否显示键盘的值。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions) \*options | 表示被读取值的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。 |
| bool \*showKeyboard | 表示绑定时是否显示键盘。true - 表示绑定完成时需要显示键盘。false - 表示绑定完成时不需要显示键盘。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [InputMethod\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode) | 返回一个特定的错误码。  [IME\_ERR\_OK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode) - 表示成功。  [IME\_ERR\_NULL\_POINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode) - 非预期的空指针。  具体错误码可以参考 [InputMethod\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode)。 |

### OH\_AttachOptions\_GetRequestKeyboardReason()

PhonePC/2in1TabletTVWearable



```
1. InputMethod_ErrorCode OH_AttachOptions_GetRequestKeyboardReason(InputMethod_AttachOptions *options, int *requestKeyboardReason)
```

**描述**

从[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)中获取请求键盘的原因。

**起始版本：** 15

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions) \*options | 表示被读取值的[InputMethod\_AttachOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-inputmethod-attachoptions)实例。 |
| int \*requestKeyboardReason | 表示请求键盘输入的原因。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [InputMethod\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode) | 返回一个特定的错误码。  [IME\_ERR\_OK](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode) - 表示成功。  [IME\_ERR\_NULL\_POINTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode) - 非预期的空指针。  具体错误码可以参考 [InputMethod\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-inputmethod-types-capi-h#inputmethod_errorcode)。 |