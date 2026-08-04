# flutter_zoom_drawer OHOS 独立 Demo 操作日志

> 执行日期：2026-08-03 至 2026-08-04  
> 目标插件：`flutter_zoom_drawer` 3.2.0  
> 目标根目录：`flutter_library_workflow/flutter_library_workflow_release/repos-flutter-fast/flutter_zoom_drawer`  
> Flutter：`3.32.4-ohos-0.0.1`，Framework `af27e4a7f6`，Engine `8cd19e509d`，Dart `3.8.1`  
> 设备：执行期间连接 `192.168.3.85:41665`，OpenHarmony 6.1.1.120 / API 24；最终复核时设备已断开，`hdc list targets` 返回 `[Empty]`

---

## 1. 用户目标与最终边界

最终确认的目标不是补齐整个 full-profile 迁移流水线，而是：

1. 在插件自己的目录中创建独立 `example_auto/` OHOS Demo，不依赖共享 `flutter_ohos_test` Hub；
2. 使用 `flutter-plugin-example-generator2` 规定的三级页面结构；
3. 让 `04-test-cases.json`、`05-test-cases.xlsx`、Demo 模块/用例 ID 与标题一致；
4. 每个用例详情页的 Action 必须调用真实 `flutter_zoom_drawer` API，产生人眼可见的抽屉动画，不能只修改 Result 文本；
5. 构建签名 HAP、安装并在真实 OHOS 设备上验证代表性页面和动画。

明确不属于本轮范围：完整生产 01–05 Schema 产物重建、全 24 条真机逐条自动执行、Midscene/VLM 全量回归。

---

## 2. 只读发现与路径确认

### 2.1 路径纠正

用户最初给出的 `flutter_zoom_drwaer` 路径不存在；实际插件目录为：

```text
D:\deveco\ai_tool\flutter_library_workflow\flutter_library_workflow_release\repos-flutter-fast\flutter_zoom_drawer
```

### 2.2 子代理扫描

启动了独立只读扫描：

- `docs/` 文档扫描：识别 changelog/devlog、历史 PRD、实现记录、自测报告、XLSX 模板和 Windows OHOS 构建经验；
- 插件源码扫描：确认插件为 pure Dart、无 MethodChannel/FFI/native 平台实现，核心 OHOS 改动为 `TargetPlatform.ohos` 返回处理；
- Demo/平台扫描：确认原插件没有自己的 `example_auto/ohos`，共享 Hub 中存在历史测试页但不满足项目隔离要求。

### 2.3 初始状态

原 `.ohos-adaptation/05-test-cases.xlsx`：

- 24 条数据；
- 13 列，额外包含 `自测结果`；
- 设备字段为历史格式；
- 不符合本轮采用的 12 列规范。

原 Demo 主要存在于共享 `flutter_ohos_test`，不是插件自己的隔离 Demo。

---

## 3. 范围修正与回滚记录

### 3.1 过度扩展尝试

最初按 complete `flutter` profile 开始生成 `00-migration-context.json`、`00-source-scan.json`、新的 requirement/analysis 文件，并把旧 flutter-fast 产物移动到兼容目录。

用户随后明确本轮只需要独立 OHOS Demo、XLSX 对齐和真机验证。因此立即：

- 删除本轮临时生成的 complete-profile 文件；
- 将原 flutter-fast 产物恢复到原路径；
- 停止 analysis/PRD/planning 全量重建任务。

该回滚没有覆盖或删除原有适配产物。

### 3.2 共享 Hub 临时实现与回滚

最初在 `flutter_ohos_test` 中创建了模块页并进行真机构建，用户要求项目隔离后：

- 将实现迁移到插件自己的 `example_auto/`；
- 恢复共享 Hub 的 `main.dart` 和 zoom drawer 测试文件；
- 删除在共享 Hub 新增的 zoom drawer 模块/用例文件；
- 最终共享 Hub 无本轮 zoom-drawer 专属源码改动。

