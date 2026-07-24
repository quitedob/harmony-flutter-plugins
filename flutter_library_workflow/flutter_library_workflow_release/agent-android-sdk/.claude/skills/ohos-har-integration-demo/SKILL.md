---
name: ohos-har-integration-demo
description: 将 ArkTS HAR 集成到 hardemo：Demo + src，assembleHap 闭环与 15 产物字段说明。
---

# 鸿蒙 HAR 集成与 Demo 脚手架 Skill

## 为什么不是「纯 .ts」

- **ArkTS** 运行在鸿蒙运行时，源文件扩展名为 **`.ets`**，工程由 **hvigor** + **oh-package.json5** 驱动。
- **HAR**（Harmony Archive）是可在应用内依赖的库产物；业务方通过 `ohpm`/`file:` 依赖集成。
- 若 Agent 只生成与 Node/npm 兼容的 `.ts` 包，**无法在 DevEco 中直接 `assembleHar` / 集成**，不符合「可集成 HAR」目标。

## 本阶段目标（`sdk-har-demo`）

1. 确认 **13 阶段** 已在 **`hardemo` 形态**下交付：`har_module_relative_path` 指向复制体内的 **`library/`**（`type: har`、`harTasks`、`Index.ets` 等）。
2. 在**同一仓库**内以 **`./scaffold/hardemo`** 为**唯一**工程基底：**整目录复制**到sdk仓库内（如 `ohos-hardemo/`），**禁止修改** `./scaffold/hardemo/**` 链入源（workspace-links → **`agent-android-sdk/scaffold/hardemo`**）。**禁止**改用其它单应用模板替代多模块 **`entry` + `library`** 结构。
3. **推荐**：**15 与 13 共用同一复制目录**——若 13 已生成 `ohos-hardemo/`，本阶段**以该目录为 `scaffold_root`**，在 **`entry/`** 完成 Demo App 集成；`entry/oh-package.json5` 按需增加对 **`library`** 的依赖如 `"library": "file:../library"` 等。**library 内实现已在 13 完成**，一般不再整体替换。**若 13 未留复制体**，则重新从 `./scaffold/hardemo` 复制后再对齐 `library/` 与 13 产物。
5. **图片与 URL**：
   - **禁止**空字符串、未赋值变量或虚假占位作为图片地址（避免出现「URL 为空」的运行时/展示问题）。
   - **必须声明权限**：使用 `https://` 在线 URL 时，必须在 `entry/src/main/module.json5` 的 `requestPermissions` 中声明 `"ohos.permission.INTERNET"`； 仅声明权限还不够，必须在代码中**运行时申请**：使用 `UIAbilityContext` 调用 `requestPermissionsFromUser()`
6. **设备形态**：**仅适配直板手机**（竖屏窄屏）；不要求折叠屏/平板/2in1 专门布局。以单列竖向、`%`/`vp`/`LayoutWeight` 为主。
7. **视觉**：页面宜 **精致美观**——留白、圆角、层次（卡片/分组）、字号层级、足够大的触控区；避免简陋默认堆砌。
8. **按钮与文字**：按钮中的文字**必须**显示全（可以调整按钮大小，文字可换行），按钮若超出屏幕**必须**能够滚动。
9. 编写 **Demo 页面**：调用 HAR 公开 API，便于肉眼或日志验证。
10. **必须**在宿主环境执行 **assembleHap**（见下「标准 HAP 命令与修复循环」），并对 **entry + library** 的编译错误 **自动修复、反复重跑**；

## 推荐目录布局（示例，与 `scaffold/hardemo` 一致）

```
<repo>/
  ohos-hardemo/                 # 由 ./scaffold/hardemo 复制；scaffold_root = 本目录
    AppScope/
    entry/                      # HAP 应用模块（Demo 页面、main_pages 追加）
    library/                    # HAR（13 阶段实现所在；har_module_relative_path = ohos-hardemo/library）
    build-profile.json5         # 已含 entry + library
    hvigorfile.ts               # appTasks
    oh-package.json5
```

路径一律写入 JSON 产物，使用**相对仓库根**的 POSIX 风格路径（Windows 下仍建议用 `/` 写在文档与 JSON 中）。

## hvigorfile.ts：系统任务名

