# device_imei OHOS 适配项目规范

> 适用范围：插件目录、`example_auto/`、`.ohos-adaptation/`。  
> 目标：保证 Channel 契约、测试用例、XLSX、独立 Demo、OHOS HAP 和设备证据可追踪、可复现且互不污染。

---

## 1. 项目分类与架构

1. `device_imei` 是 **MethodChannel** standalone 插件：Dart façade + 扁平 OHOS HAR。
2. Dart↔ArkTS 契约固定为 `device_imei` Channel 上的三个无参方法：
   - `getPlatformVersion` → `@ohos.deviceInfo` `osFullName`
   - `getDeviceImei` → `deviceInfo.ODID`（API 12+ 开发者级非永久标识，**不是硬件 IMEI**）
   - `getDeviceInfo` → sdkApiVersion/productModel/manufacture/deviceType/ODID 五键 JSON 字符串
3. 未知方法必须返回 Flutter `notImplemented`；API < 12 的 ODID 路径必须返回 `UNSUPPORTED_API` Channel error。
4. 不得把 ODID 宣传为真实 IMEI；不得新增 Android 电话权限的机械映射。
5. 插件公开 API 与 Android/iOS 行为必须保持兼容；`sdk_int`/`sdkInt` 双键输入必须保持兼容。

---

## 2. 源文件与生成文件所有权

### 2.1 权威源

优先级：

```text
插件当前源码 + 可复现测试/构建证据
> .ohos-adaptation/04-test-cases.json
> .ohos-adaptation/05-test-cases.xlsx
> 历史 PRD/changelog/devlog
```

### 2.2 生成关系

```text
04-test-cases.json
  ├─> 05-test-cases.xlsx
  └─> 独立 Demo（example_auto/lib/ 三级页面 + 真实 API Action）
       └─> ohos/ 独立工程 → HAP
```

禁止手工改 XLSX 后不回写 JSON；禁止手工新增 Demo 用例而不更新 JSON/XLSX。

### 2.3 已记录的预存在缺口

当前 `04-test-cases.json` 仍有：`expectation_metadata` 仅 4/26、`devices` 为空、个别 `preconditions` 非中文；`04-ohos-demo-case-map.json` 与 `05-xlsx-demo-binding.json` 缺失。后续维护必须回填后再声称完整 profile。

---

## 3. 标准生成顺序

1. 更新 `.ohos-adaptation/04-test-cases.json`（含全部 `expectation_metadata` 与 `devices`）；
2. 校验模块和 ID 唯一性；
3. 重新生成 12 列 `05-test-cases.xlsx`；
4. 生成/回填 `04-ohos-demo-case-map.json` 与 `05-xlsx-demo-binding.json`；
5. 生成三级页面并填充真实 public-API Action；
6. 运行 `flutter pub get`、`flutter analyze`、`flutter test`；
7. 创建/更新 `example_auto/ohos/`；
8. 构建、安装、启动、验证；
9. 更新操作日志和证据哈希。

任何前置产物变更后，下游 XLSX、Demo、HAP 和运行证据都视为过期，必须重建。

---

## 4. 页面结构规范

Demo 采用三级导航，且必须由最终 XLSX 驱动（不得手写页面清单）：

```text
example_auto/lib/
├── main.dart
├── test/widget_test.dart
└── ...（模块索引页 → 模块页 → 详情页）
```

- 一级页：显示全部 XLSX 模块（F-01～F-03）及其用例数；
- 二级页：显示所选模块的完整用例列表（26 条，不合并/抽样/隐藏）；
- 三级页：显示该行测试信息、真实 API `Actions` 与观察到的 `Result`；
- 每个用例有独立可点击运行控件与稳定语义 Key；含 `一键测试全部` 与 `复制日志`（`Key('btn_copy_log')`）。

---

## 5. Action 实现门禁

### 5.1 禁止项

- 仅 `_result = '成功'`；仅 SnackBar/Toast/PASS Badge；仅记录日志；
- `onPressed: null`；只写 API 名称但不调用；伪造 PASS。

### 5.2 必须项

1. 每个 Action 调用真实 public API（`getPlatformVersion` / `getDeviceImei` / `getDeviceInfo`）；
2. 用例覆盖到的每一个 reviewed case ID 必须出现在可运行 Dart 源码中；
3. ResultPanel 显示观察到的真实返回值（含 ODID 字符串、五键 JSON），不得独立制造 PASS；
4. 全部用户可见文本使用简体中文；API 名、语义 Key 保持不变。

### 5.3 自动审计

```bash
grep -R "TODO(" example_auto/lib
```

应为 0。

---

## 6. XLSX/JSON/Demo 一致性

固定 12 列：

```text
需求SR、L3特性、L4特性、L5特性、用例编号、用例名称、
用例类型、用例级别、前置条件、步骤描述、预期结果、覆盖设备
```

当前覆盖设备统一为 `phone,tablet,2in1`（与 `module.json5` deviceTypes 一致）。

一致性门禁：`04-test-cases.json` case IDs = XLSX 用例编号 = Demo 页面 IDs = routes IDs；字段至少比较 ID、标题、级别、前置条件、步骤/验证点、预期结果、设备。

---

## 7. 插件源码规范

