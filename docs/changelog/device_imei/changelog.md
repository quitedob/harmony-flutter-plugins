# device_imei 鸿蒙适配 — 变更记录

> 原始库：https://github.com/MAHAulia/device_imei (pub.dev v0.0.4+1)
> 适配后类型：MethodChannel（standalone 插件，flat HAR）
> Flutter SDK：3.32.4-ohos-0.0.1 | API 24
> 最新审计日期：2026-07-31

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