---

## 4. 测试用例与 XLSX 处理

### 4.1 `04-test-cases.json`

将测试用例整理为生成器和 verifier 可读取的结构：

- `modules[].test_cases`；
- 每模块包含 `moduleCode/moduleName/moduleDescription/priority`；
- 每用例包含 `id/title/level/preconditions/test_steps/expected_result/postconditions/devices`；
- 根部包含 24 条 `expectation_metadata`。

最终统计：

| 模块 | 用例数 |
|---|---:|
| F-01 ZoomDrawer Widget | 8 |
| F-02 ZoomDrawerController | 6 |
| F-03 Built-in Drawer Styles | 6 |
| F-04 Platform Integration | 4 |
| 合计 | 24 |

实际级别分布为 L0 14 条、L1 10 条；旧统计中的 L0 15 / L1 9 为过期值。

### 4.2 `05-test-cases.xlsx`

重新生成 12 列工作簿：

```text
需求SR | L3特性 | L4特性 | L5特性 | 用例编号 | 用例名称 |
用例类型 | 用例级别 | 前置条件 | 步骤描述 | 预期结果 | 覆盖设备
```

最终结果：

- Sheet：`测试用例`；
- 数据行：24；
- 列数：12；
- SHA-256：`51d45767d36101652e05024e3b599ad47df614498f652ea0eca36a41d945e5df`；
- JSON 与 XLSX 的 ID、标题、类型、级别、前置条件、步骤、预期结果逐项对比：0 mismatch。

---

## 5. 官方生成器流程

### 5.1 生成器来源

采用：

```text
agent-flutter/.claude/skills/flutter-plugin-example-generator2/tool/generate_example_lib.py
```

为确保 L0 和 L1 全部生成，将工作副本中的：

```python
GENERATE_LEVELS = ['L0']
```

调整为：

```python
GENERATE_LEVELS = ['L0', 'L1']
```

工作副本保存于：

```text
.ohos-adaptation/tool/generate_example_lib.py
```

### 5.2 生成命令

```bash
python .ohos-adaptation/tool/generate_example_lib.py \
  --test-cases .ohos-adaptation/04-test-cases.json \
  --package example
```

生成结果：

- 1 个 `module_index_page.dart`；
- 4 个 `module_f_XX_page.dart`；
- 24 个 `testcase_f_XX_XX_page.dart`；
- `main.dart`、`app_keys.dart`、`routes.dart`；
- `widgets/result_panel.dart`。

### 5.3 页面结构

```text
example_auto/lib/
├── main.dart
├── app_keys.dart
├── routes.dart
├── widgets/result_panel.dart
└── pages/
    ├── module_index_page.dart
    ├── module_f_01_page.dart
    ├── module_f_02_page.dart
    ├── module_f_03_page.dart
    ├── module_f_04_page.dart
    └── testcase_f_XX_XX_page.dart × 24
```

页面层级：

1. 一级页：F-01～F-04 功能模块；
2. 二级页：模块内测试用例列表；
3. 三级页：测试信息、Actions、ResultPanel。

---

## 6. Action 实现与动画修正

### 6.1 首版问题

首版 `fill_pages.py` 中若干用例只修改 `_result` 文本，没有调用真实 API。用户指出“Action 没有显示动画”后，将其判定为不合格实现。

受影响的代表性用例包括：F-01-01、F-01-04、F-01-05、F-02-04～06、F-04-01、F-04-04。

### 6.2 最终规范

每个详情页均包含真实 `ZoomDrawer` 实例和 `ZoomDrawerController`；每个 Action 至少调用以下一种：

```dart
_controller.open?.call();
_controller.close?.call();
_controller.toggle?.call();
```

参数类用例在修改参数后继续调用 open/close 展示可见差异：

