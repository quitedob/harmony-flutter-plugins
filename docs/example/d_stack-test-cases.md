# d_stack L0 黑盒测试用例

## 摘要

- 模块数：7
- 测试用例总数：23
- 级别分布：L0:23, L1:0, L2:0
- 自动化覆盖率：91%

## 生成范围

- 插件：`d_stack`
- 用例生成级别：`L0`
- 输入测试点：`.ohos-adaptation/01-test-points.json`
- 输出 JSON：`.ohos-adaptation/04-test-cases.json`
- 设计原则：所有用例均为黑盒视角，仅基于公开 Dart API、`d_stack` MethodChannel 方法名/参数/返回值、公开 observer 回调、可观察页面状态和节点列表结果断言。

## 模块 F-01 初始化与路由注册

| 用例 ID | 来源测试点 | Level | 标题 | 自动化 | 黑盒判定依据 |
|---|---|---|---|---|---|
| TC-F01-L0-001 | TP-F01-L0-001 | L0 | 注册页面 builder 后可按 route 构建页面 | automatable | 以公开 register/pageBuilder API 返回值和可渲染页面作为断言 |
| TC-F01-L0-002 | TP-F01-L0-002 | L0 | MaterialApp 可挂载 navigatorKey 与 dStackNavigatorObserver | automatable | 以页面可见性、导航 Future 结果和公开 observer 挂载行为作为断言 |
| TC-F01-L0-003 | TP-F01-L0-003 | L0 | DStackWidget 设置首页路由并展示首页内容 | automatable | 以可观察 Widget 内容、homePageRoute 公开状态和无异常渲染作为断言 |

### TC-F01-L0-001 注册页面 builder 后可按 route 构建页面

- 前置条件：测试工程可引用 d_stack Dart API；准备 home 与 page2 两个公开 WidgetBuilder。
- 步骤 1：调用 DStack.instance.register 注册 home 与 page2 builders。预期：注册调用不抛异常。
- 步骤 2：通过 DStack.instance.pageBuilder('page2') 获取构建器并执行构建。预期：返回可执行 WidgetBuilder，目标页面可渲染。
- 步骤 3：观察 routeName、params 与页面显示结果。预期：routeName 与 params 按公开契约传递，不出现 not in the PageRoute 异常。
- 预期结果：已注册 route 可成功构建目标页面且不抛异常。

### TC-F01-L0-002 MaterialApp 可挂载 navigatorKey 与 dStackNavigatorObserver

- 前置条件：测试应用使用 MaterialApp；已注册至少两个 Flutter 页面 route。
- 步骤 1：将 DStack.instance.navigatorKey 配置到 MaterialApp.navigatorKey。预期：应用启动并显示首页。
- 步骤 2：将 DStack.instance.dStackNavigatorObserver 加入 navigatorObservers。预期：observer 可被 MaterialApp 接收且不为空。
- 步骤 3：通过公开导航 API 执行 push 与 pop。预期：页面切换可观察，导航操作不因 key 或 observer 配置失败。
- 预期结果：Navigator 可正常显示和切换页面，observer 可参与路由变化监听。

### TC-F01-L0-003 DStackWidget 设置首页路由并展示首页内容

- 前置条件：准备可识别文本的 HomePage Widget；测试环境可读取 DStack.instance.homePageRoute。
- 步骤 1：创建 DStackWidget(homePage: HomePage(), homePageRoute: 'home') 并渲染。预期：HomePage 内容可见。
- 步骤 2：读取 DStack.instance.homePageRoute。预期：值为 home。
- 步骤 3：创建无 homePage 的 DStackWidget 并渲染。预期：不崩溃，显示默认空白容器。
- 预期结果：首页路由状态正确，带首页和空首页两种场景均符合公开 UI 行为。

## 模块 F-02 混合页面跳转与节点同步

| 用例 ID | 来源测试点 | Level | 标题 | 自动化 | 黑盒判定依据 |
|---|---|---|---|---|---|
| TC-F02-L0-001 | TP-F02-L0-001 | L0 | DStack.push 打开 Flutter 页面并同步节点 | automatable | 以公开页面可见性和 MethodChannel 方法名/参数作为断言 |
| TC-F02-L0-002 | TP-F02-L0-002 | L0 | DStack.push 打开 Native 页面仅同步节点请求 | automatable | 以 Flutter 可见栈变化和 Channel 入参作为断言 |
| TC-F02-L0-003 | TP-F02-L0-003 | L0 | Native 通过 sendActionToFlutter 打开 Flutter 页面 | semi_automatable | 以原生可发起的 Channel 调用结果、Flutter 页面可见性和公开参数传递作为断言 |

