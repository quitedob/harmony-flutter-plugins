---
name: huawei-ecosystem-compliance
description: 华为鸿蒙生态规则合规 Skill。用于 analysis/planning/coding 阶段判断是否必须接入华为生态能力、如何写入 ecosystem_compliance、如何把 mandatory 能力合入实现方案、如何用 Picker 或系统安全方案替代受限权限，并按需读取具体 Kit 集成指南。
---

# 华为鸿蒙生态规则合规

## 0. 总体选型原则

先按库本身的产品形态决定 HarmonyOS 侧接入策略，再进入后续 analysis / planning / coding：

- **聚合类库**：不要改写补入 HarmonyOS 原生能力，保持原有聚合定位。
- **单体类库**：保持原库自身的品牌/渠道语义，优先使用该 SDK 本身已提供的 HarmonyOS 适配能力，不要擅自替换成同类华为 Kit。
- **原生强约束能力**：凡受 HarmonyOS 系统规范、分发规则、平台限制约束的能力，必须使用 HarmonyOS 原生实现，不得自行模拟，也不得用第三方同类方案替代。常见例子：应用内更新、应用市场详情页/评论页跳转、系统分享、播控中心/锁屏播控、ArkWeb Web 内核、Want / 系统设置跳转。
- **已内置鸿蒙通道的第三方 SDK**：若第三方 SDK 已经内置 HarmonyOS 所需能力或通道，则直接沿用该接入，不要再重复手动叠加同类华为能力。常见例子：部分第三方推送 SDK。

## A. 生态规则场景

| 场景 | 生态规则 | Kit 能力 | 聚合库处理 | 单体库处理 |
|------|----------|----------|------------|------------|
| 收银台 | 如应用有数字商品支付需求，必须接入华为数字商品服务；可选接入华为实物商品收银台 | IAP Kit、Payment Kit | 保持聚合支付定位；数字商品支付必须包含 IAP Kit 选项，实物商品支付可包含 Payment Kit 选项 | 保持单体支付渠道语义；不要主动替换为华为支付，除非库本身就是应用侧收银台能力或被系统规则强制约束 |
| 账号 | 如应用支持非关联主体的三方账号登录，必须提供华为账号登录选项 | Account Kit | 保持账号聚合定位；需提供华为账号登录选项 | 保持原账号渠道语义；不要把微博、微信等单体登录 SDK 改成华为账号登录 |
| 广告 | 如应用有广告平台需求，可选接入华为广告平台 | Ads Kit | 保持广告聚合定位；可把 Ads Kit 作为可选广告平台 | 保持原广告平台语义；不要主动替换为华为广告 |
| 地图 | 如应用有地图需求，可选接入华为地图 | Map Kit、Location Kit | 保持地图聚合定位；可把华为地图作为可选地图源 | 保持原地图 SDK 语义；不要主动替换为华为地图 |
| Push 消息 | 如应用有云端到终端的消息推送需求，离线消息必须接入 Push，在线消息可选接入 Push | Push Kit | 保持推送聚合定位；离线推送需包含 Push Kit 通路 | 保持原推送 SDK 语义；若第三方 SDK 已内置 HarmonyOS 推送通道则沿用 |
| 分享 | 如应用有分享需求，可选使用华为分享 | Share Kit | 保持分享聚合定位；可把华为分享作为可选渠道 | 保持原分享渠道语义；不要主动替换为华为分享 |
| 播控中心 | 如应用有后台或锁屏状态下播放音频需求，必须接入播控中心 | AVSession Kit | 不适用 | 音视频及通话场景主动接入 AVSession Kit |
| Web 内核 | 如应用有 Web 内核需求，必须接入 ArkWeb 内核 | ArkWeb | 不适用 | 使用 ArkWeb 替换其他 Web 内核 |
| 输入法 | 如应用有敏感信息输入需求，必须接入安全键盘；如开发输入法应用，必须使用输入法布局框架 | IME Kit | 不适用 | 敏感信息输入场景接入华为安全键盘；涉及输入法功能时接入 IME Kit |
| 应用下载 | 如应用有下载应用需求，必须通过应用市场，禁止热更新 | AppGallery Kit | 不适用 | 禁止 SDK 中提供热更新能力；应用下载场景接入 AppGallery Kit |
| 跳转 | 如应用有跳转需求，可选 App Linking、应用扩展组件、DeepLinking | App Linking Kit | 不适用 | 默认使用 App Linking，次选应用扩展组件 |

