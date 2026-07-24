---
name: harmonyos-docs-lookup
description: HarmonyOS官方文档快速查找Skill。在skill内部的references文件夹（包含2860个markdown文件）中高效检索开发文档、API参考、开发指导、常见问题等。使用三步查找法：先文件名匹配缩小范围，再内容搜索精确定位，最后读取目标文件。当用户开发HarmonyOS应用或插件时使用，适合API用法、功能实现、错误排查、Kit介绍、组件使用等任何需要查阅官方文档的情况。触发关键词：HarmonyOS开发、鸿蒙开发、鸿蒙适配、鸿蒙文档、ArkTS开发指导、@ohos API、Kit文档、组件用法、错误码查询、开发指南、如何实现、常见问题等。
---

# HarmonyOS官方文档快速查找

本skill帮助你在HarmonyOS官方文档markdown文件中高效定位所需内容。文档位于skill内部的`references/`文件夹，包含约2860个markdown文件。核心原则：**避免大量读取，优先使用文件过滤和内容搜索工具**。
## 为什么需要这个查找策略？

传统方法是逐个读取文件或盲目搜索，这在2860个文件中极其低效。正确的做法是：
1. 利用文件名本身就包含丰富主题信息这一特点，先用**文件名快速过滤**（把候选集从2860缩小到10-50个）
2. 在少数候选文件中进行**内容关键词搜索**（进一步缩小到1-5个）
3. 最后才**精确读取**目标文件

这样可以把查找时间从"需要读取数百个文件"降低到"只需读取几个文件"。

## 文档位置

HarmonyOS官方文档markdown文件位于skill内部的**`references/`文件夹**。

在本`SKILL.md`中，`references/...`表示**相对于当前skill base directory的逻辑路径**，不是相对于用户当前工作目录的路径。

实际调用工具前，先按以下规则处理路径：
- 先将`references/...`解析到当前skill目录下
- 如果工具明确支持按skill目录解析相对路径，可直接传`references/...`
- 如果工具按当前工作目录解析相对路径，则传入当前skill中对应文件或目录的绝对路径，避免误到用户当前目录（如`D:\references\...`）查找

因此，查找与读取时遵循：
- 文件名匹配时：在当前skill的`references/`下匹配`*关键词*.md`
- 内容搜索时：仅在当前skill的`references/`或候选文件集合中搜索关键词
- 读取文档时：读取解析后的`references/文档名.md`；必要时传绝对路径

## 强烈建议使用：API 相关文档搜索脚本

**查找文档时强烈建议先用脚本，脚本结果不满足时再使用三步查找法。**

### 脚本用途

根据 API 名称自动搜索所有相关文档，按优先级排序，帮助快速筛选最佳实践。

**核心价值**：不只搜索 API 签名，自动搜出最佳实践文档。

### 调用方式

```bash
# 单个或多个 API（空格分隔）
python scripts/search_api_related_docs.py PinchGesture PanGesture Image

# JSON 输出
python scripts/search_api_related_docs.py PinchGesture --json
```

### 输出示例

```
输入 API: PinchGesture, PanGesture, Image

| 优先级 | 类型 | 匹配API数 | 文件名 | 匹配的API |
|--------|------|-----------|--------|----------|
| 8 | 最佳实践 | 3 | 图片预览器.md | PinchGesture, PanGesture, Image |
| 5 | 最佳实践 | 1 | 单一手势.md | PinchGesture |

**推荐**：图片预览器.md（匹配 3 个 API，包含完整实现）
```

### 优先级排序规则

| 类型 | 优先级 | 判断条件 | 包含内容 |
|------|--------|----------|----------|
| **最佳实践** | 5 | 文件名含 "最佳实践"、"实践"、"预览器"、"示例"、"场景化"、"解决方案" | 完整实现代码 + 正确用法 |
| **开发指导** | 4 | 文件名含 "(ArkTS)"、"(C_C++)"、"开发指导" | 开发步骤 + 示例 |
| **常见问题** | 3 | 文件名含 "常见问题"、"如何"、"FAQ" | 问题原因 + 解决方案 |
| **概述** | 2 | 文件名含 "简介"、"概述" | 功能介绍 |
| **API参考** | 1 | 其他 | API 签名（不含正确用法） |

### 查找流程

1. **必须先用脚本**：调用脚本获取相关文档列表
2. **优先读取最佳实践**：读取优先级最高的「最佳实践」类型文档
3. **脚本结果不满足时才用三步法**：如果脚本找不到相关文档，再使用下文的三步查找法手动搜索

