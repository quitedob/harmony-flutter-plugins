# flutter_zoom_drawer OHOS Demo 项目规范

> 适用范围：本目录及 `example_auto/`、`.ohos-adaptation/`。  
> 目标：保证测试用例、XLSX、生成 Demo、OHOS HAP 和设备证据可追踪、可复现且互不污染。

---

## 1. 项目分类与架构

1. `flutter_zoom_drawer` 是 pure-Dart Flutter UI 组件。
2. 插件库本身不创建插件级 `ohos/` HAR，不声明 MethodChannel、权限或 native 注册。
3. `example_auto/ohos/` 是测试 Demo 应用的独立 OHOS 工程，不代表插件需要原生实现。
4. 插件公开 API 和 Android/iOS/web/desktop 行为必须保持兼容。
5. OHOS 平台条件使用：

```dart
defaultTargetPlatform == TargetPlatform.ohos
```

不得新增 `Platform.isOhos` 依赖。

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
  └─> flutter-plugin-example-generator2
       └─> example_auto/lib/
            └─> fill_pages.py 填入真实 API 行为
```

禁止手工改 XLSX 后不回写 JSON；禁止手工新增 Demo 用例而不更新 JSON/XLSX。

### 2.3 工具位置

```text
.ohos-adaptation/tool/generate_example_lib.py
.ohos-adaptation/tool/example_skeleton/
.ohos-adaptation/tool/fill_pages.py
```

生成器必须配置：

```python
GENERATE_LEVELS = ['L0', 'L1']
```

当前 24 条用例不得只生成 L0。

---

## 3. 标准生成顺序

1. 更新 `.ohos-adaptation/04-test-cases.json`；
2. 校验模块和 ID 唯一性；
3. 重新生成 12 列 `05-test-cases.xlsx`；
4. 运行官方生成器生成三级页面；
5. 使用 `fill_pages.py` 填充真实 API；
6. 清理上游 example 复制来的非 OHOS 平台目录和未使用依赖；
7. 运行 `flutter pub get`；
8. 运行 `flutter analyze` 和 `flutter test`；
9. 创建/更新 `example_auto/ohos/`；
10. 构建、安装、启动、验证；
11. 更新操作日志和证据哈希。

任何前置产物变更后，下游 XLSX、Demo、HAP 和运行证据都视为过期，必须重建。

---

## 4. 页面结构规范

必须使用 `flutter-plugin-example-generator2` 三级结构：

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
    └── testcase_f_XX_XX_page.dart
```

页面职责：

- 一级页：显示 F-01～F-04，与 XLSX L4 名称和用例数一致；
- 二级页：显示模块内用例 ID、标题、级别；
- 三级页：显示完整测试信息、可执行 Actions、ResultPanel；
- Route 名称使用原始 case ID，不得改写或合并用例。

---

## 5. Action 实现门禁

### 5.1 禁止项

以下实现不合格：

- 仅 `_result = '成功'`；
- 仅显示 SnackBar/Toast/PASS Badge；
- 仅记录日志；
- `onPressed: null`；
- 只写 API 名称但不调用；
- 伪造动画完成或无条件 PASS。

### 5.2 必须项

每个 testcase 详情页必须：

1. 渲染真实 `ZoomDrawer`；
2. 使用真实 `ZoomDrawerController`；
3. 每个 Action 调用至少一种真实动画 API：

```dart
_controller.open?.call();
_controller.close?.call();
_controller.toggle?.call();
```

4. 参数类用例必须“修改参数 + 重新触发动画”；
5. ResultPanel 显示观察到的行为，不得独立制造 PASS；
6. 每个按钮有稳定 Key；
7. 动画等待用 `Future.delayed` 时必须检查 `mounted`；
8. 状态读取必须发生在动画触发后；
9. 自定义 `drawerStyleBuilder` 必须返回真实 Widget 树；
10. `ZoomDrawer.of(context)` 必须使用 ZoomDrawer 子树内 context，例如 mainScreen 的 GlobalKey。

### 5.3 自动审计

至少执行：

```bash
grep -R "TODO(" example_auto/lib
```

应为 0。

每个详情页必须包含真实控制器调用；允许使用脚本扫描：

```bash
for f in example_auto/lib/pages/testcase_f_*_page.dart; do
  grep -Eq "_controller\.(open|close|toggle)\?\.call\(\)" "$f" || echo "$f"
done
```

应无输出。

---

## 6. XLSX/JSON/Demo 一致性

### 6.1 XLSX 格式

固定 12 列：

```text
需求SR、L3特性、L4特性、L5特性、用例编号、用例名称、
用例类型、用例级别、前置条件、步骤描述、预期结果、覆盖设备
```

不得新增 `自测结果` 列作为设计源。

### 6.2 一致性门禁

以下集合必须一致：

```text
04-test-cases.json case IDs
= XLSX 用例编号
= module_f_XX 页面 IDs
= testcase_f_XX_XX 页面 IDs
= routes.dart IDs
```

字段至少比较：ID、标题、级别、前置条件、步骤/验证点、预期结果。

当前基线：24 条，模块分布 8/6/6/4。

---

## 7. 插件源码规范

1. `slideWidth == 0` 必须安全，不得产生 `Infinity/-Infinity` 约束；
2. 计算后的菜单宽度必须不小于 0；
3. `DrawerLastAction` 有效值为 `open/closed`；测试不得使用不存在的 `close`；
4. 插件 `pubspec.yaml` 必须包含 `flutter_test`；
5. `flutter test` 当前基线为 30/30；
6. 修改动画、手势、Controller 状态机后必须重跑插件测试和 Demo 测试。