### TC-F02-L0-001 DStack.push 打开 Flutter 页面并同步节点

- 前置条件：已注册 page2 Flutter 页面；测试端可拦截 d_stack MethodChannel 调用。
- 步骤 1：调用 DStack.push('page2', PageType.flutter, params: {'id': 1}, animated: true)。预期：page2 页面进入 Flutter 导航栈并可见。
- 步骤 2：记录 d_stack Channel 调用。预期：存在 sendNodeToNative 调用。
- 步骤 3：校验 Channel 参数字段。预期：pageType 为 flutter，action 为 push，params.id 为 1，animated 为 true。
- 预期结果：Flutter 页面入栈，节点动作通过 sendNodeToNative 原样同步。

### TC-F02-L0-002 DStack.push 打开 Native 页面仅同步节点请求

- 前置条件：测试端可拦截 d_stack MethodChannel 调用；记录当前 Flutter route 数量。
- 步骤 1：调用 DStack.push('nativeRoute', PageType.native, params: {'from': 'flutter'})。预期：调用返回 Future 或完成异步请求，不创建同名 Flutter 页面。
- 步骤 2：检查 Flutter Navigator 可见页面和 route 数量。预期：Flutter 栈不直接新增 nativeRoute。
- 步骤 3：校验 d_stack Channel 参数。预期：sendNodeToNative 的 pageType 为 native，target 为 nativeRoute，params.from 为 flutter。
- 预期结果：Native 页面请求仅通过 Channel 同步，Flutter 栈不直接新增 nativeRoute。

### TC-F02-L0-003 Native 通过 sendActionToFlutter 打开 Flutter 页面

- 前置条件：已注册目标 Flutter route；测试宿主可向 d_stack 发起 sendActionToFlutter 调用。
- 步骤 1：从原生或 Channel 测试桩调用 sendActionToFlutter，传入 action: push 与 flutter 节点数组。预期：Dart 侧接收调用且不报未实现。
- 步骤 2：观察 Flutter 页面栈。预期：目标 route 入栈并显示。
- 步骤 3：校验页面接收到的 route 与 params。预期：节点字段无丢失，params 与入参一致。
- 预期结果：Native 反向调用可驱动 Flutter 打开目标页面并保留节点字段。

## 模块 F-03 返回、移除与结果回传

| 用例 ID | 来源测试点 | Level | 标题 | 自动化 | 黑盒判定依据 |
|---|---|---|---|---|---|
| TC-F03-L0-001 | TP-F03-L0-001 | L0 | pop 返回上一页并回传 result Map | automatable | 以可见页面、Future 返回值和 Channel 出参作为断言 |
| TC-F03-L0-002 | TP-F03-L0-002 | L0 | maybePop 尊重当前 Route willPop 结果 | automatable | 以公开 maybePop 返回值、页面可见性和节点同步结果作为断言 |
| TC-F03-L0-003 | TP-F03-L0-003 | L0 | popTo、popSkip、dismiss、popToRoot 返回动作语义正确 | automatable | 以公开 API 调用后的页面状态、节点列表和 Channel action 字段作为断言 |

### TC-F03-L0-001 pop 返回上一页并回传 result Map

- 前置条件：Flutter 页面栈至少两层；上一页等待 push 返回结果；测试端可记录 d_stack Channel 调用。
- 步骤 1：在顶层页面调用 DStack.pop(result: {'ok': true}, animated: true)。预期：顶层页面关闭，上一页恢复可见。
- 步骤 2：读取上一页收到的 Future 结果。预期：结果 Map 中 ok 为 true。
- 步骤 3：校验节点同步调用。预期：Channel 参数包含 pop 动作、result/params 与 animated 字段。
- 预期结果：页面返回、result 回传和节点同步三者一致。

### TC-F03-L0-002 maybePop 尊重当前 Route willPop 结果

- 前置条件：准备可配置 willPop 允许/拒绝的测试页面；测试端可观察页面是否返回。
- 步骤 1：在 willPop 允许返回的页面调用 DStack.maybePop(result: {'ok': true})。预期：返回 true，页面关闭。
- 步骤 2：在 willPop 拒绝返回的页面调用 DStack.maybePop(result: {'ok': false})。预期：返回 false，页面保持可见。
- 步骤 3：观察拒绝返回场景的节点同步。预期：不产生错误的节点移除结果。
- 预期结果：maybePop 返回值与实际导航行为一致。