### 重要提示

**最佳实践与 API 签名是互补的，都要参考：**

- `PinchGesture` API 参考 → 接口定义、参数类型、返回值
- `图片预览器.md` 最佳实践 → 缩放中心计算公式、边界处理、性能优化

脚本按优先级排序，优先展示最佳实践文档。但完整实现需要结合两者：
1. 先看最佳实践理解正确用法
2. 再查 API 签名确认接口细节

---

## 三步查找法详解

### 第一步：文件名快速过滤（使用文件名匹配工具）

**目的**：从2860个文件中快速筛选出10-50个候选文件

**方法**：根据查询主题，使用支持通配符或glob的工具匹配文件名模式。匹配模式中的`references/...`先按当前skill目录解析；如果工具按cwd解析，则改用绝对路径。

**常见文件名模式**：
```
@装饰器名装饰器：说明.md          # 状态管理装饰器（如@State、@Link）
Kit名简介.md                      # Kit介绍文档
功能名(ArkTS).md                  # ArkTS开发指导
功能名(C_C++).md                  # C/C++开发指导
组件名.md                         # UI组件文档（如Button、Text）
Kit名（服务名）.md                # Kit完整名称文档
错误码 原因.md                    # 错误码说明文档
如何...md                         # 常见问题解答
...常见问题.md                    # FAQ文档
...概述.md                        # 功能概述文档
...开发指导(ArkTS).md            # 开发步骤指导
使用...实现...md                  # 实践示例文档
```

**文件名匹配示例**：
- 查找相机功能 → 匹配`references/*相机*.md`
- 查找音频播放 → 匹配`references/*音频播放*.md`或`references/*AudioRenderer*.md`
- 查找@State装饰器 → 匹配`references/@State*.md`
- 查找Button组件 → 匹配`references/*Button*.md`
- 查找错误码401 → 匹配`references/401*.md`
- 查找Camera Kit → 匹配`references/*Camera Kit*.md`
- 查找网络开发 → 匹配`references/*网络*.md`
- 查找WebView → 匹配`references/*Web组件*.md`或`references/*WebView*.md`

### 第二步：内容关键词搜索（使用内容搜索工具）

**目的**：在10-50个候选文件中搜索内容关键词，缩小到1-5个最相关文件

**方法**：使用grep或全文搜索类工具搜索特定API、方法名、错误信息等精确关键词。优先限制在候选文件内搜索，不要依赖某个固定工具的参数格式。

**何时使用**：
- 第一步筛选后仍有多个候选文件
- 需要查找特定API方法、属性、错误码等
- 文件名匹配不够精确时

**内容搜索示例**：
- 查找`getCameraManager`方法 → 在`references/*相机*.md`中搜索`getCameraManager`
- 查找`AudioRenderer`创建方法 → 在`references/*AudioRenderer*.md`中搜索`create`
- 查找特定错误信息 → 在相关文档中搜索错误关键词
- 查找`@ohos.multimedia.camera`导入 → 在相机文档中搜索`import`

### 第三步：精确读取（使用读取工具）

**目的**：读取最终确定的1-3个最相关文件，获取完整信息

**方法**：读取最终确定的目标文件。读取前先将逻辑路径解析到当前skill目录；如果读取工具按cwd解析相对路径，则改用绝对路径。

**注意**：
- 只读取经过前两步筛选后的文件，不要盲目读取
- 如果需要查看特定章节，使用offset和limit参数分段读取
- 优先读取文件开头（概述部分）和中间的示例代码部分

## 主题关键词索引表

这是快速查找的关键：**知道什么主题用什么关键词搜索**

### ArkTS开发主题

| 主题 | 推荐文件名关键词 | 内容关键词示例 |
|------|------------------|----------------|
| 状态管理 | `@State`, `@Link`, `@Prop`, `@Observed`, `状态管理` | 状态变量、装饰器、同步 |
| UI组件 | `Button`, `Text`, `List`, `Grid`, `Swiper`, `Progress` | 组件名、属性、方法 |
| 路由导航 | `页面路由`, `路由`, `router` | pushUrl、replaceUrl、back |
| 动画 | `动画`, `属性动画`, `转场` | animateTo、animation |
| Lottie | `Lottie-` | LottieView、loadAnimation、@ohos/lottie-turbo、@ohos/lottie |
| 手势交互 | `手势`, `拖拽`, `绑定手势` | gesture、GestureEvent |
| 布局 | `布局`, `线性布局`, `弹性布局`, `层叠布局`, `Flex`, `Stack` | Row、Column、Flex |
| 弹窗 | `弹窗`, `弹出框`, `Dialog`, `CustomDialog` | showDialog、CustomDialog |

