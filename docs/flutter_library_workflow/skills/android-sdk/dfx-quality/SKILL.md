---
name: dfx-quality
description: 鸿蒙 SDK 适配 DFX 质量门禁检测与修复。涵盖 UX、功耗、性能、稳定性四大维度。Use when HAR 编码、Demo 编码或代码审查阶段需要进行质量门禁检测。提供自动化检测脚本和 Agent 核对清单。
---

# 鸿蒙 DFX 质量门禁（统一入口）

## 子项索引

| 子项 | 文件 | 触发场景 |
|------|------|---------|
| UX | [ux.md](references/ux.md) | Demo 页面编码与审查 |
| 稳定性 | [stability.md](references/stability.md) | HAR 编码、Demo 页面编码与审查 |
| 性能 | [performance.md](references/performance.md) | HAR 编码、Demo 编码与审查 |
| 功耗 | [power.md](references/power.md) | HAR 编码、Demo 编码与审查 |

## 使用方式

1. 编码完成后依次运行检测脚本（退出码 2 = 有问题）
2. 根据运行的脚本名查本文件「工具输出快速定位」对应子表，获取参考文件和章节
3. 按章节读取参考文件中的「检查清单与结果处理」表，按「结果处理」列修复代码
4. 修复后重新运行检测脚本验证

## 检测与修复工具

| 工具 | 类型 | 用途 |
|------|------|------|
| fix_demo_ui.py | 自动修复+检测 | 颜色替换为 `$r()` + 布局/深色模式/折叠屏 |
| fix_stability.py | 仅检测 | 装饰器误用、资源泄漏、FD 泄漏、线程泄漏、API Level 兼容 |
| fix_performance.py | 仅检测 | 启动同步 I/O、ForEach 滥用、主线程阻塞 |
| fix_power.py | 仅检测 | 传感器/定位/扫描/音频资源泄漏、后台 CPU 占用 |

### 命令行用法

```bash
# UX 检测（entry ETS 目录）
python .claude/skills/dfx-quality/tool/fix_demo_ui.py --target <entry_ets_dir>

# 稳定性检测（项目根目录或 ETS 目录）
python .claude/skills/dfx-quality/tool/fix_stability.py --target <project_or_ets_dir>

# 性能检测（ETS 目录）
python .claude/skills/dfx-quality/tool/fix_performance.py --target <ets_dir>

# 功耗检测（ETS 目录）
python .claude/skills/dfx-quality/tool/fix_power.py --target <ets_dir>
```

> **输出说明**：工具输出中带 `FIXED` 标记的行表示已自动修复，无需人工处理；带 `WARNING` 标记的行需要 Agent 根据检测方法指引手动修复。

## 工具输出快速定位

收到工具告警后，按工具名查下表，在对应文件中搜索章节标题（如 `## 8.1`），读取该章节内容，无需全量加载。

> **工具识别**：根据实际运行的脚本名选择子表。
> - 运行了 `fix_stability.py` → 查「fix_stability.py 告警定位」
> - 运行了 `fix_performance.py` → 查「fix_performance.py 告警定位」
> - 运行了 `fix_power.py` → 查「fix_power.py 告警定位」
> - 运行了 `fix_demo_ui.py` → 查「fix_demo_ui.py 告警定位」

### fix_stability.py 告警定位

| 规则 | 参考文件 | 章节 | 检查项 |
|------|---------|:----:|--------|
| 1-1 | stability.md | §1 | 有 `: (...) =>` 或 `: Function` → V1 去装饰器用普通变量；V2 改 @Event |
| 2-1 | stability.md | §2 | `@Link xxx = `（非 `$`）→ 删除 `= value`，父组件传 `$myValue` |
| 3-1 | stability.md | §3 | `@Prop @Watch(...)` 后无 `= value` → 添加 `= 0` 等默认值 |
| 8-1 | stability.md | §8.1 | `@State xxx = new Array(N)` (N>1000) 且 aboutToDisappear 无清理 → `= []` |
| 8-2 | stability.md | §8.2 | `openSync` 无配对 `close` → 补充 finally 中 close |
| 8-3 | stability.md | §8.3-§8.4 | `new Worker` 无 `terminate` 或 `taskpool.execute` 无 `cancel` → aboutToDisappear 中 terminate/cancel |
| 10-1 | stability.md | §10.1 | 已由工具读取，无需 Agent 判断 |
| 10-3 | stability.md | §10.2 | 高版本 API 无 `canIUse`/版本比较 → 补充运行时守卫 + 降级 |
| 10-5 | stability.md | §10.3 | 已由工具结合 10-1+10-3 判断，无需 Agent 判断 |

### fix_performance.py 告警定位

