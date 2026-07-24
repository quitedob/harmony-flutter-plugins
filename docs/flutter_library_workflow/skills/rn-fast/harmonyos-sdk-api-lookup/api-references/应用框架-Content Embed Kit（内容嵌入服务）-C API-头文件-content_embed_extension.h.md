## 概述

定义服务端应用OE Extension相关数据结构和操作接口。

**引用文件：** <ContentEmbedKit/content\_embed/content\_embed\_extension.h>

**库：** libcontent\_embed\_ndk.so

**系统能力：** SystemCapability.ContentEmbed.ObjectEditor

**起始版本：** 24

**相关模块：** [ContentEmbed](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed)

## 汇总

### 结构体

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [ContentEmbed\_Document](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-document) | ContentEmbed\_Document | 声明OE文档结构体类型。封装了被嵌入文档的元数据、内容和存储结构。 |
| [ContentEmbed\_ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioncontext) | ContentEmbed\_ExtensionContext | 声明OE Extension上下文的结构体类型。 |
| [ContentEmbed\_ExtensionContext\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioncontext8h) | ContentEmbed\_ExtensionContextHandle | 声明OE Extension上下文对象指针类型。 |
| [ContentEmbed\_ExtensionInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance) | ContentEmbed\_ExtensionInstance | 声明OE Extension实例的结构体类型。管理扩展的生命周期、回调注册和客户端OE对象关联等核心功能。 |
| [ContentEmbed\_ExtensionInstance\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) | ContentEmbed\_ExtensionInstanceHandle | 声明OE Extension实例对象指针类型。 |
| [ContentEmbed\_Object](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object) | ContentEmbed\_Object | 声明ContentEmbed\_Object结构体类型。用于指向OE文档在服务端封装的文档嵌入和编辑的程序对象（简称服务端OE对象）。 |
| [ContentEmbed\_Object\*](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) | ContentEmbed\_ObjectHandle | 声明ContentEmbed\_Object对象指针类型。 |

### 函数

展开

