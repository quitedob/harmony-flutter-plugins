---
name: dfx-quality
description: |
  对 HarmonyOS ArkTS 三方库做 DFX 质量检测，从【稳定性】【功耗】【UX】【兼容性】四大维度审查 HAR/HSP 库。
  C1 稳定性（装饰器规范、字段声明顺序、异步操作完整防护、资源泄漏、@BuilderParam this上下文安全、空值边界处理、手势事件回调空值防御）、
  C2 功耗（传感器/动画/定位/WiFi/BLE/音频/定时器配对、后台资源释放、网络请求批量化）、
  C3 UX（仅 UI 库：布局单位、内容截断、颜色资源引用、对比度、字号圆角间距、多设备适配、动画滑动）、
  C4 兼容性（高版本API缺运行时守卫检测、canIUse/syscap、deviceTypes声明、SemVer/破坏性变更）。
  使用检测脚本（--dry-run 模式）自动化扫描 + agent 逐项核对，只检测不修复，
  输出按 🔴/🟡/🟢 分级、含 file:line 的发现清单。
  适用于（Use when）：评估 HarmonyOS 三方库 DFX 质量、稳定性检测、功耗检测、UX 质量检测、资源泄漏检测、兼容性检测
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash      # 运行检测脚本（--dry-run 模式，只读分析，不修改被评估库）
---

# 鸿蒙 DFX 质量检测

对 HarmonyOS 三方库做 DFX 质量检测，涵盖稳定性、功耗、UX、兼容性四大维度。本 Skill 只检测、**只读**——绝不修改被评估库。

**分库型按需检查是本 Skill 的核心机制**：阶段0 判定库型后，**UI 库**才启用 C3（UX）维度；逻辑/NAPI 库省略该组。自动化脚本扫描一律全量运行，库型只影响 C3 是否展开。

## 何时使用本 Skill

- 评估 / 验收一个 HarmonyOS 三方库的 DFX 质量（稳定性、功耗、UX、兼容性）

## 四大维度

| 维度 | 子维度 | 覆盖 | 适用库型 | 检测方式 |
|------|------|------|:--:|------|
| **C. DFX 质量** | **C1 稳定性** | 装饰器规范、字段声明顺序、异步操作完整防护、资源泄漏(内存/FD/线程)、@BuilderParam this上下文安全、空值边界处理、手势事件回调空值防御 | 全部 | dfx_stability.py + agent 核对 |
| | **C2 功耗** | 传感器/动画/定位/WiFi/BLE/音频/定时器配对、后台资源释放、网络请求批量化 | 全部 | dfx_power.py + agent 核对 |
| | **C3 UX** | 布局单位禁px、内容截断处理、颜色用$r()资源引用、对比度与Canvas暗色、字号/圆角/阴影/间距统一、多设备适配、动画/滑动 | **仅 UI 库** | dfx_ui.py + agent 核对 |
| | **C4 兼容性** | 高版本API缺运行时守卫检测、canIUse/syscap守护、deviceTypes声明完整、SemVer/向后兼容/破坏性变更 | 全部 | agent 核对 |

> 性能已被 B1/B2 完全覆盖，不再重复检测。

## 严重级别（沿用统一标记，勿自创同义词）

- 🔴 `[blocking]` 必须修复——存在严重缺陷，必须修复
- 🟡 `[important]` 应当修复——明显问题，建议修复
- 🟢 `[nit]` 可选优化——不阻塞
- 💡 `[suggestion]` 替代方案 / 改进思路（含 Grep 粗查得到的启发式线索）

> 🔴/🟡/🟢 为标准三档（由红到绿），💡 为非阻塞注解。
> **本 Skill 不打分、不加权、不评 A–E 等级**；总体结论为定性判断。

## 自动化检测脚本

使用检测脚本（`--dry-run` 模式）对 `ohos_hardemo/library/src/main/ets/` 做自动化扫描，再对脚本无法覆盖的问题由 agent 逐项核对。

