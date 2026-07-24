本模块提供Ability Kit中常用公共能力的纯类型定义，包含各类上下文对象、回调接口和数据结构。本模块仅导出类型声明，不包含具体实现逻辑或可执行代码。

说明

本模块首批接口从API version 9开始支持。后续版本的新增接口，采用上角标单独标记接口的起始版本。

## 导入模块

PhonePC/2in1TabletTVWearable



```
1. import { common } from '@kit.AbilityKit';
```

## UIAbilityContext

PhonePC/2in1TabletTVWearable

type UIAbilityContext = \_UIAbilityContext.default

[UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability)组件上下文，继承自Context。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_UIAbilityContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext) | UIAbilityContext组件上下文。 |

## AbilityStageContext

PhonePC/2in1TabletTVWearable

type AbilityStageContext = \_AbilityStageContext.default

[AbilityStage](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-abilitystage)组件上下文，继承自Context。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AbilityStageContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-abilitystagecontext) | AbilityStage组件上下文。 |

## ApplicationContext

PhonePC/2in1TabletTVWearable

type ApplicationContext = \_ApplicationContext.default

应用上下文，继承自Context。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_ApplicationContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-applicationcontext) | 应用上下文。 |

## BaseContext

PhonePC/2in1TabletTVWearable

type BaseContext = \_BaseContext.default

所有Context类型的父类。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_BaseContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-basecontext) | 所有Context的父类。 |

## Context

PhonePC/2in1TabletTVWearable

type Context = \_Context.default

[Stage模型](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ability-terminology#stage模型)的上下文基类。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_Context.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-context) | Stage模型的上下文基类。 |

## ExtensionContext

PhonePC/2in1TabletTVWearable

type ExtensionContext = \_ExtensionContext.default

[ExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-extensionability)组件上下文，继承自Context。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_ExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext) | ExtensionAbility组件上下文。 |

## FormExtensionContext

PhonePC/2in1TabletTVWearable

type FormExtensionContext = \_FormExtensionContext.default

[FormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability)组件上下文，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_FormExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-formextensioncontext) | FormExtensionAbility组件上下文。 |

## VpnExtensionContext11+

PhonePC/2in1TabletTVWearable

type VpnExtensionContext = \_VpnExtensionContext.default

[VpnExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-vpnextensionability)组件上下文，继承自Context。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_VpnExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-vpnextensioncontext) | VpnExtensionAbility组件上下文。 |

## EventHub

PhonePC/2in1TabletTVWearable

type EventHub = \_EventHub.default

EventHub是系统提供的基于发布-订阅模式实现的事件通信机制。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_EventHub.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-eventhub) | 系统提供的基于发布-订阅模式实现的事件通信机制。 |

## PacMap

PhonePC/2in1TabletTVWearable

type PacMap = \_PacMap

存储基础数据类型的容器。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

展开

| 类型 | 说明 |
| --- | --- |
| [\_PacMap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-dataabilityhelper#pacmap) | 存储基础数据类型的容器。 |

## AbilityResult

PhonePC/2in1TabletTVWearable

type AbilityResult = \_AbilityResult

定义Ability被拉起并退出后返回的结果码和数据。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AbilityResult](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-abilityresult) | 定义Ability被拉起并退出后返回的结果码和数据。 |

## AbilityStartCallback11+

PhonePC/2in1TabletTVWearable

type AbilityStartCallback = \_AbilityStartCallback

定义了拉起UIExtensionAbility的回调结果，通常作为[UIAbilityContext.startAbilityByType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startabilitybytype11)/[UIExtensionContext.startAbilityByType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensioncontentsession#startabilitybytype11)的入参传入。

**元服务API**：从API version 11开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AbilityStartCallback](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-abilitystartcallback) | 定义拉起UIExtensionAbility的回调结果。 |

## ConnectOptions

PhonePC/2in1TabletTVWearable

type ConnectOptions = \_ConnectOptions