**HAR 的 hvigor 内置任务不叫独立 npm 包名**，一律从 **`@ohos/hvigor-ohos-sdk`** 导入，按**模块类型**选用：

| 模块类型 | `hvigorfile.ts` 写法 |
|----------|----------------------|
| **工程根**（与 `hvigorw` 同级，编排多模块） | `import { appTasks } from '@ohos/hvigor-ohos-sdk'` → `system: appTasks` |
| **HAP 应用模块**（如 `entry/`，可装机的应用） | `import { hapTasks } from '@ohos/hvigor-ohos-sdk'` → `system: hapTasks` |
| **HAR 库模块**（13 阶段交付的 Static Library / `assembleHar`） | `import { harTasks } from '@ohos/hvigor-ohos-sdk'` → `system: harTasks` |

## HAR 依赖声明（oh-package.json5）

**同一 hardemo 工程内**，`entry` 通常通过 **`file:../library`** 依赖 **`library`** 模块（名称与 `library/oh-package.json5` 的 `name` 一致，默认 **`library`**）：

```json5
{
  "dependencies": {
    "library": "file:../library"
  }
}
```

- 若 13 已配置好 workspace 依赖，**最小改动**即可；跨仓 `file:` 仅在不采用 hardemo 一体工程时使用（本流水线以 hardemo 为准）。

## 必跑构建与编译检查（项目约定）

转换完成后须在**脚手架工程根目录**（存在 `hvigorfile.ts` / `hvigorw` 的 `${PROJECT_PATH}`）执行构建；**必须先尽力跑通 HAP**（见下），将**实际用过的命令**原样写入 `assemble_har_command` / `assemble_hap_command`，并据 **assembleHap 最终结果**填写 `demo_build_status`。

### 0) 标准 HAP 命令（**强制**，与流水线约定一致）

在 `${PROJECT_PATH}` 下（先 `ohpm install` 若需要）**必须执行**：

```bash
hvigorw assembleHap --mode module -p product=default -p buildMode=debug --no-daemon
```

- **各平台（含 Windows）均使用 `hvigorw`**（命令行工具已在 **PATH**）；**不要**写 `hvigorw.bat`。
- 若构建要求指定应用模块，追加 **`-p module=entry`**（或 `entry@default`，以 hvigor 日志为准）；写入 JSON 的 `assemble_hap_command` 须为**最终成功**的**完整**一行。
- **失败时**：根据日志修改 **Demo 工程内文件** 或 **HAR 模块**（`har_module_relative_path`）内源码/配置，**再次执行同一条 assembleHap**，循环直至 **退出码 0**。**Demo 与转化后 SDK（HAR）两侧错误均需修复**，不得只改一侧。

### 1) 编 HAR（库模块，按需/排错）

在 **`scaffold_root`（hardemo 工程根）** 执行（与 13 阶段约定一致）：

```bash
hvigorw assembleHar --mode module -p module=library@default -p product=default --no-daemon
```

- **各平台 `hvigorw`**；模块名 **`library`** 与模板 `build-profile.json5` 一致。
- HAP 失败且日志指向 `library` 时，**先修 library** 再 **重复上述 assembleHar**（可选）再 **重复标准 assembleHap**。

### 2) 与「强制 HAP」的关系

- **验收标准**：以 **assembleHap 成功** 为主；`demo_build_status=pass` 必须对应 **该命令最终成功**。
- `buildMode` 调试阶段固定为 **debug**（与上文命令一致）。

### 3) HAP 产物路径（用于核对是否生成成功）

成功时产物通常位于（具体以工程 `product` / `target` 为准）：

```
${PROJECT_PATH}/{moduleName}/build/{productName}/outputs/{targetName}/*.hap
```

- `moduleName`：参与 `assembleHap` 的 **应用模块**目录名（如 `entry`）。
- 在报告或 `run_instructions_zh` 中可写明本次构建产出的 **`.hap` 绝对路径或相对 `${PROJECT_PATH}` 的路径**，便于人工 `hdc install` 验证。

### 4) 与 JSON 产物的对应关系

| 检查项 | 写入字段 |
|--------|----------|
| HAR 单独编译（若执行过） | `assemble_har_command` |
| **集成后整包 HAP（强制）** | **`assemble_hap_command` = 上文标准 assembleHap（+ 必要时 `module=entry`）**；**`demo_build_status`** 仅在实际成功时为 `pass` |
| 用户可复现步骤 | `run_instructions_zh`（含 `cd` `${PROJECT_PATH}`、`ohpm install`、assembleHap、`.hap` 产物位置与关键手工验收入口） |