| 脚本 | 检测项 |
|------|--------|
| `scripts/dfx_stability.py` | 装饰器规范、字段声明顺序、异步操作完整防护、资源泄漏(内存/FD/线程)、@BuilderParam this上下文安全、手势事件回调空值防御 |
| `scripts/dfx_power.py` | 传感器/动画/定位/WiFi/BLE/音频/定时器配对、RunningLock/backgroundTaskManager/httpRequest.destroy、后台CPU |
| `scripts/dfx_ui.py` | 布局单位禁px、内容截断处理、颜色用$r()资源引用 |

```bash
python scripts/dfx_stability.py --target <ets_dir> --dry-run
python scripts/dfx_power.py --target <ets_dir> --dry-run
python scripts/dfx_ui.py --target <ets_dir> --dry-run
```

退出码：0=通过，1=目录不存在，2=有未处理告警。

## C1 稳定性

（所有库型 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| 装饰器规范（@Link/@Prop/@State） | dfx_stability.py | V1 组件去掉装饰器改为普通变量传递回调；V2 组件改用 @Event 装饰器；@Link 删除本地初始化；@Prop @Watch 添加安全默认值 | 🔴 |
| 字段声明顺序 | dfx_stability.py | 调整字段声明顺序，或将初始化移入 `aboutToAppear` | 🟡 |
| 异步操作完整防护 | dfx_stability.py | 补充 try/catch，catch 中展示错误摘要或降级 | 🔴 |
| 资源泄漏(内存/FD/线程) | dfx_stability.py | 内存：aboutToDisappear 中释放大对象引用（`= []`/`= null`/`= undefined`）；FD：补充 finally 中 `fileIo.close`；线程：aboutToDisappear 中 `worker.terminate()`/`taskpool.cancel()` | 🔴 |
| @BuilderParam this上下文安全 | dfx_stability.py | 改用箭头函数包裹传参 `(): void => { this.builderName() }`，使 this 保留指向父组件；或使用尾随闭包语法 `Component() { this.builderName() }` | 🔴 |
| 空值边界处理 | agent 核对（检查数据来源处是否有 `?.`/`??`/`if (!data)` 等空值守卫；检查是否有 loading/empty/error 状态分支） | 补充空判断（`?.`/`??`/`if (!data)`），提供默认值或 empty 状态 UI | 🟡 |
| 手势事件回调空值防御（fingerList/touches数组索引越界） | dfx_stability.py | 访问前检查 `event.fingerList.length`/`event.touches.length`，或使用可选链 `fingerList[N]?.xxx`；推荐使用 `fingerInfos`（API 20+） | 🔴 |

## C2 功耗

（所有库型 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| 传感器on/off配对 | dfx_power.py | aboutToDisappear/onPageHide 中补充 `sensor.off()` | 🔴 |
| 动画后台停止 | dfx_power.py | onPageHide 中 `cancelAnimationFrame` 或 `animator.cancel()`/`= undefined` | 🟡 |
| 定位/WiFi/BLE监听配对 | dfx_power.py | aboutToDisappear 中补充 `geoLocationManager.off()`/`wifiManager.off()`/`ble.off()` | 🔴 |
| 后台资源释放 | dfx_power.py | onPageHide/aboutToDisappear 中调用 `httpRequest.destroy()`/`ws.close()`；定时器 `clearInterval`/`clearTimeout`；RunningLock `unhold()` | 🔴 |
| 音频release+CPU占用控制 | dfx_power.py | onPageHide 中调用 `audioRenderer.stop()` + `release()`；暂停或取消后台轮询 | 🟡 |
| 网络请求批量化 | agent 核对（Grep `forEach`/`for`/`map` 循环体内是否有 `httpRequest`/`http.request` 逐次调用，若无合并机制则建议批量化） | 将循环体内逐次请求合并为批量接口，或使用 `Promise.all` 并发 | 🟢 |

## C3 UX