### 系统能力主题

| 主题 | 推荐文件名关键词 | 内容关键词示例 |
|------|------------------|----------------|
| 相机 | `相机`, `Camera`, `拍照`, `录像` | CameraManager、CameraInput、preview |
| 音频 | `音频`, `Audio`, `AudioRenderer`, `播放`, `录制` | AudioRenderer、create、start |
| 视频 | `视频`, `Video`, `播放`, `AVPlayer` | AVPlayer、AVRecorder |
| 网络 | `网络`, `HTTP`, `WebSocket`, `Socket` | http.request、WebSocket |
| 存储 | `数据库`, `存储`, `Preferences`, `键值`, `关系型` | RdbStore、Preferences |
| 文件 | `文件`, `文件管理`, `沙箱` | fileIo、FilePicker |
| 位置 | `位置`, `定位`, `地理围栏`, `geoLocationManager` | getCurrentLocation |
| 传感器 | `传感器`, `Sensor` | sensor.on、subscribe |

### Kit服务主题

| 主题 | 推荐文件名关键词 | 内容关键词示例 |
|------|------------------|----------------|
| Account Kit | `Account Kit`, `账号`, `华为账号`, `登录`, `一键登录` | Account Kit、login |
| Ads Kit | `Ads Kit`, `广告` | Ads Kit、BannerAd |
| AppGallery Kit | `AppGallery`, `应用市场` | AppGallery Kit、评论 |
| Wallet Kit | `Wallet Kit`, `卡券`, `支付` | Wallet Kit、卡券 |
| Notification Kit | `通知`, `Notification`, `推送` | Notification Kit、publish |
| App Linking | `App Linking`, `链接` | App Linking、link |

### 常见问题主题

| 主题 | 推荐文件名关键词 | 内容关键词示例 |
|------|------------------|----------------|
| 错误码查询 | `错误码`（如401、1001500001等） | 错误码、解决办法、可能原因 |
| 权限问题 | `权限`, `申请权限`, `授权` | permission、requestPermission |
| 权限详情查询 | **直接读取 `references/permissions_full.json`** | 权限名称、类型、授权方式、版本、描述 |
| 性能问题 | `性能`, `优化`, `卡顿` | 性能优化、检测 |
| 编译问题 | `编译`, `打包`, `签名` | 编译失败、签名 |
| 运行时问题 | `常见问题`, `如何解决`, `FAQ` | 具体错误信息 |

### 专项功能主题

| 主题 | 推荐文件名关键词 | 内容关键词示例 |
|------|------------------|----------------|
| AR/VR | `AR`, `AR Engine` | AR Engine、ARSession |
| 安全 | `安全`, `加密`, `密钥`, `权限` | Cipher、Key、加密 |
| 无障碍 | `无障碍`, `Accessibility` | Accessibility、accessibility |
| 多语言 | `多语言`, `国际化` | i18n、Localization |
| 分布式 | `分布式`, `跨设备` | distributed、跨设备 |

### Lottie 动画（社区扩展文档）