## B. 受限权限替代规则

受限权限不得直接照搬 Android 权限模型。命中下列能力时，优先使用 HarmonyOS Picker、安全控件、授权弹窗或系统能力替代。

| 类型 | HarmonyOS 受限权限 | 对应 Android 权限/能力 | 三方库鸿蒙化方案 |
|------|--------------------|------------------------|------------------|
| 系统功能-窗口管理 | `ohos.permission.SYSTEM_FLOAT_WINDOW` | `android.permission.SYSTEM_ALERT_WINDOW` | 使用“画中画”功能替代悬浮窗 |
| 通讯录 | `ohos.permission.READ_CONTACTS` | `android.permission.READ_CONTACTS` | 使用“联系人 Picker”访问联系人数据 |
| 通讯录 | `ohos.permission.WRITE_CONTACTS` | `android.permission.WRITE_CONTACTS` | 除特殊场景外，应用不能修改联系人数据；引导用户到“联系人”应用中修改 |
| 媒体文件-音乐和音频 | `ohos.permission.READ_AUDIO` | `android.permission.READ_EXTERNAL_STORAGE` 或 `MediaStore` | 使用 `AudioPicker` 访问用户音频文件 |
| 媒体文件-音乐和音频 | `ohos.permission.WRITE_AUDIO` | `android.permission.WRITE_EXTERNAL_STORAGE`、`android.permission.MANAGE_EXTERNAL_STORAGE` 或 `MediaStore` | 使用 `AudioPicker` 保存用户音频文件 |
| 媒体文件-图片和视频 | `ohos.permission.READ_IMAGEVIDEO` | `android.permission.READ_EXTERNAL_STORAGE` 或 `MediaStore` | 使用 `PhotoViewPicker` 访问用户图片或视频 |
| 媒体文件-图片和视频 | `ohos.permission.WRITE_IMAGEVIDEO` | `android.permission.WRITE_EXTERNAL_STORAGE`、`android.permission.MANAGE_EXTERNAL_STORAGE` 或 `MediaStore` | 使用安全控件或授权弹窗，将用户指定的媒体资源保存到图库 |
| 媒体文件-图片和视频 | `ohos.permission.SHORT_TERM_WRITE_IMAGEVIDEO` | Android 写入外部媒体文件能力 | 使用安全控件或授权弹窗，将用户指定的媒体资源保存到图库 |
| 剪贴板 | `ohos.permission.READ_PASTEBOARD` | 读取剪贴板数据；常见 Android 实现会经由系统剪贴板/窗口交互能力 | 使用“粘贴控件”读取剪贴板数据 |

## 1. Analysis：检测并写入 `ecosystem_compliance`

根据插件功能判定库类别、应用需求、ArkWeb 需求和必须接入的华为能力。

### 1.1 库类别

| 分类 | 识别依据 |
|------|----------|
| `payment` / `payment_aggregation` | 单一支付渠道 / 多渠道支付聚合 |
| `account` / `account_aggregation` | 单一账号登录 / 多渠道账号聚合 |
| `ad` / `ad_aggregation` | 单一广告平台 / 广告聚合 |
| `map` / `map_aggregation` | 地图能力 / 地图服务聚合 |
| `push` / `push_aggregation` | 单一推送渠道 / 推送聚合 |
| `share` / `share_aggregation` | 单一分享渠道 / 分享聚合 |
| `media_playback` | 音频/视频播放、播放器控制、播放视图 |
| `webview` | WebView、H5 页面、内嵌网页、Web 内核 |
| `ime` | 敏感信息输入、输入法、键盘布局 |
| `app_download` | 自身更新、下载应用包、安装应用、跳转下载其他应用 |
| `deep_link` | 跳转其他应用、被其他应用拉起、应用链接 |
| `restricted_permission` | 命中受限权限，需使用 Picker、安全控件、授权弹窗或系统替代方案 |
| `single_channel` | 其他单一渠道底层能力 |
| `other` | 不涉及华为生态规则 |

