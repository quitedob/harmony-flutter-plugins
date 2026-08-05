# device_imei 鸿蒙适配 — 变更记录

> 原始库：https://github.com/MAHAulia/device_imei (pub.dev v0.0.4+1)
> 适配后类型：MethodChannel（standalone 插件，flat HAR）
> Flutter SDK：3.32.4-ohos-0.0.1 | API 24
> 最新审计日期：2026-08-04（最终阶段收尾，见第六节）

---

## 一、适配摘要

device_imei 原为 Android/iOS MethodChannel 插件，宣称获取设备 IMEI。实际 Android≥10 调用 `TelephonyManager.deviceId` 受平台限制，iOS 返回 `identifierForVendor`。

**策略**：新增 flat OHOS HAR 在固定 `device_imei` Channel 上实现三个方法，使用 `@ohos.deviceInfo` 的公开常量（无需权限），标识符采用 API 12+ 的开发者级非永久 ODID，不虚假宣称硬件 IMEI。

| 方法 | OHOS 映射 | 返回类型 |
|------|----------|---------|
| `getPlatformVersion` | `deviceInfo.osFullName` | String |
| `getDeviceImei` | `deviceInfo.ODID` (API 12+) | String（ODID，非 IMEI） |
| `getDeviceInfo` | sdkApiVersion/productModel/manufacture/deviceType/ODID → 五键 JSON | String (JSON) |

## 二、源码交付

```
device_imei/
├── pubspec.yaml              ← 新增 ohos pluginClass；Dart SDK >=2.19.4 <4.0.0
├── lib/
│   ├── device_imei.dart                 ← 修复 sdkInt/sdk_int 双键兼容
│   ├── device_imei_method_channel.dart  ← 修复 null Channel 返回
│   └── device_imei_platform_interface.dart
├── ohos/                                ← 新建 flat HAR
│   ├── build-profile.json5
│   ├── hvigorfile.ts
│   ├── index.ets
│   ├── oh-package.json5
│   └── src/main/
│       ├── module.json5                 ← phone/tablet/2in1，无权限
│       └── ets/components/plugin/DeviceImeiPlugin.ets
├── test/
│   ├── device_imei_method_channel_test.dart  ← 更新 mock + null/JSON 往返
│   └── device_imei_test.dart
└── .ohos-adaptation/
    ├── 00-migration-context.json         ✅
    ├── 00-source-scan.json               ✅（3 subagent 扫描）
    ├── 00-requirement.json/report.md     ✅
    ├── 01-analysis.json (AJV valid)      ✅
    ├── 01-analysis-prd.md（12章, 4 SVG）  ✅
    ├── device_imei_prd.md                ✅ byte-identical
    ├── 01-prd-mermaid-validation.json    ✅ 4/4 PASS mmdc 11.16.0
    ├── 02-planning.json (AJV valid)      ✅
    ├── 02-test-points.json (26 points)   ✅
    ├── 02-test-analysis-report.md（22章） ✅
    ├── 04-test-cases.json (26 cases)     ✅
    ├── 04-test-cases.md                  ✅
    ├── 05-test-cases.xlsx                ✅ 12列 26行
    ├── 03-analysis-review.json (95分)     ✅
    ├── 05-case-review.json (96分)         ✅
    ├── 03-coding-library.json            ✅ AJV PASS
    ├── 03-code-review.json               ✅ P0/P1 remaining=0, gate=pass
    ├── 04-testing.json                   ✅
    ├── 04-verification-evidence.json     ✅ 17 checks
    ├── 04-droidrun-test-cases.json       ✅ 4 L0 cases
    ├── 04-droidrun--agent-prompt.md      ✅
    ├── 04-droidrun--app-card.md          ✅
    ├── hypium-test-cases.md              ✅ 11 native cases
    ├── hmos-quality-assessment-note.md   ✅
    ├── patch-manifest.json               ✅
    ├── artifact-manifest.json            ✅ HAP signed, verify-app PASS
    └── artifacts/device_imei-signed-host.hap  ✅ 142MB
```

## 三、HAP 构建