| 名称 | typedef关键字 | 描述 |
| --- | --- | --- |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_GetContentEmbedContext(ContentEmbed\_ExtensionInstanceHandle ceInstance, ContentEmbed\_ExtensionContextHandle \*ceContext)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_getcontentembedcontext) | - | 从OE Extension实例中获取其对应的OE Extension上下文对象。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_GetContext(ContentEmbed\_ExtensionContextHandle ceContext, AbilityRuntime\_ContextHandle \*context)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_getcontext) | - | 从OE Extension上下文中获取AbilityRuntime上下文。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_GetExtensionInstance(AbilityRuntime\_ExtensionInstanceHandle baseInstance, ContentEmbed\_ExtensionInstanceHandle \*ceInstance)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_getextensioninstance) | - | 从ExtensionAbility基类实例中获取对应的OE Extension实例。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnCreateFunc)(ContentEmbed\_ExtensionInstanceHandle instance, AbilityBase\_Want \*want)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_oncreatefunc) | OH\_ContentEmbed\_Extension\_OnCreateFunc | OE Extension实例创建时的生命周期函数类型。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnCreateFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeroncreatefunc)注册到OE Extension实例。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnDestroyFunc)(ContentEmbed\_ExtensionInstanceHandle instance)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ondestroyfunc) | OH\_ContentEmbed\_Extension\_OnDestroyFunc | OE Extension实例销毁时的生命周期函数类型。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnDestroyFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerondestroyfunc)注册到OE Extension实例。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnObjectAttachFunc)(ContentEmbed\_ExtensionInstanceHandle instance, ContentEmbed\_ObjectHandle object)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onobjectattachfunc) | OH\_ContentEmbed\_Extension\_OnObjectAttachFunc | 当客户端OE对象连接到OE Extension实例时触发此回调函数，用于执行服务端OE对象关联后的初始化操作。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnObjectAttachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronobjectattachfunc)注册到OE Extension实例。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnObjectDetachFunc)(ContentEmbed\_ExtensionInstanceHandle instance, ContentEmbed\_ObjectHandle object)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onobjectdetachfunc) | OH\_ContentEmbed\_Extension\_OnObjectDetachFunc | 当客户端OE对象从OE Extension实例断开连接时触发此回调函数，用于执行服务端OE对象断开连接后的清理操作。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnObjectDetachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronobjectdetachfunc)注册到OE Extension实例。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnWriteToDataStreamFunc)(ContentEmbed\_ObjectHandle object)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onwritetodatastreamfunc) | OH\_ContentEmbed\_Extension\_OnWriteToDataStreamFunc | 当服务端OE对象写入OE文档数据流时的回调函数类型。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnWriteToDataStreamFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronwritetodatastreamfunc)注册到服务端OE对象。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnGetSnapshotFunc)(ContentEmbed\_ObjectHandle object)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongetsnapshotfunc) | OH\_ContentEmbed\_Extension\_OnGetSnapshotFunc | 当客户端OE对象请求获取OE文档快照时的回调函数类型。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnGetSnapshotFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongetsnapshotfunc)注册到服务端OE对象。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnDoEditFunc)(ContentEmbed\_ObjectHandle object)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ondoeditfunc) | OH\_ContentEmbed\_Extension\_OnDoEditFunc | 当客户端OE对象请求编辑OE文档时的回调函数类型。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnDoEditFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerondoeditfunc)注册到服务端OE对象。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnGetEditStatusFunc)(ContentEmbed\_ObjectHandle object, bool \*isEditing, bool \*isModified)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongeteditstatusfunc) | OH\_ContentEmbed\_Extension\_OnGetEditStatusFunc | 当客户端OE对象请求OE文档编辑状态时的回调函数类型。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnGetEditStatusFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongeteditstatusfunc)注册到服务端OE对象。 |
| [typedef void (\*OH\_ContentEmbed\_Extension\_OnGetCapabilityFunc)(ContentEmbed\_ObjectHandle object, uint32\_t \*bitmask)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongetcapabilityfunc) | OH\_ContentEmbed\_Extension\_OnGetCapabilityFunc | 当客户端OE对象查询OE Extension实例支持能力时的回调函数类型。  开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnGetCapabilityFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongetcapabilityfunc)注册到服务端OE对象。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnCreateFunc(ContentEmbed\_ExtensionInstanceHandle instance, OH\_ContentEmbed\_Extension\_OnCreateFunc onCreateFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeroncreatefunc) | - | 注册OE Extension实例创建时的生命周期函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnDestroyFunc(ContentEmbed\_ExtensionInstanceHandle instance, OH\_ContentEmbed\_Extension\_OnDestroyFunc onDestroyFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerondestroyfunc) | - | 注册OE Extension实例销毁时的生命周期函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnObjectAttachFunc(ContentEmbed\_ExtensionInstanceHandle instance, OH\_ContentEmbed\_Extension\_OnObjectAttachFunc onObjectAttachFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronobjectattachfunc) | - | 注册客户端OE对象连接时的回调函数。  可以通过调用[OH\_ContentEmbed\_Extension\_UnRegisterOnObjectAttachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_unregisteronobjectattachfunc)取消注册。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_UnRegisterOnObjectAttachFunc(ContentEmbed\_ExtensionInstanceHandle instance)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_unregisteronobjectattachfunc) | - | 取消注册客户端OE对象连接时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnObjectDetachFunc(ContentEmbed\_ExtensionInstanceHandle instance, OH\_ContentEmbed\_Extension\_OnObjectDetachFunc onObjectDetachFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronobjectdetachfunc) | - | 注册客户端OE对象断开连接时的回调函数。  可以通过调用[OH\_ContentEmbed\_Extension\_UnRegisterOnObjectDetachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_unregisteronobjectdetachfunc)取消注册。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_UnRegisterOnObjectDetachFunc(ContentEmbed\_ExtensionInstanceHandle instance)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_unregisteronobjectdetachfunc) | - | 取消注册客户端OE对象断开连接时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnWriteToDataStreamFunc(ContentEmbed\_ObjectHandle object, OH\_ContentEmbed\_Extension\_OnWriteToDataStreamFunc onWriteToDataStreamFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronwritetodatastreamfunc) | - | 注册服务端OE对象写入OE文档数据流时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnGetSnapshotFunc(ContentEmbed\_ObjectHandle object, OH\_ContentEmbed\_Extension\_OnGetSnapshotFunc onGetSnapshotFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongetsnapshotfunc) | - | 注册客户端OE对象请求获取OE文档快照时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnDoEditFunc(ContentEmbed\_ObjectHandle object, OH\_ContentEmbed\_Extension\_OnDoEditFunc onDoEditFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerondoeditfunc) | - | 注册客户端OE对象请求编辑OE文档时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnGetEditStatusFunc(ContentEmbed\_ObjectHandle object, OH\_ContentEmbed\_Extension\_OnGetEditStatusFunc onGetEditStatusFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongeteditstatusfunc) | - | 注册客户端OE对象请求OE文档编辑状态时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_RegisterOnGetCapabilityFunc(ContentEmbed\_ObjectHandle object, OH\_ContentEmbed\_Extension\_OnGetCapabilityFunc onGetCapabilityFunc)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongetcapabilityfunc) | - | 注册客户端OE对象查询OE Extension实例支持能力时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_GetContentEmbedDocument(ContentEmbed\_ObjectHandle object, ContentEmbed\_Document \*\*ceDocument)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_getcontentembeddocument) | - | 获取服务端OE对象关联的OE文档实例。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_CallbackToOnUpdate(ContentEmbed\_ObjectHandle object)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_callbacktoonupdate) | - | 触发客户端OE对象注册的OE文档更新回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_CallbackToOnError(ContentEmbed\_ObjectHandle object, ContentEmbed\_ErrorCode code)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_callbacktoonerror) | - | 触发客户端OE对象注册的OE文档错误回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_CallbackToOnEditingFinished(ContentEmbed\_ObjectHandle object, bool dataModified)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_callbacktooneditingfinished) | - | 触发客户端OE对象注册的OE文档编辑完成回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_CallbackToOnExtensionStopped(ContentEmbed\_ExtensionInstanceHandle instance)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_callbacktoonextensionstopped) | - | 触发OE Extension关联的所有客户端OE对象注册的OE Extension停止时的回调函数。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_SetSnapshot(ContentEmbed\_ObjectHandle object, OH\_PixelmapNative \*pixelMap)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_setsnapshot) | - | 设置客户端OE对象关联的OE文档快照图像。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_ContextStartSelfUIAbility(ContentEmbed\_ExtensionContextHandle context, AbilityBase\_Want \*want)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_contextstartselfuiability) | - | 通过OE Extension上下文启动自身的[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#uiability)。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_ContextStartSelfUIAbilityWithStartOptions(ContentEmbed\_ExtensionContextHandle context, AbilityBase\_Want \*want, AbilityRuntime\_StartOptions \*options)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_contextstartselfuiabilitywithstartoptions) | - | 使用启动选项启动OE Extension上下文自身的[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#uiability)。 |
| [ContentEmbed\_ErrorCode OH\_ContentEmbed\_Extension\_ContextTerminateAbility(ContentEmbed\_ExtensionContextHandle context)](/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_contextterminateability) | - | 销毁OE Extension。 |

## 函数说明

### OH\_ContentEmbed\_Extension\_GetContentEmbedContext()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_GetContentEmbedContext(ContentEmbed_ExtensionInstanceHandle ceInstance, ContentEmbed_ExtensionContextHandle *ceContext)
```

**描述**

从OE Extension实例中获取其对应的OE Extension上下文对象。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) ceInstance | OE Extension实例对象的指针。 |
| [ContentEmbed\_ExtensionContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioncontext8h) \*ceContext | 输出参数。调用成功后，该指针指向OE Extension实例的上下文对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_GetContext()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_GetContext(ContentEmbed_ExtensionContextHandle ceContext, AbilityRuntime_ContextHandle *context)
```

**描述**

从OE Extension上下文中获取AbilityRuntime上下文。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioncontext8h) ceContext | OE Extension上下文对象的指针。 |
| [AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h) \*context | 输出参数。调用成功后，该指针指向[AbilityRuntime\_ContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-abilityruntime-context8h)上下文对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_GetExtensionInstance()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_GetExtensionInstance(AbilityRuntime_ExtensionInstanceHandle baseInstance, ContentEmbed_ExtensionInstanceHandle *ceInstance)
```

**描述**

从ExtensionAbility基类实例中获取对应的OE Extension实例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [AbilityRuntime\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-extensioninstance8h) baseInstance | [AbilityRuntime\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-extensioninstance8h)实例。 |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) \*ceInstance | 输出参数。调用成功后，该指针指向OE Extension实例对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_OnCreateFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnCreateFunc)(ContentEmbed_ExtensionInstanceHandle instance, AbilityBase_Want *want)
```

