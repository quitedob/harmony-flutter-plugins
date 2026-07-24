# SDK HAR Demo 生成专家

基于测试用例和已适配的 HAR 代码，生成可安装到 OHOS 真机的 HAR Demo App，用于测试验收开发路径 HAR 代码的生成质量。

## 执行前：Todo 清单（MANDATORY）

- [ ] Step 0：门禁检查
- [ ] Step 1：调用代码生成器生成骨架结构
- [ ] Step 2：加载必要 skill 与知识准备
- [ ] Step 3：根据 PRD 功能模块和测试信息实现完整功能逻辑
- [ ] Step 4：FIXED SECTION 校验
- [ ] Step 5：增量编译验证与修复循环
- [ ] Step 6：生成 Demo 结果文件

## Step 0：门禁检查

当前工作目录即为 SDK 仓库根目录，所有路径均相对于 CWD。

**在执行任何步骤前，必须检查以下文件是否存在：**

| 文件/目录 | 必需性 | 说明 |
|------|--------|------|
| `.ohos-adaptation/04-test-cases.json` | **必需** | 测试用例清单，生成器的输入 |
| `.ohos-adaptation/01-analysis-prd.md` | **必需** | PRD 文档，包含功能模块/API 规格 |
| `ohos_hardemo/library/` | **必需** | 代码适配/升级阶段产出的 HAR 实现，作为测试 Demo 的库来源 |

**检查步骤：**
1. 检查 `.ohos-adaptation/04-test-cases.json` 是否存在
2. 检查 `.ohos-adaptation/01-analysis-prd.md` 是否存在
3. 检查 `ohos_hardemo/library/` 目录是否存在（代码适配/升级阶段已生成的 HAR）

**如果任一必要文件缺失，立即终止并报告：**
```
❌ 门禁检查失败

缺少必要文件/目录：
- {路径} - {说明}

请确保 SDK 仓库包含以下内容后再运行：
- .ohos-adaptation/04-test-cases.json
- .ohos-adaptation/01-analysis-prd.md
- ohos_hardemo/library/（代码适配/升级阶段生成的 HAR）
```

## Step 1：调用代码生成器生成骨架结构

fast 流程没有 `scaffold/` 目录，HAR 来自代码适配/升级阶段生成的 `ohos_hardemo`。因此必须**显式传入 `--scaffold ohos_hardemo`**（以其为工程模板），生成器会把 `ohos_hardemo`（含真实 `library/` 实现与 entry/ability）整体复制到 `ohos-hardemo-auto`，再清空 entry 页面、按测试用例重新生成：

```bash
python ".claude/skills/sdk-hardemo-generator/tool/generate_hardemo_ets.py" \
  --scaffold "ohos_hardemo" \
  --out "ohos-hardemo-auto" \
  --test-cases ".ohos-adaptation/04-test-cases.json"
```

> 因 `--scaffold` 已是 `ohos_hardemo`，脚本中针对 `ohos-hardemo/library` 的二次智能拷贝若打印 `WARN: ohos-hardemo/library not found` 属正常现象——真实 HAR 已随 scaffold 复制到位，可忽略该告警。

生成三级页面结构：
- **第一级** Index.ets：功能模块列表（F-01、F-02...）
- **第二级** ModuleF##Page.ets：测试用例列表
- **第三级** TestCaseF##_##Page.ets：测试用例详情页

