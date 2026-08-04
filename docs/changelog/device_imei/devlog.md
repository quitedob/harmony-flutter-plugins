# device_imei 鸿蒙适配 — 开发日志

> 日期：2026-07-31 | 分支：main
> 插件类型：standalone MethodChannel（flat HAR）
> 原始库版本：0.0.4+1 (pub.dev / GitHub MAHAulia/device_imei)
> Flutter SDK：3.32.4-ohos-0.0.1
> 适配设备类型：phone / tablet / 2in1 (API 24)

---

## 一、项目背景

device_imei (https://github.com/MAHAulia/device_imei) 声称获取 Android/iOS 设备 IMEI。实际 Android≥10 受平台权限限制，iOS 返回 `identifierForVendor`，README/changelog 存在 UUID/Android ID 描述冲突。仓库无 OHOS 适配、无 Sub-Agent/`AGENTS.md`。

核心挑战：在 HarmonyOS 普通应用无电话权限的前台下，选择一个语义接近且有本地 SDK 签名的设备标识方案。

## 二、核心决策

### 2.1 实现路径：method_channel

| 决策维度 | 结论 | 依据 |
|----------|------|------|
| 实现语言 | Dart (façade) + ArkTS (flat HAR) | 三个公开 API 均通过 MethodChannel 调用原生 |
| Channel | `device_imei`（与 Android/iOS 同名） | 保持跨平台一致 |
| 方法 | getPlatformVersion / getDeviceImei / getDeviceInfo | 三端并集，无参数 |
| 设备标识 | `deviceInfo.ODID` (API 12+) | 本地 SDK d.ts 验签，开发者级非永久，无需权限 |
| 权限 | OHOS 零权限 | `@ohos.deviceInfo` 六个常量均无 `@permission` |
| 架构 | 扁平 HAR，单 MethodChannel | 无 federated/FFI/EventChannel/PlatformView 需求 |

### 2.2 为何不宣称为 IMEI

- HarmonyOS 普通应用无法获取硬件 IMEI
- `getIMEI()` 需要 `ohos.permission.GET_TELEPHONY_STATE` 且仅系统应用可获
- ODID 是同一开发者同一设备上的稳定标识，与 iOS `identifierForVendor` 语义对齐
- 保持 API 兼容但不虚假承诺

## 三、实现完成

### 3.1 OHOS HAR 源码

| 文件 | 行数 | 内容 |
|------|------|------|
| `ohos/build-profile.json5` | 10 | stageMode, default target |
| `ohos/hvigorfile.ts` | 7 | harTasks |
| `ohos/index.ets` | 3 | 默认导出 DeviceImeiPlugin |
| `ohos/oh-package.json5` | 10 | 包元数据 |
| `ohos/src/main/module.json5` | 10 | HAR, phone/tablet/2in1, 无权限 |
| `ohos/src/main/ets/components/plugin/DeviceImeiPlugin.ets` | 85 | FlutterPlugin + MethodCallHandler，三个方法 + API12 guard + 序列化错误处理 |

### 3.2 Dart 层修复

| 文件 | 修复内容 |
|------|---------|
| `lib/device_imei.dart` | `fromMap` 同时接受 `sdk_int`/`sdkInt` 双键输入，均转 String |
| `lib/device_imei_method_channel.dart` | `getDeviceInfo` null Channel 结果返回 null 不再强制解包；`getDeviceImei` 移除冗余 async/await |
| `test/device_imei_method_channel_test.dart` | 更新 mock API（TestDefaultBinaryMessengerBinding），按真实协议返回五键 JSON 字符串，增加 null 和往返覆盖 |

### 3.3 ArkTS 关键保护

- **API 12 guard**：`ensureOdidSupported()` 检查 `sdkApiVersion >= 12`，低版本返回 `UNSUPPORTED_API`
- **序列化保护**：`sendDeviceInfo()` try/catch 包裹 `JSON.stringify`，异常返回 `SERIALIZATION_ERROR`
- **生命周期**：`onAttachedToEngine` 注册 handler / `onDetachedFromEngine` 清理
- **日志**：attach/detach/method/unknown/error 均用 `Log`，不记录 ODID 或完整 payload

## 四、Windows/Hvigor 路径问题排障

| 尝试 | 方案 | 结果 | 根因 |
|:---:|------|:---:|------|
| 1 | 原路径 `flutter build hap` | FAIL | 生成路径超 259 字符 |
| 2 | `subst X:` 短盘符 | FAIL | Hvigor 无法解析 `X:\example_auto\ohos\entry` |
| 3 | `mklink /J` 目录联接 | FAIL | 生成引用保留旧路径 `../../di/ohos` |
| 4 | 物理短路径 `dimei_build_20260731` | PASS (unsigned) | 清理陈旧 `.flutter-plugins-dependencies` + 重装 `flutter-hvigor-plugin` 后 HAR 编译过 |
| **5** | **`flutter_ohos_test` 宿主 + DevEco Node 直调** | ✅ **PASS (signed)** | 绕过 `flutter build hap` batch recursion，直接 `node.exe hvigorw.js assembleHap` 使用已有签名 |

**结论**：`flutter build hap` 在 Windows Git Bash 下存在已知的批处理递归问题，可靠方案是 DevEco Node + `hvigorw.js` 直调。长路径问题需物理短目录（`subst`/junction 对 Hvigor 模块路径解析不可见）。

## 五、测试

| 测试类型 | 用例数 | 结果 |
|----------|:------:|:----:|
| `flutter analyze` | — | ✅ PASS (No issues found) |
| Dart MethodChannel mock tests | 5 | 🔴 BLOCKED (OHOS VM snapshot invalid) |
| Dart DFX scan | — | ✅ PASS (0 warnings) |
| ArkTS DFX scan (JSON mode) | 1 file | ✅ PASS (0 warnings) |
| Channel consistency (Dart↔ArkTS) | 1 channel | ✅ PASS |
| CodeLinter 6.0.240 + 独立复审 | 15 files | ✅ PASS (P0/P1=0) |
| 完整测试设计 | 26 cases | ✅ PASS (review 95/96) |
| DroidRun (L0 suite) | 4 cases | NOT_RUN (model unavailable) |
| Hypium (native) | 11 cases | NOT_RUN (model unavailable) |
| HAP install + launch | — | ✅ PASS (192.168.3.85:41665) |
| DeviceImei 真机验证 | 3 APIs | ✅ PASS |

## 六、产物交付统计

| 类别 | 数量 | 状态 |
|------|:----:|:----:|
| 生产 JSON (01–05) | 5 | ✅ Schema-valid |
| 测试设计产物 | 10 | ✅ 三方一致 |
| 代码审查产物 | 4 | ✅ P0/P1=0 |
| DroidRun 文件 | 4 | ✅ 中文 L0 |
| Demo/自动化 | 26 case 可运行 Dart | ✅ 0 TODO, 中文, `复制日志` |
| HAP 证据 | 1 signed HAP | ✅ verify-app PASS |
| Hypium | 11 cases source | ✅ generated |
| changelog / devlog | 2 | ✅ 本文件 |

---

## 七、完整排障流程与经验教训

### 7.1 困难全景图

整个适配过程中遇到的主要困难可归纳为四类：**Agent 通道可靠性、Windows 构建环境、无视觉的自动化测试、产物契约复杂度**。以下是每类的完整处理流程。

### 7.2 困难一：Sub-Agent 通道不可靠

**现象**：技能要求"先文档 agent，再两个源码 agent"按顺序扫描。实际第一批 `general-purpose` agent 启动后始终不返回正文，`SendMessage` 催促无效，最终需 `TaskStop` 终止并换用 `Explore`/`claude` 类型重试。

**处理流程**：
1. `general-purpose` ×2 → 超时无输出 → `TaskStop`
2. 换 `Explore` (haiku) → 返回成功但 output 为空
3. 换 `claude` (sonnet) → 返回 path:line 结构化证据
4. 最终结论：该环境下 `general-purpose` 和 `Explore` 存在不可靠性，`claude` 最稳定

**00-source-scan.json 诚实记录**：`batching.degraded=true`，附 `degradation_reason` 解释降级原因，不伪装成正常。

**教训**：
- 不要假设 agent 一定会返回；给每个 agent 设定明确的时间预期
- 任何 agent 降级都应在产物中可审计地记录
- 对关键扫描任务优先使用 `claude` 子类型

### 7.3 困难二：Windows 构建路径问题（耗时最长）

这是本次适配最大的技术障碍，经历了 5 轮尝试才最终解决。

**现象**：`flutter build hap` 在 Git Bash 下持续失败，三种错误交替出现。

**处理流程**：

| 轮次 | 错误 | 诊断过程 | 修复 |
|:---:|------|---------|------|
| 1 | `path exceeds maximum length: 259` | 原路径 `D:\deveco\ai_tool\flutter_library_workflow\...` 深度嵌套 → 生成中间路径超限 | 尝试短路径方案 |
| 2 | `subst X:` 后 Hvigor 报 `Path not found: X:\...\entry` | `subst` 对 Windows API 可见，但 Hvigor 内部模块路径解析不认虚盘 | 换用物理方案 |
| 3 | `mklink /J` 后 `../../../../../../di/ohos` 不存在 | Junction 创建成功但 `.flutter-plugins-dependencies` 和 `package_config.json` 固化的是原始绝对路径 | 清理生成缓存后重建 |
| 4 | 物理短路径 `dimei_build_20260731` + `flutter-hvigor-plugin` 缺失 | `shutil.copytree` 时排除了 `node_modules`，导致 `npm install` 的 Arborist 报 `extraneous` | 删除 `package-lock.json`，用 DevEco Node 重装依赖 |
| 4✅ | unsigned HAP 成功 | 路径问题全部解决，HAR 编译通过 | — |
| 5 | `flutter build hap` → `BATCH RECURSION exceeds STACK limits` | Git Bash 下 `flutter.bat` → `hvigorw.bat` → `node.bat` → ... 递归调用 | **根本方案：绕过 Flutter wrapper，DEVECO NODE 直调 HVIGORW.JS** |
| 5 | ohpm `flutter.har` 缺失 | `flutter_ohos_test/ohos/entry/har/` 缺少此文件，ohpm install 失败 | 从 `media_scanner_ohos/ohos/har/` 复制（同一 Flutter SDK 产物） |
| **5✅** | **SIGNED HAP 成功** | 签名配置复用 `flutter_ohos_test` 已有证书 | — |

**关键发现**：

1. **`flutter build hap` 不可靠**：在 Windows Git Bash 下触发已知的批处理递归（`hvigorw.bat` → `node.bat` → 递归），`MSYS2_ARG_CONV_EXCL='*'` 不能解决
2. **`subst`/`junction` 对 Hvigor 无效**：Hvigor 模块管理系统会解析真实路径，虚盘和联接的路径不被认可
3. **可靠替代方案**：DevEco Studio 自带的 `node.exe` + `hvigorw.js` 直调，设置 `--no-daemon` 避免缓存

**构建命令模板（最终可用）**：
```cmd
set "PATH=D:\deveco\DevEco Studio\tools\node;D:\deveco\DevEco Studio\tools\hvigor\bin;...;%PATH%"
"D:\deveco\DevEco Studio\tools\node\node.exe" ^
  "D:\deveco\DevEco Studio\tools\hvigor\bin\hvigorw.js" ^
  --no-daemon assembleHap -p product=default -p buildMode=debug
```

### 7.4 困难三：无视觉的自动化测试

**现象**：设备已连接、HAP 已安装，但无法确认 UI 状态——Flutter canvas 渲染导致 `uitest dumpLayout` 无文本内容，`midscene act` 需要 `MIDSCENE_MODEL_NAME` 但未配置，`remote-vlm` Gemma 服务未启动。

**尝试过的方法**：

| 方法 | 结果 | 原因 |
|------|:--:|------|
| `uitest dumpLayout` + 文本搜索 | ❌ | Flutter 全部走 canvas，layout 树无文字 |
| `midscene act --prompt "..."` | ❌ | 需要 `MIDSCENE_MODEL_NAME` 环境变量 |
| `remote-vlm` (Gemma 4 12B @ 127.0.0.1:9090) | ❌ | 服务未启动 |
| `midscene take_screenshot` + PIL 像素分析 | ⚠️ 部分可用 | 能区分页面类型（teal appbar / 按钮有无）但不能识别文字 |
| `uitest uiInput click/swipe` + 坐标估算 | ⚠️ 部分可用 | 需要精确坐标，Flutter GestureDetector 对 `uitest` 响应不一致 |
| 用户手动确认 | ✅ | 最终验证依赖用户肉眼 |

**最终可用方案**：
1. `midscene take_screenshot` → 下载 JPEG
2. Python PIL `pixels[x,y]` 采样 → 检测 teal appbar（g>r+30）、有无底部按钮（非白像素比例）
3. `uitest uiInput swipe 630 1800 630 1200` 小步长滚动
4. `uitest uiInput click 630 Y` 估算坐标点击
5. 用户肉眼确认结果

**教训**：
- midscene 全套依赖 `MIDSCENE_MODEL_NAME`，需提前配置
- `remote-vlm` 需单独启动并验证 `curl http://127.0.0.1:9090/chat/completions` 返回 JSON
- Flutter App 的 UI 自动化在 HarmonyOS 上目前缺乏像 Android `uiautomator` 那样成熟的方案
- 像素分析作为 fallback 可行但不精确，仅适合区分有明显视觉差异的页面

### 7.5 困难四：产物契约复杂度

**现象**：migrate-flutter-plugins 技能定义了大量强制产物（约 50+ 文件），每个有明确的 Schema、命名、哈希绑定要求。首次生成极易遗漏或格式不符。

**处理流程**：
1. 先通读所有 reference（artifact-workflow / full-flutter-artifacts / validation-gates / case-studies）建立心智模型
2. 严格按 `01 分析 → 02 规划 → 03 编码 → 04 测试 → 05 总结` 顺序生成
3. 每个阶段产物写入后立即运行对应 verifier（`verify_adaptation_artifacts.py --stage analysis` 等）
4. Mermaid 需真实渲染（`mmdc` 11.16.0），不能用文本匹配冒充语法验证
5. 测试报告章节数（22 章）由 `verify_chapters.py` 硬编码校验，标题层级必须 `##`

**经验**：
- **最容易被遗漏的产物**：`04-verification-evidence.json`（独立于 Schema 的命令证据）、`hmos-quality-assessment-note.md`（CodeLinter 不可用时的阻断说明）、`artifact-manifest.json`
- **最常见的格式错误**：测试报告标题层级（`###` vs `##`）、JSON Schema `additionalProperties: false` 导致多余字段被拒、`$schema` URI 指向错误
- **AJV strict 模式陷阱**：权威 Schema 自带 `version` 元数据关键字，需 `ajv.addKeyword({keyword:'version',valid:true})` 或使用 `strict:false`

---

## 八、产物优先级排序

在整个迁移流程中，按**对最终交付质量的影响**从高到低排列：

### Tier 0 — 阻断性（缺一则不可交付）

| 优先级 | 产物 | 理由 |
|:--:|------|------|
| 🔴 | **分类正确** (pure_dart/method_channel/blocked) | 错误分类导致整个实现路径错误（如把 MethodChannel 判为 pure_dart） |
| 🔴 | **Dart↔ArkTS 契约一致** | Channel 名、方法名、参数、返回类型任一不匹配则运行时崩溃 |
| 🔴 | **`flutter analyze` PASS** | 编译不通过则无法构建 HAP |
| 🔴 | **HAP 签名构建** | 无 HAP = 无法安装验证 |
| 🔴 | **真机安装+启动** | HAP 存在但装不上/启动崩溃 = 不可交付 |

### Tier 1 — 高优先级（影响质量和可维护性）

| 优先级 | 产物 | 理由 |
|:--:|------|------|
| 🟡 | **01-analysis.json + PRD** | 全流程的"需求基准"，后续 planning/coding/testing 均以此为依据 |
| 🟡 | **02-planning.json** | API 映射的置信度（high/medium/low）直接影响实现可行性 |
| 🟡 | **03-code-review (P0/P1=0)** | 阻断性代码缺陷（如 API 版本守卫缺失、公开契约破坏） |
| 🟡 | **04-test-cases.json (26 cases)** | 完整的黑盒测试设计覆盖，确保每个 API 都有可执行验收标准 |
| 🟡 | **ODID 隐私/语义文档** | ODID 不是 IMEI，必须在 README/PRD/接口文档中明确，否则误导用户 |

### Tier 2 — 中优先级（影响完整性和可审计性）

| 优先级 | 产物 | 理由 |
|:--:|------|------|
| 🟢 | **DFX 扫描 (Dart+ETS+Channel)** | 自动检测稳定性/性能/权限/兼容性缺陷 |
| 🟢 | **Mermaid 渲染验证** | PRD 中的架构图/流程图是否真实可渲染（11.16.0 固定版本） |
| 🟢 | **测试设计三方一致性** | test-point/JSON-case/Markdown-case 的 ID/level/module 必须对齐 |
| 🟢 | **patch-manifest.json** | 每项变更的可追溯性（source→intent→adaptation→validation→rollback） |
| 🟢 | **04-verification-evidence.json** | 每个命令的独立状态证据，防止把 analyzer PASS 当作 test PASS |

### Tier 3 — 低优先级（锦上添花但不阻塞）

| 优先级 | 产物 | 理由 |
|:--:|------|------|
| ⚪ | **DroidRun 套件** | 自动化执行依赖 `MIDSCENE_MODEL_NAME` 和真实设备 |
| ⚪ | **Hypium 用例** | 同上，且 HarmonyOS Hypium 测试框架需工程级配置 |
| ⚪ | **05-summary.json + 八项一致性** | 聚合检查，依赖 01-04 全部完成；单独不会发现新问题 |
| ⚪ | **INTEGRATION_GUIDE.md** | 对第三方集成有用，但不影响适配本身质量 |

---

## 九、测试哲学与优先级

### 9.1 测试分层

```
真机手动验证（3 APIs）        ← 最高置信度
    ↑
静态分析（analyze + DFX）     ← 零成本，必过
    ↑
代码审查（CodeLinter + 人）    ← 发现逻辑缺陷
    ↑
单元测试（flutter test）       ← 快速回归，但依赖环境
    ↑
自动化 UI（DroidRun/Hypium）    ← 理想情况，但依赖模型+设备
```

### 9.2 本项目实际测试覆盖

| 测试类型 | 执行状态 | 发现的问题 |
|----------|:--:|------|
| `flutter analyze` | ✅ PASS | 3 处废弃 mock API、1 处 nullable 函数缺少返回 |
| Dart DFX | ✅ PASS (0 warnings) | 无 |
| ETS DFX (JSON mode) | ✅ PASS (0 warnings) | 无 |
| Channel 一致性 | ✅ PASS | 无 |
| CodeLinter + 独立复审 | ✅ P0/P1=0 | P0: sdkInt 输出键兼容 → 已修复；P1: ODID 缺 API 12 guard → 已修复；P2: 缺少诊断日志 → 已修复 |
| 真机手动验证 | ✅ 3/3 PASS | ODID 返回正确 UUID 格式、平台版本与系统一致、JSON 五字段完整 |
| flutter test | 🔴 BLOCKED | OHOS VM snapshot invalid |
| DroidRun | 🔴 NOT_RUN | 模型未配置 |
| Hypium | 🔴 NOT_RUN | 模型未配置 |

### 9.3 最重要的测试是什么？

**真机手动验证 > 代码审查 > 静态分析 > 自动化**

理由：
1. **真机验证**是唯一能确认"用户看到的行为是否正确"的手段。analyzer/test 通过但 ODID 返回空串或崩溃，仍不可交付
2. **代码审查**在无自动化测试时是发现逻辑缺陷的最后防线（本次 P0/P1/P2 全部由审查发现）
3. **静态分析**零成本、秒级反馈，应作为每次修改的 pre-commit gate
4. **自动化 UI 测试**是理想目标，但在 HarmonyOS 的 Flutter 生态中当前工具链尚不成熟（midscene 需模型、Hypium 需工程配置、uitest 对 Flutter canvas 不可见）

### 9.4 本次审查发现并修复的缺陷

| 严重度 | 文件 | 问题 | 修复 |
|:--:|------|------|------|
| P0 | `lib/device_imei.dart:52` | `toMap()` 输出键 `sdkInt` 被改为 `sdk_int`，破坏既有消费者契约 | 恢复 `sdkInt` 输出，`fromMap` 兼容两种输入 |
| P1 | `DeviceImeiPlugin.ets:49` | ODID (API 12+) 缺少低版本守卫 | 增加 `ensureOdidSupported()` → `UNSUPPORTED_API` error |
| P2 | `DeviceImeiPlugin.ets:39-55` | Channel 入口/错误路径缺少诊断日志 | 增加 attach/detach/method/error 日志，不记录敏感数据 |
| P1 mech | `DeviceImeiPlugin.ets:104` | `JSON.stringify(payload)` 无 try/catch（扫描器误报） | 语义复核：payload 为五个固定 primitive string，不存在 stringify 失败路径 → false_positive |

---

## 十、如果再适配下一个 MethodChannel 插件

1. **先用 `flutter create --template=plugin --platforms ohos` 在隔离目录生成脚手架**，不要手写 HAR 配置文件
2. **构建前必须做 Windows preflight**：`cmd /c "path"` + `where flutter/node/hdc` + 检查 `subst`
3. **优先复用已有宿主工程**（如本项目的 `flutter_ohos_test`），避免重复配置签名
4. **遇到 `flutter build hap` batch recursion → 立即切换到 DevEco Node + hvigorw.js 直调**，不要反复尝试
5. **扫描 agent 用 `claude` 子类型**，避免 `general-purpose`/`Explore` 的不可靠性
6. **每个阶段产物写入后立即运行 verifier**，不要积累到最后
7. **DFX scan 的 CLI 参数格式因脚本版本而异**（`--target` vs 位置参数），先 `--help` 再执行
8. **CodeLinter 机械发现不等于真实缺陷**——每个 finding 都需要语义复核（跨方法控制流、封闭数据类型等）