**描述**

OE Extension实例创建时的生命周期函数类型。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnCreateFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeroncreatefunc)注册到OE Extension实例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | OE Extension实例对象的指针。 |
| [AbilityBase\_Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilitybase-want) \*want | [AbilityBase\_Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilitybase-want)实例的指针。 |

### OH\_ContentEmbed\_Extension\_OnDestroyFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnDestroyFunc)(ContentEmbed_ExtensionInstanceHandle instance)
```

**描述**

OE Extension实例销毁时的生命周期函数类型。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnDestroyFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerondestroyfunc)注册到OE Extension实例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | OE Extension实例对象的指针。 |

### OH\_ContentEmbed\_Extension\_OnObjectAttachFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnObjectAttachFunc)(ContentEmbed_ExtensionInstanceHandle instance, ContentEmbed_ObjectHandle object)
```

**描述**

当客户端OE对象连接到OE Extension实例时触发此回调函数，用于执行服务端OE对象关联后的初始化操作。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnObjectAttachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronobjectattachfunc)注册到OE Extension实例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | OE Extension实例对象的指针。 |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |

### OH\_ContentEmbed\_Extension\_OnObjectDetachFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnObjectDetachFunc)(ContentEmbed_ExtensionInstanceHandle instance, ContentEmbed_ObjectHandle object)
```

**描述**

当客户端OE对象从OE Extension实例断开连接时触发此回调函数，用于执行服务端OE对象断开连接后的清理操作。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnObjectDetachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronobjectdetachfunc)注册到OE Extension实例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | OE Extension实例对象的指针。 |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |

### OH\_ContentEmbed\_Extension\_OnWriteToDataStreamFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnWriteToDataStreamFunc)(ContentEmbed_ObjectHandle object)
```