文件名均以 **`Lottie-`** 开头，与官方文档区分。来源：[lottie_turbo](https://gitcode.com/CPF-ApplicationTPC/lottie_turbo)、[lottieArkTS](https://gitcode.com/CPF-ApplicationTPC/lottieArkTS)。

| 文件 | 用途 |
|------|------|
| `Lottie-库选型与迁移指南.md` | 两库对比、选型、最小迁移（**不确定用哪个库时先读**） |
| `Lottie-@ohos-lottie-turbo开发指南.md` | `@ohos/lottie-turbo` 声明式 `LottieView` 完整说明 |
| `Lottie-@ohos-lottie-ArkTS开发指南.md` | `@ohos/lottie` Canvas + `loadAnimation` 完整说明 |
| `Lottie-@ohos-lottie-turbo-API类型声明.d.ts` | turbo API 类型 |
| `Lottie-@ohos-lottie-ArkTS-API类型声明.d.ts` | ArkTS 版 API 类型 |

**选型原则**：新项目优先 **lottie-turbo**；已有 Canvas + `loadAnimation` 代码用 **lottieArkTS** 或按迁移指南升级。

**查找示例**：
- 文件名过滤：`references/Lottie-*.md` 或 `references/Lottie-*turbo*`
- 官方文档中仅有少量 Lottie 提及（如 Canvas 绘制），**Lottie 专项实现以 `Lottie-` 文档为准**

## 查找流程示例

### 示例1：查找相机拍照功能

**用户问题**：如何在HarmonyOS应用中实现相机拍照功能？

**查找流程**：
1. 文件名过滤：在`references/`下匹配`*相机*.md`或`*拍照*.md`
   - 结果：约10-15个文件（相机管理、拍照、相机开发指导等）
2. 内容搜索：在候选文件中搜索`拍照`
   - 结果：2-3个最相关文件
3. 精确读取：读取解析后的`references/拍照.md`、`references/拍照实践.md`、`references/相机管理.md`
   - 获取：完整开发步骤、API用法、示例代码

### 示例2：查找音频播放API

**用户问题**：AudioRenderer播放音频的完整流程是什么？

**查找流程**：
1. 文件名过滤：在`references/`下匹配`*AudioRenderer*.md`或`*音频播放*.md`
   - 结果：约5-8个文件
2. 内容搜索：在候选文件中搜索`AudioRenderer`
   - 结果：找到"使用AudioRenderer开发音频播放功能.md"
3. 精确读取：读取解析后的`references/使用AudioRenderer开发音频播放功能.md`
   - 获取：创建、配置、播放、释放的完整流程

### 示例3：查询错误码401

**用户问题**：应用出现401错误码，如何解决？

**查找流程**：
1. 文件名过滤：在`references/`下匹配`401*.md`
   - 结果：直接找到"401 参数检查失败的可能原因和解决办法.md"
2. 精确读取：直接读取解析后的`references/401 参数检查失败的可能原因和解决办法.md`
   - 获取：原因分析和解决方案

### 示例4：查找Button组件用法

**用户问题**：Button组件有哪些常用属性和样式设置？

**查找流程**：
1. 文件名过滤：在`references/`下匹配`*Button*.md`
   - 结果：约3-5个文件（Button组件、按钮Button、场景化Button）
2. 精确读取：读取解析后的`references/按钮.md`和`references/场景化Button.md`
   - 获取：基础属性、样式设置、交互事件、场景示例

### 示例5：查找@State装饰器

**用户问题**：@State装饰器的使用规则和最佳实践？

**查找流程**：
1. 文件名过滤：在`references/`下匹配`@State*.md`
   - 结果：直接找到"@State装饰器：组件内状态.md"
2. 精确读取：读取解析后的`references/@State装饰器：组件内状态.md`（可能较长，分段读取）
   - 获取：装饰器规则、变量类型、观察变化、使用示例

### 示例6：集成 Lottie 动画

**用户问题**：鸿蒙项目如何播放 AE 导出的 JSON 动画？

**查找流程**：
1. 先读：`references/Lottie-库选型与迁移指南.md`（确定 turbo 或 ArkTS）
2. 文件名过滤：`references/Lottie-*开发指南.md`
3. 内容搜索：在候选文件中搜索 `rawfile`、`LottieView` 或 `loadAnimation`
4. 精确读取：turbo 读 `Lottie-@ohos-lottie-turbo开发指南.md`；Canvas 方案读 `Lottie-@ohos-lottie-ArkTS开发指南.md`
5. API 细节：读取对应的 `Lottie-*-API类型声明.d.ts`

## 最佳实践和注意事项

### 最佳实践

1. **优先使用文件名匹配**：文件名通常包含主题关键词，是最快的过滤方式
2. **关键词要精确**：不要用太泛的关键词（如"开发"、"功能"），要用具体的关键词（如"相机"、"AudioRenderer"）
3. **组合使用多个关键词**：先用主题关键词过滤，再用API/方法关键词精确搜索
4. **注意文档类型标记**：
   - (ArkTS) - ArkTS开发指导
   - (C_C++) - C/C++开发指导
   - 简介文档通常是概述，开发指导包含详细步骤
5. **优先读取开发指导类文档**：这类文档包含完整开发步骤和示例代码
6. **分段读取长文档**：使用offset和limit参数，先读概述和开发步骤，再根据需要读取其他部分
7. **先解析逻辑路径**：将`references/...`先解析为当前skill下的实际路径，必要时使用绝对路径

### 避免的错误做法

1. **不要盲目搜索"所有文档"**：避免使用太泛的glob模式如`references/*.md`或`references/*开发*.md`
2. **不要大量读取文件**：一定要经过前两步筛选后再读取，不要试图读取几十个文件来找信息
3. **不要直接在全部文件里做内容搜索**：先缩小候选范围，再在小范围中搜索
4. **不要忽略文件名中的信息**：文件名本身就是很好的分类标记，充分利用它
5. **不要同时启动多个查找任务**：按照三步流程顺序执行，不要并发执行多个不相关的查找
6. **不要把`references/...`当成相对当前工作目录的路径**：先按skill目录解析，再调用工具

## 文档类型识别

快速判断文档类型，决定读取优先级：

| 文档类型 | 特征 | 内容特点 | 读取优先级 |
|----------|------|----------|------------|
| 开发指导 | 文件名含"(ArkTS)"或"(C_C++)"、"开发指导" | 完整步骤、示例代码 | **最高** |
| API参考 | 文件名含Kit名、方法名、API名 | API说明、参数、返回值 | 高 |
| 概述/简介 | 文件名含"概述"、"简介"、Kit名+"简介" | 功能介绍、架构说明 | 中（先读） |
| 常见问题 | 文件名含"常见问题"、"如何"、错误码 | 问题原因、解决方案 | 根据需求 |
| FAQ | 文件名含"FAQ"、"问答" | 常见疑问解答 | 根据需求 |
| 最佳实践 | 文件名含"最佳实践"、"实践" | 优化建议、推荐做法 | 补充阅读 |

## 查找失败时的策略

如果三步查找法没有找到满意的文档：

1. **扩展关键词范围**：使用更宽泛的文件名模式（如从`references/*相机*.md`扩展到`references/*Camera*.md`）
2. **搜索Kit级别文档**：查找相关Kit的简介和概述文档（如"AVCodec Kit简介.md"）
3. **搜索概述类文档**：查找功能模块的概述文档（如"媒体开发概览.md"）
4. **使用内容关键词搜索全部文件**：作为最后手段，对整个references目录搜索特定关键词（但要注意性能）
5. **向用户确认需求**：询问用户具体需要什么信息，调整查找策略

## 与HarmonyOS SDK API Lookup Skill的区别

- **本skill**：查找开发文档、指导、教程、常见问题等（markdown 与部分社区 `.d.ts`，位于 skill 内部 `references/`）
- **harmonyos-sdk-api-lookup skill**：查找系统 SDK 的 API 参考（`api-references/` 下 4000+ 官方 API markdown）
- **使用建议**：
  - 需要开发步骤、示例代码、常见问题解答 → 使用本 skill
  - 需要系统 Kit 的 API 签名、权限、系统能力 → 使用 SDK API lookup skill
  - **Lottie 三方库**：开发指南与 `@ohos/lottie`、`@ohos/lottie-turbo` 类型声明均在**本 skill** 的 `references/Lottie-*` 中，不在 SDK API lookup
  - 两者可配合：本 skill 查 Lottie 用法，SDK API lookup 查 Canvas 等系统 API

## 工具使用提示

### 路径解析规则
- 将`references/...`视为skill内逻辑路径，不要视为相对用户当前工作目录的路径
- 调用工具前先解析到当前skill目录；如果工具按cwd解析相对路径，则使用绝对路径
- Windows路径可使用正斜杠或工具默认格式，但必须确保最终指向当前skill的`references/`

### 文件名匹配类工具
- 可在当前skill的`references/`下匹配`*关键词*.md`
- 组合关键词时可使用`references/*相机*拍照*.md`这类模式
- 优先先缩小候选集，再做内容搜索

### 内容搜索类工具
- 仅在候选文件或当前skill的`references/`中搜索关键词
- 搜索API名称时，直接搜索方法名、类名等精确关键词
- 如果工具支持`path`、`include`等过滤能力，可用它限制范围，但不要依赖某个固定参数格式

### 读取类工具
- 读取前先把`references/文档名.md`解析为当前skill下的实际路径
- 分段读取时可使用offset、limit等能力；长文档先读开头100行获取概述，再按需读取示例代码和特定章节
- 如果读取工具按当前工作目录解析相对路径，传入绝对路径

## 总结

核心查找原则：
1. **文件名优先** - 利用文件名本身的主题信息快速过滤
2. **关键词精确** - 使用具体、有针对性的关键词
3. **分步筛选** - 不要一步到位，先过滤再搜索再读取
4. **控制读取量** - 最终只读取1-3个最相关文件
5. **先解析references逻辑路径** - 将`references/...`先解析到当前skill目录，必要时改用绝对路径

掌握这个三步查找法，可以在2860个文档中快速定位所需信息，避免大量无效读取，提高查找效率。