| 属性 | 值 |
|------|-----|
| 宿主工程 | `flutter_ohos_test`（已有签名 + 6 插件） |
| 构建方式 | DevEco Node + hvigorw.js `assembleHap`（绕过 `flutter build hap` 批处理递归） |
| HAP 路径 | `flutter_ohos_test/ohos/entry/build/default/outputs/default/entry-default-signed.hap` |
| 签名 | ✅ default OHOS debug 证书 |
| 签名验证 | ✅ `hap-sign-tool.jar verify-app` exit 0 |
| SHA-256 | `7f077fdd96a866dc2f0d0a9370277d0af15d584d4f3ee4ffa036fec847e8dca1` |
| size | 142,252,705 bytes |
| deviceTypes | phone / tablet / 2in1 |
| 设备 | 192.168.3.85:41665 (API 24) |
| 安装/启动 | ✅ PASS |
| DeviceImei 验证页 | ✅ getPlatformVersion / getDeviceImei (ODID) / getDeviceInfo (JSON) 均返回正确 |

## 四、2026-07-31 审计结果

| 检查项 | 结果 |
|--------|:--:|
| `flutter pub get` | ✅ |
| `dart format` | ✅ |
| `flutter analyze` (No issues found) | ✅ |
| AJV Schema 验证 (01/02/03/04) | ✅ |
| Mermaid 验证 (4/4 SVG mmdc 11.16.0) | ✅ |
| 用例三方一致性 (module/ID/level) | ✅ |
| 分析评审 95 分 / 用例评审 96 分 | ✅ |
| Dart DFX scan | ✅ |
| ETS DFX scan (JSON mode, 0 warnings) | ✅ |
| Channel 一致性 (Dart↔ArkTS) | ✅ |
| CodeLinter 6.0.240 + 独立复审 (P0/P1=0) | ✅ |
| 26 reviewed → 26 generated → 26 implemented | ✅ |
| 中文 demo + `复制日志` + `btn_copy_log` | ✅ |
| DroidRun 4 L0 cases (Chinese, flat suite) | ✅ |
| Hypium 11 native cases (source generated) | ✅ |
| HAP 签名构建 | ✅ |
| HAP 签名验证 (verify-app exit 0) | ✅ |
| HAP 安装 + 启动 | ✅ |
| DeviceImei 三个 API 真机验证 | ✅ |
| Flutter test | 🔴 BLOCKED (OHOS VM snapshot invalid) |
| DroidRun / Hypium 执行 | 🔴 NOT_RUN（无自动化模型） |

## 五、已知限制

1. ODID 是开发者级非永久标识，不是硬件 IMEI；恢复出厂设置或卸载同开发者全部应用后重置
2. API 低于 12 时不支持 ODID，通过 `UNSUPPORTED_API` Channel error 返回
3. `getDeviceImei` 方法名保留兼容但语义不再是 IMEI
4. Flutter test 因 OHOS SDK VM snapshot 问题无法执行
5. Windows 长路径构建需物理短路径或 Flutter SDK wrapper 修复

## 六、2026-08-04 收尾补充（final-stage close-out）

在 2026-07-31 审计基础上补做最终阶段交付物并统一记录：

### 6.1 新增最终交付物

- `05-summary.json` + `05-summary-report.md`：聚合 01–04，质量评分 **B** / 状态 success，方法覆盖率 100%（3/3），8 项跨阶段检查全部 pass
- `05-schema-validation.json`：AJV Draft 2020-12 校验 01–05 全部 PASS
- `05-pipeline-consistency.json`：8 项一致性检查全部 pass（channel / skill / build / example / coverage / runtime / device / quality）
- `INTEGRATION_GUIDE.md`：鸿蒙集成指南
- `04-testing-report.md`：按最终状态重建
- `logs/final-gate-2026-08-04.json`：最终门禁原始报告（FAIL，失败项均为记录在案的待办，非本次引入）

### 6.2 记录一致性对齐

- `04-testing.json`：`example_build_status` 对齐为 `pass`（unsigned HAP 已产出）；`device_test_status` 对齐为 `partial`（宿主签名 HAP 真机验证 3/3，自动套件未执行）
- `05-demo-gen.json`：status 由 `failed` 更新为 `partial`（生成 26/26、0 TODO；签名与真机执行待办）
- 签名 HAP（SHA `7f07…dca1`，`192.168.3.85:41665` / API 24）作为设备验证 ground truth