**描述**

当服务端OE对象写入OE文档数据流时的回调函数类型。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnWriteToDataStreamFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registeronwritetodatastreamfunc)注册到服务端OE对象。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |

### OH\_ContentEmbed\_Extension\_OnGetSnapshotFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnGetSnapshotFunc)(ContentEmbed_ObjectHandle object)
```

**描述**

当客户端OE对象请求获取OE文档快照时的回调函数类型。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnGetSnapshotFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongetsnapshotfunc)注册到服务端OE对象。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |

### OH\_ContentEmbed\_Extension\_OnDoEditFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnDoEditFunc)(ContentEmbed_ObjectHandle object)
```

**描述**

当客户端OE对象请求编辑OE文档时的回调函数类型。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnDoEditFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerondoeditfunc)注册到服务端OE对象。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |

### OH\_ContentEmbed\_Extension\_OnGetEditStatusFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnGetEditStatusFunc)(ContentEmbed_ObjectHandle object, bool *isEditing, bool *isModified)
```

**描述**

当客户端OE对象请求OE文档编辑状态时的回调函数类型。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnGetEditStatusFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongeteditstatusfunc)注册到服务端OE对象。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| bool \*isEditing | 输出参数。表示OE文档是否正在编辑，true表示正在编辑；false表示未编辑。 |
| bool \*isModified | 输出参数。表示OE文档是否已被修改，true表示已被修改；false表示未修改。 |

### OH\_ContentEmbed\_Extension\_OnGetCapabilityFunc()



```
1. typedef void (*OH_ContentEmbed_Extension_OnGetCapabilityFunc)(ContentEmbed_ObjectHandle object, uint32_t *bitmask)
```

**描述**

当客户端OE对象查询OE Extension实例支持能力时的回调函数类型。

开发者需要实现此函数并通过[OH\_ContentEmbed\_Extension\_RegisterOnGetCapabilityFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_registerongetcapabilityfunc)注册到服务端OE对象。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| uint32\_t \*bitmask | 输出参数，表示OE Extension实例支持的能力，由[ContentEmbed\_CapabilityCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_capabilitycode)中的值组合而成。 |

### OH\_ContentEmbed\_Extension\_RegisterOnCreateFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnCreateFunc(ContentEmbed_ExtensionInstanceHandle instance, OH_ContentEmbed_Extension_OnCreateFunc onCreateFunc)
```