若当前环境**未安装 hvigor / JDK / SDK** 导致无法执行，**不得**虚构 `pass`：`demo_build_status=fail`，并在报告中列出环境依赖与推荐 DevEco 版本。

## Demo 代码要点

- 仅使用 **ArkTS** 语法与鸿蒙 API；**不要**引入 Node `require`、`DOM` 等 Web 假设。
- Demo 应 **import** HAR 暴露的稳定入口（如 `import { X } from 'my_sdk'`）。
- 异常与权限失败须有 **可观察输出**（日志或 UI 文案）。
- **直板机**：布局按手机竖屏优化；勿默认宽屏多列。
- **美观**：用 `Column`/`Scroll`、间距、`borderRadius`、`fontSize`/`fontWeight`、背景色块区分区域；**在线 URL** 仅用上文固定占位，勿留空。
- **优先使用 HAR 导出的控制器**：若 HAR 为某持续型/状态型能力导出了控制器/管理类（命名含 `Controller`、`Manager`、`Engine` 等），Demo 必须演示该控制器的完整生命周期（start → 运行中 → stop/reset），不得绕过控制器直接调用底层系统组件 API。
- **UI 组件优先**：HAR 导出的 UI 组件封装了该 SDK 的完整视觉和交互行为。Demo 必须使用这些组件进行展示，不得用基础元素（Text/Row/Button 等）重新实现。
- **枚举全覆盖**：HAR 导出的 enum 在 Demo 的 if-else/switch 链中，**必须处理所有变体**。遗漏分支会导致无声降级到默认 fallback 值，不触发编译/运行时错误，极难排查。若某个变体确实不应有可见效果，加注释 `// 故意 fallthrough` 显式说明。
- **图片资源**：
  - ❌ 禁止使用 `$r('app.media.startIcon')` 作为内容图。`startIcon.png` 仅用于应用启动图标。
  - ❌ 禁止使用 `$r('app.media.icon')` 等系统预置图代替 demo 实际图片。
  - ✅ 从 Android 源 SDK 提取 Demo 实际用到的 drawable/mipmap 资源，复制到
    `resources/base/media/`，用 `$r('app.media.xxx')` 引用。

## 设备敏感权限与能力（Demo 必须真实实现，禁止模拟）

当 Android Demo 在用户流程中使用了以下设备能力时，鸿蒙 Demo **必须**使用对应鸿蒙 API 真实实现，**禁止**用 `Math.random()`、固定值或占位逻辑替代。这是验证 HAR 在真实环境下是否工作的关键。

> **核心原则**：如果 Android Demo 真实调用了设备 API（如 `MediaRecorder`、`Camera2`），鸿蒙 Demo 不能退化为"只演示 UI 动画"——必须展示完整的能力链路（权限申请 → 设备 API 调用 → 实时数据回传 → HAR API 验证）。

### 录音 / 麦克风

- **鸿蒙权限**：`ohos.permission.MICROPHONE`（user_grant）
- **module.json5 声明**：
  ```json5
  {
    "name": "ohos.permission.MICROPHONE",
    "reason": "$string:microphone_reason",
    "usedScene": {
      "abilities": ["EntryAbility"],
      "when": "inuse"
    }
  }
  ```
- **字符串资源**：`entry/src/main/resources/base/element/string.json` 中添加 `microphone_reason` 说明
- **全局开关检查**（麦克风受系统全局开关管控，必须先检查）：
  ```typescript
  import { abilityAccessCtrl, common } from '@kit.AbilityKit';

  const context = this.getContext(this) as common.UIAbilityContext;
  const atManager = abilityAccessCtrl.createAtManager();
  // 先检查全局开关
  const switchResult = await atManager.requestGlobalSwitch(context, abilityAccessCtrl.SwitchType.MICROPHONE);
  if (switchResult) {
    // 全局开关已开启，继续申请权限
  }
  ```
- **运行时权限申请**：
  ```typescript
  const result = await atManager.requestPermissionsFromUser(context, ['ohos.permission.MICROPHONE']);
  if (result.authResults[0] === 0) {
    // 已授权，开始录音
  } else {
    // 拒绝，UI 提示用户手动授权
  }
  ```