（仅 UI 库 · 脚本 + agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| 布局单位禁px | dfx_ui.py | px 改 vp 或 `%` | 🟡 |
| 内容截断处理 | dfx_ui.py | 按钮调整宽度或文字换行；Text 补充 `maxLines` + `textOverflow(TextOverflow.Ellipsis)`；多按钮 Row 改 `Flex({ wrap: FlexWrap.Wrap })` | 🟢 |
| 颜色用$r()资源引用 | dfx_ui.py | 替换为 `$r('app.color.xxx')` 资源引用 | 🟢 |
| 对比度与Canvas暗色 | agent 核对（仅含Canvas时：Grep `CanvasRenderingContext2D` + `fillStyle`/`strokeStyle` 赋值，检查是否有 colorMode 感知色值或 dark/light 色对映射，而非单一固定色值） | Canvas 的 fillStyle/strokeStyle 使用 `@StorageLink('colorMode')` + `onColorModeChange` + dark/light 色对映射，而非单一固定色值 | 🟢 |
| 字号/圆角/阴影/间距统一 | agent 核对（字号：Grep `.fontSize(` 检查正文字号 ≥ 16fp，优先使用 `$r('sys.float.ohos_id_text_size_*')`；圆角：Grep `.borderRadius(` 比对同类组件是否一致；阴影：Grep `.shadow(` 比对同类组件参数是否一致；间距：Grep `.margin(`/`.padding(` 检查是否在 4/8/12/16/20/24vp 基准内或使用 `$r('sys.float.ohos_id_elements_margin_*')`） | 字号调整至 ≥ 16fp 或替换为 `$r('sys.float.ohos_id_text_size_*')`；圆角统一同类组件取值；阴影使用 `ShadowStyle` 预设或统一自定义参数；间距替换为 `$r('sys.float.ohos_id_elements_margin_*')` 或统一基准值（4/8/12/16/20/24vp） | 🟢 |
| 多设备适配 | agent 核对（Grep `GridRow`/`GridCol`/`breakpoint`/`BreakpointType` 检查是否使用栅格布局或断点机制，若无则标记多设备适配风险） | 改用栅格布局（`GridRow`/`GridCol`）或断点机制（xs/sm/md/lg） | 🟡 |
| 动画/滑动 | agent 核对（动画：Grep `animateTo(` 检查 `duration` > 0 且回调体内无 `.width()`/`.height()`/`.margin()`/`.padding()` 等重布局操作；滑动：Grep `Scroll` 同文件含 `List`/`Swiper`/`Pan`/`Gesture` 时检查是否有 `nestedScroll`/`priorityGesture`/`parallelGesture`） | 动画：添加 `duration` 参数，将重布局操作移出动画回调；滑动：设置 `nestedScroll` 或 `priorityGesture`/`parallelGesture` | 🟡 |

## C4 兼容性

（所有库型 · agent 核对）

| 检查项 | 检测方式 | 修复方式 | 级别 |
|--------|---------|---------|:--:|
| 高版本 API 缺运行时守卫（无 canIUse/版本比较守护的扩展模块 API 调用） | agent 核对（Grep ETS 中 `@ohos.` 找出扩展模块 API 调用，对照 SDK 文档确认 `@since` 版本；对 `@since` 高于库代码中使用的最低 API Level 的 API，检查是否有 `canIUse()`/版本比较运行时守卫；若无守卫则报 🟡） | 为高版本 API 补充 `canIUse()`/版本比较运行时守卫 + 降级分支 | 🟡 |
| canIUse / syscap 守护 | agent 核对（Grep `@ohos.` 找出扩展模块 API 调用，检查是否被 `canIUse()`/`deviceInfo` 版本比较包裹；Read `module.json5` 中 syscap 声明与实际使用是否匹配） | 为扩展模块 API 调用补充 `canIUse()`/`deviceInfo` 版本比较前置判断 + 降级分支；补充 syscap 声明与实际使用匹配 | 🟡 |
| deviceTypes 声明完整 | agent 核对（Read `module.json5` 提取 deviceTypes：缺失 → 🔴；仅 `["default"]` → 建议明确具体设备类型） | 补充缺失的 deviceTypes 声明；将 `["default"]` 替换为具体设备类型（如 `["phone", "tablet"]`） | 🟡 |
| SemVer / 向后兼容 / 破坏性变更 | agent 核对（Read `oh-package.json5` 检查 version 字段是否符合 SemVer 规范、依赖版本约束是否使用范围语法；Read `Index.ets` 检查导出 API 签名稳定性，是否有 `@deprecated` 渐进废弃机制） | version 字段修正为 SemVer 规范；依赖版本约束改用范围语法（`^x.y.z`）；导出 API 变更使用 `@deprecated` 渐进废弃机制 | 🟡 |
