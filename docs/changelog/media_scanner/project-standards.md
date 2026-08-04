# media_scanner OHOS Demo 项目规范

> 适用范围：`repos-flutter-fast/media_scanner` 及其隔离 Demo `example_auto/`。  
> 规范来源：`agent-flutter/.claude/skills/flutter-plugin-example-generator2`、`migrate-flutter-plugins`、当前仓库 `CLAUDE.md` 及本次构建验证经验。

---

## 1. 目录与隔离规范

1. 插件原生模块固定在：
   - `media_scanner/ohos/`
2. 可安装测试应用固定在：
   - `media_scanner/example_auto/`
3. HAP 固定交付到：
   - `media_scanner/example_auto/build/ohos/hap/`
4. 不使用公共 `flutter_ohos_test` Hub 作为 media_scanner 的独立交付包。
5. `example_auto/pubspec.yaml` 只允许依赖 media_scanner 及必要 Flutter SDK 依赖，不得带入其它业务插件。
6. 手机显示名必须可区分插件：
   - 中文/base：`MediaScanner 测试`
   - English：`MediaScanner Test`

---

## 2. 插件模块命名规范

`flutter-hvigor-plugin` 使用 `.flutter-plugins-dependencies` 中的 Flutter package name 注入 Hvigor node。

因此以下名称必须一致：

```text
pubspec.name                  = media_scanner
Hvigor includeNode name       = media_scanner
ohos/src/main/module.json5    = media_scanner
ohos/oh-package.json5         = media_scanner
```

不要把 module name 改成 `media_scanner_ohos`，否则会触发 `00303053`。

不受此规则影响：

- ArkTS plugin class：`MediaScannerPlugin`
- OHOS registration package：`io.flutter.plugins.mediascanner`
- MethodChannel：`media_scanner`

---

## 3. Channel 契约规范

| 平台 | Channel | Method | 参数 | 返回 |
|------|---------|--------|------|------|
| OHOS | `media_scanner` | `loadMedia` | `{path: String}` | `null` 成功；错误字符串失败 |
| Android | `media_scanner` | `refreshGallery` | `{path: String}` | 平台现有契约 |

要求：

- Dart/ArkTS/Android 的 Channel 名必须一致。
- OHOS 未知方法调用 `notImplemented()`。
- attach/detach 必须成对设置/清理 handler。
- OHOS 文件必须使用应用沙箱路径；不能使用 Android 的 `/storage/emulated/0/...` 路径。

---

## 4. OHOS API 与权限规范

### 媒体注册

- 图片：`MediaAssetChangeRequest.createImageAssetRequest`
- 视频：`MediaAssetChangeRequest.createVideoAssetRequest`
- 提交：`PhotoAccessHelper.applyChanges`

### 权限

- `ohos.permission.WRITE_IMAGEVIDEO`
- entry `module.json5` 必须提供：
  - `reason`
  - `usedScene.abilities`
  - `usedScene.when`
- 运行时请求应靠近受保护操作。
- 插件侧可做防御性二次检查，但不得吞掉拒绝原因。

### deviceTypes

entry module 必须包含：

```json5
["phone", "tablet", "2in1"]
```

HarmonyOS PC 使用 `2in1`，不用 `pc`。

---

## 5. Demo 页面规范

按照 `flutter-plugin-example-generator2`，必须是三级页面：

### 一级：模块索引页

- 类：`ModuleIndexPage`
- 展示 F-01…F-06
- 每个模块 Key：`module_<module-code>`
- 展示该模块评审用例数

### 二级：模块用例列表页

- 类：`CaseListPage`
- 展示完整 case ID + 标题 + level + 判定语义
- 每个用例 Key：`case_<case-id>`

### 三级：用例详情页

- 类：`CaseDetailPage`
- 展示：
  - case ID
  - 标题
  - level
  - 模块
  - 判定语义
  - 预期结果
- 执行按钮 Key：`btn_run_<case-id>`
- ResultPanel Keys：
  - `result_panel`
  - `txt_result_status`
  - `txt_result`
  - `txt_result_detail`
- 复制日志 Key：`btn_copy_log`

所有用户可见文字使用中文；API 名、case ID、Key 保持英文机器标识。

---

## 6. 用例与 XLSX 一致性规范

权威 workbook：

- `.ohos-adaptation/05-test-cases.xlsx`

Demo 必须与 workbook 保持：

- 用例数量相同；
- ID 集合相同；
- 标题逐字相同；
- Level 语义相同；
- 模块归属相同。

Level 对比规范化：

```text
Level 0 == L0
Level 1 == L1
Level 2 == L2
Level 3 == L3
```

修改任一 case ID、标题、级别、步骤、预期结果或设备覆盖后，必须同步更新 JSON/XLSX/Demo，并重新校验。

当前 XLSX 是旧 flutter-fast 13 列格式。若转换为完整 12 列 skill 格式，必须使用正式 exporter + demo map + binding 重新生成，不能手工覆盖。