### TC-F03-L0-003 popTo、popSkip、dismiss、popToRoot 返回动作语义正确

- 前置条件：构造多层 Flutter/Native 混合节点栈；测试端可读取最终可见页面和 Channel 参数。
- 步骤 1：分别调用 popTo、popSkip、dismiss、popToRoot 并记录每次起始栈。预期：每个调用均完成或返回公开错误结果。
- 步骤 2：观察每次调用后的最终可见页面。预期：最终页面符合目标 route、跳过 route、modal 关闭或根页面语义。
- 步骤 3：校验每次 Channel 节点动作。预期：action 字段分别匹配对应公开 API，节点栈不包含应移除页面。
- 预期结果：四类返回动作的页面结果与节点动作语义一致。

## 模块 F-04 生命周期与节点观察

| 用例 ID | 来源测试点 | Level | 标题 | 自动化 | 黑盒判定依据 |
|---|---|---|---|---|---|
| TC-F04-L0-001 | TP-F04-L0-001 | L0 | sendLifeCycle 分发应用前后台与创建事件 | automatable | 以 MethodChannel 入参和公开生命周期 observer 回调作为断言 |

### TC-F04-L0-001 sendLifeCycle 分发应用前后台与创建事件

- 前置条件：已注册 DLifeCycleObserver；测试宿主可通过 d_stack 调用 sendLifeCycle。
- 步骤 1：通过 d_stack 调用 sendLifeCycle，传入 application create 生命周期 Map。预期：observer 收到 appDidStart 回调。
- 步骤 2：继续传入 foreground 与 background 生命周期 Map。预期：observer 分别收到 appDidEnterForeground 与 appDidEnterBackground 回调。
- 步骤 3：校验回调 PageModel 字段。预期：状态与输入一一对应，页面字段无丢失。
- 预期结果：应用生命周期事件可通过公开 observer 回调被业务侧观察。

## 模块 F-05 节点模型与数据序列化

| 用例 ID | 来源测试点 | Level | 标题 | 自动化 | 黑盒判定依据 |
|---|---|---|---|---|---|
| TC-F05-L0-001 | TP-F05-L0-001 | L0 | DNode Map 与对象双向序列化保持字段兼容 | automatable | 以公开模型 fromJson/toJson 或等效 Map 输入输出字段作为断言 |
| TC-F05-L0-002 | TP-F05-L0-002 | L0 | nodeList 从原生读取并解析为 DStackNode 列表 | automatable | 以公开 nodeList 返回列表、顺序和字段值作为断言 |

### TC-F05-L0-001 DNode Map 与对象双向序列化保持字段兼容

- 前置条件：准备包含 target、action、params、pageType、homePage、animated、boundary、identifier 的节点 Map。
- 步骤 1：使用公开模型构造或解析完整节点 Map。预期：pageType native/flutter 可被识别。
- 步骤 2：将节点对象重新序列化为 Map。预期：输出 Map 包含输入关键字段。
- 步骤 3：对比输入与输出的公开字段值。预期：target、action、params、pageType、homePage、animated、boundary、identifier 不丢失。
- 预期结果：DNode 公开 Map 契约可往返，字段和枚举字符串保持兼容。

### TC-F05-L0-002 nodeList 从原生读取并解析为 DStackNode 列表

- 前置条件：测试端可模拟 sendNodeList 返回值；准备包含 route 与 pageType 的 List<Map>。
- 步骤 1：调用 DStack.instance.nodeList() 并让 Channel 返回两个节点 Map。预期：API 返回 DStackNode 列表。
- 步骤 2：校验列表顺序和字段。预期：route 与 pageType 和原生返回一致。
- 步骤 3：让 Channel 返回非 List 值后再次调用 nodeList()。预期：按契约返回空列表且不崩溃。
- 预期结果：nodeList 可解析合法节点列表，非 List 返回按兼容契约处理为空列表。

## 模块 F-06 转场与手势返回

| 用例 ID | 来源测试点 | Level | 标题 | 自动化 | 黑盒判定依据 |
|---|---|---|---|---|---|
| TC-F06-L0-001 | TP-F06-L0-001 | L0 | animatedFlutterPage 按 TransitionType 创建页面转场 | semi_automatable | 以页面可见性、自定义 builder 可观察调用和 Channel 参数作为断言 |

### TC-F06-L0-001 animatedFlutterPage 按 TransitionType 创建页面转场