**描述**

注册OE Extension实例创建时的生命周期函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | 指向OE Extension实例对象的指针。 |
| [OH\_ContentEmbed\_Extension\_OnCreateFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_oncreatefunc) onCreateFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnCreateFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_oncreatefunc)生命周期函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnDestroyFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnDestroyFunc(ContentEmbed_ExtensionInstanceHandle instance, OH_ContentEmbed_Extension_OnDestroyFunc onDestroyFunc)
```

**描述**

注册OE Extension实例销毁时的生命周期函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | 指向OE Extension实例对象的指针。 |
| [OH\_ContentEmbed\_Extension\_OnDestroyFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ondestroyfunc) onDestroyFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnDestroyFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ondestroyfunc)生命周期函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnObjectAttachFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnObjectAttachFunc(ContentEmbed_ExtensionInstanceHandle instance, OH_ContentEmbed_Extension_OnObjectAttachFunc onObjectAttachFunc)
```

**描述**

注册客户端OE对象连接时的回调函数。

可以通过调用[OH\_ContentEmbed\_Extension\_UnRegisterOnObjectAttachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_unregisteronobjectattachfunc)取消注册。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | 指向OE Extension实例对象的指针。 |
| [OH\_ContentEmbed\_Extension\_OnObjectAttachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onobjectattachfunc) onObjectAttachFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnObjectAttachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onobjectattachfunc)回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_UnRegisterOnObjectAttachFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_UnRegisterOnObjectAttachFunc(ContentEmbed_ExtensionInstanceHandle instance)
```

**描述**

取消注册客户端OE对象连接时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | 指向OE Extension实例对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnObjectDetachFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnObjectDetachFunc(ContentEmbed_ExtensionInstanceHandle instance, OH_ContentEmbed_Extension_OnObjectDetachFunc onObjectDetachFunc)
```

**描述**

注册客户端OE对象断开连接时的回调函数。

可以通过调用[OH\_ContentEmbed\_Extension\_UnRegisterOnObjectDetachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_unregisteronobjectdetachfunc)取消注册。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | 指向OE Extension实例对象的指针。 |
| [OH\_ContentEmbed\_Extension\_OnObjectDetachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onobjectdetachfunc) onObjectDetachFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnObjectDetachFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onobjectdetachfunc)回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_UnRegisterOnObjectDetachFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_UnRegisterOnObjectDetachFunc(ContentEmbed_ExtensionInstanceHandle instance)
```

**描述**

取消注册客户端OE对象断开连接时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | 指向OE Extension实例对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnWriteToDataStreamFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnWriteToDataStreamFunc(ContentEmbed_ObjectHandle object, OH_ContentEmbed_Extension_OnWriteToDataStreamFunc onWriteToDataStreamFunc)
```

