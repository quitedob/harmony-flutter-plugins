

```
1. typedef struct {...} ArkUI_NativeNodeAPI_1
```

## 概述

PhonePC/2in1TabletTVWearable

ArkUI提供的Native侧Node类型接口集合。Node模块相关接口需要在主线程上调用。

**起始版本：** 12

**相关模块：** [ArkUI\_NativeModule](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule)

**所在头文件：** [native\_node.h](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h)

## 汇总

PhonePC/2in1TabletTVWearable

### 成员变量

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| int32\_t version | 结构体版本，当前使用的ArkUI\_NativeNodeAPI\_1结构体的版本编号，由系统提供，开发者无需修改。 |

### 成员函数

PhonePC/2in1TabletTVWearable

展开

| 名称 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle (\*createNode)(ArkUI\_NodeType type)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#createnode) | 基于[ArkUI\_NodeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodetype)生成对应的组件并返回组件对象指针。 |
| [void (\*disposeNode)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#disposenode) | 销毁组件指针指向的组件对象。 |
| [int32\_t (\*addChild)(ArkUI\_NodeHandle parent, ArkUI\_NodeHandle child)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#addchild) | 将组件挂载到某个父节点之下。 |
| [int32\_t (\*removeChild)(ArkUI\_NodeHandle parent, ArkUI\_NodeHandle child)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#removechild) | 将组件从父节点中移除。 |
| [int32\_t (\*insertChildAfter)(ArkUI\_NodeHandle parent, ArkUI\_NodeHandle child, ArkUI\_NodeHandle sibling)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#insertchildafter) | 将组件挂载到某个父节点之下，挂载位置在**sibling**节点之后。 |
| [int32\_t (\*insertChildBefore)(ArkUI\_NodeHandle parent, ArkUI\_NodeHandle child, ArkUI\_NodeHandle sibling)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#insertchildbefore) | 将组件挂载到某个父节点之下，挂载位置在**sibling**节点之前。 |
| [int32\_t (\*insertChildAt)(ArkUI\_NodeHandle parent, ArkUI\_NodeHandle child, int32\_t position)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#insertchildat) | 将组件挂载到某个父节点之下，挂载位置由**position**指定。 |
| [int32\_t (\*setAttribute)(ArkUI\_NodeHandle node, ArkUI\_NodeAttributeType attribute, const ArkUI\_AttributeItem\* item)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#setattribute) | 属性设置函数。 |
| [const ArkUI\_AttributeItem\* (\*getAttribute)(ArkUI\_NodeHandle node, ArkUI\_NodeAttributeType attribute)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getattribute) | 属性获取函数。该接口返回的指针是ArkUI框架内部的缓冲区指针，不需要开发者主动调用delete释放内存，但是需要在该函数下一次被调用前使用，否则可能会被其他值所覆盖。 |
| [int32\_t (\*resetAttribute)(ArkUI\_NodeHandle node, ArkUI\_NodeAttributeType attribute)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#resetattribute) | 重置属性函数。 |
| [int32\_t (\*registerNodeEvent)(ArkUI\_NodeHandle node, ArkUI\_NodeEventType eventType, int32\_t targetId, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#registernodeevent) | 注册节点事件函数。 |
| [void (\*unregisterNodeEvent)(ArkUI\_NodeHandle node, ArkUI\_NodeEventType eventType)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#unregisternodeevent) | 反注册节点事件函数。 |
| [void (\*registerNodeEventReceiver)(void (\*eventReceiver)(ArkUI\_NodeEvent\* event))](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#registernodeeventreceiver) | 注册事件回调统一入口函数。ArkUI框架会统一收集过程中产生的组件事件并通过注册的eventReceiver函数回调给开发者。  重复调用时会覆盖前一次注册的函数。 避免直接保存ArkUI\_NodeEvent对象指针，数据会在回调结束后销毁。  如果需要和组件实例绑定，可以使用addNodeEventReceiver函数接口。 |
| [void (\*unregisterNodeEventReceiver)()](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#unregisternodeeventreceiver) | 反注册事件回调统一入口函数。 |
| [void (\*markDirty)(ArkUI\_NodeHandle node, ArkUI\_NodeDirtyFlag dirtyFlag)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#markdirty) | 强制标记当前节点，使其重新执行测量、布局或者绘制的区域。系统属性设置更新场景下，ArkUI框架会自动标记节点并重新执行测量，布局或者绘制，不需要开发者主动调用该函数。 |
| [uint32\_t (\*getTotalChildCount)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#gettotalchildcount) | 获取子节点的个数。 |
| [ArkUI\_NodeHandle (\*getChildAt)(ArkUI\_NodeHandle node, int32\_t position)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getchildat) | 获取子节点。 |
| [ArkUI\_NodeHandle (\*getFirstChild)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getfirstchild) | 获取第一个子节点。 |
| [ArkUI\_NodeHandle (\*getLastChild)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getlastchild) | 获取最后一个子节点。 |
| [ArkUI\_NodeHandle (\*getPreviousSibling)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getprevioussibling) | 获取上一个兄弟节点。 |
| [ArkUI\_NodeHandle (\*getNextSibling)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getnextsibling) | 获取下一个兄弟节点。 |
| [int32\_t (\*registerNodeCustomEvent)(ArkUI\_NodeHandle node, ArkUI\_NodeCustomEventType eventType, int32\_t targetId, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#registernodecustomevent) | 注册自定义节点事件函数。事件触发时通过registerNodeCustomEventReceiver注册的自定义事件入口函数返回。 |
| [void (\*unregisterNodeCustomEvent)(ArkUI\_NodeHandle node, ArkUI\_NodeCustomEventType eventType)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#unregisternodecustomevent) | 反注册自定义节点事件函数。 |
| [void (\*registerNodeCustomEventReceiver)(void (\*eventReceiver)(ArkUI\_NodeCustomEvent\* event))](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#registernodecustomeventreceiver) | 注册自定义节点事件回调统一入口函数。ArkUI框架会统一收集过程中产生的自定义组件事件并通过注册的registerNodeCustomEventReceiver函数回调给开发者。  重复调用时会覆盖前一次注册的函数。  避免直接保存ArkUI\_NodeCustomEvent对象指针，数据会在回调结束后销毁。  如果需要和组件实例绑定，可以使用addNodeCustomEventReceiver函数接口。 |
| [void (\*unregisterNodeCustomEventReceiver)()](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#unregisternodecustomeventreceiver) | 反注册自定义节点事件回调统一入口函数。 |
| [int32\_t (\*setMeasuredSize)(ArkUI\_NodeHandle node, int32\_t width, int32\_t height)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#setmeasuredsize) | 在测算回调函数中设置组件的测算完成后的宽和高。 |
| [int32\_t (\*setLayoutPosition)(ArkUI\_NodeHandle node, int32\_t positionX, int32\_t positionY)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#setlayoutposition) | 在布局回调函数中设置组件的位置。 |
| [ArkUI\_IntSize (\*getMeasuredSize)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getmeasuredsize) | 获取组件测算完成后的宽高尺寸。 |
| [ArkUI\_IntOffset (\*getLayoutPosition)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getlayoutposition) | 获取组件布局完成后该节点相对于父节点的偏移，单位为px。该偏移是父容器对该节点进行布局之后的结果，因此布局之后生效的offset属性和不参与布局的position属性不影响该偏移值。 |
| [int32\_t (\*measureNode)(ArkUI\_NodeHandle node, ArkUI\_LayoutConstraint\* Constraint)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#measurenode) | 对目标组件进行测算，可以通过getMeasuredSize接口获取测算后的大小。 |
| [int32\_t (\*layoutNode)(ArkUI\_NodeHandle node, int32\_t positionX, int32\_t positionY)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#layoutnode) | 对目标组件进行布局并传递该组件相对父组件的期望位置。 |
| [int32\_t (\*addNodeEventReceiver)(ArkUI\_NodeHandle node, void (\*eventReceiver)(ArkUI\_NodeEvent\* event))](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#addnodeeventreceiver) | 在组件上添加组件事件回调函数，用于接受该组件产生的组件事件。不同于registerNodeEventReceiver的全局注册函数，该函数允许在同一个组件上添加多个事件接受器。  该函数添加的监听回调函数触发时机会先于registerNodeEventReceiver注册的全局回调函数。  避免直接保存ArkUI\_NodeEvent对象指针，数据会在回调结束后销毁。 |
| [int32\_t (\*removeNodeEventReceiver)(ArkUI\_NodeHandle node, void (\*eventReceiver)(ArkUI\_NodeEvent\* event))](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#removenodeeventreceiver) | 在组件上删除注册的组件事件回调函数。 |
| [int32\_t (\*addNodeCustomEventReceiver)(ArkUI\_NodeHandle node, void (\*eventReceiver)(ArkUI\_NodeCustomEvent\* event))](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#addnodecustomeventreceiver) | 在组件上添加自定义事件回调函数，用于接受该组件产生的自定义事件（如布局事件，绘制事件）。不同于registerNodeCustomEventReceiver的全局注册函数，该函数允许在同一个组件上添加多个事件接受器。  该函数添加的监听回调函数触发时机会先于registerNodeCustomEventReceiver注册的全局回调函数。  避免直接保存ArkUI\_NodeCustomEvent对象指针，数据会在回调结束后销毁。 |
| [int32\_t (\*removeNodeCustomEventReceiver)(ArkUI\_NodeHandle node, void (\*eventReceiver)(ArkUI\_NodeCustomEvent\* event))](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#removenodecustomeventreceiver) | 在组件上删除注册的自定义事件回调函数。 |
| [int32\_t (\*setUserData)(ArkUI\_NodeHandle node, void\* userData)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#setuserdata) | 在组件上保存自定义数据。 |
| [void\* (\*getUserData)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getuserdata) | 获取在组件上保存的自定义数据。 |
| [int32\_t (\*setLengthMetricUnit)(ArkUI\_NodeHandle node, ArkUI\_LengthMetricUnit unit)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#setlengthmetricunit) | 指定组件的单位。 |
| [ArkUI\_NodeHandle (\*getParent)(ArkUI\_NodeHandle node)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#getparent) | 获取父节点。 |
| [int32\_t (\*removeAllChildren)(ArkUI\_NodeHandle parent)](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#removeallchildren) | 从父组件上卸载所有子节点。 |

## 成员函数说明

PhonePC/2in1TabletTVWearable

### createNode()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_NodeHandle (*createNode)(ArkUI_NodeType type)
```

**描述：**

基于[ArkUI\_NodeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodetype)生成对应的组件并返回组件对象指针。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodetype) type | 创建指定类型的UI组件节点。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) | 返回创建完成的组件操作指针，如果创建失败返回NULL。需要开发者自行管理返回的组件对象指针的生命周期，否则有可能导致Use After Free等进程崩溃或内存泄漏问题。 |

### disposeNode()

PhonePC/2in1TabletTVWearable



```
1. void (*disposeNode)(ArkUI_NodeHandle node)
```

**描述：**

销毁组件指针指向的组件对象。在非主线程调用时需要注意待销毁组件对象的生命周期，生命周期管理不当有可能导致应用崩溃，因此不建议在非主线程上调用本接口。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 组件指针对象。 |

### addChild()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*addChild)(ArkUI_NodeHandle parent, ArkUI_NodeHandle child)
```

**描述：**

将组件挂载到某个父节点之下。本接口属于节点操作接口，不建议在非主线程上调用。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) parent | 父节点指针。 |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) child | 子节点指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。  [ARKUI\_ERROR\_CODE\_NODE\_IS\_ADOPTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 节点已被接纳为附属节点。从API version 22开始支持。 |

### removeChild()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*removeChild)(ArkUI_NodeHandle parent, ArkUI_NodeHandle child)
```

**描述：**

将组件从父节点中移除。本接口属于节点操作接口，不建议在非主线程上调用。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) parent | 父节点指针。 |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) child | 子节点指针。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。 |

### insertChildAfter()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*insertChildAfter)(ArkUI_NodeHandle parent, ArkUI_NodeHandle child, ArkUI_NodeHandle sibling)
```

**描述：**

将组件挂载到某个父节点之下，挂载位置在**sibling**节点之后。本接口属于节点操作接口，不建议在非主线程上调用。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) parent | 父节点指针。 |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) child | 子节点指针。 |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) sibling | 前一个兄弟节点指针，如果为空则插入位置在最后面。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。  [ARKUI\_ERROR\_CODE\_NODE\_IS\_ADOPTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 节点已被接纳为附属节点。从API version 22开始支持。 |

### insertChildBefore()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*insertChildBefore)(ArkUI_NodeHandle parent, ArkUI_NodeHandle child, ArkUI_NodeHandle sibling)
```

**描述：**

将组件挂载到某个父节点之下，挂载位置在**sibling**节点之前。本接口属于节点操作接口，不建议在非主线程上调用。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) parent | 父节点指针。 |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) child | 子节点指针。 |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) sibling | 后一个兄弟节点指针，如果为空则插入位置在最后面。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。  [ARKUI\_ERROR\_CODE\_NODE\_IS\_ADOPTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 节点已被接纳为附属节点。从API version 22开始支持。 |

### insertChildAt()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*insertChildAt)(ArkUI_NodeHandle parent, ArkUI_NodeHandle child, int32_t position)
```

**描述：**

将组件挂载到某个父节点之下，挂载位置由**position**指定。本接口属于节点操作接口，不建议在非主线程上调用。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) parent | 父节点指针。 |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) child | 子节点指针。 |
| int32\_t position | 插入位置，取值范围为[-2147483648, 2147483647]，如果插入位置为负数或者不存在，则默认插入位置在最后面。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。  [ARKUI\_ERROR\_CODE\_NODE\_IS\_ADOPTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 节点已被接纳为附属节点。从API version 22开始支持。 |

### setAttribute()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*setAttribute)(ArkUI_NodeHandle node, ArkUI_NodeAttributeType attribute, const ArkUI_AttributeItem* item)
```

**描述：**

属性设置函数，不建议在非主线程上调用。

在实际业务场景下，如果组件设置的属性包含由开发者申请的堆内存，需确保组件不再使用后再调用对应释放接口。例如：[ArkUI\_NodeAttributeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodeattributetype)中的NODE\_TEXT\_CONTENT\_WITH\_STYLED\_STRING。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要设置属性的节点对象。 |
| [ArkUI\_NodeAttributeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodeattributetype) attribute | 需要设置的属性类型。 |
| const [ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)\* item | 需要设置的属性值。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_ATTRIBUTE\_OR\_EVENT\_NOT\_SUPPORTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 组件不支持该属性。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。  [ERROR\_CODE\_NATIVE\_IMPL\_NODE\_ADAPTER\_EXIST](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) NodeAdapter已经存在。 |

### getAttribute()

PhonePC/2in1TabletTVWearable



```
1. const ArkUI_AttributeItem* (*getAttribute)(ArkUI_NodeHandle node, ArkUI_NodeAttributeType attribute)
```

**描述：**

属性获取函数。该接口返回的指针是ArkUI框架内部的缓冲区指针，不需要开发者主动调用delete释放内存，但是需要在该函数下一次被调用前使用，否则可能会被其他值所覆盖。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要获取属性的节点对象。 |
| [ArkUI\_NodeAttributeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodeattributetype) attribute | 需要获取的属性类型。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| const [ArkUI\_AttributeItem](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-attributeitem)\* | 当前属性类型的属性值，失败返回空指针。 |

### resetAttribute()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*resetAttribute)(ArkUI_NodeHandle node, ArkUI_NodeAttributeType attribute)
```

**描述：**

重置属性函数，不建议在非主线程上调用。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要重置属性的节点对象。 |
| [ArkUI\_NodeAttributeType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodeattributetype) attribute | 需要重置的属性类型。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_ATTRIBUTE\_OR\_EVENT\_NOT\_SUPPORTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 组件不支持该属性。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。 |

### registerNodeEvent()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*registerNodeEvent)(ArkUI_NodeHandle node, ArkUI_NodeEventType eventType, int32_t targetId, void* userData)
```

**描述：**

注册节点事件函数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要注册事件的节点对象。 |
| [ArkUI\_NodeEventType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodeeventtype) eventType | 需要注册的事件类型。 |
| int32\_t targetId | 自定义事件ID，当事件触发时在回调参数[ArkUI\_NodeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodeevent) 中携带回来。 |
| void\* userData | 自定义事件参数，当事件触发时在回调参数[ArkUI\_NodeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodeevent) 中携带回来。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_ATTRIBUTE\_OR\_EVENT\_NOT\_SUPPORTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 组件不支持该事件。  [ARKUI\_ERROR\_CODE\_NOT\_SUPPROTED\_FOR\_ARKTS\_NODE](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 不支持对ArkTS创建的节点执行对应的操作。 |

### unregisterNodeEvent()

PhonePC/2in1TabletTVWearable



```
1. void (*unregisterNodeEvent)(ArkUI_NodeHandle node, ArkUI_NodeEventType eventType)
```

**描述：**

反注册节点事件函数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要反注册事件的节点对象。 |
| [ArkUI\_NodeEventType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodeeventtype) eventType | 需要反注册的事件类型。 |

### registerNodeEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. void (*registerNodeEventReceiver)(void (*eventReceiver)(ArkUI_NodeEvent* event))
```

**描述：**

注册事件回调统一入口函数。ArkUI框架会统一收集过程中产生的组件事件并通过注册的eventReceiver函数回调给开发者。

重复调用时会覆盖前一次注册的函数。 避免直接保存[ArkUI\_NodeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodeevent)对象指针，数据会在回调结束后销毁。

如果需要和组件实例绑定，可以使用[addNodeEventReceiver](/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nativenodeapi-1#addnodeeventreceiver)函数接口。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void (\*eventReceiver)([ArkUI\_NodeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodeevent)\* event) | 事件回调统一入口函数。 |

### unregisterNodeEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. void (*unregisterNodeEventReceiver)()
```

**描述：**

反注册事件回调统一入口函数。

**起始版本：** 12

### markDirty()

PhonePC/2in1TabletTVWearable



```
1. void (*markDirty)(ArkUI_NodeHandle node, ArkUI_NodeDirtyFlag dirtyFlag)
```

**描述：**

强制标记当前节点，使其重新执行测量、布局或者绘制的区域。系统属性设置更新场景下，ArkUI框架会自动标记节点并重新执行测量，布局或者绘制，不需要开发者主动调用该函数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要标记重新执行测量、布局或者绘制的节点对象。 |
| [ArkUI\_NodeDirtyFlag](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodedirtyflag) dirtyFlag | 重新执行测量、布局或者绘制的类型。 |

### getTotalChildCount()

PhonePC/2in1TabletTVWearable



```
1. uint32_t (*getTotalChildCount)(ArkUI_NodeHandle node)
```

**描述：**

获取子节点的个数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| uint32\_t | 子节点的个数, 如果没有返回0。 |

### getChildAt()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_NodeHandle (*getChildAt)(ArkUI_NodeHandle node, int32_t position)
```

**描述：**

获取子节点。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |
| int32\_t position | 子组件的位置。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) | 返回组件的指针，如果没有返回NULL。 |

### getFirstChild()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_NodeHandle (*getFirstChild)(ArkUI_NodeHandle node)
```

**描述：**

获取第一个子节点。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) | 返回组件的指针，如果没有返回NULL。 |

### getLastChild()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_NodeHandle (*getLastChild)(ArkUI_NodeHandle node)
```

**描述：**

获取最后一个子节点。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) | 返回组件的指针，如果没有返回NULL。 |

### getPreviousSibling()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_NodeHandle (*getPreviousSibling)(ArkUI_NodeHandle node)
```

**描述：**

获取上一个兄弟节点。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) | 返回组件的指针，如果没有返回NULL。 |

### getNextSibling()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_NodeHandle (*getNextSibling)(ArkUI_NodeHandle node)
```

**描述：**

获取下一个兄弟节点。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) | 返回组件的指针，如果没有返回NULL。 |

### registerNodeCustomEvent()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*registerNodeCustomEvent)(ArkUI_NodeHandle node, ArkUI_NodeCustomEventType eventType, int32_t targetId, void* userData)
```

**描述：**

注册自定义节点事件函数。事件触发时通过registerNodeCustomEventReceiver注册的自定义事件入口函数返回。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要注册事件的节点对象。 |
| [ArkUI\_NodeCustomEventType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodecustomeventtype) eventType | 需要注册的事件类型。 |
| int32\_t targetId | 自定义事件ID，当事件触发时在回调参数[ArkUI\_NodeCustomEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodecustomevent) 中携带回来。 |
| void\* userData | 自定义事件参数，当事件触发时在回调参数[ArkUI\_NodeCustomEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodecustomevent) 中携带回来。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。  [ARKUI\_ERROR\_CODE\_ATTRIBUTE\_OR\_EVENT\_NOT\_SUPPORTED](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 组件不支持该事件。 |

### unregisterNodeCustomEvent()

PhonePC/2in1TabletTVWearable



```
1. void (*unregisterNodeCustomEvent)(ArkUI_NodeHandle node, ArkUI_NodeCustomEventType eventType)
```

**描述：**

反注册自定义节点事件函数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 需要反注册事件的节点对象。 |
| [ArkUI\_NodeCustomEventType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-node-h#arkui_nodecustomeventtype) eventType | 需要反注册的事件类型。 |

### registerNodeCustomEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. void (*registerNodeCustomEventReceiver)(void (*eventReceiver)(ArkUI_NodeCustomEvent* event))
```

**描述：**

注册自定义节点事件回调统一入口函数。ArkUI框架会统一收集过程中产生的自定义组件事件并通过注册的registerNodeCustomEventReceiver函数回调给开发者。

重复调用时会覆盖前一次注册的函数。

避免直接保存[ArkUI\_NodeCustomEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodecustomevent)对象指针，数据会在回调结束后销毁。

如果需要和组件实例绑定，可以使用addNodeCustomEventReceiver函数接口。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| void (\*eventReceiver)([ArkUI\_NodeCustomEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodecustomevent)\* event) | 事件回调统一入口函数。 |

### unregisterNodeCustomEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. void (*unregisterNodeCustomEventReceiver)()
```

**描述：**

反注册自定义节点事件回调统一入口函数。

**起始版本：** 12

### setMeasuredSize()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*setMeasuredSize)(ArkUI_NodeHandle node, int32_t width, int32_t height)
```

**描述：**

在测算回调函数中设置组件的测算完成后的宽和高。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |
| int32\_t width | 设置的宽。 |
| int32\_t height | 设置的高。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### setLayoutPosition()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*setLayoutPosition)(ArkUI_NodeHandle node, int32_t positionX, int32_t positionY)
```

**描述：**

在布局回调函数中设置组件的位置。该接口优先级低于[NODE\_POSITION](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#枚举)。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |
| int32\_t positionX | x轴坐标。 |
| int32\_t positionY | y轴坐标。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### getMeasuredSize()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_IntSize (*getMeasuredSize)(ArkUI_NodeHandle node)
```

**描述：**

获取组件测算完成后的宽高尺寸。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_IntSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-intsize) | ArkUI\_IntSize 组件的宽高。 |

### getLayoutPosition()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_IntOffset (*getLayoutPosition)(ArkUI_NodeHandle node)
```

**描述：**

获取组件布局完成后该节点相对于父节点的偏移，单位为px。该偏移是父容器对该节点进行布局之后的结果，因此布局之后生效的offset属性和不参与布局的position属性不影响该偏移值。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_IntOffset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-intoffset) | ArkUI\_IntOffset 组件的位置。 |

### measureNode()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*measureNode)(ArkUI_NodeHandle node, ArkUI_LayoutConstraint* Constraint)
```

**描述：**

对目标组件进行测算，可以通过getMeasuredSize接口获取测算后的大小。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |
| [ArkUI\_LayoutConstraint](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-layoutconstraint)\* Constraint | 约束尺寸。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### layoutNode()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*layoutNode)(ArkUI_NodeHandle node, int32_t positionX, int32_t positionY)
```

**描述：**

对目标组件进行布局并传递该组件相对父组件的期望位置。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |
| int32\_t positionX | x轴坐标。 |
| int32\_t positionY | y轴坐标。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### addNodeEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*addNodeEventReceiver)(ArkUI_NodeHandle node, void (*eventReceiver)(ArkUI_NodeEvent* event))
```

**描述：**

在组件上添加组件事件回调函数，用于接受该组件产生的组件事件。不同于registerNodeEventReceiver的全局注册函数，该函数允许在同一个组件上添加多个事件接受器。

该函数添加的监听回调函数触发时机会先于registerNodeEventReceiver注册的全局回调函数。

避免直接保存[ArkUI\_NodeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodeevent) 对象指针，数据会在回调结束后销毁。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 用于添加组件事件回调函数的对象。 |
| void (\*eventReceiver)([ArkUI\_NodeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodeevent)\* event) | 组件事件回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### removeNodeEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*removeNodeEventReceiver)(ArkUI_NodeHandle node, void (*eventReceiver)(ArkUI_NodeEvent* event))
```

**描述：**

在组件上删除注册的组件事件回调函数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 用于删除组件事件回调函数的对象。 |
| void (eventReceiver)([ArkUI\_NodeEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodeevent) event) | 待删除的组件事件回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### addNodeCustomEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*addNodeCustomEventReceiver)(ArkUI_NodeHandle node, void (*eventReceiver)(ArkUI_NodeCustomEvent* event))
```

**描述：**

在组件上添加自定义事件回调函数，用于接受该组件产生的自定义事件（如布局事件，绘制事件）。不同于registerNodeCustomEventReceiver的全局注册函数，该函数允许在同一个组件上添加多个事件接受器。

该函数添加的监听回调函数触发时机会先于registerNodeCustomEventReceiver注册的全局回调函数。

避免直接保存[ArkUI\_NodeCustomEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodecustomevent)对象指针，数据会在回调结束后销毁。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 用于添加组件自定义事件回调函数的对象。 |
| void (\*eventReceiver)([ArkUI\_NodeCustomEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodecustomevent)\* event) | 组件自定义事件回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### removeNodeCustomEventReceiver()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*removeNodeCustomEventReceiver)(ArkUI_NodeHandle node, void (*eventReceiver)(ArkUI_NodeCustomEvent* event))
```

**描述：**

在组件上删除注册的自定义事件回调函数。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 用于删除组件自定义事件回调函数的对象。 |
| void (\*eventReceiver)([ArkUI\_NodeCustomEvent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-nodecustomevent)\* event) | 待删除的组件自定义事件回调函数。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### setUserData()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*setUserData)(ArkUI_NodeHandle node, void* userData)
```

**描述：**

在组件上保存自定义数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 用于保存自定义数据的组件。 |
| void\* userData | 要保存的自定义数据。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### getUserData()

PhonePC/2in1TabletTVWearable



```
1. void* (*getUserData)(ArkUI_NodeHandle node)
```

**描述：**

获取在组件上保存的自定义数据。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 保存了自定义数据的组件。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| void\* | 自定义数据。 |

### setLengthMetricUnit()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*setLengthMetricUnit)(ArkUI_NodeHandle node, ArkUI_LengthMetricUnit unit)
```

**描述：**

指定组件的单位。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 用于指定单位的组件。 |
| [ArkUI\_LengthMetricUnit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_lengthmetricunit) unit | 单位类型[ArkUI\_LengthMetricUnit](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_lengthmetricunit)，默认为 ARKUI\_LENGTH\_METRIC\_UNIT\_DEFAULT。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |

### getParent()

PhonePC/2in1TabletTVWearable



```
1. ArkUI_NodeHandle (*getParent)(ArkUI_NodeHandle node)
```

**描述：**

获取父节点。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) node | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) | 返回组件的指针，如果没有返回NULL。 |

### removeAllChildren()

PhonePC/2in1TabletTVWearable



```
1. int32_t (*removeAllChildren)(ArkUI_NodeHandle parent)
```

**描述：**

从父组件上卸载所有子节点。

**起始版本：** 12

**参数：**

展开

| 参数项 | 描述 |
| --- | --- |
| [ArkUI\_NodeHandle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-arkui-nativemodule-arkui-node8h) parent | 目标节点对象。 |

**返回：**

展开

| 类型 | 说明 |
| --- | --- |
| int32\_t | 错误码。  [ARKUI\_ERROR\_CODE\_NO\_ERROR](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 成功。  [ARKUI\_ERROR\_CODE\_PARAM\_INVALID](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-type-h#arkui_errorcode) 函数参数异常。 |