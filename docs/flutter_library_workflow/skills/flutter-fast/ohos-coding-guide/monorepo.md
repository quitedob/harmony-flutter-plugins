# Monorepo 插件鸿蒙适配

## 适用条件

- 仓库中包含多个 Flutter 包/插件
- 包之间存在 `path` 依赖关系
- 典型结构：主包 + platform_interface + 各平台实现包

---

## 第一部分：工程搭建

### 拓扑分析

1. 扫描仓库中所有 `pubspec.yaml` 文件
2. 构建依赖关系图（特别是 `path` 依赖）
3. 确定适配顺序（被依赖的包先适配）

**常见 Monorepo 结构**：
```
{repo_root}/
├── packages/
│   ├── {plugin_name}/                     # 主包（app-facing）
│   ├── {plugin_name}_platform_interface/  # 平台接口
│   ├── {plugin_name}_android/             # Android 实现
│   ├── {plugin_name}_ios/                 # iOS 实现
│   └── {plugin_name}_web/                 # Web 实现
├── melos.yaml                             # Melos 配置（如有）
└── pubspec.yaml                           # 可能的根 pubspec
```

### Melos 兼容处理

如果仓库使用 Melos 管理：

1. **检查 `melos.yaml`**：了解包的组织方式和脚本定义
2. **使用 Melos 的 bootstrap**：`melos bootstrap` 会自动链接所有包
3. **但编译仍需手动**：Melos 不处理 OHOS 编译，需手动逐包编译
4. **跳过 Melos 的 clean**：鸿蒙适配过程中避免执行 `melos clean`，会清理 ohos 目录

如果没有 Melos，手动管理 path 依赖即可。

### 逐包创建工程

按拓扑顺序，对每个需要原生实现的包执行工程创建：

```bash
# 纯 Dart 包 / platform_interface：无需创建，只需 flutter pub get
cd {pure_dart_package} && flutter pub get

# 联合插件的 ohos 实现包：创建新包
cd {repo_root}/packages
flutter create -t plugin --platforms ohos {plugin_name}_ohos

# 独立插件：在现有目录中添加 ohos
cd {standalone_plugin}
flutter create -t plugin --platforms ohos .
```

### 路径依赖协调

所有包之间的 `path` 依赖必须正确：

```yaml
# ohos 实现包引用 platform_interface
dependencies:
  {plugin_name}_platform_interface:
    path: ../{plugin_name}_platform_interface

# 主包引用 ohos 实现包
dependencies:
  {plugin_name}_ohos:
    path: ../{plugin_name}_ohos
```

**注意**：修改任一包的 `pubspec.yaml` 后，所有依赖它的包都需要重新 `flutter pub get`。

---

## 第二部分：编码实现

### 适配顺序

严格按照依赖拓扑排序：

1. **底层工具包**（无原生依赖的纯 Dart 包）— 通常无需修改
2. **platform_interface 包** — 通常无需修改，但检查是否有平台判断代码
3. **创建 ohos 实现包** — 核心编码工作
4. **主包** — 添加 ohos 平台声明（`default_package`）

### ohos 实现包编码

ohos 实现包的编码根据实际通信模式选择对应的模式：
- 如果是 MethodChannel → 参考同目录下 `method-channel.md` 的编码指导
- 如果含 EventChannel → 参考同目录下 `event-channel.md` 的编码指导
- 如果含 PlatformView → 参考同目录下 `platform-view.md` 的编码指导

### 多包中的 Channel 名称

Monorepo 中可能有多个 Channel（主包一个、子功能包各一个），**每个 Channel 名称都必须与 Dart 层一致**。

查找所有 Channel 定义的方法：
- 在 `platform_interface` 包中搜索 `MethodChannel(`
- 在现有的 `_android` / `_ios` 实现包中搜索 Channel 名称
- 确保 ohos 实现中使用完全相同的字符串

### 编译顺序

逐包编译，确保每一级依赖编译通过后再编译上层：

```bash
# 1. 底层纯 Dart 包
cd packages/base_utils && flutter pub get

# 2. platform_interface
cd ../plugin_platform_interface && flutter pub get

# 3. ohos 实现包（核心编译目标，注意flutter build hap在windows环境下使用powershell或者cmd执行）
cd ../plugin_ohos && flutter pub get && flutter build hap --debug

# 4. 主包 — 此阶段只需 pub get，不需要编译
cd ../plugin && flutter pub get
```

**编译修复时**：如果修改了底层包，需要从被修改的包开始重新向上编译。

### 处理共享代码包

部分 Monorepo 有共享的工具包（如 `{plugin_name}_core`），这些包可能：
- 纯 Dart → 按同目录下 `pure-dart.md` 处理
- 含平台判断 → 添加 OHOS 分支
- 含原生代码 → 需要创建 ohos 目录

---

## 第三部分：常见编译错误与修复

### 1. `Could not resolve package 'xxx'`（依赖解析失败）

**原因**：path 依赖路径不正确。

**修复**：
- 检查 `pubspec.yaml` 中的 `path:` 相对路径
- 路径是相对于当前包的 `pubspec.yaml` 所在目录
- 修改后需要重新 `flutter pub get`

### 2. 上游包修改后下游包编译失败

**原因**：修改了 platform_interface 的接口但 ohos 实现包未同步更新。

**修复**：
- 从被修改的包开始，按拓扑顺序重新 `flutter pub get`
- 确保 ohos 实现包实现了所有新增/修改的接口方法

### 3. `The plugin '{plugin_name}' doesn't have a main class defined for the platform 'ohos'`

**原因**：主包 `pubspec.yaml` 中声明了 ohos 平台，但实际的 ohos 实现包未正确配置。

**修复**：
- ohos 实现包的 `pubspec.yaml` 中确认 `implements` 和 `platforms.ohos` 正确
- 主包的 `pubspec.yaml` 中确认 `default_package` 名称正确
- 执行 `flutter pub get` 刷新依赖

### 4. 循环依赖

**原因**：Monorepo 中包之间出现了循环依赖。

**修复**：
- 检查依赖关系图，找到循环点
- 通过接口抽象打破循环（移动共享类型到 platform_interface）
- 确保 ohos 实现包只依赖 platform_interface，不依赖其他平台实现包

### 5. Melos bootstrap 后 ohos 依赖丢失

**原因**：`melos bootstrap` 可能不识别 ohos 相关的包或依赖。

**修复**：
- 在 `melos.yaml` 的 `packages` 中确认 ohos 包被包含
- 或手动在 ohos 包目录执行 `flutter pub get`
- 确保 `melos.yaml` 中没有排除 ohos 包的 glob 模式

### 6. 多包编译时前一个包的 build 产物干扰后续包

**原因**：Flutter 构建缓存可能导致包之间干扰。

**修复**：
- 如果出现诡异的编译错误，尝试 `flutter clean` 后重新编译
- 但注意：只对出问题的包执行 clean，不要全局 clean