- **录音 API**：`media.createAVRecorder()` 配合 `audio.AudioCapturer`，或直接使用 `audio.AudioCapturer` 采集 PCM 并计算音量
- **音量获取**（Android `MediaRecorder.getMaxAmplitude()` 的鸿蒙等价方案）：
  ```typescript
  import { audio } from '@kit.AudioKit';

  const audioCapturer = await audio.createAudioCapturer(audioCapturerOptions);
  // 定时读取缓冲区计算 RMS 或峰值
  audioCapturer.on('readData', (buffer: ArrayBuffer) => {
    // 计算 RMS/峰值 → 转换为音量值 → 传入 HAR SDK 的 setVolume()
  });
  ```
- **禁止**：`Math.random()` 模拟音量、`setInterval` + 随机数驱动波形

### 相机

- **鸿蒙权限**：`ohos.permission.CAMERA`（user_grant）
- **API**：`camera.CameraManager` + `camera.createCameraInput()`
- **全局开关**：同上使用 `abilityAccessCtrl.SwitchType.CAMERA`
- **禁止**：占位图替代真实相机预览

### 传感器

- **鸿蒙权限**：部分需 `ohos.permission.ACCELEROMETER` 等
- **API**：`sensor.subscribeAccelerometer()` 等
- **禁止**：固定值或随机值替代真实传感器数据

### 蓝牙

- **详见 `ohos-coding-guide/bluetooth-integration.md`**

### 通用规则

1. **声明 + 运行时申请缺一不可**：`module.json5` 声明是前提，`requestPermissionsFromUser()` 是运行时必需
2. **授权失败要有 UI 反馈**：Toast 或文案提示用户手动授权，不要静默失败
3. **能力数据必须真实**：来自设备 API 的实时数据，不是 `Math.random()` 或硬编码值
4. **全局开关**：麦克风、相机等能力需先检查 `abilityAccessCtrl.requestGlobalSwitch()`
5. **降级须显式声明**：若鸿蒙 API 确实不可用，须在 `prd_capability_coverage` 中标注降级原因和影响范围，不得静默降级

## 输出契约

- JSON：`04-har-demo.json`（见 Schema）
- 报告：`04-har-demo-report.md`（中文：目录说明、依赖关系、如何运行）

## 常见错误

