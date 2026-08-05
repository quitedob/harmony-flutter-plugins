# nice_image_view 最终阶段完整运行操作日志

> 执行日期：2026-08-04
> 目标插件：`nice_image_view` 1.0.5（pure_dart，CustomPainter）
> 全新独立运行根目录：`flutter_library_workflow/flutter_library_workflow_release/repos-flutter-fast/shehuan_NiceImageView`
> Flutter：`3.32.4-ohos-0.0.1`，Framework `af27e4a7f6`，Engine `8cd19e509d`，Dart `3.8.1`
> 设备：HUAWEI Mate 60（BRA-AL00 / phone / API 24 / `192.168.3.85:41665`，Wi-Fi HDC）

---

## 1. 目标与边界

本轮为**全新独立运行**（fresh folder `shehuan_NiceImageView`），复用 donor（`repos-flutter-fast/NiceImageView`）移植思路但重写实现，目标：

1. 完整移植 Android NiceImageView → Flutter pure_dart 库（16 参数，CustomPainter）；
2. 生成完整 `flutter` artifact 谱系（00-05、PRD 双文件字节一致 + Mermaid 渲染、XLSX、demo-map、代码评审、DroidRun、AJV + 8 一致性）；
3. 创建独立 OHOS Demo（`example_auto/`）并在 HUAWEI Mate 60 真机自主验证；
4. 诚实记录所有门禁状态，不掩盖失败或缺口。

## 2. 只读发现（子代理扫描）

并行 3 个只读子代理：
- **文档扫描**（agent a1dfe51b23edb477d）：确认 fresh 克隆为纯净 Android 源（无 Flutter 文件），12 属性/12 setter，README 为 Android JitPack 说明；
- **保真审计**（agent aea1586f2b3de6efd）：Dart 移植 vs Java 逐字段对齐，MOSTLY_MATCH，5 处必要/零影响差异；
- **原生平台扫描**（agent a992e705e18615b78）：git HEAD `b1694568` 干净，app 模块 6 个示例布局，无 AndroidX/TODO；
- **工作流扫描**（agent a741ab9d56767ea37）：agent-flutter 5 阶段流水线与 schema 校验约定。

## 3. 关键决策

| 主题 | 决策 | 理由 |
|---|---|---|
| 裁剪方案 | `canvas.clipPath()` 替代 PorterDuff | Flutter 原生裁剪，跨平台一致 |
| 生命周期 | `didChangeDependencies` 解析 + dispose 仅移除监听 | 规避 donor 两个框架断言 bug |
| isCoverSrc | 矩形裁剪内缩 borderWidth/2 | 对齐 Android `srcRectF = borderRectF` |
| Demo 目录 | `example_auto/` | exporter/verifier 工具强制约定 |

## 4. 真机自主验证

### 4.1 HAP 构建（绕过 Windows 构建故障）

- `flutter build hap --debug` 触发 `BATCH RECURSION`（.bat 包装递归）→ 改用 DevEco `node.exe hvigorw.js assembleHap --no-daemon` 直连，构建成功；
- 路径超长（>259）→ 创建物理短工作区 `C:\niv` 暂存插件 + `example_auto`，重新生成 metadata 后构建；
- 签名：复用 DevEco auto-sign profile `default_ohos_m5Bu…`（bundle `com.example.flutter_ohos_test`，兼容身份显式报告）。

### 4.2 设备执行

- `hdc install` 签名 HAP → 成功；`aa start EntryAbility` → 启动成功（pid 确认）；
- 20 条用例逐条驱动（`uitest uiInput` 语义点击 + `snapshot_display` 截图），NATIVE_VLM 逐张核对 → 全部「符合预期」；
- `一键测试全部`（`btn_test_all`）从全新状态执行 → **通过 20 条，失败 0 条，共 20 条**；
- midscene-harmony 1.10.8 已全局安装；`act` 因未配置 AI 模型改用 DIRECT_CLICK_LOGS 语义点击；
- **执行备注（如实记录）**：自动驱动脚本对 F-08-01/02/03 首次导航 `NAV_FAILED`（F-08 模块位于模块索引底部，脚本滚动未定位），随后手工滚动至 F-08 逐条运行全部「符合预期」；`drive-demo.log` 保留首次失败记录未掩盖；一键测试全部独立覆盖 20 条确认无遗漏。

## 5. 门禁结果

| 门禁 | 结果 |
|---|---|
| flutter pub get / format / analyze / test | PASS（analyze 0 issue，test 24/24） |
| DFX Dart | PASS（0 warning） |
| 代码评审 | P0/P1 剩余 0 |
| 生产 JSON AJV（01-05） | 全部 VALID |
| 一致性检查（8 项） | 全部 PASS |
| XLSX | 20 行，12 列 |
| HAP 构建/签名 | PASS（97.6MB，SHA `90b603…1073`） |
| 设备安装/启动/逐用例/一键全部 | PASS（20/20 / 20/20） |

## 6. 如实记录的门禁例外

最终验证器有两类 over-strict demo 文本检查未通过，均与必要格式冲突：
1. **非中文字面值** `Level 0`/`phone,tablet,2in1`：exporter 的 XLSX field-for-field 要求裸值渲染；
2. **合法 ASCII 字面量**（语义 Key、资源路径 `assets/cat.jpg`、describe() 状态插值、visibleChangeType 枚举）：均为合法代码标识符。

详见 `shehuan_NiceImageView/.ohos-adaptation/00-migration-context.json` `tooling_compatibility_notes`。

## 7. 后续待办

- 发布到 pub.dev 前补充 golden 测试与更多设备矩阵；
- 大图场景内置 ResizeImage 建议；
- 若需最终验证器完全 PASS，需适配其 ASCII/中文字面量规则（与 exporter 格式冲突，建议先修工具）。