在连接指定的后台服务时作为入参，用于接收与后台服务的连接状态。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_ConnectOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-ability-connectoptions) | 在连接指定的后台服务时作为入参，用于接收与后台服务的连接状态。 |

## UIExtensionContext10+

PhonePC/2in1TabletTVWearable

type UIExtensionContext = \_UIExtensionContext.default

[UIExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiextensionability)组件上下文，继承自Context。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_UIExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiextensioncontext) | UIExtensionAbility组件上下文。 |

## EmbeddableUIAbilityContext12+

PhonePC/2in1TabletTVWearable

type EmbeddableUIAbilityContext = \_EmbeddableUIAbilityContext.default

[EmbeddableUIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-embeddableuiability)组件上下文，继承自Context。

**元服务API**：从API version 12开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_EmbeddableUIAbilityContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/-apis-inner-application-embeddableuiabilitycontext) | EmbeddableUIAbility组件上下文。 |

## PhotoEditorExtensionContext12+

PhonePC/2in1TabletTV

type PhotoEditorExtensionContext = \_PhotoEditorExtensionContext.default

[PhotoEditorExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-photoeditorextensionability)组件上下文，继承自Context。

**系统能力**：SystemCapability.Ability.AppExtension.PhotoEditorExtension

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_PhotoEditorExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-photoeditorextensioncontext) | PhotoEditorExtensionAbility组件上下文。 |

## UIServiceProxy14+

PhonePC/2in1TabletTVWearable

type UIServiceProxy = \_UIServiceProxy.default

UIServiceProxy提供了与UIServiceExtensionAbility服务端数据通信的能力。UIServiceExtensionAbility是一类特殊的ExtensionAbility组件，这类组件由系统提供，通常用于提供浮窗组件相关扩展能力。

**元服务API**：从API version 14开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_UIServiceProxy.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiserviceproxy) | 提供与UIServiceExtensionAbility服务端数据通信的能力。 |

## UIServiceExtensionConnectCallback14+

PhonePC/2in1TabletTVWearable

type UIServiceExtensionConnectCallback = \_UIServiceExtensionConnectCallback.default

在连接指定的UIServiceExtensionAbility服务时作为入参，用于提供UIServiceExtensionAbility连接回调数据能力。

**元服务API**：从API version 14开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_UIServiceExtensionConnectCallback.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/nner-application-uiserviceextensionconnectcallback) | 提供UIServiceExtensionAbility连接回调数据能力。 |

## AppServiceExtensionContext20+

PhonePC/2in1TabletTVWearable

type AppServiceExtensionContext = \_AppServiceExtensionContext.default

[AppServiceExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-appserviceextensionability)组件上下文，继承自Context。

**系统能力**：SystemCapability.Ability.AbilityRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AppServiceExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/-apis-inner-application-appserviceextensioncontext) | AppServiceExtensionAbility组件上下文。 |

## FormEditExtensionContext22+

PhonePC/2in1TabletTVWearable

type FormEditExtensionContext = \_FormEditExtensionContext.default

[FormEditExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formeditextensionability)组件上下文，继承自[UIExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiextensioncontext)。

**元服务API**：从API version 22开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.Form

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_FormEditExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-formeditextensioncontext) | FormEditExtensionAbility组件上下文。 |

## LiveFormExtensionContext22+

PhonePC/2in1TabletTVWearable

type LiveFormExtensionContext = \_LiveFormExtensionContext.default

[LiveFormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-liveformextensionability)组件上下文，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。

**元服务API**：从API version 22开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.Form

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_LiveFormExtensionContext.default](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-application-liveformextensioncontext) | LiveFormExtensionAbility组件上下文。 |

## AgentCard24+

PhonePC/2in1TabletTVWearable

type AgentCard = \_AgentCard

[AgentCard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard)相当于Agent(智能体)的"名片"，用于描述Agent的能力和技能，由开发者在Agent的配置文件agent\_config.json中配置。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AgentRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AgentCard](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard) | Agent(智能体)的"名片"，用于描述Agent的能力和技能。 |