| 规则 | 参考文件 | 章节 | 检查项 |
|------|---------|:----:|--------|
| 1-1 | performance.md | §1 | 启动生命周期中有 `readFileSync`/`statSync` 等 → 改为异步 API |
| 2-1 | performance.md | §2.1 | List/Grid/WaterFlow 中用 `ForEach` → **Agent 判断数据项 > 20 才改 LazyForEach** |
| 4-1 | performance.md | §4 | 主线程回调中有同步 I/O → 改为异步 API |
| 4-2 | performance.md | §4 | 主线程回调中有 `.sort()`/`JSON.parse()` 大数据 → 卸载到 TaskPool/Worker |

> **规则 2-1 说明**：工具仅检测 ForEach 在列表容器内使用，不检查数据项数量。Agent 应根据实际数据源判断：固定小数据集（≤20 项）可保留 ForEach；动态/大数据集（>20 项）应改用 LazyForEach。

### fix_power.py 告警定位

| 规则 | 参考文件 | 章节 | 检查项 |
|------|---------|:----:|--------|
| 1-1 | power.md | §1 | `sensor.on` 无配对 `sensor.off`（排除 `sensor.once`）→ aboutToDisappear 中 off |
| 2-1 | power.md | §2.1 | `requestAnimationFrame` 无 `cancelAnimationFrame` → onPageHide 中 cancel |
| 2-2 | power.md | §2.2 | `createAnimator` 无 `.cancel()`/`= undefined` → onPageHide 中清理 |
| 3-1 | power.md | §3 | `geoLocationManager.on('locationChange')` 无 `off` → aboutToDisappear 中 off |
| 4-1 | power.md | §4.1 | `wifiManager.on` 无 `wifiManager.off` → aboutToDisappear 中 off |
| 4-2 | power.md | §4.2 | `ble.on`/`bleScanner.on` 无对应 `off` → aboutToDisappear 中 off |
| 6-1 | power.md | §6.1 | `createAudioRenderer`/`AudioRenderer` 无 `.release()` → onPageHide 中 stop+release |
| 6-2 | power.md | §6.2 | `setInterval` 无 `clearInterval` 或 `setTimeout` 无 `clearTimeout` 或 `while(true)`/`for(;;)` → onPageHide 中 clearInterval/clearTimeout |

### fix_demo_ui.py 告警定位

| 规则 | 参考文件 | 章节 | 检查项 |
|------|---------|:----:|--------|
| 1-1 | ux.md | §1.1 | `.width()`/`.height()` 中有 `'Npx'` → px 改 vp 或 % |
| 1-4 | ux.md | §1.2 | Row 含 Button → 改 Flex wrap |
| 1-7 | ux.md | §1.4 | @Entry 含 Column 无 Scroll → 加 Scroll 包裹 |
| 2-1 | ux.md | §2.1 | `fontColor('#XXXXXX')` 硬编码 hex → 替换为 `$r()` |
| 2-2 | ux.md | §2.1 | `backgroundColor('#XXXXXX')` 硬编码 hex → 替换为 `$r()` |
| 2-3 | ux.md | §2.1 | `fillColor('#XXXXXX')` 硬编码 hex → 替换为 `$r()` |
| 2-4 | ux.md | §2.1 | `scrollBarColor('#XXXXXX')` 硬编码 hex → 替换为 `$r()` |
| 2-5 | ux.md | §2.1 | `strokeStyle('#XXXXXX')` 硬编码 hex → 替换为 `$r()` |
| 2-6 | ux.md | §2.1 | `fillStyle('#XXXXXX')` 硬编码 hex → 替换为 `$r()` |
| 2-7 | ux.md | §2.1 | `Color.White` 等枚举颜色 → 替换为 `$r()` |
| 2-8 | ux.md | §2.1 | fontColor 与 backgroundColor 同色 → 修改其一 |
| 3-7 | ux.md | §3.4 | color.json 缺必需 name → 补充缺失项 |
| 3-9 | ux.md | §3.4 | Web 组件无 `.darkMode(` → 添加 darkMode |
| 6-2 | ux.md | §6.2 | `router.push`/`router.pushUrl` → 迁移到 Navigation |

## 检查项快速参考

审查代码时，按规则编号读取对应章节。先检查「跳过条件」，不满足则跳过该规则。