输出：pages/*.ets + widgets/ResultPanel.ets + widgets/TestInfoPanel.ets

## Step 2：加载必要skill与知识准备

运行时 `.claude` 已随工作流注入到 SDK 仓库根目录，所有 Skill 和工具脚本均使用相对路径 `.claude/skills/...` 调用。

### 加载必要skill（按顺序）

1. `arkts-rules`
2. 需要查鸿蒙工程、API、权限、设备能力或依赖规范时，使用 `harmonyos-docs-lookup` / `harmonyos-sdk-api-lookup` Skill。

### Demo 编码前知识准备与官方文档核实

涉及到 HarmonyOS 系统 API 用法，不能编造，必须使用 `harmonyos-docs-lookup` / `harmonyos-sdk-api-lookup` Skill 查询相关知识。以下内容不能凭 Android 经验或模糊记忆处理，必须通过本地 Skill 核实一次：

- HarmonyOS Kit 接入方式、模块名、import 路径、类型签名、枚举值、错误码和 syscap。
- 权限声明、动态授权、通知授权、受限权限、设置页引导。
- 应用沙盒目录、Context 路径、用户文件、公共目录、媒体库、Picker、安全控件、URI / fd / 持久化授权。
- `module.json5`、`oh-package.json5`、HAR 资源路径、HAR/HAP 相关配置。
- Want / `startAbility` 跳转、文件/沙盒/URI/Picker、蓝牙、定位、音视频、后台任务等场景化陷阱。

使用Skill检索方式：API 签名和类型优先 `harmonyos-sdk-api-lookup`；开发指导和场景规则优先 `harmonyos-docs-lookup`。如果官方文档与 02 规划冲突，以官方文档为准。

### 参考文件地址

先记录地址，后续步骤用到时需访问：
- .claude/skills/sdk-hardemo-generator/references/code-patterns.md：完整示例代码
- .claude/skills/sdk-hardemo-generator/references/result-format.md：result格式速查表
- .claude/skills/sdk-hardemo-generator/tool/generate_hardemo_ets.py：骨架生成器
- .claude/skills/sdk-hardemo-generator/tool/validate_fixed_section.py：FIXED校验脚本
- .claude/skills/sdk-hardemo-generator/references/common-errors.md：常见错误（含 ArkTS 装饰器/时序陷阱）

## Step 3：根据 PRD 功能模块 和测试信息实现完整功能逻辑

**后续所有 `ohos-hardemo-auto` 路径均相对于 CWD，即完整路径为 `ohos-hardemo-auto/...`。**

1. **library 基线**：Step 1 已将 `ohos_hardemo/library`（02 阶段产出）拷贝到 `ohos-hardemo-auto/library`，后续实现都基于 `ohos-hardemo-auto`，**绝不允许在 `ohos_hardemo` 实现**；禁止修改 library 下除 Index.ets 外的文件。

2. **读规范与测试信息**：编码前必读 § Demo 编码规范 + § UI 界面规范 + `references/common-errors.md`；阅读 `01-analysis-prd.md` 功能模块、`.ohos-adaptation/04-test-cases.json` 用例信息、生成的 `pages/TestCaseF##_##Page.ets` 中 TestInfoPanel（优先级/前置条件/测试步骤/预期结果）。

3. **逐用例实现**：对每个 `pages/TestCaseF##_##Page.ets` 实现完整功能逻辑——结合用例功能语义，查看 ohos-hardemo-auto/library 源码对应部分，分析如何组合实现达成预期结果。用例数 ≥ 5 时必须用 Task 工具**批量**并发实现。
   > **功能点模型对齐**：每条用例对应一个功能点（`id == featurePointId`），携带 `coveredApis.android`（Android 侧 API 集合，可能多个）与 `coveredApis.harmony`（设计期留空）。`coveredApis.android` 是接线**提示**——据此在 library/Index.ets 定位对应 HAR API；`coveredApis.harmony` 由本阶段回填（见步骤 4）。
   > **多 API 功能点操作链**：`coveredApis.android` 含多个 API 时，test_steps 是多步操作链（如先设上限、再设当前值）。Demo 须按步骤序接线**全部**相关 HAR API，顺序符合因果链，禁止漏接/乱序。
   > **视觉展示语义判定**：编码前先扫该用例 `checkpoint`/`expected_result` 是否含视觉展示语义词（词表见 §Demo 编码规范 > 渲染验证）；含且 `coveredApis.harmony` 无现成视觉组件 → 判为渲染验证类，须在页面挂载视觉组件预览区，不可只 dump 数据到 result。

4. **回填 coveredApis.harmony（MANDATORY）**：每条用例实现后，把实际使用的 HAR API（从 library/Index.ets 导出，可多个）写入 `coveredApis.harmony`；HAR 无对应则保持 `[]`。全部完成后**就地更新** `.ohos-adaptation/04-test-cases.json`——仅回填 `coveredApis.harmony`，**严禁改动** id/featurePointId/level/coveredApis.android/title/test_steps/expected_result/preconditions/postconditions 等字段。回填后该文件成为 android↔harmony API 闭环真实来源。

5. **权限声明与同步**：扫描 pages/*.ets 中 `from 'library'` 导入的 API → 用 `harmonyos-docs-lookup`/`harmonyos-sdk-api-lookup` 查 required_permission → 汇总去重写入 `ohos-hardemo-auto/entry/src/main/module.json5` 的 requestPermissions；user_grant 补充运行时申请（UIAbilityContext.requestPermissionsFromUser）；补充同步见 `references/resource-mapping.md` 权限声明同步。

6. **实现完整性检查**（MANDATORY - 禁止跳过）：
   ```bash
    python ".claude/skills/sdk-hardemo-generator/tool/check_implementation_status.py" \
      --test-cases ".ohos-adaptation/04-test-cases.json" \
      --pages-dir "ohos-hardemo-auto/entry/src/main/ets/pages"
   ```
   输出 `PASS: 所有测试用例已实现` 才可继续；`FAIL` 则逐一完成未实现文件。判定标准：Actions 区无"待实现"/"TODO(actions)"占位符，且有实际控件（Button/Toggle/Checkbox/Slider/TextInput/Image 等）或预览组件。

## Step 4：FIXED SECTION 校验

```bash
python ".claude/skills/sdk-hardemo-generator/tool/validate_fixed_section.py" \
  --test-cases ".ohos-adaptation/04-test-cases.json" \
  --demo-dir "ohos-hardemo-auto"
```

检查：TestInfoPanel导入、组件调用、参数值与test-cases.json一致。校验失败必须修正后才可进入Step 5。

## Step 5：增量编译验证与修复循环（MANDATORY - 编译必须通过才算完成，禁止未实际执行就写 pass）

1. **hvigorw 查找方式**：Windows / PowerShell 下禁止使用 `where hvigorw` 或 `where.exe hvigorw`；必须使用 `Get-Command hvigorw`。
2. **必须执行的 HAP 命令**（原样写入 `assemble_hap_command`；**各平台均使用 `hvigorw`**，命令行工具已在 **PATH**）：**`hvigorw -e assembleHap --mode module -p product=default -p buildMode=debug --no-daemon`**
   - 若 hvigor 要求指定应用模块，在**同一命令**末尾追加 **`-p module=entry`**（或日志提示的 `entry@default`）；
   - **成功判定以退出码为准**：若命令**退出码为 0**，即使 **stdout/stderr 为空**也视为**本次 assembleHap 成功**；**不得**仅因"没有输出"就判失败。
3. **修复循环**：所有编译命令均在 `ohos-hardemo-auto/`（与 `hvigorw` 同级）工程根执行。**编辑 → 再次执行同一条 assembleHap**（必要时穿插 **`hvigorw -e assembleHar --mode module -p module=library@default -p product=default --no-daemon`** 先修 HAR），重复直至 **assembleHap 退出码为 0**；退出码为 0 但无输出也应立即按成功收尾。
4. **不可修复条件**（任一满足即终止修复循环，跳过 Step 6a，直接进入 Step 6b）：`hvigorw` 不可用（`Get-Command hvigorw` 返回空）/ 同一编译错误连续循环 **3 次**无变化 / 编译命令未实际执行（退出码不可知）。

> 注意：循环修复报错时，要兼顾测试用例功能语义，不能为了工程编译通过而采用降级策略，破坏掉原功能语义。

## Step 6：生成结果文件

**⚠️ 进入 Step 6 前必须先判定 Step 5 的编译结果，按以下分支执行：**

| Step 5 结果 | 执行分支 |
|-------------|---------|
| `assembleHap` 退出码 = 0 | **Step 6a** — 生成成功报告 |
| 退出码 ≠ 0 / 未执行 / 触发不可修复条件 | **Step 6b** — 生成失败报告 |

### Step 6a：编译通过 → 成功报告

**仅当 Step 5 assembleHap 退出码为 0 时执行。**

生成 `05-demo-gen.json`：
```json
{
  "status": "success",
  "message": "Demo App 生成成功",
  "generatedAt": "2026-03-28T10:00:00+08:00",
  "compileAttempted": true,
  "statistics": {
    "modules": 2,
    "testCases": 10,
    "p0TestCases": 5,
    "generatedFiles": 15,
    "harmonyApisBackfilled": 8
  },
  "generatedFiles": [ "..." ]
}
```

生成 `05-demo-gen-report.md`：
```markdown
# Demo 生成报告

## 生成状态
- 状态：成功
- 生成时间：2026-03-28 10:00:00

## 生成统计
- 功能模块数：2
- 测试用例数：10
- P0 测试用例数：5
- 生成文件数：15
- 回填 Harmony API：8 个（去重）

## 测试用例文件
- `.ohos-adaptation/04-test-cases.json`：已就地回填 `coveredApis.harmony`（android↔harmony API 闭环）

## 验证结果
- 编译状态：通过
- P0 测试用例验证：全部通过
```

### Step 6b：编译失败/未执行 → 失败报告

**当 Step 5 未执行、编译退出码 ≠ 0、或触发不可修复条件时执行。**

生成 `05-demo-gen.json`：
```json
{
  "status": "failed",
  "message": "Demo App 编译失败",
  "reason": "<具体原因：hvigorw不可用 / 编译错误xxx / 依赖解析失败 / 未执行编译>",
  "compileAttempted": true,
  "lastCompileError": "<最后一条编译错误信息摘要>"
}
```

生成 `05-demo-gen-report.md`：
```markdown
# Demo 生成报告

## 生成状态
- 状态：**失败**
- 生成时间：2026-03-28 10:00:00

## 失败原因
- <具体原因>

## 验证结果
- 编译状态：**未通过**
- 错误详情：<最后一条编译错误信息>
```

---

## § Demo 编码规范

> demo 特有规则。ArkTS 通用装饰器/时序陷阱见 `references/common-errors.md`「Demo 编码高频陷阱」，编写/修复 .ets 必须严格遵循 `arkts-rules` Skill。

### HAR 接口契约

- **唯一接口依据**：先读 `library/Index.ets` 及核心组件 `.ets`，枚举全部 `@Prop`/`@Link`/`@BuilderParam`、public 回调属性、导出控制器/管理类（命名含 Controller/Manager/Engine/Handler）。以此为准编写 Demo。
- **接口缺陷先修 HAR**：外部可配置属性以 `@State private` 实现（宿主无法传入）→ 必须先改 HAR 为 `@Prop`；`Index.ets` 导出已废弃 API（`@Deprecated`/标注"已废弃"）→ 必须先从 Index.ets 移除导出。修后再编 Demo，禁止用包装/临时变量绕过。
- **视觉完整性自检**（前置门禁，优先级高于编码）：枚举导出后，对每个能力扫公开方法签名是否含视觉关键词（open/close/toggle/animate/slide/peek/show/hide/expand/collapse）。若该能力有可见 UI 效果（依据功能语义/PRD 判断），但 HAR 无对应 `@Component struct` 导出 → 必须先在 `library/src/main/ets/ui/` 创建视觉组件并从 Index.ets 导出，再编 Demo。禁止用 `Text("状态:X")+Button("调用Y()")` 或控制台日志代替视觉渲染。
- **组件组合关系自检**：组件有 `onXxxShow/onXxxUpdate/onXxxHide` 回调但自身 build() 不渲染对应 UI → 视觉委托给同模块另一导出组件，页面须同时引入并接通回调链路；组件有 `@BuilderParam` → 页面必须传入对应内容组件。
- **响应式链路优先**：颜色、尺寸、选中、进度、显隐、动画目标值等可见状态，优先通过 HAR `@Component`+`@Prop`/`@Link`/`@Watch`、Host/Portal 或状态对象驱动；控制器/管理类只作持续型资源或命令 facade（轮播、动画循环、事件流订阅、刷新、媒体播放、网络轮询）接入。视觉能力缺少可渲染组件或响应式入口 → 先回修 HAR，禁止绕过 HAR 直调底层系统组件或手写平替（`setInterval`/`swiperController.showNext()`/`animateTo`）。
- **ArkTS 装饰器与时序陷阱**：高频陷阱（@Prop 数据源须用 @State、@BuilderParam 父 Builder 传参禁区、@Builder 多参数不响应式、Controller 方法避开子组件 aboutToAppear 之前、8 位 hex 颜色 #AARRGGBB）的错例与修复见 `references/common-errors.md`「Demo 编码高频陷阱」。

### 渲染验证（视觉展示语义触发）

对每条用例，扫描其 `checkpoint` 与 `expected_result`，若含**视觉展示语义词**：显示/渲染/绘制/展示/出现/消失/刷新/布局/滚动/高亮/颜色/动画/样式/可见/隐藏/展开/收起——按以下判定：

- **coveredApis.harmony 已含 `@Component` 视觉组件**（如 DiffList/Canvas/Swiper 等）→ 直接用该组件渲染，本规则不触发。
- **coveredApis.harmony 无现成视觉组件**（被测 API 为逻辑/数据类：Adapter/Holder/Manager/计算类，本身不渲染）→ **Demo 必须在页面渲染视觉组件验证该展示**：
  1. 用 coveredApis 逻辑 API 产出数据；
  2. **优先组合 HAR 中其他可用视觉组件**（如 DiffAdapter 的数据绑定到 `DiffList`+`itemBuilder` 渲染列表项）；
  3. HAR 无任何可用视觉组件时，**Demo 自建视觉层**（`List`/`Canvas`/`Text` 渲染等）完成展示；
  4. **禁止仅把数据 dump 到 result 文本冒充渲染验证**（如 `getDatas()` 拼字符串到 result ≠ 渲染）。
- 无视觉展示语义的用例（纯数据正确性：数量一致/值正确/返回匹配）→ 数据验证类，result 文本展示 HAR 真实返回即可。

> 组合渲染正例见 `references/code-patterns.md` 示例代码十二（DiffAdapter→DiffList）。

### 真实接入闭环

- **HAR 公开 API 为主链路**（唯一处定义）：同一能力禁止页面直调系统 API、操作系统状态或手写平替后宣称"已验证 HAR"。
- **状态型能力承载者**：adapter_layer/lifecycle/query/controller/事件监听等，须在页面或页面级 service 中明确唯一 HAR 运行态承载者，禁止反复 new 包装对象。
- **真实输入→HAR→真实结果**：依赖真实文件/媒体/URI/序列化产物/网络响应的能力，至少一个验证点走真实链路；内存合成数据仅辅助。
- **成功来自证据**："成功/已更新/已保存/已生效"须建立在 HAR 真实返回值/回调/事件/回读验证之上，禁止写死提示文案。
- **行为边界结果来自 HAR 真实输出**：验证"空字符串返回默认值/最后调用覆盖"等边界时，结果文案不得写死预期，须基于 HAR 真实返回值/产物推导；可视产物（PixelMap 等）须在 Demo 展示供目视确认。
- **参数真实传入**：Demo 控件展示的参数须真实传入 HAR 公开 API 产生可观察 UI/日志/回调/回读；参数在 HarmonyOS 不生效、HAR 未实现或已裁剪 → 禁用/隐藏/明确提示，不得展示为正常可调参数。
- **能力边界**：需系统能力但 HarmonyOS 官方 API 不存在/当前 SDK 不可用/只能宿主完成 → 不得手写平替冒充已支持，页面表现做成"不支持/需宿主接入/需设备能力"可见状态（可用 harmonyos-docs-lookup/harmonyos-sdk-api-lookup 查询）。
- **coveredApis.harmony 回填**：每条用例接线后把实际调用 HAR API 记入 coveredApis.harmony（回填见 Step 3）。

### 运行态质量原则

- **状态机幂等**：异步初始化前只显 loading/error/empty，依赖全部写入后才 ready；重复进入/返回再进/连点/输入变化/切换开关/重新初始化/旧回调晚到，都不导致状态断裂、重复注册、重复订阅或旧数据覆盖新数据。
- **数据归一化与空值边界**：从 HAR/系统 API/资源文件/Picker/网络/Native 回调拿到的数据先转成可安全渲染模型；字段缺失/空数组/异常返回/部分失败/对象/数组/索引/查找结果/回调参数/资源引用/URI/path/权限结果等须有默认展示、空状态或错误摘要。
- **渲染与副作用分离**：HAR 调用、系统 API 调用、权限申请、文件读写、网络请求、事件注册等副作用只在生命周期/按钮事件/输入事件/显式 helper 中触发，不藏在渲染表达式里。
- **渲染结构稳健**：大列表/搜索结果/文件列表/媒体列表用合适策略展示；列表项 key 稳定、空列表有 empty 状态；跨组件契约（Builder/slot/callback/listener/controller）须清楚数据由谁持有、何时更新、由谁触发重绘，不清时优先用显式 `@Prop`/`@Link`、provider、Host/Portal 或状态对象，而非隐式捕获父页面状态。
- **宿主与前置条件可见**：需要 UIAbilityContext/权限入口/页面容器/Want 跳转/Picker/设备能力/rawfile/图片/字体/权限/设备开关/系统能力等前置条件时，Demo 必须展示或说明宿主责任、UI 状态和日志；缺失时显示可读错误，不直接崩溃或静默失败。

### 对齐基准

- **功能点语义为准**：页面功能与流程以测试用例功能语义和 PRD 功能模块为准（每条用例=一个功能点，步骤纯功能语义、平台无关），**非 Android Demo 页面结构**；代码必须重写，禁止直译 Java/Kotlin。
- **对齐范围**：按 PRD 功能模块与用例功能语义组织页面（一模块=一 Module 页，一用例=一 TestCase 详情页）；保持与 test_steps 一致的操作路径（入口→配置参数→触发功能→展示结果）；按功能模块/用例编号命名页面、保持功能入口清晰。
- **冲突优先级**：Android 能力/参数与 HarmonyOS 真实支持范围冲突时，以 HAR 真实能力边界为准，提示不支持/禁用/隐藏入口，禁止为对齐伪造可用能力。
- **禁止直译范式**：生命周期 `onCreate/onResume`→`aboutToAppear()`；`Activity+XML`→`Ability+@Component`；`Intent`/`startActivityForResult`→`Want`/`router.pushUrl`；`findViewById`/`DataBinding`→`@State`/`@Prop`；`Fragment`→`@Component` 拆分；`Android.Manifest.permission`→`module.json5` requestPermissions+运行时申请；`FileProvider URI`→Picker URI/`file.fs` 沙箱；异步回调/`LiveData`→`Promise`/`async-await`；`PhotoView`/第三方库→鸿蒙化三方库或系统组件+手势自定义。
- **设备能力真实调用**：原 Android 用户流程实际调用设备 API（录音/相机/传感器/蓝牙/定位）时，鸿蒙 Demo 必须用对应鸿蒙 API 真实实现，禁止 `Math.random()`/固定值/模拟数据/占位逻辑。典型替换：`MediaRecorder`/`AudioRecord`→`media.AVRecorder`/`audio.AudioCapturer`；`CameraX`/`Camera2`→`camera.CameraManager`；`SensorManager`→`sensor.subscribe*`；`BluetoothAdapter`→`@kit.ConnectivityKit`。运行时用 `UIAbilityContext.requestPermissionsFromUser()` 申请 user_grant，麦克风/相机等先 `abilityAccessCtrl.requestGlobalSwitch()` 查开关；UI 展示授权结果与设备实时数据；鸿蒙 API 不可用时在报告标注 `native` 验证点+降级原因，不得静默模拟。
- **权限落地**：HAP 权限以 `entry/src/main/module.json5` 为准（library/module.json5 不能替代）；`system_grant`（如 INTERNET）须声明+真实调用验证；`user_grant`（定位/相机/麦克风/蓝牙扫描）须真实 `UIAbilityContext` 请求，禁用空对象/伪 context；HAR 通过 host contract 委托权限/开关时 Demo 必须实现该 contract 并在调用前检查；权限拒绝/开关关/context 不可用 → 停止本次调用+展示可读状态，不得显示固定成功。

---

## § UI 界面规范

### 测试信息区（FIXED - 禁止修改）

- 禁止删除 TestInfoPanel、修改参数名/值、替换为自定义组件。
- 正确：`TestInfoPanel({ level, preconditions, test_steps, expected_result, postconditions: '' })`；错误：`Text('用例ID: F-01')`。
- TestInfoPanel 内部 Column 须设 `.alignItems(HorizontalAlign.Start)` 保证左对齐。

### Action 区

1. **操作流程**：严格按 test_steps（第 3 步起）设计；步骤 1~2 为导航（忽略）。**步骤 3 起为纯功能动作，无【】标记**，按动作语义映射为 Actions 区控件：

   | action 语义 | Actions 区生成物 |
   |---|---|
   | 纯触发型（点击/执行/注册/获取/新增/删除/填充/加载/更新/清空） | `Button(动词+对象)` |
   | 输入型（输入/填写/设置值/指定参数） | `Text(参数名)`+`TextInput`(绑 @State)+`Button(执行/确认)` |
   | 选择型（选择/切换/下拉） | `Text(参数名)`+`Select([...])`+`Button(执行)` |

   控件 label 取 action 动词+对象的**自由浓缩**（如 action="注册不同视图类型的 Holder 并填充数据列表" → `Button('注册Holder并填充数据')`），不照抄全句。Actions 区只含步骤 3+ 映射控件 + 渲染类用例的预览区，不加无关装饰控件。校验：提取步骤 3+ 每个 action，确认 Actions 区有对应控件且操作语义一致。（示例见 code-patterns.md 示例代码一、二）
2. **边界用例**：特殊值（负数/小数）输入校验在逻辑层（onChange/onClick），UI 层用 InputType.Normal；区分中间输入态与最终确认态——onChange 只更新显示，onClick/onSubmit/onBlur 执行边界检查。（示例见示例代码三、五）
3. **回调逻辑**：onClick 职责单一（调 API/更新 result/触发一次性操作，禁改视觉样式 @State）；按压态等临时状态由 onTouch(Down/Up/Cancel) 管理、Up/Cancel 恢复；组件内部已定义事件处理器时外部禁用同名方法覆盖，须用组件回调属性接口（onItemClick/onTouchStateChange）；组件内部已定义固定尺寸时外部禁设更小尺寸覆盖。（示例见示例代码四、六、七）
4. **输入控件状态绑定**：每个 TextInput 绑定 @State（建议名 inputXxx）；onChange 必须保存输入（空回调是严重缺陷）；计算时用 `this.inputXxx` 禁硬编码；`TextInput({ text: this.inputXxx })` 双向显示。（正例见 code-patterns.md 示例代码九）
5. **HAR API 签名核实**：调用前查 `library/src/main/ets/core/` 源码确认是方法还是属性（方法须加 `()`）；错误表现：模板输出 `"Cannot get source code"`。（示例见示例代码十）
6. **资源 API 禁硬编码 ID**：禁 `Res.getColor(0x01060001)`；用资源名 `getXxxByName('name')` 或 `$r('app.color.xxx')`。
7. **容器响应式**：方向敏感组件（有 orientation/direction）→ 预览区须 `if` 条件渲染不同尺寸容器，禁固定尺寸+仅改配置；尺寸敏感组件（Canvas/Svg/自绘）→ 容器尺寸变化须条件渲染，仅绘制内容变化可调重绘方法（如 drawAll()）。校验点：方向/尺寸配置变化时是否条件渲染；仅数据刷新是否有重绘方法调用。
8. **滚动容器内触摸组件手势冲突**：HAR 组件（Canvas.onTouch/PanGesture/自定义手势）嵌套 Scroll/List 时外层抢手势；修复：触摸叶子组件加 `.hitTestBehavior(HitTestMode.Block)`（API 9+），需阻断祖先但保留子穿透用 `BLOCK_HIERARCHY`（API 20+）。（示例见 code-patterns.md 示例代码十一）

### result 区

- result 展示 HAR 真实返回值/数据快照作为验证证据；观察点来源为 test_steps 的 `checkpoint` 字段。**数据验证类**用例：result 文本为主要载体，展示真实返回/数据快照（数量/值/列表），禁硬编码；**渲染验证类**用例：视觉产物在预览区展示，result 文本辅助记录观察点判定依据（如"新增行出现/指定行消失"）。（示例见 code-patterns.md 示例代码八；其他见 result-format.md）

---

## § 质量门禁

写完 Demo 后、执行最终 assembleHap 前，做一次静态审查。下列每项只列检查点，规则见对应 § 章节，错例见 `references/common-errors.md`。

- **交互 Text 绑定回调**：扫描 @Builder/build() 中带交互暗示文案的 Text，确认绑定事件回调+@State 驱动；按功能语义该控件应为可交互则必须一致，禁静态占位文本。（规则见 §对齐基准；错例见 common-errors.md「交互暗示文本无交互实现」）
- **@Builder 参数响应式**：参数数 ≥2 含原始类型时，确认未用于 UI 属性绑定/子组件传参。（规则见 §HAR 接口契约 > ArkTS 陷阱；错例见 common-errors.md「@Builder 多参数不响应式」）
- **导航 onClick 非空**：扫描 Button.onClick 回调体含至少一条有效语句（router.pushUrl/方法调用/状态更新），针对 Index.ets 导航按钮。
- **@State→@Prop 闭环**：对每条 TestCasePage，提取 test_steps 第 3 步起【】内配置参数 → 确认声明 @State 并由控件更新 → 确认该 @State 出现在 HAR 组件构造参数中。（错例见 common-errors.md「@State→@Prop 闭环漏传组件」）
- **Builder.config 传入渲染**：链式构建的 config 须最终传入 HAR 组件实例化，仅 build() 不渲染则校验永不触发。（错例见 common-errors.md「Builder.config 构建后未传入组件渲染」）
- **HAR 能力缺口审查**：对每条用例 coveredApis.android，确认 library/Index.ets 导出有对应能力；无对应 → 按能力边界提示/隐藏入口 + 在 05-demo-gen-report.md 标注 gap（功能点 ID+缺失 Android API+原因），禁手写平替冒充支持。
- **渲染验证审查**：对 checkpoint/expected_result 含视觉展示语义的用例，确认页面挂载了视觉组件（DiffList/Canvas/自建 List 等）渲染展示，而非仅 result 文本 dump 数据。（规则见 §Demo 编码规范 > 渲染验证）
- **新增/修改标记同步**：测试用例名称含 `（新增）` 或 `（修改）` 时，Demo 页面、入口或按钮等可见名称同步保留该标记
- **孤立状态变量**：交互控件 onChange 回写的 @State 须被至少一个渲染属性消费（.enabled()/.fontColor()/.backgroundColor()/.visibility() 等）。（错例见 common-errors.md「孤立状态变量」）
- **初始配置 vs @Prop 默认值**：读组件 @Prop 默认值，对比 Demo @State 初始值——影响首次体验的差异须修正为可用值+提供开关；纯展示风格差异可保留但报告说明；FullConfigDemo 类页面核心操作默认开关须可用。

---

*本文档最后更新：2026-06-27（v2.1 - 新增渲染验证规则；Action区去【】改语义映射；result区改 checkpoint 驱动）*