- `slideWidth`：修改宽度后打开；
- `borderRadius`：修改圆角后打开；
- `isRtl`：切换方向后打开；
- `drawerStyleBuilder`：启用自定义 builder 后打开；
- `disableDragGesture`：证明手势禁用后 `controller.open()` 仍有动画；
- `stateNotifier/isOpen`：动画完成后读取实际状态；
- 回弹用例：短暂 open 后延迟 close，展示 reverse 回弹。

最终静态审计：

- 24 个详情页；
- `remaining_TODOs=0`；
- `pages_without_animation_api=0`；
- 每个页面都有真实 open/close/toggle 调用。

生成/填充脚本：

```text
.ohos-adaptation/tool/fill_pages.py
```

---

## 7. 插件源码与测试修复

### 7.1 `slideWidth == 0` 除零崩溃

原菜单宽度计算：

```dart
widget.slideWidth - (context.screenWidth / widget.slideWidth) - 50
```

当 `slideWidth == 0` 时产生 `-Infinity`，触发：

```text
BoxConstraints has a negative minimum width
```

修复：在 `lib/src/flutter_zoom_drawer.dart` 中增加 `widget.slideWidth > 0` 守卫，并将结果 clamp 到非负值。

### 7.2 枚举测试错误

测试原引用不存在的：

```dart
DrawerLastAction.close
```

实际枚举为 `open, closed`，修正为：

```dart
DrawerLastAction.closed
```

### 7.3 测试依赖

在插件 `pubspec.yaml` 的 `dev_dependencies` 增加：

```yaml
flutter_test:
  sdk: flutter
```

插件测试最终结果：

```text
00:01 +30: All tests passed!
```

---

## 8. Example 最小化与 OHOS 工程

生成器会从上游 `example/` 复制，但上游示例包含 `easy_localization/provider/shared_preferences/flutter_platform_widgets` 和多平台目录。本轮按 OHOS 独立 Demo 最小化：

- 删除 `linux/macos/web/windows/android/ios` 等非目标平台目录；
- 移除未使用的重依赖；
- `example_auto/pubspec.yaml` 只保留 Flutter、`flutter_zoom_drawer` path dependency、`cupertino_icons` 和测试/lint 依赖；
- 使用 `flutter create --platforms=ohos example_auto` 创建独立 `ohos/`；
- `module.deviceTypes` 设置为 `phone/tablet/2in1`。

签名证书绑定 `com.example.flutter_ohos_test`，因此独立 Demo 暂时使用该 bundleName。若改为新的 bundleName，必须在 DevEco Studio 为当前设备重新生成签名材料。

---

## 9. Windows 构建失败与恢复

### 9.1 Git Bash 批处理递归

直接执行：

```bash
flutter build hap --debug
```

曾出现：

```text
BATCH RECURSION exceeds STACK limits
ohpm install failed
```

处理原则：不在 Git Bash 中重复走 `.bat` wrapper 链；优先 native PowerShell。

### 9.2 深目录路径超限

在原项目深路径构建出现：

```text
00306001 Specification Limit Violation
The length of path exceeds the maximum length: 259
```

`subst`/junction 不能作为可靠方案，因为 package_config、Flutter plugin metadata 与 Hvigor 会解析真实路径。

最终采用物理短工作区：

```text
D:\zd_build\flutter_zoom_drawer
```

复制整个插件根和 `example_auto`，以保持 `path: ../` 依赖有效；排除 `.git/.dart_tool/build/oh_modules/node_modules/.hvigor` 后重新生成元数据。

### 9.3 缺失 `flutter-hvigor-plugin`

短工作区首次构建报：

```text
Cannot find module 'flutter-hvigor-plugin'
```

`ohos/package.json` 已引用 Flutter SDK 中的本地 hvigor plugin，但复制时排除了 node_modules。恢复方式：

```bash
cd D:/zd_build/flutter_zoom_drawer/example_auto/ohos
rm -f package-lock.json
"D:/deveco/DevEco Studio/tools/node/npm.cmd" install
```

必须删除旧 `package-lock.json`，否则 npm Arborist 可能报 `extraneous`。

### 9.4 `flutter.har`