**描述**

注册服务端OE对象写入OE文档数据流时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [OH\_ContentEmbed\_Extension\_OnWriteToDataStreamFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onwritetodatastreamfunc) onWriteToDataStreamFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnWriteToDataStreamFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_onwritetodatastreamfunc)回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnGetSnapshotFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnGetSnapshotFunc(ContentEmbed_ObjectHandle object, OH_ContentEmbed_Extension_OnGetSnapshotFunc onGetSnapshotFunc)
```

**描述**

注册客户端OE对象请求获取OE文档快照时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [OH\_ContentEmbed\_Extension\_OnGetSnapshotFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongetsnapshotfunc) onGetSnapshotFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnGetSnapshotFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongetsnapshotfunc)回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnDoEditFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnDoEditFunc(ContentEmbed_ObjectHandle object, OH_ContentEmbed_Extension_OnDoEditFunc onDoEditFunc)
```

**描述**

注册客户端OE对象请求编辑OE文档时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [OH\_ContentEmbed\_Extension\_OnDoEditFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ondoeditfunc) onDoEditFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnDoEditFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ondoeditfunc)回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnGetEditStatusFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnGetEditStatusFunc(ContentEmbed_ObjectHandle object, OH_ContentEmbed_Extension_OnGetEditStatusFunc onGetEditStatusFunc)
```

**描述**

注册客户端OE对象请求OE文档编辑状态时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [OH\_ContentEmbed\_Extension\_OnGetEditStatusFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongeteditstatusfunc) onGetEditStatusFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnGetEditStatusFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongeteditstatusfunc)回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_RegisterOnGetCapabilityFunc()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_RegisterOnGetCapabilityFunc(ContentEmbed_ObjectHandle object, OH_ContentEmbed_Extension_OnGetCapabilityFunc onGetCapabilityFunc)
```

**描述**

注册客户端OE对象查询OE Extension实例支持能力时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [OH\_ContentEmbed\_Extension\_OnGetCapabilityFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongetcapabilityfunc) onGetCapabilityFunc | 要注册的[OH\_ContentEmbed\_Extension\_OnGetCapabilityFunc](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-extension-h#oh_contentembed_extension_ongetcapabilityfunc)回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_GetContentEmbedDocument()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_GetContentEmbedDocument(ContentEmbed_ObjectHandle object, ContentEmbed_Document **ceDocument)
```

**描述**

获取服务端OE对象关联的OE文档实例。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [ContentEmbed\_Document](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-document) \*\*ceDocument | 输出参数。调用成功后，该指针指向关联的OE文档实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_CallbackToOnUpdate()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_CallbackToOnUpdate(ContentEmbed_ObjectHandle object)
```

**描述**

触发客户端OE对象注册的OE文档更新回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_CLIENT\_CALLBACK\_NOT\_REGISTERED：表示客户端回调未注册。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_CLIENT\_CALLBACK\_FAILED：表示客户端回调执行失败。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_CallbackToOnError()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_CallbackToOnError(ContentEmbed_ObjectHandle object, ContentEmbed_ErrorCode code)
```

**描述**

触发客户端OE对象注册的OE文档错误回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) code | 表示错误码，详细定义参见[ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_CLIENT\_CALLBACK\_NOT\_REGISTERED：表示客户端回调未注册。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_CLIENT\_CALLBACK\_FAILED：表示客户端回调执行失败。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_CallbackToOnEditingFinished()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_CallbackToOnEditingFinished(ContentEmbed_ObjectHandle object, bool dataModified)
```

**描述**

触发客户端OE对象注册的OE文档编辑完成回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| bool dataModified | 表示文档数据是否已被修改。true表示有修改，false表示无修改。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_CLIENT\_CALLBACK\_NOT\_REGISTERED：表示客户端回调未注册。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_CLIENT\_CALLBACK\_FAILED：表示客户端回调执行失败。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_CallbackToOnExtensionStopped()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_CallbackToOnExtensionStopped(ContentEmbed_ExtensionInstanceHandle instance)
```

**描述**

触发OE Extension关联的所有客户端OE对象注册的OE Extension停止时的回调函数。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionInstanceHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioninstance8h) instance | 指向OE Extension实例对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_CLIENT\_CALLBACK\_NOT\_REGISTERED：表示客户端回调未注册。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_CLIENT\_CALLBACK\_FAILED：表示客户端回调执行失败。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_SetSnapshot()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_SetSnapshot(ContentEmbed_ObjectHandle object, OH_PixelmapNative *pixelMap)
```

**描述**

设置客户端OE对象关联的OE文档快照图像。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h) object | [ContentEmbed\_ObjectHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-object8h)实例。 |
| [OH\_PixelmapNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-pixelmapnative) \*pixelMap | 文档快照的像素图对象，详细信息参考[OH\_PixelmapNative](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-drawing-oh-pixelmapnative)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。  CE\_ERR\_IMAGE\_PACKER\_OPERATION\_FAILED：表示图像操作失败。 |