1. `DeviceInfo.fromMap` 必须同时接受 `sdk_int` 与历史 `sdkInt`，并统一转为 String；
2. `getDeviceInfo` 对 null Channel 结果必须返回 null，不得强制解包；
3. ArkTS 端 `getDeviceInfo` 必须固定 `JSON.stringify` 五键，且带 try/catch → `SERIALIZATION_ERROR`；
4. `getDeviceImei` 必须包含 API 12 守卫；
5. `onAttachedToEngine`/`onDetachedFromEngine` 必须成对注册/清理 handler；
6. 修改 Channel 契约后必须同时回归 Dart 测试与 ETS 实现。

---

## 8. Example 最小化规范

`example_auto/` 只保留：

```text
pubspec.yaml
analysis_options.yaml
lib/
test/
ohos/
```

不保留非 OHOS 平台目录、`.dart_tool/build/oh_modules/node_modules/.hvigor`、IDE 缓存、生成注册临时文件。`pubspec.yaml` 只保留实际使用依赖（含 `device_imei` path dependency）。

---

## 9. OHOS 配置规范

### 9.1 Device Types

`example_auto/ohos/entry/src/main/module.json5`：

```json5
"deviceTypes": ["phone", "tablet", "2in1"]
```

HarmonyOS PC 使用 `2in1`，不是 `pc`。

### 9.2 权限

本插件使用 `@ohos.deviceInfo` 公开常量，**无权限要求**。`module.json5` 的 `requestPermissions` 必须为空；不得添加 `ohos.permission.INTERNET`（无网络需求）。

### 9.3 Bundle 元数据

`ohos/AppScope/app.json5`：`bundleName: com.vai.device_imei_example_auto`。签名 profile 与 bundleName 必须匹配；更换 bundleName 或目标设备后必须在 DevEco Studio 重新生成签名并重建 HAP。

---

## 10. Windows 构建规范

### 10.1 预检

构建前记录：Flutter SDK、DevEco Studio Node、hvigorw.js、HDC、项目绝对路径、设备/API。

### 10.2 Git Bash 限制

Git Bash 运行 `.bat` wrapper 会出现 `BATCH RECURSION`。优先 native PowerShell 直调：

```powershell
& '<DevEco>\tools\node\node.exe' '<DevEco>\tools\hvigor\bin\hvigorw.js' assembleHap -p product=default -p buildMode=debug --no-daemon -p FLUTTER_TARGET=lib\main.dart -p TARGET_PLATFORM=ohos-arm64 -p PACKAGE_CONFIG=<...>
```

### 10.3 路径长度

Hvigor 报 259 字符限制时：不使用 `subst`/junction 作为默认方案；创建物理短工作区，复制插件根与 `example_auto/`（保持 `path: ..` 依赖有效），排除生成缓存，重新运行 pub/npm/ohpm 安装。

当前短工作区：

```text
D:\dimei_build_20260804
```

### 10.4 Node/Hvigor 依赖

缺失 `flutter-hvigor-plugin` 时：

```bash
cd <workspace>/example_auto/ohos
rm -f package-lock.json
"<DevEco Node>/npm.cmd" install
```

不得复用导致 Arborist `extraneous` 的陈旧 lockfile。

---

## 11. 构建、安装与证据规范

### 11.1 HAP 位置

```text
example_auto/ohos/entry/build/default/outputs/default/entry-default-unsigned.hap
.ohos-adaptation/artifacts/device_imei-example-debug-unsigned-20260804.hap
```

签名 HAP（宿主工程）作为设备验证证据，路径记录在 `artifact-manifest.json`。

### 11.2 设备安装

Dart 代码变化后必须 `hdc uninstall` → `hdc install <new-hap>` → `hdc shell aa start -a EntryAbility -b <bundle>`；不使用 `hdc install -r` 作为新 Dart kernel 的最终证据。

### 11.3 状态声明

- HAP 存在 ≠ 安装通过；安装通过 ≠ 启动通过；启动通过 ≠ 全部用例通过；
- 代表性真机核对（3/3 API）不得写成 26/26 真机 PASS；
- 设备断开时明确记录 `BLOCKED/NOT_RUN`，不得继承历史在线状态。

---

## 12. 验证基线

当前基线：

```text
方法覆盖率：3/3 = 100%
插件 flutter test：BLOCKED（OHOS VM snapshot invalid，0 断言）
Demo flutter test：BLOCKED（同上）
Demo flutter analyze：No issues found
DroidRun 4 L0 执行：NOT_RUN
Hypium 11 执行：NOT_RUN
AJV Schema：01–05 PASS
跨阶段一致性：8/8 pass
质量评分：B
XLSX：12 列 / 26 行
HAP build：PASS（unsigned，短工作区）
签名 HAP：宿主工程真机安装/启动 PASS，3/3 API 人工核对 PASS
独立 example_auto 签名：待 DevEco Studio + 真机
```

---

## 13. Git 与隔离规范

1. 独立 Demo 必须留在插件目录 `example_auto/`，不放入共享 `flutter_ohos_test`；
2. 共享 Hub 只可作为构建工具/HAR 来源，不能成为交付源码；
3. 父仓库忽略 `repos-flutter-fast/`，普通 `git status` 不代表这些文件已纳入版本控制；提交前先执行 `git check-ignore -v <path>`；
4. 是否强制跟踪 `example_auto`、HAP 和构建脚本由维护者决定；
5. 不提交临时短工作区 `D:\dimei_build_20260804`；不提交 `.dart_tool/build/node_modules/oh_modules/.hvigor`。