| 问题 | 处理 |
|------|------|
| 误建 npm `package.json` 当鸿蒙工程 | 删除或迁出，改用 `oh-package.json5` + hvigor |
| HAR 路径写错导致 ohpm 解析失败 | 核对 `file:` 相对路径从 **应用模块** `oh-package.json5` 出发 |
| 仅文档描述未真实构建 | `demo_build_status` 不得虚构；无法执行则标 `fail` 并写明环境缺口 |
| assembleHap 报错 | **改 Demo 或 HAR → 重跑同一条命令**，直至成功或确认不可修复 |
| 设备能力用模拟数据替代 | **禁止**用 `Math.random()` 等模拟数据替代 Android Demo 中实际使用的设备能力（录音、相机、传感器等）。必须使用鸿蒙等价 API 真实实现；无法支持时明确说明原因。详见「设备敏感权限与能力」章节 |
| 系统 Picker 仅返回 URI，元数据未回填导致显示默认值 | `PhotoViewPicker`/`DocumentViewPicker`/`AudioPicker`/`FilePicker` 通常**
| `class constructor cannot called without 'new'` | `@CustomDialog` struct 在非 `@Builder` 方法中调用，或 `CustomDialogController` 的 `builder` 用箭头函数包装。修复：将 `@CustomDialog` 调用移入 `@Builder` 函数，传参存为 `@State` 成员变量，`builder` 直接引用 `@Builder` 函数。详见 `ohos-coding-guide/ui-coding.md` 第三节。 |
| 行为边界验证结果写死 | 验证"空字符串返回默认值"、"最后调用覆盖"等边界时，结果文案写死预期行为而非基于 HAR 真实返回值推导；若返回可视产物（如 PixelMap）未展示。修复：结果文案必须从 HAR API 返回值推导；可视产物必须在 Demo 中展示供目视确认 |
| RelativeContainer 中追加按钮不显示 | 同方向设多条 `alignRules`（如 `top`+`center`）互斥。同一方向只保留一条，或改用 `Column`。详见 `ohos-coding-guide/ui-coding.md` 第八节。 |
| Demo 页面持有 @Component struct 引用调用方法 | `private ref: XxxView \| null = null` 永远是 `null`，所有按钮操作无效。修复：父页面用 `@State` 持有状态，通过 `@Prop` 传入子组件，按钮修改 `@State` 即可驱动。`@Watch` 回调中禁止写回 `@Prop`/`@State` 字段，只写普通 `private` 变量。详见 `ohos-coding-guide/ui-coding.md` 第五节。 |
| **孤立状态变量** | Toggle/Switch/Checkbox 的 onChange 回写了一个 `@State`，但该变量没有被任何组件渲染属性（`.enabled()`、`.fontColor()` 等）消费，开关翻转无可见效果。修复：对每个被交互控件修改的 `@State`，确认至少有一个 UI 组件通过 `.enabled(this.x)`、`.fontColor(this.x)` 等属性绑定读取它，产生可见的 UI 变化。 |
| **Demo 绕过 HAR 控制器调用系统组件 API** | HAR 导出了控制器封装某持续型/状态型能力，Demo 却直接调系统组件 API 或手写平替。修复：Demo 必须导入 HAR 的控制器，调用其 `start()`/`stop()`/`reset()` 方法，不得直接与系统组件控制器交互。 |
| **HAR 组件 Options 接口遗漏回调属性** | struct 有无装饰器回调属性（如 `onTransformListener`），但 `XxxOptions` 接口未对应暴露，Demo 无法通过构造参数传入。修复：struct 每声明一个无装饰器 public 回调属性，必须在 Options 接口中添加同名可选字段。 |
| **private 持有 @Prop 数据源** | 父页面用 `private config = new SwiperConfig()` 持有配置，`updateConfig()` 中赋新对象，但子组件 `@Prop` 收不到变更。修复：改为 `@State config`。 |
| **基础元素替代库组件** | 用 Text/Row/Button 等基础元素重新实现 HAR UI 组件的行为和外观，导致内置交互丢失、视觉不一致。修复：直接导入并使用 HAR 导出的 UI 组件。 |
| **枚举变体遗漏** | if-else/switch 链只处理了部分 enum 值，未覆盖所有变体，选到未处理变体时无声走到默认 fallback 值。修复：grep 所有 switch/if-else 对 enum 的判断，确认每个成员都有分支或显式注释说明意图。 |
| **ForEach 内重复调用副效应函数** | 某非确定性函数（随机、时间戳、自增 ID 等）在 ForEach 同一迭代中被多次调用，每次返回不同值，导致同一数据项的各属性来自不同结果。原因是 ArkTS 禁止在 ForEach/Builder 中声明局部变量缓存。修复：在被调用的函数内部实现缓存（如 `private cache: T[]` 按索引缓存结果）。 |
| **Canvas 绘制函数依赖外部设 Canvas 属性** | 在 `drawBorder` 等绘制函数中依赖外部通过 `applyStrokeStyle` 等方式设置的 `lineCap`/`lineJoin`/`miterLimit`，经过 `ctx.save()`/`ctx.restore()` 后可能丢失。修复：每个绘制函数从 BorderConfig 等入参**自行设置**所需全部 Canvas 属性（lineCap、lineJoin、miterLimit、strokeStyle、lineWidth 等），不依赖外部预设。详见 `ohos-coding-guide/ui-coding-canvas.md §6`。 |

### 初始化顺序错误（`not initialized, please call initialize()`）
**现象**：`new Plugin()` 时崩溃，堆栈在 `Adapter.constructor` → `factory.getManager()`。
**根因**：构造函数中**急切获取**未初始化的工厂产物。
**修复**：
1. **Adapter 改为懒加载**：
```typescript
class Adapter {
  private factory = Factory.getInstance();
  // ❌ 移除：private mgr = factory.getManager()
  
  private getManager(): Manager {
    return this.factory.getManager(); // 调用时才获取
  }
}
2. EntryAbility 保持顺序：
const plugin = new Plugin();         // 1. 构造（只存引用）
plugin.initialize(this.context);     // 2. 初始化工厂
plugin.listCalendars();              // 3. 安全调用
原则：构造函数只存引用，绝不调用 factory.getXXX()。