- 前置条件：已注册 pageAnim 页面；测试应用可观察页面进入效果或自定义 transitionsBuilder 调用。
- 步骤 1：分别使用 fadeIn、material、cupertino 调用 DStack.animatedFlutterPage('pageAnim')。预期：目标页面可进入并显示。
- 步骤 2：使用 custom 转场并传入可记录调用的 transitionsBuilder。预期：custom builder 被调用。
- 步骤 3：检查节点同步结果。预期：转场类型不影响 sendNodeToNative 的目标 route 与节点字段。
- 预期结果：内置和自定义转场均可打开页面，节点同步不受转场影响。

## 模块 F-07 Channel 兼容契约

| 用例 ID | 来源测试点 | Level | 标题 | 自动化 | 黑盒判定依据 |
|---|---|---|---|---|---|
| TC-F07-L0-001 | TP-F07-L0-001 | L0 | MethodChannel 名称固定为 d_stack | automatable | 以 MethodChannel 名称和公开 API 可调用性作为断言 |
| TC-F07-L0-002 | TP-F07-L0-002 | L0 | sendNodeToNative 方法契约兼容 | automatable | 以 Channel 方法名、参数字段和值作为断言 |
| TC-F07-L0-003 | TP-F07-L0-003 | L0 | sendRemoveFlutterPageNode 方法契约兼容 | automatable | 以页面关闭结果和 Channel 方法名/调用次数/参数作为断言 |
| TC-F07-L0-004 | TP-F07-L0-004 | L0 | sendNodeList 方法契约兼容 | automatable | 以公开 nodeList 返回值和 Channel 方法名作为断言 |
| TC-F07-L0-005 | TP-F07-L0-005 | L0 | sendHomePageRoute 方法契约兼容 | automatable | 以公开首页路由状态和 Channel 方法名/参数字段作为断言 |
| TC-F07-L0-006 | TP-F07-L0-006 | L0 | sendUpdateBoundaryNode 方法契约兼容 | automatable | 以边界页面可见性、Channel 方法名和 identifier 参数作为断言 |
| TC-F07-L0-007 | TP-F07-L0-007 | L0 | sendActionToFlutter 反向调用契约兼容 | automatable | 以反向 Channel 入参、页面可见结果和动作语义作为断言 |
| TC-F07-L0-008 | TP-F07-L0-008 | L0 | sendLifeCycle 反向调用契约兼容 | automatable | 以反向 Channel 入参和公开 observer 回调作为断言 |
| TC-F07-L0-009 | TP-F07-L0-009 | L0 | sendOperationNodeToFlutter 反向调用契约兼容 | automatable | 以 MethodChannel 入参和公开 DNodeObserver 回调内容作为断言 |
| TC-F07-L0-010 | TP-F07-L0-010 | L0 | getPlatformVersion 兼容残留方法 | automatable | 以 Channel 调用返回或 notImplemented 结果，以及核心方法后续可用性作为断言 |

### TC-F07-L0-001 MethodChannel 名称固定为 d_stack

- 前置条件：测试环境可拦截插件 MethodChannel 调用；初始化 DStack.instance。
- 步骤 1：触发任一公开 API 产生 Channel 调用。预期：调用发送到 d_stack Channel。
- 步骤 2：校验 Channel 名称。预期：名称逐字为 d_stack。
- 步骤 3：在 OHOS 适配环境重复调用。预期：不存在平台特定 Channel 名称变化。
- 预期结果：Dart 与原生端使用完全一致的 d_stack Channel 名称。

### TC-F07-L0-002 sendNodeToNative 方法契约兼容

- 前置条件：测试端可记录 d_stack Channel 调用；准备可触发 push/present/pop/replace 的页面。
- 步骤 1：通过公开导航 API 发起节点动作。预期：Channel 调用方法名为 sendNodeToNative。
- 步骤 2：检查调用参数 Map。预期：包含 target、pageType、action、params、homePage、boundary、animated 或 identifier 等公开字段。
- 步骤 3：对比业务传入 params。预期：params 原样传递。
- 预期结果：sendNodeToNative 方法名和节点动作 Map 与公开契约兼容。

### TC-F07-L0-003 sendRemoveFlutterPageNode 方法契约兼容

- 前置条件：Flutter 页面已入栈；测试端可记录 d_stack Channel 调用。
- 步骤 1：执行 Flutter Route pop 或可观察的返回操作。预期：页面关闭。
- 步骤 2：记录节点移除 Channel 调用。预期：方法名为 sendRemoveFlutterPageNode。
- 步骤 3：校验参数结构。预期：参数可标识被移除 Flutter 页面，且不产生重复移除调用。
- 预期结果：Flutter 页面移除通过 sendRemoveFlutterPageNode 以兼容参数同步。