短工作区 `ohos/entry/har/` 需要与当前 Flutter OHOS SDK 同源的 `flutter.har`。本轮使用已验证的同 SDK host 产物：

```text
D:\deveco\ai_tool\flutter_ohos_test\ohos\entry\har\flutter.har
```

复制到短工作区后才进行构建。禁止从未知 SDK/版本工程复用 HAR。

### 9.5 签名 bundleName 不匹配

将 bundleName 改为 `com.example.flutter_zoom_drawer` 后出现：

```text
00303074 Configuration Error
bundleName ... does not match ... SigningConfigs
```

原因：当前证书/profile 与 `com.example.flutter_ohos_test` 绑定。最终恢复为证书支持的 bundleName，签名成功。

### 9.6 成功构建

在短工作区 PowerShell 中执行：

```powershell
Set-Location 'D:\zd_build\flutter_zoom_drawer\example_auto'
& 'D:\flutter\OpenHarmony-flutter\flutter_flutter\bin\flutter.bat' build hap --debug
```

结果：

```text
Running Hvigor task assembleHap... 26.8s
Built build\ohos\hap\entry-default-signed.hap
```

---

## 10. HAP、安装与设备证据

HAP 保存位置：

```text
example_auto/build/ohos/hap/entry-default-signed.hap
.ohos-adaptation/artifacts/flutter_zoom_drawer-example-signed.hap
```

两份文件：

- 大小：97,938,281 bytes；
- SHA-256：`f435aa42a1adbb0e3cf980b41ede916d401cc35f6898275281a9d1e3e7714ada`；
- 哈希一致。

安装流程：

```bash
hdc uninstall com.example.flutter_ohos_test
hdc install entry-default-signed.hap
hdc shell aa start -a EntryAbility -b com.example.flutter_ohos_test
```

执行期间安装和启动均成功。

真机已观察：

- 一级模块页显示 F-01～F-04；
- 二级页显示完整模块用例；
- 三级页显示测试信息、Actions、Result；
- F-01-01 Action 调用 `_controller.open?.call()` 后抽屉真实滑入；
- ResultPanel 同步显示执行结果。

证据截图位于：

```text
example_auto/midscene/log/*.jpeg
```

代表性动画截图哈希：

```text
anim_open2.jpeg
54e3c6fc46ed48c64f805652c5e486452803e8601bc51f3f653e57eaa1bbb660
```

注意：本轮没有逐条完成 24/24 真机自动执行，因此不能将全部用例状态声明为真机 PASS。

---

## 11. 最终验证结果

| 检查 | 结果 |
|---|---|
| 插件 `flutter test` | PASS，30/30 |
| Demo `flutter test` | PASS，2/2 |
| Demo `flutter analyze` | 0 error、0 warning、50 info |
| 生成结构 | 4 模块页 + 24 详情页 |
| TODO | 0 |
| 无动画 API 页面 | 0 |
| XLSX | 12 列、24 行 |
| JSON/XLSX ID 集 | 一致 |
| HAP build | PASS |
| HAP install | PASS（执行期间设备） |
| App launch | PASS（执行期间设备） |
| 代表性 Action 动画 | PASS |
| 24 条真机逐条自动执行 | NOT_RUN |
| 最终设备在线状态 | 当前 `[Empty]` |

---

## 12. Git 与交付注意

父仓库 `.gitignore` 包含：

```text
repos-flutter-fast/
```

因此 `example_auto/`、HAP、脚本和多数插件源码变更不会出现在普通 `git status` 中；仅已被 Git 跟踪的文件（例如原有 XLSX）会显示修改。

交付前必须：

1. 显式检查目标文件是否被 ignore：`git check-ignore -v <path>`；
2. 若确需提交，使用仓库约定解除 ignore 或经确认后 `git add -f`；
3. 不得因为 `git status` 为空就声称产物已纳入版本控制；
4. 构建产物是否提交需由仓库维护者明确决定。