### 1.2 应用需求

识别以下需求并写入 `application_requirements`（仅非空时输出）：

| 需求 | 识别依据 |
|------|----------|
| `digital_payment` | 数字商品、虚拟商品、会员、订阅等支付 |
| `physical_payment` | 实物商品支付 |
| `background_audio` | 后台或锁屏播放音频 |
| `formatted_audio_playback` | 播放 MP3/AAC/FLAC/HLS/网络音频等格式化音频 |
| `video_playback` | 播放视频、短视频、长视频、播放器视图、字幕/倍速/画中画等视频能力 |
| `offline_push` | 云端到终端的离线消息推送 |
| `online_push` | 云端到终端的在线消息推送 |
| `ad_platform` | 广告平台、广告变现、广告聚合 |
| `map_requirement` | 地图展示、地图交互、定位、POI、路线等地图需求 |
| `share_requirement` | 分享文本、图片、链接、文件或调起分享面板 |
| `sensitive_input` | 密码、支付、证件、手机号、验证码等敏感信息输入 |
| `input_method` | 输入法应用、键盘布局、输入法扩展能力 |
| `app_download` | 自身更新、下载应用包、安装应用、跳转下载其他应用 |
| `deep_link` | 跳转其他应用或被其他应用拉起 |
| `restricted_permission_access` | 访问通讯录、媒体文件、剪贴板、悬浮窗等受限权限能力 |

### 1.3 ArkWeb

若插件使用 `WebView`、`webview_flutter`、`InAppWebView`、Android WebView、X5、Crosswalk、Gecko、WKWebView 包装、H5 页面、内嵌网页或自定义 Web 容器等，`arkweb_requirement.required = true`。HarmonyOS 端 Web 内核必须使用 ArkWeb，不得规划或实现第三方 Web 内核替代。

### 1.4 字段写入

`ecosystem_compliance` 只强制写核心字段，其他字段仅在有实际决策价值时输出，避免空字符串、空数组和重复描述。

| 字段 | 说明 |
|------|------|
| `library_category` | 库类别，例如 `payment_aggregation`、`webview`、`restricted_permission` |
| `has_ecosystem_rules` | 是否命中强制或可选生态规则 |
| `huawei_capabilities` | 命中的华为能力，标明 `mandatory` / `optional` / `suggested` |
| `arkweb_requirement` | 是否需要 ArkWeb；涉及 Web 内核时必须为 required |
| `restricted_permissions` | 命中的受限 HarmonyOS 权限、对应 Android 权限、替代方案 |
| `application_requirements` | 数字商品支付、后台音频、应用下载、跳转等应用侧需求 |
| `needs_architecture_upgrade` | 单体库是否需要因系统强约束升级为宿主侧能力或聚合能力 |
| `target_aggregation_type` | 需要升级时的目标聚合类型 |
| `ui_priority_requirement` | 账号、支付、广告等 UI 展示顺序或入口要求 |
| `compliance_notes` | 关键合规说明、禁止项和保留原库语义的理由 |

`huawei_capabilities[]` 最小字段：`capability_type`、`requirement_level`。可按需补 `capability_name`、`requirement_reason`、`skill_reference`。

## 2. Planning：能力要求与方案写入

判定优先级：聚合库 > 应用需求 > 单渠道库。

### 2.1 Mandatory 能力