### TC-F07-L0-004 sendNodeList 方法契约兼容

- 前置条件：测试端可模拟 d_stack sendNodeList 返回；准备合法 List<Map> 节点数组。
- 步骤 1：调用 DStack.instance.nodeList()。预期：Channel 方法名为 sendNodeList。
- 步骤 2：返回包含多个节点的 List<Map>。预期：Dart API 返回同顺序 DStackNode 列表。
- 步骤 3：校验 route 与 pageType。预期：字段可正确解析。
- 预期结果：sendNodeList 方法名固定，List<Map> 返回可被正确解析。

### TC-F07-L0-005 sendHomePageRoute 方法契约兼容

- 前置条件：测试端可记录 d_stack Channel 调用；准备 homePageRoute 为 home 的首页配置。
- 步骤 1：设置 DStack.instance.homePageRoute = 'home' 或渲染 DStackWidget(homePageRoute: 'home')。预期：首页路由状态为 home。
- 步骤 2：记录 Channel 调用。预期：存在 sendHomePageRoute 调用。
- 步骤 3：校验参数。预期：参数字段名为 homePageRoute，值为 home。
- 预期结果：首页路由通过 sendHomePageRoute 以 homePageRoute 字段同步。

### TC-F07-L0-006 sendUpdateBoundaryNode 方法契约兼容

- 前置条件：Native 打开 Flutter 边界页面场景可模拟；测试端可记录 d_stack Channel 调用。
- 步骤 1：模拟边界 Flutter 页面获得实际 route identifier。预期：边界页面保持可见。
- 步骤 2：触发边界节点更新。预期：Channel 方法名为 sendUpdateBoundaryNode。
- 步骤 3：校验参数中的边界节点标识。预期：identifier 可用于后续 pop 或 gesture 匹配对应节点。
- 预期结果：边界节点 identifier 可通过 sendUpdateBoundaryNode 回填。

### TC-F07-L0-007 sendActionToFlutter 反向调用契约兼容

- 前置条件：测试宿主可通过 d_stack 反向调用 Dart；已注册用于动作验证的 Flutter 页面。
- 步骤 1：调用 sendActionToFlutter，传入 nodes、action、animated。预期：Dart 侧接受方法调用。
- 步骤 2：分别验证 push、popTo 或 replace 等代表性动作。预期：Flutter 页面结果符合 action 语义。
- 步骤 3：校验节点字段。预期：nodes/action/animated 完整解析。
- 预期结果：sendActionToFlutter 可按反向契约驱动 Flutter 导航。

### TC-F07-L0-008 sendLifeCycle 反向调用契约兼容

- 前置条件：已注册生命周期 observer；测试宿主可调用 sendLifeCycle。
- 步骤 1：调用 sendLifeCycle，传入 page Map。预期：页面生命周期回调可收到 page 信息。
- 步骤 2：调用 sendLifeCycle，传入 application Map。预期：应用生命周期回调可收到 application 状态。
- 步骤 3：同时传入 page 与 application Map。预期：两类数据均按契约处理，不互相破坏。
- 预期结果：sendLifeCycle 方法名和 page/application 数据结构保持兼容。

### TC-F07-L0-009 sendOperationNodeToFlutter 反向调用契约兼容

- 前置条件：已注册 DNodeObserver；测试宿主可调用 sendOperationNodeToFlutter。
- 步骤 1：通过 d_stack 调用 sendOperationNodeToFlutter 并传入单节点 Map。预期：Dart 侧接受方法调用。
- 步骤 2：观察 DNodeObserver.operationNode 回调。预期：收到一次节点回调。
- 步骤 3：对比回调节点字段。预期：节点 Map 内容不被重命名，字段值与入参一致。
- 预期结果：节点观察反向调用可把原始节点 Map 传递给业务 observer。

### TC-F07-L0-010 getPlatformVersion 兼容残留方法

- 前置条件：测试端可直接调用 d_stack MethodChannel；主链路 8 个 Channel 方法已可单独验证。
- 步骤 1：调用 d_stack 的 getPlatformVersion。预期：返回版本字符串或明确 notImplemented 兼容结果。
- 步骤 2：继续调用核心导航或节点方法。预期：主链路不受 getPlatformVersion 结果影响。
- 步骤 3：记录平台兼容决策。预期：方法名保留，行为与 PRD 三端差异预期一致。
- 预期结果：getPlatformVersion 残留方法有明确兼容行为且不影响主链路。