### 6.3 工程与文档

- 移除 `example_auto` 不必要的 `ohos.permission.INTERNET`
- README 增加 HarmonyOS/OpenHarmony 支持与 ODID 语义说明；CHANGELOG 增加 OHOS 条目
- 用 `flutter create --platforms ohos` 重建脚手架（XLSX 26 用例 demo 文件哈希不变），并在物理短工作区 `D:/dimei_build_20260804` 直调 hvigorw.js 重新构建 unsigned HAP：
  `artifacts/device_imei-example-debug-unsigned-20260804.hap`（97,016,805 bytes，SHA `ef41…ec96`，21 entries，含 26 用例 Dart kernel）
- 补充 `一键测试全部` 控件（一级页入口 `Key('btn_test_all')`，与单用例按钮共用同一 `runCase` 运行器，串行执行 26 条并汇总 + `复制日志`），并重建含该控件的 HAP：
  `artifacts/device_imei-example-debug-unsigned-20260804-testall.hap`（97,030,597 bytes，SHA `6fae…68d0`，21 entries）
- 子代理审计 Action 真实性：4 条负向用例（F-01-02/F-02-03/F-02-05/F-03-07）由纯文本夹具改为调用真实 API / 真实 `UNSUPPORTED_API` 错误路径；修复 F-03-14 断言写反导致的恒 FAIL（改断言真实双键往返成功，mode 改 success）。重建 HAP：
  `artifacts/device_imei-example-debug-unsigned-20260804-actions-fixed.hap`（97,031,781 bytes，SHA `0029…3184`，21 entries）
- 真机验证（设备 `192.168.3.85:41665` / API 24）：用 DevEco 自动签名材料（`m5Bu6m` profile，临时兼容 bundleName `com.example.flutter_ohos_test`）在短工作区构建签名 HAP，`verify-app` exit 0，安装、启动成功，`一键测试全部` **26/26 PASS**（通过 26 / 失败 0）。签名 HAP：
  `artifacts/device_imei-example-debug-signed-20260804.hap`（97,412,444 bytes，SHA `8892…71c16`，22 entries）
- `flutter test` 由 BLOCKED 转为 **PASS**（插件 7/7 + demo 3/3）；demo 列表改非懒加载（SingleChildScrollView+Column）以修复测试；第一页模块索引改为以 **F-01/F-02/F-03** 大类徽标为视觉主体（与 XLSX 模块结构一致）。最终签名 HAP：
  `artifacts/device_imei-example-debug-signed-20260804-final.hap`（97,416,540 bytes，SHA `c586…44009`，真机一键测试全部 26/26）
- PRD 一致性：`01-analysis-prd.md` 与 `device_imei_prd.md`（字节一致）新增「第 4 章 测试用例与验收矩阵」列出全部 26 条用例，与 XLSX、HAP demo 三来源 26/26 一致；Mermaid 校验重跑 PASS（4/4 SVG）。

### 6.4 当前状态（2026-08-04 更新）

- ✅ `flutter test` **PASS**（插件 7/7 + demo 3/3，2026-08-04；此前 VM snapshot invalid 已解决）
- ✅ 独立 `example_auto` 签名 + 真机一键测试全部 **26/26 PASS**（临时兼容 bundleName `com.example.flutter_ohos_test`）
- ✅ 第一页模块索引以 XLSX 模块大类 **F-01/F-02/F-03** 为视觉主体
- ✅ `04-test-cases.json` 回填：expectation_metadata 26/26、devices=`phone,tablet,2in1`、F-03-14 语义改为 success（匹配已修复 demo）、preconditions 全中文
- ⏳ DroidRun 4 L0 / Hypium 11 自动化执行 NOT_RUN（demo 一键测试全部已真机运行 26/26）
- ⏳ `05-test-cases.xlsx` 需按 enriched JSON 重生成；`04-ohos-demo-case-map.json` 已生成（26 条真实映射），但 exporter 要求 demo 全字段渲染（before/actual/expected 逐用例 Key + 完整 XLSX 行文本），需做 demo 字段渲染增强后再重生成 XLSX 与 `05-xlsx-demo-binding.json`
- ⏳ 如改用永久 `com.vai.device_imei_example_auto` bundle，需在 DevEco 重新生成签名 profile
