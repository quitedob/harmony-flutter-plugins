# 编码校验与修复（React Native → HarmonyOS）

你负责**独立**检查上一阶段生成的鸿蒙原生实现和 Example。以 RN 模块源码、HarmonyOS 实际代码和重新构建的结果为准做判断。

发现可修复的问题时，**直接改** `ohos/harmony/{short_name}/`、`ohos/example/` 或 `src/`，重新构建并复查。不要只记录不处理。

## 输入与输出

开始前读：
- `.ohos-adaptation/01-analysis.json`、`01-analysis-prd.md`、`.ohos-adaptation/02-coding-library-report.md`
- RN 模块源码（`src/` 含 `*Spec.ts(x)`、`android/`、`ios/`）及已有 `example/`
- `ohos/harmony/{short_name}/`、`ohos/example/`

最终写入：`.ohos-adaptation/03-validation-report.md`

## 自检 + 构建（按 rn-ohos-template playbook 直接跑）

> 本阶段是独立子 agent，须**重新定位 `rnohos.py`**（不要写死 `.claude/skills/...`，也不要沿用 coding 阶段的变量——子 agent 间不共享 shell 环境）。两种部署形态位置与 Windows junction（别去"修"）的完整说明见 `rn-ohos-template` 的 SKILL.md「四个命令」节。

```bash
RNOHOS=$(ls .claude/skills/rn-ohos-template/rnohos.py 2>/dev/null \
      || ls ~/.vscode/extensions/*/resources/opencode/plugin/hmos-library-adapter-fast/shared/skills/rn-ohos-template/rnohos.py 2>/dev/null | head -1)
[ -z "$RNOHOS" ] && { echo "未找到 rnohos.py，停止并报告环境"; exit 1; }
python "$RNOHOS" check
python "$RNOHOS" build har   # 原生类型
python "$RNOHOS" build hap
```

构建序列由 `rnohos.py` 编排，**禁止裸跑 hvigorw**。退出码 0 即成功。

> **`build hap` 必须实跑，不得因 `check` 输出跳过**：`build hap` 内部自带 `npm pack → npm install → ohpm install`，**node_modules 由它自己安装**——"node_modules 不存在 / 框架 HAR 缺失" 是 build hap 启动前的正常初始态，不是阻断条件。单独跑 `rnohos.py check` 时，指向 `node_modules/` 的 `file:` 依赖缺失只会报 **WARNING**（非 ERROR），正因为它会被 build hap 安装。**无论 check 输出什么，都要实际执行 `build hap` 看真实退出码**；只有 build hap 自己失败（退出码非 0）才算构建未通过，禁止用 check 的预安装态推断"环境不可用/缺 SDK"而跳过。
>
> **`build hap` 耗时约 3-5 分钟，调用 bash 工具时 `timeout` 至少给 `600000`（ms）**。默认 120s 会在 install 阶段杀掉整条进程、留下半截日志无 assembleHap 输出，**会被误判成"环境问题"**——这是已知坑，不是真失败。若某步真挂死，`rnohos.py` 会明确报"命令超时（已运行 Xs）"，按超时处理（重试/查网络），不要当成 SDK/环境缺失。

## 1. 重新扫描源码（不要复制上一阶段报告）

重新扫描并确认对外契约：
- public 方法 / 属性 / 常量 / 枚举 / 回调 / 监听器 / 事件 / 可配置项与默认值
- `src/` 下每个 `*Spec.ts(x)` 的方法签名、参数与返回类型
- 每个自定义 UI 组件（Fabric）、其 props / 事件
- 已有 example 的每个界面、调用的 API、导航与结果回传
- JNI / C / C++ / so、权限、平台能力

与 02 报告对照，有遗漏以源码为准，继续检查并修复。

## 2. 功能检查

逐项读 `ohos/harmony/{short_name}/` 实际实现，确认：
- API 名称、参数、返回类型与 Spec/源码一致；同步/异步/回调形式对应
- 默认值、错误处理、副作用对应；可配置项仍可配置
- 跨边界数据（导航参数、序列化配置、跨模块配置）写入端与读取端键名/类型一致，调用方设置的值真正到达实现并生效
- 回调、监听器、注册入口有真实调用位置；方法真正完成其名称所表示的行为

**以下不能判 PASS**：固定返回值、空函数、只打日志、测试/模拟数据、只有定义无调用、只在 example 实现而 library 没有、删 native 配置后用简单 ArkTS 顶替、核心算法/坐标系/变换顺序与源码不一致导致结果错误。

涉及 JNI/C/C++/so 时，检查 NAPI 构建配置、注册代码、ArkTS 封装、native 实现是否完整。

## 3. RNOH 契约检查（高频白屏根因）