| 触发条件 | 必须集成 |
|----------|----------|
| `digital_payment` | IAP Kit |
| `account_aggregation` / 非关联主体三方账号登录聚合 | Account Kit 选项 |
| `offline_push` | Push Kit |
| `background_audio` | AVSession Kit |
| `webview` | ArkWeb |
| `sensitive_input` | 安全键盘 |
| `input_method` | IME Kit 输入法布局框架 |
| `app_download` / `app_update` | AppGallery Kit / 应用市场能力；禁止热更新和自行安装应用包 |
| `restricted_permission` / `restricted_permission_access` | 对应 Picker、安全控件、授权弹窗、画中画或系统应用跳转替代方案 |

### 2.2 Optional / Suggested 能力

| 触发条件 | 可选/建议能力 |
|----------|---------------|
| `physical_payment` | Payment Kit 可选 |
| `ad` / `ad_aggregation` / `ad_platform` | Ads Kit 可选 |
| `map` / `map_aggregation` / `map_requirement` | Map Kit + Location Kit 可选 |
| `online_push` | Push Kit 可选 |
| `share` / `share_aggregation` / `share_requirement` | Share Kit 可选 |
| `deep_link` | 默认优先 App Linking，其次应用扩展组件；属于可选跳转方案 |
| `formatted_audio_playback` / `video_playback` | Media Kit / Audio Kit 等播放能力按原库语义规划；只有后台/锁屏音频触发 AVSession mandatory |

### 2.3 Planning 产物要求

命中 mandatory 能力时：

- 在 `implementation_strategy.architecture_decisions` 记录 `topic`、`decision`、`rationale`，说明为什么必须接入华为能力。
- 将主方案所需华为 API 写入 `ohos_api_mapping`，不要把低覆盖替代方案写入主执行字段。
- 在 `implementation_notes` 写清 UI 展示顺序、架构升级、账号/支付/广告等聚合顺序要求。
- 涉及 `app_update`、自身更新、跳转下载其他应用时，必须使用 AppGallery 更新或应用市场详情跳转能力；由于不支持安装包下载、应用安装，禁止规划直接下载 APK/HAP、静默安装或自行安装应用包。
- 涉及音频/视频播放时，必须在主方案写清：播放核心使用 `AVPlayer` 还是 `AudioRenderer`、视频画面承载使用 `PlatformView` 还是 `Texture`、哪些能力由 `AVSession Kit` 负责，不得把“后续再补渲染层/播控中心”留到 coding 阶段临场决定。

## 3. Coding：集成指南索引

coding 阶段从 `01-analysis.json.ecosystem_compliance` 和 `01-analysis-prd.md` 第 1.5 节识别 mandatory 能力，再按下表读取具体指南。

| 指南 | 华为能力 | 场景 |
|------|----------|------|
| `docs/iap-integration.md` | IAP Kit / Payment Kit | 支付聚合、数字商品支付、实物商品支付 |
| `docs/account-integration.md` | Account Kit | 账号聚合、社交登录 |
| `docs/ads-integration.md` | Ads Kit | 广告聚合、广告变现、OAID |
| `docs/map-integration.md` | Map Kit + Location Kit | 地图聚合、定位服务 |
| `docs/push-integration.md` | Push Kit | 推送聚合、消息通知 |
| `docs/share-integration.md` | Share Kit | 分享聚合、内容分享 |
| `docs/appgallery-integration.md` | AppGallery Kit / App Linking Kit | 应用更新、应用详情、下载引导、应用评论、深度链接 |
| `docs/avsession-integration.md` | AVSession Kit | 后台音频、锁屏控制 |

以下能力当前没有本 Skill 内的独立本地指南；可通过检索官方文档和 API 签名后再实现：

| 能力 | 场景 |
|------|------|
| ArkWeb | Web 内核、WebView、H5 容器 |
| IME Kit / 安全键盘 | 输入法应用、敏感信息输入 |
| Picker / 安全控件 / 授权弹窗 | 通讯录、音频、图片视频、剪贴板等受限权限替代 |
| 画中画 | 悬浮窗替代 |

只有 mandatory 能力需要落代码；optional/suggested 仅记录说明，不主动扩大实现范围。