## AgentProvider24+

PhonePC/2in1TabletTVWearable

type AgentProvider = \_AgentProvider

[AgentProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentprovider)表示Agent的服务提供商。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AgentRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AgentProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentprovider) | Agent的服务提供商。 |

## AgentCapabilities24+

PhonePC/2in1TabletTVWearable

type AgentCapabilities = \_AgentCapabilities

[AgentCapabilities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentcapabilities)用来定义Agent支持的可选能力。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AgentRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AgentCapabilities](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentcapabilities) | 定义Agent支持的可选能力。 |

## AgentSkill24+

PhonePC/2in1TabletTVWearable

type AgentSkill = \_AgentSkill

[AgentSkill](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentskill)表示Agent可以执行的不同能力或功能。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AgentRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AgentSkill](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentskill) | 表示Agent可以执行的不同能力或功能。 |

## AgentAppInfo24+

PhonePC/2in1TabletTVWearable

type AgentAppInfo = \_AgentAppInfo

[AgentAppInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentappinfo)表示Agent所属的应用信息。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AgentRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AgentAppInfo](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentcard#agentappinfo) | Agent所属的应用信息。 |

## AgentHostProxy24+

PhonePC/2in1TabletTVWearable

type AgentHostProxy = \_AgentHostProxy

[AgentHostProxy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agenthostproxy)用于从[AgentExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-agent-agentextensionability)服务端向客户端发送数据或安全认证请求。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AgentRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AgentHostProxy](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agenthostproxy) | 用于从[AgentExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-agent-agentextensionability)服务端向客户端发送数据或安全认证请求。 |

## AgentExtensionContext24+

PhonePC/2in1TabletTVWearable

type AgentExtensionContext = \_AgentExtensionContext

[AgentExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentextensioncontext)是[AgentExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-agent-agentextensionability)的上下文环境，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。

**元服务API**：从API version 24开始，该接口支持在元服务中使用。

**系统能力**：SystemCapability.Ability.AgentRuntime.Core

**模型约束**：此接口仅可在Stage模型下使用。

展开

| 类型 | 说明 |
| --- | --- |
| [\_AgentExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-agentextensioncontext) | [AgentExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-agent-agentextensionability)的上下文环境，继承自[ExtensionContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-extensioncontext)。 |

**示例：**



```
1. import { common } from '@kit.AbilityKit';

3. let uiAbilityContext: common.UIAbilityContext;
4. let abilityStageContext: common.AbilityStageContext;
5. let applicationContext: common.ApplicationContext;
6. let baseContext: common.BaseContext;
7. let context: common.Context;
8. let uiExtensionContext: common.UIExtensionContext;
9. let extensionContext: common.ExtensionContext;
10. let formExtensionContext: common.FormExtensionContext;
11. let vpnExtensionContext: common.VpnExtensionContext;
12. let eventHub: common.EventHub;
13. let pacMap: common.PacMap;
14. let abilityResult: common.AbilityResult;
15. let abilityStartCallback: common.AbilityStartCallback;
16. let connectOptions: common.ConnectOptions;
17. let embeddableUIAbilityContext: common.EmbeddableUIAbilityContext;
18. let photoEditorExtensionContext: common.PhotoEditorExtensionContext;
19. let uiServiceProxy : common.UIServiceProxy;
20. let uiServiceExtensionConnectCallback : common.UIServiceExtensionConnectCallback;
21. let appServiceExtensionContext : common.AppServiceExtensionContext;
22. let formEditExtensionContext : common.FormEditExtensionContext;
23. let liveFormExtensionContext : common.LiveFormExtensionContext;
24. let agentCard: common.AgentCard;
25. let agentProvider: common.AgentProvider;
26. let agentCapabilities: common.AgentCapabilities;
27. let agentSkill: common.AgentSkill;
28. let agentAppInfo: common.AgentAppInfo;
29. let agentHostProxy: common.AgentHostProxy;
30. let agentExtensionContext: common.AgentExtensionContext;
```