---

## 7. 结果判定规范

### 正向用例

- 实际行为符合预期 → `PASS` / `符合预期`
- 实际行为不符合预期 → `FAIL` / `不符合预期`

### 预期拒绝用例

以下情况若符合测试预期，应判 `PASS`：

- `.xyz` 被系统拒绝并返回 401；
- 空路径返回明确错误；
- 无扩展名返回明确错误；
- 权限拒绝返回 code=201；
- 未 attach 场景抛出预期 MissingPlugin 语义。

不能因为返回了错误文本就自动判 FAIL。

### 可见状态

ResultPanel 必须保留：

- 状态；
- 摘要；
- 实际日志；
- 预期结果；
- 可复制日志。

不允许只显示泛化的“成功”Toast 或 PASS 徽标而没有业务结果。

---

## 8. Dart 与测试规范

1. 平台判断使用：

```dart
defaultTargetPlatform == TargetPlatform.ohos
```

不要在可运行 host 测试的 Dart 代码中依赖 `Platform.isOhos`。

2. Lazy ListView 测试：

```dart
await tester.scrollUntilVisible(...);
```

或通过真实导航进入目标页面，不能假设屏幕外 widget 已构建。

3. 最低本地验证：

```bash
flutter pub get
flutter analyze
flutter test
```

4. 当前三级页面 smoke test 必须覆盖：

- 模块索引页；
- F-01 用例列表页；
- F-01-01 详情页；
- 执行按钮；
- ResultPanel；
- 复制日志。

---

## 9. Windows / Hvigor 构建规范

### 首选命令

```bash
"<DevEco node.exe>" "<hvigorw.js>" \
  assembleHap -p product=default -p buildMode=debug --no-daemon --mode module
```

### 路径过长

若出现 `00306001`：

1. 使用新的物理短路径工作区，例如 `D:\msbuild\media_scanner`；
2. 不使用 `subst` / junction 作为默认方案；
3. 删除短工作区中的旧生成元数据；
4. 重新执行 `flutter pub get`；
5. 构建完成后把 HAP 和已验证源码同步回插件仓库。

### 模块名错误

若出现 `00303053`：检查 pubspec package name 与 module/oh-package name 是否一致。

### 签名错误

若出现 `00303074`：检查以下值是否与 `.p7b` 签名 profile 一致：

- `build-profile.json5` bundleName
- `AppScope/app.json5` bundleName

更换 bundleName 时需要重新在 DevEco Studio 生成签名 profile，不能只改文本。

---

## 10. HDC 与截图规范

### 安装前

- 确认目标：`hdc list targets`
- 当前设备：`192.168.3.85:41665`

### fresh install

```bash
hdc uninstall <bundleName>
hdc install <signed-hap>
hdc shell aa start -a EntryAbility -b <bundleName>
```

### Git Bash 路径保护

```bash
MSYS_NO_PATHCONV=1 hdc shell "snapshot_display -f /data/local/tmp/file.jpeg"
MSYS_NO_PATHCONV=1 hdc file recv /data/local/tmp/file.jpeg <local-path>
```

`snapshot_display` 使用 `.jpeg`。

Flutter 画布不保证能被 `uitest dumpLayout` 解析；无法读取时使用语义 Key 自动化，或截图 + 日志，但要诚实记录证据边界。

---

## 11. 签名与安全规范

- 不在 changelog、devlog、操作日志中记录 `keyPassword` 或 `storePassword`。
- 不在对外包中附带 `.p12`、`.p7b`、`.cer`，除非明确要求且具备安全授权。
- HAP 对外发送前记录：路径、大小、SHA-256、签名状态、bundleName、设备/API。
- 当前签名 profile 绑定 `com.example.flutter_ohos_test`；如果需要独立 bundleName，应在 DevEco Studio 中重新签名。

---

## 12. 文档与证据规范

1. 文档统一放在：

```text
docs/changelog/media_scanner/
```

2. 文件分类：

- `README.md`：索引与状态
- `changelog.md`：交付变更
- `devlog.md`：真机/调试结果
- `operation-log-YYYY-MM-DD.md`：完整操作时间线
- `project-standards.md`：可复用规范

3. 状态仅使用：

- PASS
- FAIL
- BLOCKED
- NOT_RUN
- NA

4. 不把以下证据混同：

- analyze PASS ≠ runtime PASS
- build PASS ≠ install PASS
- install PASS ≠ behavior PASS
- widget test PASS ≠ 真机页面跳转 PASS
- HAP 存在 ≠ 签名/安装/启动/功能全部 PASS

5. 本轮真实边界：

- 模块索引页：真机截图 PASS
- 二/三级导航：widget test PASS
- 18 条真机逐条执行：NOT_RUN
- 真机一键测试全部：NOT_RUN
- Midscene 自动化：NOT_RUN