| 规则 | 参考文件 | 章节 | 跳过条件 |
|------|---------|:----:|---------|
| ux 1-2 | ux.md | §1.2 | 文件无 Button |
| ux 1-3 | ux.md | §1.2 | 文件无 Text |
| ux 1-5 | ux.md | §1.3 | 文件无 Image/Video/XComponent |
| ux 1-6 | ux.md | §1.4 | 文件无 @Entry |
| ux 2-9 | ux.md | §2.1 | 文件无 CanvasRenderingContext2D |
| ux 2-10 | ux.md | §2.1 | 文件无 Button |
| ux 2-11 | ux.md | §2.2 | 文件无 fontSize |
| ux 2-12 | ux.md | §2.2 | 文件无 fontSize |
| ux 2-13 | ux.md | §2.3 | 文件无 borderRadius |
| ux 2-14 | ux.md | §2.4 | 文件无 Image |
| ux 2-15 | ux.md | §2.5 | 文件无 shadow |
| ux 2-16 | ux.md | §2.6 | 文件无 margin/padding |
| ux 3-1 | ux.md | §3.1 | 非多设备目标 |
| ux 3-2 | ux.md | §3.2 | 文件无 @Entry |
| ux 3-3 | ux.md | §3.2 | 文件无 expandSafeArea |
| ux 3-4 | ux.md | §3.3 | 无 module.json5 |
| ux 3-5 | ux.md | §3.4 | 始终检查（项目级） |
| ux 3-6 | ux.md | §3.4 | 文件无 @StorageLink |
| ux 3-8 | ux.md | §3.4 | 文件无 fillColor |
| ux 4-1 | ux.md | §4.1 | 文件无 animateTo |
| ux 4-2 | ux.md | §4.2 | 文件无 Scroll |
| ux 5-1 | ux.md | §5.1 | 文件无 Text |
| ux 6-1 | ux.md | §6.1 | 非折叠屏目标 |
| ux 6-3 | ux.md | §6.2 | 文件无 Navigation |

| 规则 | 参考文件 | 章节 | 跳过条件 |
|------|---------|:----:|---------|
| stability 4-1 | stability.md | §4 | 文件无 @State 行内初始化 |
| stability 5-1 | stability.md | §5 | 文件无 aboutToAppear |
| stability 6-1 | stability.md | §6 | 文件无异步 API 调用 |
| stability 7-1 | stability.md | §7 | 文件无数据获取操作 |
| stability 7-2 | stability.md | §7 | 文件无 loading/ready/error 状态 |
| stability 9-1 | stability.md | §9.1 | 文件无 Image 组件 |
| stability 9-2 | stability.md | §9.2 | 文件无高频 fileIo 调用 |
| stability 10-2 | stability.md | §10.1 | 文件无高版本 API 调用 |
| stability 10-4 | stability.md | §10.4 | 文件无高版本 API 调用 |
| stability 10-6 | stability.md | §10.4 | 非入口页面 |
| stability 10-7 | stability.md | §10.4 | 文件无高版本 API 调用 |
| stability 10-8 | stability.md | §10.4 | 文件无模块顶层代码 |
| performance 1-2 | performance.md | §1 | 文件无 @State 行内初始化 |
| performance 2-2 | performance.md | §2.2 | 文件无 List/Grid |
| performance 3-1 | performance.md | §3 | 文件无 onClick |
| power 5-1 | power.md | §5 | 文件无网络请求 |
| power 5-2 | power.md | §5 | 文件无 setInterval/setTimeout |
| power 5-3 | power.md | §5 | 文件无 RunningLock |
| power 5-4 | power.md | §5 | 文件无后台任务 |

> **结果处理**：跳过条件不满足时，读取对应参考文件章节获取详细检查项和修复指导。

---

## 命令行工具退出码

| 退出码 | 含义 |
|--------|------|
| 0 | 检测通过（无文件或无告警均返回 0） |
| 1 | 目标目录不存在 |
| 2 | 仍有未处理告警 |

> **注意**：当前工具不支持 `--json` 输出模式，Agent 需解析文本输出判断结果。
>
> **`--dry-run` 模式**：检测到告警也不返回非零退出码，仅输出告警文本。适用于预览检测不影响流水线门禁。

---

## Agent 核对表

在 primary-sdk-04-har-demo 阶段中，Agent 按以下顺序执行：

| 步骤 | 操作 | 工具/命令 |
|------|------|----------|
| 1 | 运行 UX 检测（含自动修复颜色） | `fix_demo_ui.py --target <entry_ets_dir>` |
| 2 | 运行稳定性检测（entry + library） | `fix_stability.py --target <entry_ets_dir>` + `fix_stability.py --target <library_ets_dir>` |
| 3 | 运行性能检测（entry + library） | `fix_performance.py --target <entry_ets_dir>` + `fix_performance.py --target <library_ets_dir>` |
| 4 | 运行功耗检测（entry + library） | `fix_power.py --target <entry_ets_dir>` + `fix_power.py --target <library_ets_dir>` |
| 5 | 处理告警项：逐条判断是否为真实问题 | Agent 判断（参考规则 2-1 阈值说明） |
| 6 | 修复真实问题并重新运行验证 | 手动修复 + 重新执行 |

### 确认标准

- 所有工具退出码为 0
- 告警项均已处理（修复或确认为误报/小数据集）