### OH\_ContentEmbed\_Extension\_ContextStartSelfUIAbility()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_ContextStartSelfUIAbility(ContentEmbed_ExtensionContextHandle context, AbilityBase_Want *want)
```

**描述**

通过OE Extension上下文启动自身的[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#uiability)。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioncontext8h) context | 指向OE Extension上下文对象的指针。 |
| [AbilityBase\_Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilitybase-want) \*want | 启动UIAbility时传递的参数，详细信息参考[AbilityBase\_Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilitybase-want)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_SYSTEM\_ABNORMAL：表示系统服务异常。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_ContextStartSelfUIAbilityWithStartOptions()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_ContextStartSelfUIAbilityWithStartOptions(ContentEmbed_ExtensionContextHandle context, AbilityBase_Want *want, AbilityRuntime_StartOptions *options)
```

**描述**

使用启动选项启动OE Extension上下文自身的[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability#uiability)。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioncontext8h) context | 指向OE Extension上下文对象的指针。 |
| [AbilityBase\_Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilitybase-want) \*want | 启动UIAbility时传递的参数，详细信息参考[AbilityBase\_Want](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilitybase-want)。 |
| [AbilityRuntime\_StartOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-startoptions) \*options | 启动UIAbility时的附加选项，详细信息参考[AbilityRuntime\_StartOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-abilityruntime-startoptions)。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_SYSTEM\_ABNORMAL：表示系统服务异常。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |

### OH\_ContentEmbed\_Extension\_ContextTerminateAbility()



```
1. ContentEmbed_ErrorCode OH_ContentEmbed_Extension_ContextTerminateAbility(ContentEmbed_ExtensionContextHandle context)
```

**描述**

销毁OE Extension。

**起始版本：** 24

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ContentEmbed\_ExtensionContextHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-contentembed-contentembed-extensioncontext8h) context | 指向OE Extension上下文对象的指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ContentEmbed\_ErrorCode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-content-embed-common-h#contentembed_errorcode) | 返回特定的错误码：  CE\_ERR\_OK：表示操作成功。  CE\_ERR\_PARAM\_INVALID：表示参数检查失败。  CE\_ERR\_NULL\_POINTER：表示返回空指针。  CE\_ERR\_SYSTEM\_ABNORMAL：表示系统服务异常。  CE\_ERR\_DEVICE\_NOT\_SUPPORTED：表示设备不支持。  CE\_ERR\_IN\_DLP\_SANDBOX：表示应用在DLP沙箱中，不支持此操作。 |