- **Spec 名称一致**：TurboModule 名 ↔ `TurboModuleRegistry.get('X')`；Fabric `codegenNativeComponent('X')`。
- **RNPackage 注册**：library 的 RNPackage 在 example 的 `RNOHPackagesFactory.ets`/`RNPackagesFactory` 里注册，返回非空数组（空 `return []` = 白屏）。C++ 侧 `PackageProvider.cpp` 注册对应 Package。
- **平台判断**只用 `Platform.OS === 'harmony'`，无排除法。
- **依赖包名**：js-only / 依赖其他 RN 库时，example 实际安装的是 OHOS 包（带 `harmony` 字段）而非原版包。
- **codegen 产物**：`generated/` 与当前 Spec 一致（Spec 改过要重跑 `rnohos.py codegen`）。Spec 声明的每个方法必须在 generated cpp `methodMap_` 有 `ARK_ASYNC_METHOD_METADATA` 注册项，缺注册 = JS 调用静默失败/白屏——`rnohos.py check`/`build hap` 已硬门禁（缺则 ERROR），修法是重跑 codegen（见 `registration` 卡 `cpp-methodmap-missing-method`）。
- **TurboModule 上下文时序**：别在构造函数缓存 `this.ctx.uiAbilityContext` / `config.colorMode` 到实例字段（急切实例化时上下文可能未就绪 → 深色模式误判、弹窗拉不起）；每次方法/`getConstants` 调用时即时读（`check` 对构造时缓存给 WARNING，见 `contract` 卡 `native-context-cache-stale`）。

> 先读 `rn-ohos-template` 的 `lessons/index.json`，按 `plugin_type` + `stage=validation/both` 命中 category 后 `read` 对应分片逐条对照。**判 PASS 的尺度**：白屏分两类——①原生注册（上面这些）；②JS 运行时 API 缺失（Intl 等）。第二类「编译过 + 符号命中」≠ 不崩、「polyfill 文件存在」≠ 已兜底；只补 `toLocaleString` 留全局 `Intl` undefined = **判 FAIL**（见 `intl-deps-polyfill` 卡；`rnohos.py build hap` 已对此硬门禁）。

## 4. UI 与响应式检查（含 Fabric 组件）

对每个需复刻的 UI 组件 / example 界面：
- 自定义 View / 绘制 / 手势 / 动画是否有真实使用的 ArkUI 实现，状态数与源码一致
- 运行时会变化的视觉属性是否由 `@State`/`@Link`/`@Prop`/`@Watch` 或 Canvas 重绘驱动，存在完整链路：`事件或数据来源 → 响应式状态更新或 Canvas 重绘 → 读取状态的组件 → 界面变化`
- 只声明 `@State` 但无真实读写关系、只改普通字段但不触发渲染 → 直接修复
- 渐变不能改纯色、异形不能改普通矩形、状态色/阴影/描边/动画不能省略

## 5. Example 检查

对每个公开 API 确认：入口可触发 → 调用进入 library 真实实现 → 返回值/状态/副作用在界面可见；回调/监听器能触发并展示；example 没有绕过 library 自造结果；导航参数与结果回传有接收位置；运行时权限同时有声明与动态申请；平台不支持的能力明确显示"不支持"。

## 重新构建

在插件仓库根（CWD）重跑 `rnohos.py check` → `rnohos.py build har`（原生类型）→ `rnohos.py build hap`，直至退出码 0（**最多 15 次**：`rnohos.py build` 连续失败 15 次会拒绝再 build，断掉无限重试——达上限即停下读日志定位根因，或查证平台能力缺失后记差距收尾，修好后删 `.ohos-adaptation/logs/.buildfix-count.json` 解锁）。失败按日志修 library / example / 资源 / 配置中的真实问题后重试，**不得**用删功能、空实现、写死可配置项、跳过模块换取构建成功。

## 修复与复查

发现以下问题直接修并复查：API 缺失、固定返回/空实现/模拟数据、native 接入不完整、Spec 名称或 RNPackage 注册错误、平台判断用排除法、依赖装到原版包、UI 面缺失或视觉值不一致、响应式没触发更新、自绘没使用或几何算法错、example 没调 library 真实实现、导航/回传/权限不完整、HAR/HAP 构建失败。

主动搜出代码与 02 报告里标注为"未实现 / 暂未 / 简化 / 替代 / 受限 / TODO / 后续"的项，逐个重新实现。复杂/耗时不是保留差距的理由；只有用 lookup 查证平台确实做不到才能保留并实现最接近替代。判 PASS 不能只看符号存在，必须确认行为本身正确。

## 填充 README（构建通过、修复复查后，写报告前）

库与 Example 校验通过后，填 `ohos/README.md` 的 4 个语义占位符（包名/原库名/版本/Manual Link 等基础信息 scaffold 已替好，勿改正文）：

- 加载本阶段 skill 的 `readme-fill.md`（`rn-ohos-template/readme-fill.md`），按其数据源映射用 `edit` 就地替 `{{USAGE_EXAMPLE}}`/`{{USAGE_NOTES}}`/`{{API_ROWS}}`/`{{API_NOTES}}`；**不重写模板、不把 README 内容打进对话**。
- 支持状态以本阶段实测结论为准（代码在 ≠ 真支持，✅ 须经 lookup 核实；判 FAIL/平台缺失的项如实标注并写原因）。
- 填完跑 `python "$RNOHOS" check-readme`（`$RNOHOS` 见本阶段开头定位段），残留 `{{` 或 huawei 字样即修后重跑。

## 输出报告

写入 `.ohos-adaptation/03-validation-report.md`（中文），字数尽量少，简要说明：
1. 独立检查的源码与产物范围
2. 发现的遗漏或错误
3. 功能检查结果与证据
4. RNOH 契约检查结果（Spec 名称、RNPackage 注册、平台判断、依赖包名、codegen 一致性）
5. UI / 响应式 / Example 检查结果
6. 本阶段修复的问题、修改位置与复查结果，及 `build har` / `build hap` 重建结果
7. `ohos/README.md` 占位符填充结果（填了哪些占位符、API 覆盖数、`check-readme` 是否通过）
8. 独立得出的最终结论