---

## 8. Example 最小化规范

`example_auto/` 默认只保留：

```text
pubspec.yaml
analysis_options.yaml
lib/
test/
ohos/
```

仅当确有引用时保留 assets。

不得复制或保留：

- Android/iOS/linux/macos/windows/web 平台目录；
- `.dart_tool/build/.hvigor/oh_modules/node_modules`；
- IDE 缓存；
- 生成注册文件和 ephemeral 文件。

`pubspec.yaml` 仅保留当前 Demo 实际使用的依赖。

---

## 9. OHOS 配置规范

### 9.1 Device Types

`example_auto/ohos/entry/src/main/module.json5`：

```json5
"deviceTypes": ["phone", "tablet", "2in1"]
```

HarmonyOS PC 使用 `2in1`，不是 `pc`。

### 9.2 SDK 字段

SDK 版本只在 root `ohos/build-profile.json5` 的 `products[]` 配置；不得在 entry 模块级 build-profile 添加 `compileSdkVersion`。

### 9.3 签名

签名 profile 与 bundleName 必须匹配。更换 bundleName 或目标设备后：

1. 在 DevEco Studio 重新生成/选择签名；
2. 重建 HAP；
3. 卸载旧 bundle 后安装新 HAP。

当前调试证书绑定 `com.example.flutter_ohos_test`；这只是签名约束，不是插件包名。

---

## 10. Windows 构建规范

### 10.1 预检

构建前记录：

```text
Flutter SDK
DevEco Studio Node
hvigorw.js
HDC
项目绝对路径
设备/API
```

### 10.2 Git Bash 限制

Git Bash 运行 `.bat` wrapper 可能出现 `BATCH RECURSION`。优先 native PowerShell：

```powershell
Set-Location '<short-workspace>\example_auto'
& '<flutter>\bin\flutter.bat' build hap --debug
```

### 10.3 路径长度

Hvigor 报 259 字符限制时：

- 不使用 `subst`/junction 作为默认方案；
- 创建物理短工作区；
- 复制插件根和 example_auto，保持 path dependency；
- 排除生成缓存；
- 重新运行 pub/npm/ohpm 安装。

当前短工作区：

```text
D:\zd_build\flutter_zoom_drawer
```

### 10.4 Node/Hvigor 依赖

缺失 `flutter-hvigor-plugin` 时：

```bash
cd example_auto/ohos
rm -f package-lock.json
"<DevEco Node>/npm.cmd" install
```

不得复用导致 Arborist `extraneous` 的陈旧 lockfile。

### 10.5 flutter.har

只允许复用与当前 Flutter OHOS SDK revision、架构和 build mode 一致并有来源的 `flutter.har`。复制后记录来源和哈希。

---

## 11. 构建、安装与证据规范

### 11.1 HAP 位置

```text
example_auto/build/ohos/hap/entry-default-signed.hap
.ohos-adaptation/artifacts/flutter_zoom_drawer-example-signed.hap
```

两份必须哈希一致。

### 11.2 设备安装

Flutter Dart 代码变化后，必须：

```bash
hdc uninstall <bundle>
hdc install <new-hap>
hdc shell aa start -a EntryAbility -b <bundle>
```

不使用 `hdc install -r` 作为新 Dart kernel 的最终证据。

### 11.3 截图

Git Bash 调用设备路径时使用：

```bash
MSYS_NO_PATHCONV=1 hdc shell snapshot_display -f /data/local/tmp/name.jpeg
MSYS_NO_PATHCONV=1 hdc file recv /data/local/tmp/name.jpeg <local-path>
```

`snapshot_display` 要求 `.jpeg` 后缀。

### 11.4 状态声明

- HAP 存在 ≠ 安装通过；
- 安装通过 ≠ 启动通过；
- 启动通过 ≠ 全部用例通过；
- 代表性动画验证不得写成 24/24 真机 PASS；
- 设备断开时明确记录 `BLOCKED/NOT_RUN`，不得继承历史在线状态。

---

## 12. 验证基线

当前基线：

```text
插件 flutter test: 30/30 PASS
Demo flutter test: 2/2 PASS
Demo flutter analyze: 0 error / 0 warning / 50 info
模块页: 4
详情页: 24
TODO: 0
无真实动画 API 页面: 0
XLSX: 12 列 / 24 行
HAP build: PASS
代表性真机动画: PASS
24 条真机逐条执行: NOT_RUN
```

Analyzer 的 info 属于生成器风格建议（例如 super parameter、prefer_final_fields），不影响编译；需要 CodeArts 零告警交付时再统一修复，且不得破坏生成器结构。

---

## 13. Git 与隔离规范

1. 本 Demo 必须留在插件目录，不放入共享 `flutter_ohos_test`；
2. 共享 Hub 只可作为构建工具/HAR 来源，不能成为交付源码；
3. 父仓库忽略 `repos-flutter-fast/`，所以普通 `git status` 不代表这些文件已纳入版本控制；
4. 提交前先执行：

```bash
git check-ignore -v <path>
```

5. 是否强制跟踪 `example_auto`、HAP、截图和构建脚本必须由维护者决定；
6. 不提交临时短工作区 `D:\zd_build`；
7. 不提交 `.dart_tool/build/node_modules/oh_modules/.hvigor`。
